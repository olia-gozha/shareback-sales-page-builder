export default function PersonPill() {
  return (
    <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
      <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden shrink-0">
        <img
          src="/lauren-avatar.png"
          alt="Lauren Ladd"
          className="w-full h-full object-cover"
        />
      </div>
      <span>Lauren Ladd &middot; Shareback</span>
    </div>
  )
}
