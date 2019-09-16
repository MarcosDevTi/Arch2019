import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, EventEmitter, Output, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ParamsSearch } from '../../../paramsSearch';
import { ParamsGrid } from '../shared/params-grid.component';
import { ChipParam } from '../shared/chipParam';
import { Tools } from '../shared/tools';

@Component({
  selector: 'app-params-grid-complex',
  templateUrl: './params-grid-complex.component.html',
  styleUrls: ['./params-grid-complex.component.scss']
})
export class ParamsGridComplexComponent extends ParamsGrid {
  @Output() public paramsListSearch = new EventEmitter();

  @ViewChild('chipInput', { static: false }) chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  propertiesChips: ChipParam[] = [];

  constructor(protected injector: Injector) { super(injector); }

  onInit() { }

  afterOnInit() {
    if (this.paramGrid[0]) {
      this.property.setValue(this.paramGrid[0].property);
    }
  }

  addItem() {
    console.log('add item')
    this.propertiesChips.push(this.addChip());
  }

  addChip(): ChipParam {
    this.removeParamGrid();
    return {
      display: this.property.value + ': ( ' + this.typeComparator.value + ' ) ' + this.inputSearch.value,
      property: this.property.value,
      head: ''
    };
  }

  removeParamGrid() {
    Tools.removeItem(this.paramGrid, this.property.value, 'property');
  }

  removeShip(propRemove): void {
    Tools.removeItem(this.propertiesChips, propRemove);
    console.log('property for clear', propRemove);
    const index = this.paramGrid.findIndex(_ => _.property === propRemove.property);
    this.clear.emit(this.paramGrid[index].property);
  }
}
