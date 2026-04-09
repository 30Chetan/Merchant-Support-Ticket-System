import { useState } from 'react';

/* Create Ticket Modal — slides in from right, animated  */
const CreateTicketModal = ({ open, onClose, onSubmit }) => {
    const [form, setForm]       = useState({ subject: '', message: '', priority: 'Low' });
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState('');

    if (!open) return null;

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.subject.trim() || !form.message.trim()) {
            setError('Subject and message are required.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await onSubmit(form);
            setForm({ subject: '', message: '', priority: 'Low' });
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to submit ticket.');
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Modal panel */}
            <div
                className="relative w-full max-w-md bg-zinc-900 border border-zinc-800/60 rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/60">
                    <div>
                        <h2 className="text-base font-semibold text-zinc-100">New Support Ticket</h2>
                        <p className="text-xs text-zinc-500 mt-0.5">Fill in the details below to raise a new inquiry.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-lg hover:bg-zinc-800"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    {error && (
                        <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </div>
                    )}

                    {/* Subject */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">Subject *</label>
                        <input
                            id="ticket-subject"
                            name="subject"
                            type="text"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Brief summary of the issue"
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2
                                text-sm text-zinc-100 placeholder:text-zinc-600
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                        />
                    </div>

                    {/* Priority */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">Priority</label>
                        <select
                            id="ticket-priority"
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="custom-select w-full"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">Message *</label>
                        <textarea
                            id="ticket-message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Describe your issue in detail…"
                            className="w-full bg-zinc-800/50 border border-zinc-700/60 rounded-lg px-3 py-2
                                text-sm text-zinc-100 placeholder:text-zinc-600 resize-none
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-400
                                hover:bg-zinc-800 hover:text-zinc-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            id="submit-ticket-btn"
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500
                                text-sm font-semibold text-white transition-all active:scale-95
                                disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-950/30"
                        >
                            {loading ? 'Submitting…' : 'Submit Ticket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicketModal;
