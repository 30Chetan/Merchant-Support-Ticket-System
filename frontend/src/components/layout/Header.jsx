/* Header / Topbar */
const Header = ({ ticketCount, onCreateClick }) => {
    return (
        <header className="flex items-center justify-between px-6 h-14 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm shrink-0">
            <div>
                <h1 className="text-sm font-semibold text-zinc-100">All Tickets</h1>
                <p className="text-xs text-zinc-500">
                    {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
                </p>
            </div>

            <button
                id="create-ticket-btn"
                onClick={onCreateClick}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95
                    text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-lg shadow-indigo-950/40"
            >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                New Ticket
            </button>
        </header>
    );
};

export default Header;
