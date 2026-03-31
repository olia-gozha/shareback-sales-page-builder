export default function PersonPill() {
  return (
    <div className="flex items-center gap-3 ">
      <div className="relative w-8 h-8 rounded-full bg-white overflow-hidden shrink-0">
        <img
          src="/lauren-avatar.png"
          alt="Lauren Ladd"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 rounded-full ring-3 ring-inset ring-white/24 pointer-events-none" />
      </div>
      <div className="space-x-1 text-base text-deep-charcoal/60 tracking-[-0.02em]! leading-[114%]"><span>Lauren Ladd</span> <span>&middot;</span> <span>Shareback</span></div>
    </div>
  )
}
