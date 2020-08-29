import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, isChanged, getCardText, getCardClass, Request } from "../../game";
import SimpleDom from "../../simple-dom";
import CurrentTimer from "./CurrentTimer";
import { BUNDLE_INDEX, CREATURES, CLASSES, COLORS } from "../../constants";

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
    this.reqClass
      .text(getCardText(CLASSES, req.reqClassId))
      .class(getCardClass(BUNDLE_INDEX.CLASSES));
    this.reqColor = new SimpleDom('span');
    this.reqColor
      .text(getCardText(COLORS, req.reqColorId))
      .class(getCardClass(BUNDLE_INDEX.COLORS));
    this.reqCreature = new SimpleDom('span');
    this.reqCreature.text(getCardText(CREATURES, req.reqCreatureId));
    reqRow.append(this.reqClass);
    reqRow.append(this.reqColor);
    reqRow.append(this.reqCreature);
    content.append(reqRow);
    // res row
    const resRow = new SimpleDom('div');
    resRow.class('res-row');
    this.resClass = new SimpleDom('span');
    this.resClass
        .text(getCardText(CLASSES, req.resClassId))
        .class(getCardClass(BUNDLE_INDEX.CLASSES));
    this.resColor = new SimpleDom('span');
    this.resColor
      .text(getCardText(COLORS, req.resColorId))
      .class(getCardClass(BUNDLE_INDEX.COLORS));
    this.resCreature = new SimpleDom('span');
    this.resCreature.text(getCardText(CREATURES, req.resCreatureId));
    resRow.append(this.resClass);
    resRow.append(this.resColor);
    resRow.append(this.resCreature);
    content.append(resRow);
    // timer
    this.add(new CurrentTimer());
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'currentRequest')) {
      if (!detail.oldState) {
        return;
      }
      const oldCR = detail.oldState.currentRequest;
      const newCR = detail.newState.currentRequest;
      if (newCR.resClassId !== oldCR.resClassId) {
        this.resClass.text(getCardText(CLASSES, newCR.resClassId));
      } else if (newCR.resColorId !== oldCR.resColorId) {
        this.resColor.text(getCardText(COLORS, newCR.resColorId));
      } else if (newCR.resCreatureId !== oldCR.resCreatureId) {
        this.resCreature.text(getCardText(CREATURES, newCR.resCreatureId))
      }
    }
  }
}