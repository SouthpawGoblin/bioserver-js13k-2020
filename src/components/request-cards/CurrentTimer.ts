import BasicComponent from "../Basic";
import { GameCustomEventDetail } from "../../game";
import './current-timer.scss';

export default class CurrentTimer extends BasicComponent {
  constructor() {
    super('div');
    this.dom.class('current-timer');
  }

  onUpdate(detail: GameCustomEventDetail) {

  }
}