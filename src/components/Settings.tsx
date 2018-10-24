import React from "react";
import { WatchMode, Props } from "../models/IWatch";
import Timer from "./Timer";

interface State {
  sessionDuration: number;
  breakDuration: number;
}

class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sessionDuration: this.props.sessionDuration,
      breakDuration: this.props.breakDuration
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  private increment(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (!e.currentTarget.dataset.type) {
      return;
    }

    const type: number = Number(e.currentTarget.dataset.type);
    switch (type) {
      case WatchMode.Session:
        this.setState({
          sessionDuration: Math.min(60, this.state.sessionDuration + 1)
        });
        break;
      case WatchMode.Break:
        this.setState({
          breakDuration: Math.min(60, this.state.breakDuration + 1)
        });
        break;
      default:
        break;
    }
  }
  private decrement(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (!e.currentTarget.dataset.type) {
      return;
    }

    const type: number = Number(e.currentTarget.dataset.type);
    switch (type) {
      case WatchMode.Session:
        this.setState({
          sessionDuration: Math.max(1, this.state.sessionDuration - 1)
        });
        break;
      case WatchMode.Break:
        this.setState({
          breakDuration: Math.max(1, this.state.breakDuration - 1)
        });
        break;
      default:
        break;
    }
  }
  private onReset() {
    this.setState({
      sessionDuration: this.props.sessionDuration,
      breakDuration: this.props.breakDuration
    });
  }
  public render() {
    return (
      <div>
        <h1>Pomodoro Clock</h1>
        <div className="settings">
          <div className="col-6-12">
            <p id="break-label">Break Length</p>
            <a
              href=""
              id="break-decrement"
              data-type={WatchMode.Break}
              onClick={this.decrement}
            >
              <i className="fas fa-chevron-down fa-2x" />
            </a>
            <span id="break-length">{this.state.breakDuration}</span>
            <a
              href=""
              id="break-increment"
              data-type={WatchMode.Break}
              onClick={this.increment}
            >
              <i className="fas fa-chevron-up fa-2x" />
            </a>
          </div>
          <div className="col-6-12">
            <p id="session-label">Session Length</p>
            <a
              href=""
              id="session-decrement"
              data-type={WatchMode.Session}
              onClick={this.decrement}
            >
              <i className="fas fa-chevron-down fa-2x" />
            </a>
            <span id="session-length">{this.state.sessionDuration}</span>
            <a
              href=""
              id="session-increment"
              data-type={WatchMode.Session}
              onClick={this.increment}
            >
              <i className="fas fa-chevron-up fa-2x" />
            </a>
          </div>
        </div>
        <Timer
          sessionDuration={this.state.sessionDuration}
          breakDuration={this.state.breakDuration}
          onReset={this.onReset}
          defaultMinutes={this.props.sessionDuration}
        />
      </div>
    );
  }
}
export default Settings;
