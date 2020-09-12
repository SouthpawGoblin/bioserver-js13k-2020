import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, isChanged, getResText, getResClass, Request } from "../../game";
import SimpleDom from "../../simple-dom";
import CurrentTimer from "./CurrentTimer";
import { BUNDLE_INDEX, CREATURES, CLASSES, COLORS, ID_NONE, ID_404 } from "../../constants";

export default class CurrentRequestCard extends BasicComponent {
  header: SimpleDom;
  reqClass?: SimpleDom;
  reqColor?: SimpleDom;
  reqCreature: SimpleDom;
  resClass?: SimpleDom;
  resColor?: SimpleDom;
  resCreature: SimpleDom;
  
  constructor(req: Request) {
    super('div');
    this.dom.class('request-card current');
    // state text
    const stateText = new SimpleDom('div');
    stateText
      .text('Current Request')
      .class('state');
    this.dom.append(stateText);
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
    // class col
    if (req.reqClassId !== ID_NONE) {
      const classCol = new SimpleDom('div');
      classCol.class('col');
      this.reqClass = new SimpleDom('span');
      this.reqClass.text(getResText(CLASSES, req.reqClassId))
      this.resClass = new SimpleDom('div');
      this.resClass
        .text(getResText(CLASSES, req.resClassId))
        .class(`res blank`);
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
        .text(getResText(COLORS, req.resColorId))
        .class(`res blank`);
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
      .text(getResText(CREATURES, req.resCreatureId))
      .class('res blank creature');
    creatureCol.append(this.reqCreature);
    creatureCol.append(this.resCreature);
    content.append(creatureCol);
    // timer
    // first ten requests have no time limit
    (req.id > 10 && req.timeout > 0) && this.add(new CurrentTimer(req.timeout));
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
          .text(getResText(CLASSES, newCR.resClassId))
          .class(getResClass(newCR.reqClassId, newCR.resClassId));
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
          .text(getResText(COLORS, newCR.resColorId))
          .class(getResClass(newCR.reqColorId, newCR.resColorId));
        if (newCR.resColorId !== ID_NONE && newCR.resColorId !== ID_404) {
          const colorProd = COLORS.find(c => c.id === newCR.resColorId)
          if (this.resColor) {
            this.resColor.getDom().style.background = colorProd!.color || '#ffffff'
          }
        }
      } else if (newCR.resCreatureId !== oldCR.resCreatureId) {
        this.resCreature
          .text(getResText(CREATURES, newCR.resCreatureId))
          .class(getResClass(newCR.reqCreatureId, newCR.resCreatureId));
      }
    }
  }
}