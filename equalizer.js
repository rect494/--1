// equalizer.js
class Equalizer {
  constructor(audioContext, audioElement) {
    this.audioCtx = audioContext;
    this.audioElement = audioElement;

    // AudioElementをMediaElementSourceに接続
    this.source = this.audioCtx.createMediaElementSource(this.audioElement);

    // 各周波数帯のBiquadFilterを作成
    this.bass = this.audioCtx.createBiquadFilter();
    this.bass.type = 'lowshelf';
    this.bass.frequency.value = 200;

    this.mid = this.audioCtx.createBiquadFilter();
    this.mid.type = 'peaking';
    this.mid.frequency.value = 1000;

    this.treble = this.audioCtx.createBiquadFilter();
    this.treble.type = 'highshelf';
    this.treble.frequency.value = 5000;

    // 接続順: source -> bass -> mid -> treble -> destination
    this.source.connect(this.bass);
    this.bass.connect(this.mid);
    this.mid.connect(this.treble);
    this.treble.connect(this.audioCtx.destination);

    // 初期値
    this.setBass(0);
    this.setMid(0);
    this.setTreble(0);
  }

  setBass(value) {
    // value は -12 〜 +12 dB
    this.bass.gain.value = value;
  }

  setMid(value) {
    this.mid.gain.value = value;
  }

  setTreble(value) {
    this.treble.gain.value = value;
  }

  getCurrentValues() {
    return {
      bass: this.bass.gain.value,
      mid: this.mid.gain.value,
      treble: this.treble.gain.value,
    };
  }
}

export default Equalizer;

