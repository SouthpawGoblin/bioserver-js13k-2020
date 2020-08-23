import BasicComponent from "../Basic";

export default class LastRequestCard extends BasicComponent {
  constructor() {
    super('div');
    this.dom.class('request-card last');
  }
}