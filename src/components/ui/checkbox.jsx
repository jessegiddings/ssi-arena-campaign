import React from 'react'
import { CheckCircle2 } from 'lucide-react'

const Checkbox = React.forwardRef(({ className = "", checked, onCheckedChange, ...props }, ref) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    className={`peer h-4 w-4 shrink-0 rounded-sm border border-slate-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-slate-900 text-white' : 'bg-white'} ${className}`}
    onClick={() => onCheckedChange && onCheckedChange(!checked)}
    ref={ref}
    {...props}
  >
    {checked && <CheckCircle2 className="h-3 w-3" />}
  </button>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }