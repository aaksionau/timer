import React from "react";
import { WatchMode, IWatch, Props } from "../models/IWatch";
import Watch from "../models/Watch";
import WatchRotator, { IWatchRotator } from "../models/WatchRotator";

interface TimerProps extends Props {
  onReset: () => void;
  defaultMinutes: number;
}

class Timer extends React.Component<TimerProps> {
  public audio =
    "http://www.orangefreesounds.com/wp-content/uploads/2017/10/Twin-bell-alarm-clock-ringing-short.mp3?_=1";
  public state = {
    currentMode: WatchMode[0],
    display: `${this.props.sessionDuration}:00`
  };
  private timer: NodeJS.Timeout;
  constructor(props: TimerProps) {
    super(props);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }
  private rotator: WatchRotator | undefined;
  public componentWillUnmount() {
    clearInterval(this.timer);
  }
  private startStopTimer(e: React.MouseEvent<HTMLButtonElement>) {
    if (!this.rotator) {
      const sessionWatch = new Watch(
        WatchMode.Session,
        this.props.sessionDuration
      );
      const breakWatch = new Watch(WatchMode.Break, this.props.breakDuration);
      this.rotator = new WatchRotator([sessionWatch, breakWatch]);
      this.runWatch(this.rotator);
      this.tickWatch(this.rotator);
    } else if (!this.rotator.getWatch().onPause) {
      clearInterval(this.timer);
      this.rotator.getWatch().onPause = true;
    } else if (this.rotator.getWatch().onPause) {
      this.rotator.getWatch().onPause = false;
      this.tickWatch(this.rotator);
    }
  }
  private tickWatch(watchRotator: IWatchRotator) {
    this.timer = setInterval(() => {
      this.runWatch(watchRotator);
    }, 1000);
  }
  private runWatch(watchRotator: IWatchRotator) {
    const watch = watchRotator.getWatch();
    this.setState({
      currentMode: watch.mode,
      display: watch.getCurrentTime()
    });
    watch.tick();
  }
  private resetTimer(e: React.MouseEvent<HTMLButtonElement>) {
    clearInterval(this.timer);
    if (this.rotator) {
      this.rotator.removeWatches();
      this.rotator = undefined;
    }
    this.setState({
      display: `${this.props.defaultMinutes}:00`,
      currentMode: "Session"
    });
    this.props.onReset();
    this.playBeep();
  }
  private playBeep() {
    const audioPlayer = document.getElementById("beep") as HTMLAudioElement;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  public render() {
    return (
      <div>
        <div id="clock" className="col-12-12 clock">
          <div className="time-left">
            <div className="stop-play">
              <button
                className="btn"
                id="start_stop"
                onClick={this.startStopTimer}
              >
                <i className="fas fa-play fa-2x" />
                <i className="fas fa-pause fa-2x" />
              </button>
              <button className="btn" id="reset" onClick={this.resetTimer}>
                <i className="fas fa-power-off fa-2x" />
              </button>
            </div>
            <h2 id="timer-label">{this.state.currentMode}</h2>
            <span id="time-left">{this.state.display}</span>
          </div>
          <audio className="clip" preload="auto" src={this.audio} id="beep" />
        </div>
      </div>
    );
  }
}
export default Timer;
