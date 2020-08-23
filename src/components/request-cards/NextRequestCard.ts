import BasicComponent from "../Basic";

export default class NextRequestCard extends BasicComponent {
  constructor() {
    super('div');
    this.dom.class('request-card next');
  }
}