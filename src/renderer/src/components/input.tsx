import cn from 'classnames'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: boolean
}

const Input = ({ className, error, ...props }: InputProps): JSX.Element => {
  return (
    <input
      className={cn(
        'bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5',
        className,
        {
          'border-red-300': error
        }
      )}
      {...props}
    />
  )
}

export default Input
