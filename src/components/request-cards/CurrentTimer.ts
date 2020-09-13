import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, isChanged } from "../../game";
import { ID_NONE, LIKES_NEEDED } from "../../constants";

export default class CurrentTimer extends BasicComponent {
  timeout: number;
  counting: boolean;
  elapsedTime: number;
  paused: boolean;
  animId?: number;

  static lastTime = 0;
  
  constructor(timeout: number) {
    super('div');
    this.dom.cls('current-timer');
    this.timeout = timeout;
    this.counting = true;
    this.elapsedTime = 0;
    this.paused = false;
    this.animId = requestAnimationFrame(this.countLoop);
  }

  changeColor = (ratio: number) => {
    if (ratio < 0.33) {
      this.dom.cls('current-timer green');
    } else if (ratio >= 0.33 && ratio < 0.67) {
      this.dom.cls('current-timer yellow');
    } else {
      this.dom.cls('current-timer red');
    }
  }

  countLoop = (time: number) => {
    const deltaTime = CurrentTimer.lastTime ? time - CurrentTimer.lastTime : 0;
    CurrentTimer.lastTime = time;
    if (this.counting) {
      if (!this.paused) {
        this.elapsedTime += deltaTime;
        const ratio = this.elapsedTime / this.timeout;
        this.dom.getDom().style.width = `${ratio * 100}%`;
        this.changeColor(ratio);
        if (this.elapsedTime >= this.timeout) {
          // timeout, transfer to next turn
          this.animId && cancelAnimationFrame(this.animId);
          this.counting = false
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
    if (isChanged(detail, 'currentRequest')) {
      if (detail.newState.currentRequest.resCreatureId !== ID_NONE) {
        this.paused = true;
      }
    }
    if (isChanged(detail, 'turnCount')) {
      this.paused = false;
    }
    if (isChanged(detail, 'likes')) {
      if (detail.newState.likes >= LIKES_NEEDED) {
        this.paused = true;
        this.counting = false;
      }
    }
  }

  remove() {
    this.counting = false;
    super.remove();
  }
}
