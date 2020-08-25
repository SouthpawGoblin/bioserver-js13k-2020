import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, isChanged } from "../../game";
import './current-timer.scss';

export default class CurrentTimer extends BasicComponent {
  counting: boolean;
  elapsedTime: number;
  lastTime: number;

  constructor() {
    super('div');
    this.dom.class('current-timer');
    this.counting = false;
    this.elapsedTime = 0;
    this.lastTime = 0;
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
    const deltaTime = this.lastTime ? time - this.lastTime : time;
    this.lastTime = time;
    if (this.counting) {
      this.elapsedTime += deltaTime;
      const ratio = this.elapsedTime / Game.state!.timeout;
      this.dom.getDom().style.width = `${ratio * 100}%`;
      this.changeColor(ratio);
      if (this.elapsedTime >= Game.state!.timeout) {
        // timeout, transfer to next turn
        Game.setState({
          ...Game.state!,
          turnCount: Game.state!.turnCount + 1,
        });
      } else {
      }
    }
    requestAnimationFrame(this.countLoop);
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'turnCount')) {
      this.elapsedTime = 0;
      this.counting = true;
      requestAnimationFrame(this.countLoop);
    }
    if (isChanged(detail, 'paused')) {
      this.counting = !Game.state!.paused;
    }
  }
}