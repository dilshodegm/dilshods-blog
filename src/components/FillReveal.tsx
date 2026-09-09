import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import './FillReveal.css'

type As = 'button' | 'a' | 'div'

type FillRevealProps<T extends As = 'div'> = {
  as?: T
  active?: boolean
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>

function FillReveal<T extends As = 'div'>({
  as,
  active = false,
  className,
  children,
  ...rest
}: FillRevealProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  const classes = ['fill', active && 'fill--active', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...rest}>
      <span className="fill__base">{children}</span>
      <span className="fill__mask" aria-hidden="true">
        <span className="fill__mask-inner">{children}</span>
      </span>
    </Tag>
  )
}

export default FillReveal
