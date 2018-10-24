import { IWatch } from "./IWatch";

interface IWatchRotator {
  getWatch: () => IWatch;
  removeWatches: () => void;
}

class WatchRotator implements IWatchRotator {
  private items: IWatch[];
  private currentWatchIndex: number = 0;
  private currentWatch: IWatch;
  constructor(items: IWatch[]) {
    this.items = items;
    this.currentWatch = items[this.currentWatchIndex];
  }
  public getWatch(): IWatch {
    if (this.currentWatch.isDone) {
      this.currentWatchIndex =
        this.currentWatchIndex === this.items.length - 1
          ? 0
          : (this.currentWatchIndex = +1);
      this.currentWatch.isDone = false;
      this.currentWatch = this.items[this.currentWatchIndex];
    }
    return this.currentWatch;
  }
  public removeWatches() {
    while (this.items.length > 0) {
      this.items.pop();
    }
  }
}
export default WatchRotator;
export { IWatchRotator };
