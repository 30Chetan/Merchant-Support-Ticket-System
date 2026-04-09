/* Sidebar — persistent navigation + live stats */
const Sidebar = ({ stats }) => {
    return (
        <aside className="hidden md:flex flex-col w-56 border-r border-zinc-800/60 bg-zinc-950 shrink-0">
            {/* Brand */}
            <div className="flex items-center gap-2.5 px-4 h-14 border-b border-zinc-800/60">
                <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                </div>
                <span className="text-sm font-semibold text-zinc-100 tracking-tight">TicketIQ</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-2 py-3 space-y-0.5">
                <p className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Support</p>

                <div className="nav-item active">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    All Tickets
                    <span className="ml-auto text-xs bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-md">{stats.total}</span>
                </div>

                <div className="nav-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Inbox
                    {stats.open > 0 && (
                        <span className="ml-auto text-xs bg-sky-500/20 text-sky-400 px-1.5 py-0.5 rounded-full font-semibold">
                            {stats.open > 9 ? '9+' : stats.open}
                        </span>
                    )}
                </div>

                <p className="px-2.5 py-1.5 mt-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Status</p>

                <div className="space-y-0.5">
                    {[
                        { label: 'New',          count: stats.open,     color: 'bg-sky-500' },
                        { label: 'Investigating', count: stats.progress, color: 'bg-orange-500' },
                        { label: 'Resolved',     count: stats.resolved, color: 'bg-emerald-500' },
                    ].map(({ label, count, color }) => (
                        <div key={label} className="nav-item">
                            <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
                            {label}
                            <span className="ml-auto text-xs text-zinc-600">{count}</span>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="px-2 py-3 border-t border-zinc-800/60">
                <div className="nav-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
                    </svg>
                    Settings
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
