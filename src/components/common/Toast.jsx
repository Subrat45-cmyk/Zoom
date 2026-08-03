import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, ...toast }]);
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 3000);
    }
  }, [removeToast]);

  const toast = useMemo(() => ({
    success: (title, desc) => addToast({ type: 'success', title, description: desc }),
    error: (title, desc) => addToast({ type: 'error', title, description: desc }),
    info: (title, desc) => addToast({ type: 'info', title, description: desc }),
  }), [addToast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

const ToastItem = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="flex w-[350px] max-w-full overflow-hidden rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl pointer-events-auto"
    >
      <div className={cn(
        "flex w-1.5 shrink-0",
        toast.type === 'success' ? 'bg-green-500' : 
        toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
      )} />
      <div className="flex flex-1 items-start p-4">
        <div className="flex-shrink-0">{icons[toast.type]}</div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-slate-900 dark:text-gray-100">{toast.title}</p>
          {toast.description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">{toast.description}</p>
          )}
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            className="inline-flex rounded-md bg-white dark:bg-gray-900 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            onClick={onRemove}
          >
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ToastProvider;
