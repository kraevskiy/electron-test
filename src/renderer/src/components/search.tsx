import { DetailedHTMLProps, HTMLAttributes, useState, ChangeEvent } from 'react'
import cn from 'classnames'

import Input from './input'
import { isValidUrl } from '../utils/is-valid-url'
import Button from './button'

interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [url, setUrl] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (error?.length) {
      setError(null)
    }
    const val = e.target.value
    setUrl(val)
  }

  const handleUrl = (): void => {
    const isValid = isValidUrl(url)
    if (!isValid) {
      setError('Url not valid')
      return
    }

    window.electron.ipcRenderer.send('app:load-url', {
      url
    })
  }

  return (
    <div className={cn('flex flex-col w-full gap-2', className)} {...props}>
      <div className="flex justify-between gap-5">
        <Input
          value={url}
          onChange={onChange}
          className="w-full"
          placeholder="Url"
          error={!!error}
        />
        <Button onClick={handleUrl} className="w-[25%]">
          Open
        </Button>
      </div>
      {error && <div className="w-full">{error}</div>}
    </div>
  )
}

export default Search
