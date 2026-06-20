import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface Props {
  type: 'error' | 'success';
  message: string;
  onClose?: () => void;
}

export default function Alert({ type, message, onClose }: Props) {
  const isError = type === 'error';
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.875rem 1rem',
        borderRadius: '8px',
        background: isError ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)',
        border: `1px solid ${isError ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
        color: isError ? '#FCA5A5' : '#86EFAC',
        fontSize: '0.875rem',
        lineHeight: 1.5,
      }}
    >
      {isError ? <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} /> : <CheckCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />}
      <span style={{ flex: 1 }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, display: 'flex' }}
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
