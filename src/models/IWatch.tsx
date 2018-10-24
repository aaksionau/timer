export enum WatchMode {
  Session,
  Break
}
export interface Props {
  sessionDuration: number;
  breakDuration: number;
}

export interface IWatch {
  mode: string;
  minutes: number;
  isDone: boolean;
  onPause: boolean;
  tick: () => void;
  getCurrentTime: () => string;
}
