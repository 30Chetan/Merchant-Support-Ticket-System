import { useState, useCallback, useEffect } from 'react';

let idCounter = 0;

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const toast = useCallback((message, type = 'success') => {
        const id = ++idCounter;
        setToasts((prev) => [...prev, { id, message, type }]);
        // Auto dismiss after 3.5 seconds
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
    }, []);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, toast, dismiss };
};

/* Toast notification region rendered at top of app */
export const ToastRegion = ({ toasts, onDismiss }) => {
    if (!toasts.length) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    onClick={() => onDismiss(t.id)}
                    className={`
                        pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl
                        border shadow-xl text-sm font-medium cursor-pointer
                        animate-fade-up transition-all
                        ${t.type === 'success'
                            ? 'bg-emerald-950/90 border-emerald-700/50 text-emerald-300'
                            : 'bg-red-950/90 border-red-700/50 text-red-300'}
                    `}
                >
                    <span className="text-base">{t.type === 'success' ? '✓' : '✕'}</span>
                    {t.message}
                </div>
            ))}
        </div>
    );
};
