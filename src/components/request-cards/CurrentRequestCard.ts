import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, isChanged, getCardText } from "../../game";
import SimpleDom from "../../simple-dom";
import CurrentTimer from "./CurrentTimer";

export default class CurrentRequestCard extends BasicComponent {
  header: SimpleDom;
  reqClass: SimpleDom;
  reqColor: SimpleDom;
  reqCreature: SimpleDom;
  resClass: SimpleDom;
  resColor: SimpleDom;
  resCreature: SimpleDom;
  
  constructor() {
    super('div');
    this.dom.class('request-card current');
    // header
    this.header = new SimpleDom('div');
    this.header.class('header');
    this.dom.append(this.header);
    // req row
    const reqRow = new SimpleDom('div');
    reqRow.class('row');
    this.reqClass = new SimpleDom('span');
    this.reqColor = new SimpleDom('span');
    this.reqCreature = new SimpleDom('span');
    reqRow.append(this.reqClass);
    reqRow.append(this.reqColor);
    reqRow.append(this.reqCreature);
    this.dom.append(reqRow);
    // res row
    const resRow = new SimpleDom('div');
    resRow.class('row');
    this.resClass = new SimpleDom('span');
    this.resColor = new SimpleDom('span');
    this.resCreature = new SimpleDom('span');
    resRow.append(this.resClass);
    resRow.append(this.resColor);
    resRow.append(this.resCreature);
    this.dom.append(resRow);
    // timer
    this.add(new CurrentTimer());
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'currentRequest')) {
      const {
        id,
        reqClassId,
        reqColorId,
        reqCreatureId,
        resClassId,
        resColorId,
        resCreatureId,
      } = detail.newState.currentRequest;
      this.header.text(`Request No.${id}`);
      this.reqClass.text(getCardText(Game.classes, reqClassId));
      this.reqColor.text(getCardText(Game.colors, reqColorId));
      this.reqCreature.text(getCardText(Game.creatures, reqCreatureId));
      this.resClass.text(getCardText(Game.classes, resClassId));
      this.resColor.text(getCardText(Game.colors, resColorId));
      this.resCreature.text(getCardText(Game.creatures, resCreatureId));
    }
  }
}