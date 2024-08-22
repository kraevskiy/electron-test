import { BrowserWindow, WebContentsView } from 'electron'

export type TWindowsList = {
  mainWindow: BrowserWindow
  appWindow: WebContentsView
  webWindow: WebContentsView
}

export type THighlightItem = {
  url: string
  href: string
  text: string
  title: string
  id: string
  createdAt: string
}
