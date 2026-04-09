/* TicketTable — full ticket list with filters bar */

/* ── Helpers ─────────────────────────────────────────────── */
const PRIORITY_STYLES = {
    High:   'bg-rose-500/10   text-rose-400   border-rose-500/20',
    Medium: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Low:    'bg-sky-500/10    text-sky-400    border-sky-500/20',
};

const STATUS_STYLES = {
    NEW:           'bg-sky-500/10    text-sky-400    border-sky-500/20',
    INVESTIGATING: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    RESOLVED:      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const Badge = ({ children, styleMap, value }) => (
    <span className={`px-2 py-0.5 text-[11px] font-semibold border rounded-full ${styleMap[value] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
        {children}
    </span>
);

/* ── Skeleton loading row ─────────────────────────────────── */
const SkeletonRow = () => (
    <tr className="border-b border-zinc-800/40">
        {[1,2,3,4,5].map(i => (
            <td key={i} className="px-4 py-4"><div className="skeleton h-3 rounded w-24" /></td>
        ))}
    </tr>
);

/* ── Filters Bar ─────────────────────────────────────────── */
export const FiltersBar = ({ filters, onFilter, ticketCount }) => (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-800/40">
        <h2 className="text-sm font-semibold text-zinc-200">
            Tickets
            <span className="ml-2 text-xs text-zinc-500 font-normal">{ticketCount} result{ticketCount !== 1 ? 's' : ''}</span>
        </h2>

        <div className="flex items-center gap-2">
            {/* Status filter */}
            <select
                id="filter-status"
                className="custom-select text-xs"
                value={filters.status}
                onChange={(e) => onFilter('status', e.target.value)}
            >
                <option value="">All Status</option>
                <option value="NEW">New</option>
                <option value="INVESTIGATING">Investigating</option>
                <option value="RESOLVED">Resolved</option>
            </select>

            {/* Priority filter */}
            <select
                id="filter-priority"
                className="custom-select text-xs"
                value={filters.priority}
                onChange={(e) => onFilter('priority', e.target.value)}
            >
                <option value="">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            {/* Clear filters */}
            {(filters.status || filters.priority) && (
                <button
                    onClick={() => { onFilter('status', ''); onFilter('priority', ''); }}
                    className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1 rounded-md hover:bg-zinc-800"
                >
                    Clear
                </button>
            )}
        </div>
    </div>
);

/* ── Main TicketTable ─────────────────────────────────────── */
const TicketTable = ({ tickets, loading, onStatusChange }) => {

    /* Empty state */
    if (!loading && tickets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="1.5" strokeLinecap="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                </div>
                <p className="text-sm font-medium text-zinc-400">No tickets found</p>
                <p className="text-xs text-zinc-600 mt-1">No tickets match your current filters. Try clearing the filters or create a new ticket.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-zinc-800/50">
                        {['Subject', 'Priority', 'Status', 'Created', 'Update Status'].map((h) => (
                            <th key={h} className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/30">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
                        : tickets.map((t) => (
                            <tr key={t._id} className="hover:bg-zinc-800/20 transition-colors group">
                                {/* Subject */}
                                <td className="px-4 py-4 max-w-xs">
                                    <p className="text-sm font-medium text-zinc-100 group-hover:text-indigo-400 transition-colors truncate">{t.subject}</p>
                                    <p className="text-xs text-zinc-500 mt-0.5 truncate">{t.message.slice(0, 65)}{t.message.length > 65 ? '…' : ''}</p>
                                </td>

                                {/* Priority */}
                                <td className="px-4 py-4">
                                    <Badge styleMap={PRIORITY_STYLES} value={t.priority}>{t.priority}</Badge>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-4">
                                    <Badge styleMap={STATUS_STYLES} value={t.status}>{t.status}</Badge>
                                </td>

                                {/* Created At */}
                                <td className="px-4 py-4 text-xs text-zinc-500 whitespace-nowrap">
                                    {new Date(t.createdAt).toLocaleDateString('en-IN', {
                                        day: '2-digit', month: 'short', year: 'numeric'
                                    })}
                                </td>

                                {/* Status dropdown */}
                                <td className="px-4 py-4">
                                    <select
                                        id={`status-select-${t._id}`}
                                        value={t.status}
                                        onChange={(e) => onStatusChange(t._id, e.target.value)}
                                        className="custom-select text-xs"
                                    >
                                        <option value="NEW">New</option>
                                        <option value="INVESTIGATING">Investigating</option>
                                        <option value="RESOLVED">Resolved</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;
