export default function PageHeader({ title, description }) {
  return (
    <div className="mb-12">
      <h1 className="text-[32px] font-light leading-[125%] mb-2">{title}</h1>
      {description ? (
        <p className="text-sm text-deep-charcoal/66 mb-8 max-w-md">{description}</p>
      ) : null}
    </div>
  )
}