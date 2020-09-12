import { LIKES_NEEDED } from "../constants";
import Game, { GameCustomEventDetail, isChanged } from "../game";
import BasicComponent from "./Basic";

export default class WinListener extends BasicComponent {
  constructor() {
    super('div')
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'likes')) {
      if (detail.newState.likes >= LIKES_NEEDED) {
        Game.win()
      }
    }
  }
}
