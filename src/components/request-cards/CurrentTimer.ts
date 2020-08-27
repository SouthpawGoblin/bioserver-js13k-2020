import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, isChanged } from "../../game";
import './current-timer.scss';

export default class CurrentTimer extends BasicComponent {
  counting: boolean;
  elapsedTime: number;
  paused: boolean;
  animId?: number;

  static lastTime = 0;
  
  constructor() {
    super('div');
    this.dom.class('current-timer');
    this.counting = true;
    this.elapsedTime = 0;
    this.paused = false;
    this.animId = requestAnimationFrame(this.countLoop);
  }

  changeColor = (ratio: number) => {
    if (ratio < 0.33) {
      this.dom.class('current-timer green');
    } else if (ratio >= 0.33 && ratio < 0.67) {
      this.dom.class('current-timer yellow');
    } else {
      this.dom.class('current-timer red');
    }
  }

  countLoop = (time: number) => {
    const deltaTime = CurrentTimer.lastTime ? time - CurrentTimer.lastTime : time;
    CurrentTimer.lastTime = time;
    if (this.counting) {
      if (!this.paused) {
        this.elapsedTime += deltaTime;
        const ratio = this.elapsedTime / Game.state!.timeout;
        this.dom.getDom().style.width = `${ratio * 100}%`;
        this.changeColor(ratio);
        if (this.elapsedTime >= Game.state!.timeout) {
          // timeout, transfer to next turn
          this.animId && cancelAnimationFrame(this.animId);
          Game.nextTurn();
        }
      }
      this.animId = requestAnimationFrame(this.countLoop);
    }
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'paused')) {
      this.paused = Game.state!.paused;
    }
  }

  remove() {
    this.counting = false;
    super.remove();
  }
}
