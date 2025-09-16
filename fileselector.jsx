import React from 'react';
import FileHandler from '../fileHandler';

function FileSelector({ setPlaylist }) {
  const handleSelectFiles = async () => {
    const fileHandler = new FileHandler(window.process.env.APPDATA || '.');
    
    // ファイル選択ダイアログ
    const files = await fileHandler.selectFiles();
    if (files.length === 0) return;

    // アプリフォルダにコピー
    const savedFiles = fileHandler.saveFiles(files);

    // プレイリストに追加
    setPlaylist(prev => [...prev, ...savedFiles]);
  };

  return (
    <div className="file-selector">
      <button onClick={handleSelectFiles}>
        音楽ファイルを選択
      </button>
    </div>
  );
}

export default FileSelector;

