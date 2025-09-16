// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));

  // 開発者ツールを開く（開発中のみ）
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// アプリ起動時
app.whenReady().then(createWindow);

// macOS 対応
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC: ファイル選択
ipcMain.handle('select-files', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Audio', extensions: ['mp3', 'wav', 'flac'] }],
  });
  return result.canceled ? [] : result.filePaths;
});

// IPC: ファイルコピー（アプリ用フォルダ保存）
ipcMain.handle('save-files', (event, filePaths) => {
  const appDataPath = path.join(app.getPath('userData'), 'music');
  if (!fs.existsSync(appDataPath)) fs.mkdirSync(appDataPath, { recursive: true });

  const savedFiles = [];
  for (const filePath of filePaths) {
    const fileName = path.basename(filePath);
    let destPath = path.join(appDataPath, fileName);

    let counter = 1;
    while (fs.existsSync(destPath)) {
      const parsed = path.parse(fileName);
      destPath = path.join(appDataPath, `${parsed.name}_${counter}${parsed.ext}`);
      counter++;
    }

    fs.copyFileSync(filePath, destPath);
    savedFiles.push(destPath);
  }

  return savedFiles;
});
