import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

const TicketForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        priority: 'Low'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ subject: '', message: '', priority: 'Low' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <AlertCircle className="text-primary-400" size={20} />
                Create New Ticket
            </h2>
            
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-400">Subject</label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Brief summary of the issue"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                />
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-400">Priority</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-400">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your issue in detail..."
                    rows="4"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-slate-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20"
            >
                {loading ? 'Submitting...' : (
                    <>
                        <Send size={18} />
                        Submit Ticket
                    </>
                )}
            </button>
        </form>
    );
};

export default TicketForm;
