import { CLASSES, COLORS, CREATURES } from "../../constants";
import { getResText, Request } from "../../game";
import SD, { sd } from "../../simple-dom";

export const makeReqClassDom = (req: Request): SD => {
  const reqClass = sd('span')
    .tt(getResText(CLASSES, req.reqClassId)).cls('req')
  const classProd = CLASSES.find(c => c.id === req.reqClassId)
  const realDom = reqClass.getDom()
  realDom.style.color = classProd!.color || '#000000'
  realDom.style.textShadow = '1px 1px #aaaaaa'
  return reqClass
}

export const makeReqColorDom = (req: Request): SD => {
  const reqColor = sd('span')
    .tt(getResText(COLORS, req.reqColorId)).cls('req')
  const colorProd = COLORS.find(c => c.id === req.reqColorId)
  reqColor.getDom().style.background = colorProd!.color || '#ffffff'
  return reqColor
}

export const makeReqCreatureDom = (req: Request): SD => {
  const reqCreature = sd('span')
    .tt(getResText(CREATURES, req.reqCreatureId)).cls('req');
  const creatureProd = CREATURES.find(c => c.id === req.reqCreatureId)
  reqCreature.getDom().style.background = creatureProd!.color || '#ffffff'
  return reqCreature
}
