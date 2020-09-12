import './refresh-bonus-notion.scss';
import BasicComponent from './Basic';
import { GameCustomEventDetail, getLikeDom, isChanged } from '../game';
import SimpleDom from '../simple-dom';

export default class RefreshBonusNotion extends BasicComponent {
  text1?: SimpleDom;
  likeDom?: SimpleDom;
  text2?: SimpleDom;

  constructor() {
    super('div');
    this.dom.class('refresh-bonus-notion');
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'likesRequiredForBonusRefresh')) {
      this.text1 && this.text1.getDom().remove()
      this.text2 && this.text2.getDom().remove()
      this.likeDom && this.likeDom.getDom().remove()

      this.text1 = (new SimpleDom('span')).text('Get ')
      this.dom.append(this.text1)
      this.likeDom = getLikeDom(String(detail.newState.likesRequiredForBonusRefresh), 1.5, true)
      this.likeDom.getDom().style.fontSize = '2rem'
      this.likeDom.getDom().style.fontWeight = 'bold'
      this.dom.append(this.likeDom)
      this.text2 = (new SimpleDom('span')).text(' in one request to earn a bonus refresh!')
      this.dom.append(this.text2);
    }
  }
}
