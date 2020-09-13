import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, getResText, getResClass, Request, isChanged } from "../../game";
import SD, { sd } from "../../simple-dom";
import { BUNDLE_INDEX, CREATURES, CLASSES, COLORS, ID_NONE } from "../../constants";
import { makeReqClassDom, makeReqColorDom, makeReqCreatureDom } from "./util";

export default class NextRequestCard extends BasicComponent {
  header: SD;
  reqClass?: SD;
  reqColor?: SD;
  reqCreature: SD;
  resClass?: SD;
  resColor?: SD;
  resCreature: SD;
  
  constructor(req: Request) {
    super('div');
    this.dom.cls('request-card next');
    // state text
    const stateText = sd('div')
      .tt('Next Request')
      .cls('state');
    this.dom.apd(stateText);
    // header
    this.header = sd('div')
      .cls('header');
    const reqNo = sd('span')
      .tt(`Request No.${req.id}`);
    const reqStatus = sd('span')
      .tt('Pending')
      .cls('pending');
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
      this.reqClass = makeReqClassDom(req)
      this.resClass = sd('div')
        .tt(getResText(CLASSES, req.resClassId))
        .cls(`res blank`);
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
        .tt(getResText(COLORS, req.resColorId))
        .cls(`res blank`);
      colorCol.apd(this.reqColor);
      colorCol.apd(this.resColor);
      content.apd(colorCol);
    }
    // creature col
    const creatureCol = sd('div')
      .cls('col');
    this.reqCreature = makeReqCreatureDom(req);
    this.resCreature = sd('span')
      .tt(getResText(CREATURES, req.resCreatureId))
      .cls('res blank creature');
    creatureCol.apd(this.reqCreature);
    creatureCol.apd(this.resCreature);
    content.apd(creatureCol);
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'systemRefreshToken')) {
      this.reqCreature.tt(getResText(CREATURES, detail.newState.nextRequest.reqCreatureId))
      const creatureProd = CREATURES.find(c => c.id === detail.newState.currentRequest.reqCreatureId)
      this.reqCreature.getDom().style.background = creatureProd!.color || '#ffffff'
    }
  }
}
