import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, EventEmitter, Output, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { ParamsSearch } from '../../../paramsSearch';
import { ParamsGrid } from '../shared/params-grid.component';

@Component({
  selector: 'app-params-grid-complex',
  templateUrl: './params-grid-complex.component.html',
  styleUrls: ['./params-grid-complex.component.scss']
})
export class ParamsGridComplexComponent extends ParamsGrid {
  @Output() public paramsListSearch = new EventEmitter();

  paramsComplex: ParamsSearch[] = [];

  visible = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  propertiesChips: any[] = [];

  valueInputSearch;
  valueComparator = '==';
  valueProperty;
  property;

  formParamsComplexGrid: FormGroup;

  @ViewChild('chipInput', { static: false }) chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(protected injector: Injector) { super(injector); }

  onInit() {
  }

  setProperty(event) {
    this.paramSelected = event;
  }

  addItem() {
    this.paramSelected.value = this.inputSearch.value;
    this.propertiesChips.push(
      {
        shipDisplay: this.paramSelected.property + ': ( ' + this.typeComparator.value + ' ) ' + this.inputSearch.value,
        prop: this.paramSelected.property,
        display: this.paramSelected.head
      });
    this.paramsComplex.push({
      inputParam: this.inputSearch.value,
      typeCompare: this.typeComparator.value,
      property: this.paramSelected.property
    });
    this.removePropertyAdd(this.paramSelected.property);
    this.valueProperty = this.paramSelected;
    this.inputSearch.setValue('');
    this.paramsListSearch.emit(this.paramsComplex);
    this.property = this.paramSelected;
  }

  removePropertyAdd(prop: string): void {
    const index = this.paramGrid.findIndex(_ => _.property === prop);
    this.paramGrid.splice(index, 1);
  }

  remove(propRemove): void {
    const index = this.propertiesChips.indexOf(propRemove);

    if (index >= 0) {
      this.paramGrid.push({ property: this.propertiesChips[index].prop, head: this.propertiesChips[index].display });
      this.clear.emit(this.paramGrid[index].property);
      this.propertiesChips.splice(index, 1);
      this.paramsComplex.splice(index, 1);
    }

    this.paramsListSearch.emit(this.paramsComplex);
    const indexP = this.paramGrid.findIndex(_ => _.property === this.paramSelected.property);
    this.property = this.paramGrid[indexP];
  }

  selectedShip(event): void {
    this.propertiesChips.push(event.value);
    this.chipInput.nativeElement.value = '';
  }
}
