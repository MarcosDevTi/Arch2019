export class Tools {
  static removeItem<T>(list: T[], item, prop = ''): T[] {
    const index = list.findIndex(_ => _[prop] === item);
    return list.splice(index, 1);
  }
}
