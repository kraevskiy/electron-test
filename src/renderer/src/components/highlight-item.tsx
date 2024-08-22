import { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'classnames'

import { THighlightItem } from '../types/highlight.types'
import { dateFormat } from '../utils/date-format'

interface HighlightItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  highlight: THighlightItem
}

const HighlightItem = ({ className, highlight, ...props }: HighlightItemProps): JSX.Element => {
  return (
    <div className={cn('w-full flex flex-col p-4 gap-2 border', className)} {...props}>
      <div className="flex justify-between">
        <div className="text-xl">{highlight.title}</div>
        <a href={highlight.href} className="text-blue-600">
          {highlight.url}
        </a>
      </div>
      <div className="text-sm">{highlight.text}</div>
      <div className="flex justify-end">
        <span className="text-xs italic">{dateFormat(highlight.createdAt)}</span>
      </div>
    </div>
  )
}

export default HighlightItem
