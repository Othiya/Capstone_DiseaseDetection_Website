// The poultry mark used across the app. An emoji rather than a line icon, because
// farmers recognise the chicken immediately and it reads at small sizes.
// Takes the same props as the lucide icons it replaced, so it can be dropped into
// the same `icon:` slots (strokeWidth is accepted and ignored — an emoji has no stroke).
export function PoultryIcon({
  size = 24,
  className = '',
  strokeWidth: _strokeWidth,
}: {
  size?: number | string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <span
      role="img"
      aria-label="Poultry"
      className={className}
      style={{
        fontSize: typeof size === 'number' ? `${size}px` : size,
        lineHeight: 1,
        display: 'inline-block',
      }}
    >
      🐔
    </span>
  );
}
