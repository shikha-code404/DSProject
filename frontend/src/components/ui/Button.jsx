import clsx from 'clsx'

const variants = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
  danger:    'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-red-500 hover:bg-red-600 text-white shadow-md transition-all duration-300 active:scale-95 cursor-pointer',
}

const sizes = {
  sm:  'px-3 py-1.5 text-xs',
  md:  '',
  lg:  'px-7 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
