import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, isChanged, getCardText, getCardClass, Request } from "../../game";
import SimpleDom from "../../simple-dom";
import CurrentTimer from "./CurrentTimer";
import { BUNDLE_INDEX } from "../../constants";

export default class CurrentRequestCard extends BasicComponent {
  header: SimpleDom;
  reqClass: SimpleDom;
  reqColor: SimpleDom;
  reqCreature: SimpleDom;
  resClass: SimpleDom;
  resColor: SimpleDom;
  resCreature: SimpleDom;
  
  constructor(req: Request) {
    super('div');
    this.dom.class('request-card current');
    // header
    this.header = new SimpleDom('div');
    this.header.class('header');
    const reqNo = new SimpleDom('span');
    reqNo.text(`Request No.${req.id}`);
    const reqStatus = new SimpleDom('span');
    reqStatus
      .text('Loading')
      .class('loading');
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
    this.reqClass
      .text(getCardText(Game.classes, req.reqClassId))
      .class(getCardClass(BUNDLE_INDEX.CLASSES));
    this.reqColor
      .text(getCardText(Game.colors, req.reqColorId))
      .class(getCardClass(BUNDLE_INDEX.COLORS));
    this.reqCreature.text(getCardText(Game.creatures, req.reqCreatureId));
    reqRow.append(this.reqClass);
    reqRow.append(this.reqColor);
    reqRow.append(this.reqCreature);
    content.append(reqRow);
    // res row
    const resRow = new SimpleDom('div');
    resRow.class('res-row');
    this.resClass = new SimpleDom('span');
    this.resColor = new SimpleDom('span');
    this.resCreature = new SimpleDom('span');
    this.resClass
        .text(getCardText(Game.classes, req.resClassId))
        .class(getCardClass(BUNDLE_INDEX.CLASSES));
    this.resColor
      .text(getCardText(Game.colors, req.resColorId))
      .class(getCardClass(BUNDLE_INDEX.COLORS));
    this.resCreature.text(getCardText(Game.creatures, req.resCreatureId));
    resRow.append(this.resClass);
    resRow.append(this.resColor);
    resRow.append(this.resCreature);
    content.append(resRow);
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
    }
    if (isChanged(detail, 'turnCount')) {
      
    }
  }
}