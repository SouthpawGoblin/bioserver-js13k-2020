import BasicComponent from "./Basic";

export default class CurrentRequestCard extends BasicComponent {
  constructor() {
    super('div');
    this.dom.class('last-card');
  }
}