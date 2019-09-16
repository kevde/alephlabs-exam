class LocationComparator {
  static isMatched(leftLocation, rightLocation) {
    return leftLocation.status === rightLocation.status && leftLocation.order === rightLocation.order;
  }

  static areStatusSimilar(destinationTask, source, destination) {
    return destinationTask && source.status === destination.status;
  }
}

export default LocationComparator;