import React from 'react'

const RadioGroup = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div className={`grid gap-2 ${className}`} {...props} ref={ref} role="radiogroup" />
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`aspect-square h-4 w-4 rounded-full border border-slate-200 text-slate-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }