import {Component, Injector, } from '@angular/core';
import { ParamsGrid } from '../shared/params-grid.component';

@Component({
  selector: 'app-params-grid',
  templateUrl: './params-grid.component.html',
  styleUrls: ['./params-grid.component.scss']
})
export class ParamsGridComponent extends ParamsGrid {

  comparatos: string[] = ['Equals', 'Contains'];

  constructor(protected injector: Injector) {
    super(injector);
    this.selected = 'Contains';
  }

  onInit() {}
}
