import React from 'react'

const Button = React.forwardRef(({
  className = "",
  variant = "default",
  size = "default",
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-900/90",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900"
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-11 px-8"
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }