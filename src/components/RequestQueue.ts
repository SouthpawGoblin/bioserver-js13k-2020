import BasicComponent from "./Basic";
import './request-queue.scss';
import LastRequestCard from "./LastRequestCard";
import CurrentRequestCard from "./CurrentRequestCard";
import NextRequestCard from "./NextRequestCard";
import { GameCustomEventDetail, isChanged } from "../game";

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