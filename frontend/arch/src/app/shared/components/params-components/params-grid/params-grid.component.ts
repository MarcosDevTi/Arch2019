import {Component, Injector, } from '@angular/core';
import { ParamsGrid } from '../shared/params-grid.component';

@Component({
  selector: 'app-params-grid',
  templateUrl: './params-grid.component.html',
  styleUrls: ['./params-grid.component.scss']
})
export class ParamsGridComponent extends ParamsGrid {
  constructor(protected injector: Injector) {
    super(injector);
  }

  onInit() {
    this.comparators = ['Contains', 'Equals'];
    this.paramSelected = this.paramGrid[0];
  }

  afterOnInit() {}
}
