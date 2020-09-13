import './pause-info.scss';
import BasicComponent from './Basic';
import { GameCustomEventDetail, isChanged } from '../game';

export default class PauseInfo extends BasicComponent {
  constructor() {
    super('div');
    this.dom.cls('pause-info');
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'paused')) {
      this.dom.tt(
        detail.newState.paused
          ? 'Press [Space] to continue the game.'
          : 'Press [Space] to pause and purchase Upgrades.'
      );
    }
  }
}
