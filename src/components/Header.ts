import BasicComponent from "./Basic";
import SD, { sd } from "../simple-dom";
import './header.scss';
import { LIKES_NEEDED } from "../constants";
import { GameCustomEventDetail, isChanged, getLikeDom } from "../game";

export default class Header extends BasicComponent {
  likes: SD;
  title: SD;
  successCount: SD;
  failCount: SD;

  constructor() {
    super('header');
    this.dom.cls('header');
    
    this.likes = sd('div').cls('likes');
    
    this.title = sd('div')
      .cls('title')
      .tt('Bio-Server');
    
    const statistics = sd('div')
      .cls('statistics');
    this.successCount = sd('div');
    this.failCount = sd('div');
    statistics
      .apd(this.successCount)
      .apd(this.failCount);

    this.dom
      .apd(this.likes)
      .apd(this.title)
      .apd(statistics);
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'likes')) {
      this.likes.getDom().children.length && this.likes.getDom().children.item(0)?.remove();
      this.likes.apd(getLikeDom(`: ${detail.newState.likes}/${LIKES_NEEDED}`));
      // this.likes.text(`likes: ${detail.newState.likes}/${LIKES_NEEDED}`);
    }
    if (isChanged(detail, 'successCount')) {
      this.successCount.tt(`success: ${detail.newState.successCount}`);
    }
    if (isChanged(detail, 'failCount')) {
      this.failCount.tt(`fail: ${detail.newState.failCount}`);
    }
  };
}