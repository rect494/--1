// fileHandler.js
const { dialog } = require('electron').remote || require('@electron/remote');
const fs = require('fs');
const path = require('path');

class FileHandler {
  constructor(appDataPath) {
    // アプリ用フォルダ（曲のコピー保存用）
    this.musicFolder = path.join(appDataPath, 'music');
    if (!fs.existsSync(this.musicFolder)) {
      fs.mkdirSync(this.musicFolder, { recursive: true });
    }
  }

  // ファイル選択ダイアログを開く
  async selectFiles() {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Audio', extensions: ['mp3', 'wav', 'flac'] }
      ]
    });

    if (result.canceled) return [];
    return result.filePaths;
  }

  // 選択したファイルをアプリ用フォルダにコピー
  saveFiles(filePaths) {
    const savedFiles = [];
    for (const filePath of filePaths) {
      const fileName = path.basename(filePath);
      const destPath = path.join(this.musicFolder, fileName);

      // 上書き防止
      let finalPath = destPath;
      let counter = 1;
      while (fs.existsSync(finalPath)) {
        const parsed = path.parse(fileName);
        finalPath = path.join(this.musicFolder, `${parsed.name}_${counter}${parsed.ext}`);
        counter++;
      }

      fs.copyFileSync(filePath, finalPath);
      savedFiles.push(finalPath);
    }
    return savedFiles;
  }
}

module.exports = FileHandler;

