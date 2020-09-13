import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, getResText, getResClass, Request, getResLikes } from "../../game";
import SD, { sd } from "../../simple-dom";
import { BUNDLE_INDEX, ID_NONE, ID_404, CREATURES, CLASSES, COLORS } from "../../constants";
import { makeReqClassDom, makeReqColorDom, makeReqCreatureDom } from "./util";

export default class LastRequestCard extends BasicComponent {
  header: SD;
  reqClass?: SD;
  reqColor?: SD;
  reqCreature: SD;
  resClass?: SD;
  resColor?: SD;
  resCreature: SD;
  
  constructor(req: Request) {
    super('div');
    this.dom.cls('request-card last');
    // state text
    const stateText = sd('div')
      .tt('Last Request')
      .cls('state');
    this.dom.apd(stateText);
    // header
    this.header = sd('div')
      .cls('header');
    const reqNo = sd('span')
      .tt(`Request No.${req.id}`);
    const reqStatus = sd('span');
    const result = this.getReqStatusAndClass(req.reqCreatureId, req.resCreatureId);
    reqStatus
      .tt(result.status)
      .cls(result.class);
    this.header.apd(reqNo);
    this.header.apd(reqStatus);
    this.dom.apd(this.header);
    // content
    const content = sd('div')
      .cls('content');
    this.dom.apd(content);
    // class col
    if (req.reqClassId !== ID_NONE) {
      const classCol = sd('div')
        .cls('col');
      this.reqClass = makeReqClassDom(req);
      this.resClass = sd('div')
        .apd(getResLikes(CLASSES, req.reqClassId, req.resClassId, false))
        .cls(req.reqClassId === req.resClassId ? 'res correct' : 'res wrong');
      classCol.apd(this.reqClass);
      classCol.apd(this.resClass);
      content.apd(classCol);
    }
    // color col
    if (req.reqColorId !== ID_NONE) {
      const colorCol = sd('div')
        .cls('col');
      this.reqColor = makeReqColorDom(req);
      this.resColor = sd('span')
        .apd(getResLikes(COLORS, req.reqColorId, req.resColorId, false))
        .cls(req.reqColorId === req.resColorId ? 'res correct' : 'res wrong');
      colorCol.apd(this.reqColor);
      colorCol.apd(this.resColor);
      content.apd(colorCol);
    }
    // creature col
    const creatureCol = sd('div')
      .cls('col');
    this.reqCreature = makeReqCreatureDom(req);
    this.resCreature = sd('span')
      .apd(getResLikes(CREATURES, req.reqCreatureId, req.resCreatureId, true))
      .cls(req.reqCreatureId === req.resCreatureId ? 'res correct' : (req.resCreatureId === ID_404 ? 'res not-found' : 'res wrong'));
    creatureCol.apd(this.reqCreature);
    creatureCol.apd(this.resCreature);
    content.apd(creatureCol);
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
