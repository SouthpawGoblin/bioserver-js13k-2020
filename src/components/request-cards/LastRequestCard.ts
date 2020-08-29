import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, getCardText, getCardClass, Request } from "../../game";
import SimpleDom from "../../simple-dom";
import { BUNDLE_INDEX, ID_NONE, ID_404, CREATURES, CLASSES, COLORS } from "../../constants";

export default class LastRequestCard extends BasicComponent {
  header: SimpleDom;
  reqClass: SimpleDom;
  reqColor: SimpleDom;
  reqCreature: SimpleDom;
  resClass: SimpleDom;
  resColor: SimpleDom;
  resCreature: SimpleDom;
  
  constructor(req: Request) {
    super('div');
    this.dom.class('request-card last');
    // header
    this.header = new SimpleDom('div');
    this.header.class('header');
    const reqNo = new SimpleDom('span');
    reqNo.text(`Request No.${req.id}`);
    const reqStatus = new SimpleDom('span');
    const result = this.getReqStatusAndClass(req.reqCreatureId, req.resCreatureId);
    reqStatus
      .text(result.status)
      .class(result.class);
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
      .text(getCardText(CLASSES, req.reqClassId))
      .class(getCardClass(BUNDLE_INDEX.CLASSES));
    this.reqColor
      .text(getCardText(COLORS, req.reqColorId))
      .class(getCardClass(BUNDLE_INDEX.COLORS));
    this.reqCreature.text(getCardText(CREATURES, req.reqCreatureId));
    content.append(reqRow);
    // res row
    const resRow = new SimpleDom('div');
    resRow.class('res-row');
    this.resClass = new SimpleDom('span');
    this.resColor = new SimpleDom('span');
    this.resCreature = new SimpleDom('span');
    resRow.append(this.resClass);
    resRow.append(this.resColor);
    resRow.append(this.resCreature);
    this.resClass
      .text(getCardText(CLASSES, req.resClassId))
      .class(getCardClass(BUNDLE_INDEX.CLASSES));
    this.resColor
      .text(getCardText(COLORS, req.resColorId))
      .class(getCardClass(BUNDLE_INDEX.COLORS));
    this.resCreature.text(getCardText(CREATURES, req.resCreatureId));
    content.append(resRow);
  }

  getReqStatusAndClass(reqCreatureId: number, resCreatureId: number): {
    status: string;
    class: string;
  } {
    if (resCreatureId === ID_NONE) {
      return {
        status: 'Timeout',
        class: 'error',
      };
    } else if (resCreatureId === ID_404) {
      return {
        status: 'Not Found',
        class: 'error',
      };
    } else if (resCreatureId === reqCreatureId) {
      return {
        status: 'Success',
        class: 'success',
      };
    } else {
      return {
        status: 'Error',
        class: 'error',
      };
    }
  }
}
