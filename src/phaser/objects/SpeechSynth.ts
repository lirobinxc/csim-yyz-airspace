import Phaser from 'phaser';
import { PhaserCustomEvents } from '../types/CustomEvents';
import Plane from './Plane/Plane';

export default class SpeechSynth {
  private SpeechSynth!: undefined | SpeechSynthesis;
  private PilotVoice: undefined | SpeechSynthesisVoice;

  constructor() {
    // Init properties
    this.SpeechSynth = window.speechSynthesis;
    this.SpeechSynth.getVoices();
  }

  public getVoices() {
    return this.SpeechSynth?.getVoices();
  }

  public speak(phrase: string, plane: Plane) {
    if (!this.SpeechSynth) {
      console.error('No SpeechSynthesis API is available on your platform.');
      return;
    }

    const utterThis = new SpeechSynthesisUtterance(phrase);

    if (plane.PilotVoice) {
      utterThis.voice = plane.PilotVoice;
      utterThis.rate = 1.5;
    }

    this.SpeechSynth?.speak(utterThis);
  }

  get IS_TALKING() {
    if (this.SpeechSynth) {
      return this.SpeechSynth.speaking;
    }
    return false;
  }
}
