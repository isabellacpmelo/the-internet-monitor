import React from 'react'
import './index.css'

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  children: React.ReactNode
  variant?: 'fill' | 'outlined'
}

export function AppButton({
  icon,
  children,
  className = '',
  variant = 'fill',
  ...props
}: AppButtonProps) {
  return (
    <button
      type='button'
      className={`app-btn app-btn--${variant} ${className}`.trim()}
      {...props}>
      {icon && <span className='app-btn-icon'>{icon}</span>}
      <span>{children}</span>
    </button>
  )
}
