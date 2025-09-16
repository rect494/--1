// player.js
class Player {
  constructor() {
    this.audio = new Audio();
    this.playlist = [];
    this.currentIndex = 0;
    this.isShuffle = false;

    // イベントコールバック
    this.onTrackChange = null;
    this.onTimeUpdate = null;

    // 時間更新イベント
    this.audio.addEventListener('timeupdate', () => {
      if (this.onTimeUpdate) this.onTimeUpdate(this.audio.currentTime, this.audio.duration);
    });

    // 曲終了時
    this.audio.addEventListener('ended', () => {
      this.next();
    });
  }

  setPlaylist(playlist) {
    this.playlist = playlist;
  }

  play() {
    if (!this.audio.src && this.playlist.length > 0) {
      this.setTrack(this.currentIndex);
    }
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  setTrack(index) {
    if (!this.playlist[index]) return;
    this.currentIndex = index;
    this.audio.src = this.playlist[index];
    this.audio.play();

    if (this.onTrackChange) this.onTrackChange(this.currentIndex, this.playlist[this.currentIndex]);
  }

  next() {
    if (this.isShuffle) {
      const randomIndex = Math.floor(Math.random() * this.playlist.length);
      this.setTrack(randomIndex);
    } else {
      const nextIndex = (this.currentIndex + 1) % this.playlist.length;
      this.setTrack(nextIndex);
    }
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
    this.setTrack(prevIndex);
  }

  seek(seconds) {
    this.audio.currentTime = seconds;
  }

  setVolume(value) {
    // value 0.0 ~ 1.0
    this.audio.volume = value;
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
  }
}

// シングルトンでエクスポート
export default new Player();

