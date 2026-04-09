import React, { useState, useEffect } from 'react';
import ticketApi from '../api/ticketApi';
import TicketForm from '../components/TicketForm';
import TicketTable from '../components/TicketTable';
import { LayoutDashboard, RefreshCcw, Ticket as TicketIcon } from 'lucide-react';

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState(null);

    // Fetch tickets on mount
    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const data = await ticketApi.getTickets();
            setTickets(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tickets. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTicket = async (formData) => {
        setSubmitLoading(true);
        try {
            const newTicket = await ticketApi.createTicket(formData);
            setTickets([newTicket, ...tickets]);
            setError(null);
        } catch (err) {
            setError('Failed to create ticket.');
            console.error(err);
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        setUpdatingId(id);
        try {
            const updatedTicket = await ticketApi.updateTicket(id, { status: newStatus });
            setTickets(tickets.map(t => t._id === id ? updatedTicket : t));
        } catch (err) {
            setError('Failed to update ticket status.');
            console.error(err);
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <div className="bg-primary-500 p-2 rounded-xl shadow-lg shadow-primary-500/20">
                            <TicketIcon className="text-white" size={24} />
                        </div>
                        Ticket Support <span className="text-primary-500">System</span>
                    </h1>
                    <p className="text-slate-400 mt-1">Manage and track your support requests seamlessly.</p>
                </div>
                
                <button 
                    onClick={fetchTickets}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl border border-slate-700 transition-all active:scale-95"
                >
                    <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </header>

            {/* Error State */}
            {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl flex items-center gap-3">
                    <span className="font-bold">Error:</span> {error}
                </div>
            )}

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Tickets', val: tickets.length, color: 'bg-primary-500' },
                    { label: 'Unresolved', val: tickets.filter(t => t.status !== 'RESOLVED').length, color: 'bg-rose-500' },
                    { label: 'Resolved', val: tickets.filter(t => t.status === 'RESOLVED').length, color: 'bg-emerald-500' }
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
                        <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                        <div className="flex items-end justify-between mt-2">
                            <h2 className="text-4xl font-bold text-white">{stat.val}</h2>
                            <div className={`h-2 w-12 rounded-full ${stat.color} opacity-20`}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                    <TicketForm onSubmit={handleCreateTicket} loading={submitLoading} />
                </div>
                <div className="lg:col-span-8">
                    {loading && tickets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
                            <RefreshCcw size={40} className="animate-spin" />
                            <p>Loading tickets...</p>
                        </div>
                    ) : (
                        <TicketTable 
                            tickets={tickets} 
                            onStatusChange={handleStatusChange} 
                            updatingId={updatingId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
