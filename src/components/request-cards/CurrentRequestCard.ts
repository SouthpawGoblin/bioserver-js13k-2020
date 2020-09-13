import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, isChanged, getResText, getResClass, Request } from "../../game";
import SD, { sd } from "../../simple-dom";
import CurrentTimer from "./CurrentTimer";
import { BUNDLE_INDEX, CREATURES, CLASSES, COLORS, ID_NONE, ID_404, LIKES_NEEDED } from "../../constants";
import { makeReqClassDom, makeReqColorDom, makeReqCreatureDom } from "./util";

export default class CurrentRequestCard extends BasicComponent {
  header: SD;
  reqClass?: SD;
  reqColor?: SD;
  reqCreature: SD;
  resClass?: SD;
  resColor?: SD;
  resCreature: SD;
  
  constructor(req: Request) {
    super('div');
    this.dom.cls('request-card current');
    // state text
    const stateText = sd('div')
      .tt('Current Request')
      .cls('state');
    this.dom.apd(stateText);
    // header
    this.header = sd('div')
      .cls('header');
    const reqNo = sd('span')
      .tt(`Request No.${req.id}`);
    const reqStatus = sd('span')
      .tt('Loading')
      .cls('loading');
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
    // timer
    // first ten requests have no time limit
    if (req.id > 10 && req.timeout > 0 && Game.state!.likes < LIKES_NEEDED) {
      this.add(new CurrentTimer(req.timeout));
    }
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'currentRequest')) {
      if (!detail.oldState) {
        return;
      }
      const oldCR = detail.oldState.currentRequest;
      const newCR = detail.newState.currentRequest;
      if (newCR.resClassId !== oldCR.resClassId) {
        this.resClass && this.resClass
          .tt(getResText(CLASSES, newCR.resClassId))
          .cls(getResClass(newCR.reqClassId, newCR.resClassId));
        if (newCR.resClassId !== ID_404 && newCR.resClassId !== ID_NONE) {
          const classProd = CLASSES.find(c => c.id === newCR.resClassId)
          if (this.resClass) {
            const realDom = this.resClass.getDom()
            realDom.style.color = classProd!.color || '#000000'
            realDom.style.textShadow = '1px 1px #aaaaaa'
          }
        }
      } else if (newCR.resColorId !== oldCR.resColorId) {
        this.resColor && this.resColor
          .tt(getResText(COLORS, newCR.resColorId))
          .cls(getResClass(newCR.reqColorId, newCR.resColorId));
        if (newCR.resColorId !== ID_NONE && newCR.resColorId !== ID_404) {
          const colorProd = COLORS.find(c => c.id === newCR.resColorId)
          if (this.resColor) {
            this.resColor.getDom().style.background = colorProd!.color || '#ffffff'
          }
        }
      } else if (newCR.resCreatureId !== oldCR.resCreatureId) {
        this.resCreature
          .tt(getResText(CREATURES, newCR.resCreatureId))
          .cls(getResClass(newCR.reqCreatureId, newCR.resCreatureId));
        if (newCR.resCreatureId !== ID_NONE && newCR.resCreatureId !== ID_404) {
          const creatureProd = CREATURES.find(c => c.id === newCR.resCreatureId)
          if (this.resCreature) {
            this.resCreature.getDom().style.background = creatureProd!.color || '#ffffff'
          }
        }
      }
    }
    if (isChanged(detail, 'systemRefreshToken')) {
      this.reqCreature.tt(getResText(CREATURES, detail.newState.currentRequest.reqCreatureId));
      const creatureProd = CREATURES.find(c => c.id === detail.newState.currentRequest.reqCreatureId)
      this.reqCreature.getDom().style.background = creatureProd!.color || '#ffffff'
    }
  }
}