import './refresh-bonus-notion.scss';
import BasicComponent from './Basic';
import { GameCustomEventDetail, getLikeDom, isChanged } from '../game';
import SD, { sd } from '../simple-dom';

export default class RefreshBonusNotion extends BasicComponent {
  text1?: SD;
  likeDom?: SD;
  text2?: SD;

  constructor() {
    super('div');
    this.dom.cls('refresh-bonus-notion');
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'likesRequiredForBonusRefresh')) {
      this.text1 && this.text1.getDom().remove()
      this.text2 && this.text2.getDom().remove()
      this.likeDom && this.likeDom.getDom().remove()

      this.text1 = sd('span').tt('Get ')
      this.dom.apd(this.text1)
      this.likeDom = getLikeDom(String(detail.newState.likesRequiredForBonusRefresh), 1.5, true)
      this.likeDom.getDom().style.fontSize = '2rem'
      this.likeDom.getDom().style.fontWeight = 'bold'
      this.dom.apd(this.likeDom)
      this.text2 = sd('span').tt(' in one request to earn a bonus refresh!')
      this.dom.apd(this.text2);
    }
  }
}
