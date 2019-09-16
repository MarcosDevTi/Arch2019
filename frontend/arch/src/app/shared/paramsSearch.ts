export class ParamsSearch {
  inputSearch: string;
  typeComparator: string;
  property: string;

  static fromJson(jsonData: any): ParamsSearch {
    return Object.assign(new ParamsSearch(), jsonData);
  }
}
