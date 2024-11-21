import React from 'react';
import { X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isDangerous?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  isLoading,
  isDangerous
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="glass-card p-6 w-full max-w-sm mx-auto space-y-6 animate-zoom-in">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-xl -mt-2 -mr-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-white/80">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 glass-button py-2"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 glass-button py-2 ${
              isDangerous 
                ? 'bg-red-500/20 hover:bg-red-500/30' 
                : 'bg-blue-500/20 hover:bg-blue-500/30'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};