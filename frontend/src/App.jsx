import { useState, useEffect } from 'react';
import { useTickets }       from './hooks/useTickets';
import { useToast, ToastRegion } from './components/ui/Toast';
import { api }              from './services/api';
import Sidebar              from './components/layout/Sidebar';
import Header               from './components/layout/Header';
import StatsRow             from './components/tickets/StatsRow';
import TicketTable, { FiltersBar } from './components/tickets/TicketTable';
import CreateTicketModal    from './components/tickets/CreateTicketModal';

const INITIAL_FILTERS = { status: '', priority: '' };

const App = () => {
    const { tickets, loading, error, fetchTickets, createTicket, updateStatus } = useTickets();
    const { toasts, toast, dismiss } = useToast();

    const [filters,    setFilters]    = useState(INITIAL_FILTERS);
    const [allTickets, setAllTickets] = useState([]);
    const [modalOpen,  setModalOpen]  = useState(false);

    /* Fetch filtered list whenever filters change */
    useEffect(() => {
        fetchTickets(filters);
    }, [filters]);

    /* Fetch unfiltered list for sidebar stats */
    useEffect(() => {
        api.getTickets().then((r) => setAllTickets(r.data)).catch(() => {});
    }, [tickets]);

    const handleFilter = (key, val) =>
        setFilters((f) => ({ ...f, [key]: val }));

    const handleCreate = async (body) => {
        const res = await createTicket(body);
        setAllTickets((prev) => [res.data, ...prev]);
        toast('Ticket submitted successfully!', 'success');
        return res;
    };

    const handleStatusChange = async (id, status) => {
        try {
            await updateStatus(id, status);
            const label = status.charAt(0) + status.slice(1).toLowerCase();
            toast(`Status updated to ${label}`, 'success');
        } catch (e) {
            toast('Failed to update status.', 'error');
        }
    };

    /* Derived stats */
    const stats = {
        total:    allTickets.length,
        open:     allTickets.filter((t) => t.status === 'NEW').length,
        progress: allTickets.filter((t) => t.status === 'INVESTIGATING').length,
        resolved: allTickets.filter((t) => t.status === 'RESOLVED').length,
    };

    return (
        <div className="flex h-screen bg-zinc-950 overflow-hidden">

            {/* Toast notifications */}
            <ToastRegion toasts={toasts} onDismiss={dismiss} />

            {/* Sidebar */}
            <Sidebar stats={stats} />

            {/* Main content */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

                {/* Topbar */}
                <Header
                    ticketCount={tickets.length}
                    onCreateClick={() => setModalOpen(true)}
                />

                {/* Scrollable page body */}
                <main className="flex-1 overflow-y-auto px-6 py-6" id="main-content">

                    {/* Stats */}
                    <StatsRow stats={stats} />

                    {/* Ticket table card */}
                    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">

                        <FiltersBar
                            filters={filters}
                            onFilter={handleFilter}
                            ticketCount={tickets.length}
                        />

                        {/* Error banner */}
                        {error && (
                            <div className="px-4 pt-3">
                                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg
                                    bg-red-500/10 border border-red-500/20 text-red-400 text-xs" role="alert">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0">
                                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        <TicketTable
                            tickets={tickets}
                            loading={loading}
                            onStatusChange={handleStatusChange}
                        />
                    </div>
                </main>
            </div>

            {/* Create Ticket Modal */}
            <CreateTicketModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreate}
            />
        </div>
    );
};

export default App;
