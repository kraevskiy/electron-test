import { motion } from 'framer-motion'
import cn from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  children: ReactNode
}

const Button = ({ children, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(
        'bg-blue-500 transition-all hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
