import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, getCardText, getCardClass, Request } from "../../game";
import SimpleDom from "../../simple-dom";
import { BUNDLE_INDEX } from "../../constants";

export default class NextRequestCard extends BasicComponent {
  header: SimpleDom;
  reqClass: SimpleDom;
  reqColor: SimpleDom;
  reqCreature: SimpleDom;
  
  constructor(req: Request) {
    super('div');
    this.dom.class('request-card next');
    // header
    this.header = new SimpleDom('div');
    this.header.class('header');
    const reqNo = new SimpleDom('span');
    reqNo.text(`Request No.${req.id}`);
    const reqStatus = new SimpleDom('span');
    reqStatus
      .text('Pending')
      .class('pending');
    this.header.append(reqNo);
    this.header.append(reqStatus);
    this.dom.append(this.header);
    // content
    const content = new SimpleDom('div');
    content.class('content');
    this.dom.append(content);
    // req row
    const reqRow = new SimpleDom('div');
    reqRow.class('req-row');
    this.reqClass = new SimpleDom('span');
    this.reqColor = new SimpleDom('span');
    this.reqCreature = new SimpleDom('span');
    reqRow.append(this.reqClass);
    reqRow.append(this.reqColor);
    reqRow.append(this.reqCreature);
    this.reqClass
      .text(getCardText(Game.classes, req.reqClassId))
      .class(getCardClass(BUNDLE_INDEX.CLASSES));
    this.reqColor
      .text(getCardText(Game.colors, req.reqColorId))
      .class(getCardClass(BUNDLE_INDEX.COLORS));
    this.reqCreature.text(getCardText(Game.creatures, req.reqCreatureId));
    content.append(reqRow);
  }
}
