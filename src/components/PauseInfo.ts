import './pause-info.scss';
import BasicComponent from './Basic';
import { GameCustomEventDetail, needsUpdate } from '../game';

export default class PauseInfo extends BasicComponent {
  constructor() {
    super('div');
    this.dom.class('pause-info');
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (needsUpdate(detail, 'paused')) {
      this.dom.text(
        detail.newState.paused
          ? 'Press Space to continue the game.'
          : 'Press Space to pause and do some shopping.'
      );
    }
  }
}
