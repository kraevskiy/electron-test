import { IpcRendererEvent } from 'electron'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import cn from 'classnames'

import { THighlightItem } from '../types/highlight.types'
import HighlightItem from './highlight-item'

interface HighlightListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const HighlightList = ({ className, ...props }: HighlightListProps): JSX.Element => {
  const [list, setList] = useState<THighlightItem[]>([])
  const handleCopied = (_e: IpcRendererEvent, data: THighlightItem[]): void => {
    setList(data)
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('app:copied', handleCopied)

    return (): void => {
      window.electron.ipcRenderer.on('app:copied', handleCopied)
    }
  }, [])

  return (
    <div className={cn('flex w-full flex-col', className)} {...props}>
      <div className="text-2xl font-bold mb-4">Your highlights:</div>
      <div className="h-[2px] w-full bg-gray-400 mb-4" />
      <div className="w-full flex flex-col gap-3">
        {!list.length ? (
          <div className="text-xl font-bold italic">No Highlight Yet!</div>
        ) : (
          list.map((h) => <HighlightItem highlight={h} key={h.id} />)
        )}
      </div>
    </div>
  )
}

export default HighlightList
