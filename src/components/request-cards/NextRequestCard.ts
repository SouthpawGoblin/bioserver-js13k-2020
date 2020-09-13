import BasicComponent from "../Basic";
import Game, { GameCustomEventDetail, getResText, getResClass, Request, isChanged } from "../../game";
import SimpleDom from "../../simple-dom";
import { BUNDLE_INDEX, CREATURES, CLASSES, COLORS, ID_NONE } from "../../constants";

export default class NextRequestCard extends BasicComponent {
  header: SimpleDom;
  reqClass?: SimpleDom;
  reqColor?: SimpleDom;
  reqCreature: SimpleDom;
  resClass?: SimpleDom;
  resColor?: SimpleDom;
  resCreature: SimpleDom;
  
  constructor(req: Request) {
    super('div');
    this.dom.class('request-card next');
    // state text
    const stateText = new SimpleDom('div');
    stateText
      .text('Next Request')
      .class('state');
    this.dom.append(stateText);
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
    // class col
    if (req.reqClassId !== ID_NONE) {
      const classCol = new SimpleDom('div');
      classCol.class('col');
      this.reqClass = new SimpleDom('span');
      this.reqClass.text(getResText(CLASSES, req.reqClassId)).class('req')
      const classProd = CLASSES.find(c => c.id === req.reqClassId)
      const realDom = this.reqClass.getDom()
      realDom.style.color = classProd!.color || '#000000'
      realDom.style.textShadow = '1px 1px #aaaaaa'
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
      this.reqColor.text(getResText(COLORS, req.reqColorId)).class('req')
      const colorProd = COLORS.find(c => c.id === req.reqColorId)
      this.reqColor.getDom().style.background = colorProd!.color || '#ffffff'
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
    this.reqCreature.text(getResText(CREATURES, req.reqCreatureId)).class('req');
    const creatureProd = CREATURES.find(c => c.id === req.reqCreatureId)
    this.reqCreature.getDom().style.background = creatureProd!.color || '#ffffff'
    this.resCreature = new SimpleDom('span');
    this.resCreature
      .text(getResText(CREATURES, req.resCreatureId))
      .class('res blank creature');
    creatureCol.append(this.reqCreature);
    creatureCol.append(this.resCreature);
    content.append(creatureCol);
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'systemRefreshToken')) {
      this.reqCreature.text(getResText(CREATURES, detail.newState.nextRequest.reqCreatureId))
      const creatureProd = CREATURES.find(c => c.id === detail.newState.currentRequest.reqCreatureId)
      this.reqCreature.getDom().style.background = creatureProd!.color || '#ffffff'
    }
  }
}
