// helpers.js

/**
 * 秒を「分:秒」形式に変換
 * @param {number} seconds 
 * @returns {string} mm:ss
 */
export function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

/**
 * 配列の要素をランダムに並び替える
 * @param {Array} array 
 * @returns {Array}
 */
export function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/**
 * ファイルパスからファイル名を取得
 * @param {string} filePath 
 * @returns {string}
 */
export function getFileName(filePath) {
  return filePath.split(/[/\\]/).pop();
}

/**
 * ローカルストレージに保存
 * @param {string} key 
 * @param {any} value 
 */
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/**
 * ローカルストレージから取得
 * @param {string} key 
 * @returns {any}
 */
export function loadFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error('Failed to load from localStorage:', err);
    return null;
  }
}
