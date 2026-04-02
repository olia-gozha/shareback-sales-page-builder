"use client";

import React, { useRef, useEffect } from "react";

export default function BreathingOrb({ className = "", speed = 1.0, zoom = 1.0, frequency = 1.0 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) return;

        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision highp float;
            uniform vec2 iResolution;
            uniform float iTime;
            uniform float iZoom;
            uniform float iFrequency;

            // --- PALETTE DEFINITIONS ---
            #define C_BG vec3(0.961, 0.961, 0.961)         // #F5F5F5 (Soft White)
            #define C_WHITE vec3(1.0, 1.0, 1.0)            // #ffffff (Pure White)
            #define C_BLUE vec3(0.680, 0.757, 0.8)         // #94C1D0 (Light Blue)
            #define C_BLUE_PALE vec3(0.780, 0.867, 0.898)  // #C7DDE5 (Very Light Blue)
            #define C_OATMEAL vec3(0.910, 0.890, 0.867)    // #E8E3DD (Warm Off-White)
            #define C_SAGE_GRAY vec3(0.867, 0.890, 0.878)  // #DDE3E0 (Light Grayish/Green)
            #define C_PINK vec3(0.824, 0.596, 0.608)       // #D2989B (Muted Pink)

            // --- NOISE FUNCTIONS ---
            float hash(float n) { return fract(sin(n) * 758.5453); }

            float noise(vec3 x) {
                vec3 p = floor(x);
                vec3 f = fract(x);
                f = f * f * (3.0 - 2.0 * f);
                float n = p.x + p.y * 57.0 + 113.0 * p.z;
                return mix(mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                               mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
                           mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                               mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
            }

            float fbm(vec3 p) {
                float f = 0.0;
                f += 0.5000 * noise(p); p *= 2.02;
                f += 0.2500 * noise(p); p *= 2.03;
                f += 0.1250 * noise(p);
                return f;
            }

            // --- SDF OBJECT ---
            float map(vec3 p) {
                // Master loop angle: 2 * PI / 10 seconds. 
                // Guarantees perfect seamless loop every 10 seconds.
                float theta = iTime * 0.62831853; 
                
                // Smooth breathing animation synced to the loop (pulses twice per 10s)
                float breathing = sin(theta * 2.0 * max(iFrequency, 0.001)) * 0.04;
                float sphereBase = length(p) - (0.9 + breathing);

                // Organic surface displacement moving in a circular path
                vec3 tempOffset = vec3(sin(theta) * 0.15, cos(theta) * 0.15, sin(theta * 2.0) * 0.1);
                vec3 noisePos = p * 1.5 + tempOffset;
                float displacement = fbm(noisePos);
                
                return sphereBase + displacement * 0.2;
            }

            // --- MAIN LOOP ---
            void main() {
                vec2 fragCoord = gl_FragCoord.xy;
                vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
                uv /= max(iZoom, 0.001);

                // Light background: radial gradient
                vec3 bgCol = mix(C_WHITE, C_BG, length(uv) * 0.8);
                vec3 col = bgCol; // Start with the background color

                vec3 ro = vec3(0.0, 0.0, 3.5);
                vec3 rd = normalize(vec3(uv, -1.0));
                
                float t = 0.0;
                float d = 0.0;
                float min_d = 100.0; // For soft ambient shadows
                
                for(int i = 0; i < 80; i++) {
                    vec3 p = ro + rd * t;
                    d = map(p);
                    min_d = min(min_d, d);
                    if(d < 0.001 || t > 10.0) break;
                    t += d * 0.8;
                }
                
                if(d < 0.001) {
                    vec3 p = ro + rd * t;
                    
                    // Calculate normals for lighting
                    vec2 e = vec2(0.01, 0.0);
                    vec3 n = normalize(vec3(
                        map(p+e.xyy)-map(p-e.xyy),
                        map(p+e.yxy)-map(p-e.yxy),
                        map(p+e.yyx)-map(p-e.yyx)
                    ));
                    
                    // Soft diffuse lighting setup
                    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
                    float diff = max(dot(n, lightDir), 0.0);
                    
                    // Fresnel for that glassy, soap-bubble edge
                    float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 2.5);
                    
                    // Internal noise to drive the color shifts (Looping)
                    float theta = iTime * 0.62831853;
                    vec3 innerTempOffset = vec3(sin(theta) * 0.25, cos(theta) * 0.25, 0.0);
                    float innerNoise = fbm(p * 1.9 + innerTempOffset);
                    
                    float sss = smoothstep(0.3, 0.8, innerNoise);

                    // --- COMPOSITING THE ORB ---
                    
                    // 1. Base color is a soft, warm oatmeal
                    vec3 objectColor = C_OATMEAL;
                    
                    // 2. Mix in pale blue and pink based on the internal noise
                    vec3 coreColor = mix(C_BLUE_PALE, C_BLUE, sss);
                    objectColor = mix(objectColor, coreColor, innerNoise * 1.5);
                    
                    // 3. Add soft sage-gray shading to the dark side instead of black
                    objectColor = mix(C_SAGE_GRAY, objectColor, diff * 0.6 + 0.8);
                    
                    // 4. Bright white rim light to define the edge against the background
                    objectColor += C_BLUE * fresnel * 0.5;

                    // --- STATIC FILM GRAIN (ORB ONLY) ---
                    float staticGrain = fract(sin(dot(fragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
                    staticGrain -= 0.5; // Shift to lighten and darken evenly
                    
                    float grainIntensity = 0.06; 
                    objectColor += staticGrain * grainIntensity;

                    // --- FAKING TRANSPARENCY ---
                    // Blend the orb color with the background color to make it feel airy
                    // It's more opaque at the edges (fresnel) and where the "core" noise is
                    float alpha = clamp(0.99 + fresnel * 0.5 + sss * 0.2, 0.0, 1.0);
                    
                    col = mix(bgCol, objectColor, alpha);

                } else {
                    // Subtle ambient shadow on the canvas to anchor it
                    float shadow = smoothstep(0.0, 0.8, min_d);
                    vec3 shadowColor = mix(C_SAGE_GRAY, bgCol, 0.6); 
                    col = mix(shadowColor, col, shadow);
                }
                
                // Slight contrast adjustment
                col = smoothstep(0.0, 1.02, col);
                
                gl_FragColor = vec4(col, 1.0);
            }
        `;

        const createShader = (gl, type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            
            // Check for shader compilation errors (useful for debugging)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const program = gl.createProgram();
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0
        ]), gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const iResolutionLoc = gl.getUniformLocation(program, "iResolution");
        const iTimeLoc = gl.getUniformLocation(program, "iTime");
        const iZoomLoc = gl.getUniformLocation(program, "iZoom");
        const iFrequencyLoc = gl.getUniformLocation(program, "iFrequency");

        let animationFrameId;
        let startTime = performance.now();

        const render = (time) => {
            // Handle high-DPI displays safely
            const dpr = window.devicePixelRatio || 1;
            const width = Math.floor(canvas.clientWidth * dpr);
            const height = Math.floor(canvas.clientHeight * dpr);
            
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }

            const elapsedTime = (time - startTime) * 0.001 * speed; // Time in seconds

            gl.uniform2f(iResolutionLoc, width, height);
            gl.uniform1f(iTimeLoc, elapsedTime);
            gl.uniform1f(iZoomLoc, zoom);
            gl.uniform1f(iFrequencyLoc, frequency);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(buffer);
        };
    }, [speed, zoom, frequency]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: "100%", height: "100%", display: "block" }}
        />
    );
}