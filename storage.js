// storage.js

const STORAGE_KEYS = {
  PLAYLIST: 'playlist',
  SETTINGS: 'settings',
  HISTORY: 'history',
};

/**
 * プレイリストを保存
 * @param {Array} playlist 
 */
export function savePlaylist(playlist) {
  localStorage.setItem(STORAGE_KEYS.PLAYLIST, JSON.stringify(playlist));
}

/**
 * プレイリストを読み込む
 * @returns {Array}
 */
export function loadPlaylist() {
  const data = localStorage.getItem(STORAGE_KEYS.PLAYLIST);
  return data ? JSON.parse(data) : [];
}

/**
 * 設定を保存
 * @param {Object} settings 
 */
export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

/**
 * 設定を読み込む
 * @returns {Object}
 */
export function loadSettings() {
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return data ? JSON.parse(data) : {
    volume: 1,
    theme: 'light',
    equalizer: { bass: 0, mid: 0, treble: 0 },
  };
}

/**
 * 再生履歴を保存
 * @param {Array} history 
 */
export function saveHistory(history) {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

/**
 * 再生履歴を読み込む
 * @returns {Array}
 */
export function loadHistory() {
  const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return data ? JSON.parse(data) : [];
}

/**
 * 指定キーのデータを削除
 * @param {string} key 
 */
export function removeItem(key) {
  localStorage.removeItem(key);
}

