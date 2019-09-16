import _ from 'lodash';

class Location {
  constructor(dropabble) {
    this.status = this.getStatusFromDroppable(dropabble);
    this.order = this.getOrderFromDroppable(dropabble);
  }

  getStatusFromDroppable(droppable) {
    const results = new RegExp(/(droppable-)(\d+)/).exec(droppable.droppableId);
    const status = _.get(results, '2');
    return Number(status);
  }

  getOrderFromDroppable(droppable) {
    return droppable.index;
  }
}

export default Location;