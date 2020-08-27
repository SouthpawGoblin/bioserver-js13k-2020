import BasicComponent from "./Basic";
import './request-queue.scss';
import LastRequestCard from "./request-cards/LastRequestCard";
import CurrentRequestCard from "./request-cards/CurrentRequestCard";
import NextRequestCard from "./request-cards/NextRequestCard";
import Game, { GameCustomEventDetail, isChanged } from "../game";
import SimpleDom from "../simple-dom";

export default class RequestQueue extends BasicComponent {
  currentRequest?: CurrentRequestCard;
  nextRequest?: NextRequestCard;
  lastRequest?: LastRequestCard;

  constructor() {
    super('div');
    this.dom.class('request-queue');
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'turnCount')) {
      // refresh request cards when enter new turn
      if (isChanged(detail, 'nextRequest')) {
        this.nextRequest && this.nextRequest.remove();
        this.nextRequest = new NextRequestCard(Game.state!.nextRequest);
        this.add(this.nextRequest);
      }
      if (isChanged(detail, 'currentRequest')) {
        this.currentRequest && this.currentRequest.remove();
        this.currentRequest = new CurrentRequestCard(Game.state!.currentRequest);
        this.add(this.currentRequest);
      }
      if (isChanged(detail, 'lastRequest')) {
        if (Game.state!.lastRequest) {
          document.getElementById('last-req-placeholder')?.remove();
          this.lastRequest && this.lastRequest.remove();
          this.lastRequest = new LastRequestCard(Game.state!.lastRequest!);
          this.add(this.lastRequest);
        } else {
          const placeholder = new SimpleDom('div');
          placeholder
            .id('last-req-placeholder')
            .class('request-card last');
          this.dom.append(placeholder);
        }
      }
    }
  }
}
