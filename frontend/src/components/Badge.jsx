import React from 'react';

const Badge = ({ children, type = 'status', value }) => {
    const getStyles = () => {
        const val = value?.toUpperCase();
        
        // Status styles
        if (type === 'status') {
            switch (val) {
                case 'NEW':
                    return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
                case 'INVESTIGATING':
                    return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                case 'RESOLVED':
                    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                default:
                    return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
            }
        }
        
        // Priority styles
        if (type === 'priority') {
            switch (val) {
                case 'HIGH':
                    return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                case 'MEDIUM':
                    return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
                case 'LOW':
                    return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
                default:
                    return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
            }
        }
    };

    return (
        <span className={`px-2 py-0.5 text-xs font-semibold border rounded-full ${getStyles()}`}>
            {children}
        </span>
    );
};

export default Badge;
