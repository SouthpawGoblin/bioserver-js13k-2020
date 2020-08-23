import BasicComponent from "./Basic";
import './request-queue.scss';
import LastRequestCard from "./request-cards/LastRequestCard";
import CurrentRequestCard from "./request-cards/CurrentRequestCard";
import NextRequestCard from "./request-cards/NextRequestCard";
import { GameCustomEventDetail } from "../game";

export default class RequestQueue extends BasicComponent {
  constructor() {
    super('div');
    this.dom.class('request-queue');
    this.add(new LastRequestCard());
    this.add(new CurrentRequestCard());
    this.add(new NextRequestCard());
  }

  onUpdate(detail: GameCustomEventDetail) {
  }
}