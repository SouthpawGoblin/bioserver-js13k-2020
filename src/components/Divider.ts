import BasicComponent from "./Basic";

import './divider.scss'

export default class Divider extends BasicComponent {
  constructor() {
    super('div')
    this.dom.class('divider')
  }
}
