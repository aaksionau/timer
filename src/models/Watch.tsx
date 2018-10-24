import { IWatch, WatchMode } from "./IWatch";

class Watch implements IWatch {
  constructor(mode: WatchMode, minutes: number) {
    this.mode = WatchMode[mode];
    this.minutes = minutes;
    this.minutesInSeconds = minutes * 60;
    this.currentTime = this.minutesInSeconds;
  }
  public minutes: number;
  public mode: string;
  public isDone: boolean = false;
  public onPause: boolean = false;

  public tick() {
    this.currentTime = this.currentTime - 1;
    if (this.currentTime === -1) {
      this.isDone = true;
      const audioPlayer = document.getElementById("beep") as HTMLAudioElement;
      audioPlayer.play();
      this.currentTime = this.minutesInSeconds;
    }
  }
  public getCurrentTime(): string {
    const seconds = this.currentTime % 60;
    const minutes = (this.currentTime - seconds) / 60;
    return `${this.addZeros(minutes)}:${this.addZeros(seconds)}`;
  }
  private minutesInSeconds: number;
  private currentTime: number;
  private addZeros(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}

export default Watch;
