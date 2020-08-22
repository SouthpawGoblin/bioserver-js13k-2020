import BasicComponent from "./Basic";
import SimpleDom from "../simple-dom";
import './header.scss';
import { LIKES_NEEDED } from "../constants";
import { GameCustomEventDetail, needsUpdate } from "../game";

export default class Header extends BasicComponent {
  likes: SimpleDom;
  title: SimpleDom;
  successCount: SimpleDom;
  failCount: SimpleDom;

  constructor() {
    super('header');
    this.dom.class('header');
    
    this.likes = new SimpleDom('div');
    this.likes.class('likes');
    
    this.title = new SimpleDom('div');
    this.title
      .class('title')
      .text('Bio-Server');
    
    const statistics = new SimpleDom('div');
    statistics.class('statistics');
    this.successCount = new SimpleDom('div');
    this.failCount = new SimpleDom('div');
    statistics
      .append(this.successCount)
      .append(this.failCount);

    this.dom
      .append(this.likes)
      .append(this.title)
      .append(statistics);
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (needsUpdate(detail, 'likes')) {
      this.likes.text(`likes: ${detail.newState.likes}/${LIKES_NEEDED}`);
    }
    if (needsUpdate(detail, 'successCount')) {
      this.successCount.text(`success: ${detail.newState.successCount}`);
    }
    if (needsUpdate(detail, 'failCount')) {
      this.failCount.text(`fail: ${detail.newState.failCount}`);
    }
  };
}