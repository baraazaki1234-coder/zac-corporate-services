type LogoProps = {
  variant?: 'dark' | 'light';
  className?: string;
};

/**
 * ZAC mark: an angular shield built from two offset strokes — reads as a
 * protective/legal frame and a medical cross negative-space at the centre.
 * Sharp corners intentionally avoid the generic "rounded blob" logo look.
 */
export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const ink = variant === 'dark' ? '#0F1F3D' : '#F7F5F0';
  const gold = '#B8894A';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 1.5L31.5 8V19L17 32.5L2.5 19V8L17 1.5Z" stroke={ink} strokeWidth="2" />
        <path d="M12 12H22M17 12V22" stroke={gold} strokeWidth="2.4" strokeLinecap="square" />
      </svg>
      <span
        className="text-xl font-bold tracking-tight"
        style={{ color: ink }}
      >
        ZAC
      </span>
    </div>
  );
}
