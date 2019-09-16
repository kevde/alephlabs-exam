import LocationComparator from './../locations/comparator';

class Task {
  constructor(id, text, status, order) {
    this.id = id;
    this.text = text;
    this.status = status;
    this.order = order;
  }

  isStatusMatched(taskStatus) {
    return this.status === taskStatus;
  }

  isOrderMatched(taskOrder) {
    return this.order === taskOrder;
  }

  isLocationMatched(location) {
    return LocationComparator.isMatched(this, location);
  }

  setLocation(location) {
    this.status = location.status;
    this.order = location.order;
    return this;
  }

  static parse(raw) {
    return new Task(raw.id, raw.text, raw.status, raw.order);
  }
}

export default Task;