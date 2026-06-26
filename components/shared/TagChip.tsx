interface TagChipProps {
  label: string;
  variant?: 'default' | 'pink' | 'purple';
  onClick?: () => void;
}

export default function TagChip({ label, variant = 'default', onClick }: TagChipProps) {
  const baseStyles =
    'inline-flex items-center px-2.5 py-0.5 text-[10px] font-medium rounded-full border transition-all duration-200';

  const variantStyles = {
    default: 'bg-bg-surface border-border-dark text-text-muted hover:border-text-muted',
    pink: 'bg-accent-pink/10 border-accent-pink/20 text-accent-pink hover:bg-accent-pink/20',
    purple: 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple hover:bg-accent-purple/20',
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {label}
    </span>
  );
}