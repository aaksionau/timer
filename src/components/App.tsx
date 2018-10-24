import React from "react";
import ReactDOM from "react-dom";
import Settings from "./Settings";

import { Props } from "../models/IWatch";

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  public render() {
    return (
      <Settings
        sessionDuration={this.props.sessionDuration}
        breakDuration={this.props.breakDuration}
      />
    );
  }
}
ReactDOM.render(
  React.createElement(App, {
    sessionDuration: 25,
    breakDuration: 5
  }),
  document.getElementById("clock")
);
