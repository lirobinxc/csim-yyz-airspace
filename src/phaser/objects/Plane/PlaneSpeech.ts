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
    plane.scene.add.existing(this);

    // Init properties
    this.Plane = plane;
    this.IS_TALKING = false;
    this.SpeechSynth = window.speechSynthesis || undefined;

    this.SpeechSynth.getVoices();
    this.setPilotVoice();
  }

  preUpdate() {
    this.IS_TALKING = this.SpeechSynth?.speaking || false;

    this.setPilotVoice();
  }

  public speak(phrase: string) {
    if (!this.SpeechSynth) {
      console.error('No SpeechSynthesis API is available on your platform.');
      return;
    }

    const utterThis = new SpeechSynthesisUtterance(phrase);

    if (this.PilotVoice) {
      utterThis.voice = this.PilotVoice;
      utterThis.rate = 1.6;
    }

    this.SpeechSynth?.speak(utterThis);
  }

  private setPilotVoice() {
    if (this.PilotVoice) return;
    if (this.SpeechSynth?.onvoiceschanged === undefined) return;

    const voices = this.SpeechSynth.getVoices();

    const engVoices = voices.filter(
      (voice) =>
        voice.lang[0] === 'e' &&
        voice.lang[1] === 'n' &&
        voice.name !== 'Google US English' &&
        voice.name !== 'Google UK English Female' &&
        voice.name !== 'Google UK English Male'
    );

    console.log(engVoices);

    this.PilotVoice = engVoices[Phaser.Math.Between(0, voices.length - 1)];
    console.log(this.PilotVoice);
  }
}
