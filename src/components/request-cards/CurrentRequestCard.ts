import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, isChanged, getResText, getResClass, Request } from "../../game";
import SimpleDom from "../../simple-dom";
import CurrentTimer from "./CurrentTimer";
import { BUNDLE_INDEX, CREATURES, CLASSES, COLORS } from "../../constants";

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
    if (Game.state?.inventory.includes(BUNDLE_INDEX.CLASSES)) {
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
    if (Game.state?.inventory.includes(BUNDLE_INDEX.COLORS)) {
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
      .class('res blank');
    creatureCol.append(this.reqCreature);
    creatureCol.append(this.resCreature);
    content.append(creatureCol);
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
        this.resClass!
          .text(getResText(CLASSES, newCR.resClassId))
          .class(getResClass(newCR.reqClassId, newCR.resClassId));
      } else if (newCR.resColorId !== oldCR.resColorId) {
        this.resColor!
          .text(getResText(COLORS, newCR.resColorId))
          .class(getResClass(newCR.reqColorId, newCR.resColorId));
      } else if (newCR.resCreatureId !== oldCR.resCreatureId) {
        this.resCreature
          .text(getResText(CREATURES, newCR.resCreatureId))
          .class(getResClass(newCR.reqCreatureId, newCR.resCreatureId));
      }
    }
  }
}