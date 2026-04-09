/* Header / Topbar */
const Header = ({ ticketCount, onCreateClick, theme, toggleTheme }) => {
    return (
        <header className="flex items-center justify-between px-6 h-14 border-b border-zinc-200 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm shrink-0 transition-colors">
            <div>
                <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">All Tickets</h1>
                <p className="text-xs text-zinc-500">
                    {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 
                        bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 
                        rounded-lg transition-all"
                    aria-label="Toggle Theme"
                >
                    {theme === 'dark' ? (
                        /* Sun Icon */
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                        </svg>
                    ) : (
                        /* Moon Icon */
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                        </svg>
                    )}
                </button>

                <button
                    id="create-ticket-btn"
                    onClick={onCreateClick}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95
                        text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40"
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    New Ticket
                </button>
            </div>
        </header>
    );
};

export default Header;
