import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, getResText, getResClass, Request, getResLikes } from "../../game";
import SimpleDom from "../../simple-dom";
import { BUNDLE_INDEX, ID_NONE, ID_404, CREATURES, CLASSES, COLORS } from "../../constants";

export default class LastRequestCard extends BasicComponent {
  header: SimpleDom;
  reqClass?: SimpleDom;
  reqColor?: SimpleDom;
  reqCreature: SimpleDom;
  resClass?: SimpleDom;
  resColor?: SimpleDom;
  resCreature: SimpleDom;
  
  constructor(req: Request) {
    super('div');
    this.dom.class('request-card last');
    // state text
    const stateText = new SimpleDom('div');
    stateText
      .text('Last Request')
      .class('state');
    this.dom.append(stateText);
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
    // class col
    if (req.reqClassId !== ID_NONE) {
      const classCol = new SimpleDom('div');
      classCol.class('col');
      this.reqClass = new SimpleDom('span');
      this.reqClass.text(getResText(CLASSES, req.reqClassId))
      this.resClass = new SimpleDom('div');
      this.resClass
        .append(getResLikes(CLASSES, req.reqClassId, req.resClassId, false))
        .class(req.reqClassId === req.resClassId ? 'res correct' : 'res wrong');
      classCol.append(this.reqClass);
      classCol.append(this.resClass);
      content.append(classCol);
    }
    // color col
    if (req.reqColorId !== ID_NONE) {
      const colorCol = new SimpleDom('div');
      colorCol.class('col');
      this.reqColor = new SimpleDom('span');
      this.reqColor.text(getResText(COLORS, req.reqColorId))
      this.resColor = new SimpleDom('span');
      this.resColor
        .append(getResLikes(COLORS, req.reqColorId, req.resColorId, false))
        .class(req.reqColorId === req.resColorId ? 'res correct' : 'res wrong');
      colorCol.append(this.reqColor);
      colorCol.append(this.resColor);
      content.append(colorCol);
    }
    // creature col
    const creatureCol = new SimpleDom('div');
    creatureCol.class('col');
    this.reqCreature = new SimpleDom('span');
    this.reqCreature.text(getResText(CREATURES, req.reqCreatureId));
    this.resCreature = new SimpleDom('span');
    this.resCreature
      .append(getResLikes(CREATURES, req.reqCreatureId, req.resCreatureId, true))
      .class(req.reqCreatureId === req.resCreatureId ? 'res correct' : (req.resCreatureId === ID_404 ? 'res not-found' : 'res wrong'));
    creatureCol.append(this.reqCreature);
    creatureCol.append(this.resCreature);
    content.append(creatureCol);
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
        class: 'not-found',
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
