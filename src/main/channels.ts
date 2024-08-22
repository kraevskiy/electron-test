import { ipcMain } from 'electron'
import * as fs from 'node:fs'
import { join } from 'path'
import { randomUUID } from 'node:crypto'

import { THighlightItem, TWindowsList } from './types'

const dirPath = join(__dirname, '../data')
const filePath = join(dirPath, 'highlights.json')

export default function channels(windows: TWindowsList): void {
  ipcMain.on('app:load-url', (_e, data) => {
    windows.webWindow.webContents.loadURL(data.url)
  })
  ipcMain.on('web:copied', (_e, data) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    const newItem: THighlightItem = {
      id: randomUUID(),
      createdAt: new Date(Date.now()).toISOString(),
      ...data
    }
    let existingData: THighlightItem[] = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      existingData = JSON.parse(fileContent)
    }
    existingData.push(newItem)
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2))
    windows.appWindow.webContents.send('app:copied', existingData)
  })
}
