import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare const AudioContext;
declare const webkitAudioContext;

@Injectable()
export class AudioProvider {

  private TRACK: any = null;
  private AUDIO: any;
  private SOURCE: any;
  private CONTEXT: any = new (AudioContext || webkitAudioContext)();
  private GAIN: any = null;

  constructor(public http: HttpClient) {}

  loadSound(track: string): void {

    this.http.get(track, { responseType: "arraybuffer" })
      .subscribe((arrayBufferContent: any) => {
        this.setUpAudio(arrayBufferContent);
      });
  }

  setUpAudio(bufferedContent: any): void {
    this.CONTEXT.decodeAudioData(bufferedContent, (buffer: any) => {
      this.AUDIO = buffer;
      this.TRACK = this.AUDIO;
      this.playSound(this.TRACK);
    });
  }

  playSound(track: any): void {
    if (!this.CONTEXT.createGain) {
      this.CONTEXT.createGain = this.CONTEXT.createGainNode;
    }
    this.GAIN = this.CONTEXT.createGain();
    this.SOURCE = this.CONTEXT.createBufferSource();
    this.SOURCE.buffer = track;
    this.SOURCE.connect(this.GAIN);
    this.GAIN.connect(this.CONTEXT.destination);

    this.SOURCE.start(0);
  }

  stopSound(): void {
    if (!this.SOURCE.stop) {
      this.SOURCE.stop = this.SOURCE.noteOff;
    }
    this.SOURCE.stop(0);
  }

}
