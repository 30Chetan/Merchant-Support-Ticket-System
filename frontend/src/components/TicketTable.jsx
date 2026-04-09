import React from 'react';
import Badge from './Badge';
import { Calendar, MessageSquare, Tag } from 'lucide-react';

const TicketTable = ({ tickets, onStatusChange, updatingId }) => {
    if (!tickets || tickets.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
                <p className="text-slate-400">No tickets found. Raise a new one!</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-800/80">
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Subject & Info</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                    {tickets.map((ticket) => (
                        <tr key={ticket._id} className="hover:bg-slate-700/30 transition-colors group">
                            <td className="px-6 py-5">
                                <div className="space-y-1">
                                    <h3 className="text-white font-semibold group-hover:text-primary-400 transition-colors">{ticket.subject}</h3>
                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageSquare size={12} />
                                            Ticket ID: {ticket._id.slice(-6).toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-300 line-clamp-1 mt-2">{ticket.message}</p>
                                </div>
                            </td>
                            <td className="px-6 py-5">
                                <Badge type="priority" value={ticket.priority}>{ticket.priority}</Badge>
                            </td>
                            <td className="px-6 py-5">
                                <Badge type="status" value={ticket.status}>{ticket.status}</Badge>
                            </td>
                            <td className="px-6 py-5 text-right">
                                <select 
                                    value={ticket.status}
                                    disabled={updatingId === ticket._id}
                                    onChange={(e) => onStatusChange(ticket._id, e.target.value)}
                                    className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-2 py-1 text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer disabled:opacity-50"
                                >
                                    <option value="NEW">Set NEW</option>
                                    <option value="INVESTIGATING">Set INVESTIGATING</option>
                                    <option value="RESOLVED">Set RESOLVED</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;
