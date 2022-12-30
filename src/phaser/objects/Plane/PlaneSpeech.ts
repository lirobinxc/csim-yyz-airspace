import Phaser from 'phaser';
import { PhaserCustomEvents } from '../../types/CustomEvents';
import Plane from './Plane';

export class PlaneSpeech extends Phaser.GameObjects.GameObject {
  public IS_TALKING: boolean;

  private Plane: Plane;
  private SpeechSynth: undefined | SpeechSynthesis;
  private PilotVoice: undefined | SpeechSynthesisVoice;

  constructor(plane: Plane) {
    super(plane.scene, 'PlaneSpeech');

    // Init properties
    this.Plane = plane;
    this.IS_TALKING = false;
    this.SpeechSynth = window.speechSynthesis || undefined;

    this.setPilotVoice();
  }

  preUpdate() {
    this.IS_TALKING = this.SpeechSynth?.speaking || false;
  }

  public speak(phrase: string) {
    const utterThis = new SpeechSynthesisUtterance(phrase);

    if (this.PilotVoice) {
      utterThis.voice = this.PilotVoice;
      utterThis.rate = 4;
    }

    this.SpeechSynth?.speak(utterThis);
  }

  private setPilotVoice() {
    if (!this.SpeechSynth) return;
    if (!this.PilotVoice) {
      // const voices = this.SpeechSynth.getVoices().filter(
      //   (voice) =>
      //     voice.lang[0] === 'e' &&
      //     voice.lang[1] === 'n' &&
      //     voice.name !== 'Google US English'
      // );

      const voices = this.SpeechSynth.getVoices();

      // this.PilotVoice = voices[Phaser.Math.Between(0, voices.length - 1)];
      console.log(voices);
    }
  }
}
