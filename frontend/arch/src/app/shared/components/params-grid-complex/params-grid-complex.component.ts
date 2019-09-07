import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {ParamsSearch} from '../../paramsSearch';

@Component({
  selector: 'app-params-grid-complex',
  templateUrl: './params-grid-complex.component.html',
  styleUrls: ['./params-grid-complex.component.scss']
})
export class ParamsGridComplexComponent implements OnInit {
  @Input() head;
  @Output() public paramsListSearch = new EventEmitter();
  @Output() public paramsSearch = new EventEmitter();
  @Output() public clear = new EventEmitter();
  paramsComplex: ParamsSearch[] = [];

  onOverHead: boolean;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [];
  properties = [
    {prop: 'Street', display: 'Street'},
    {prop: 'Number', display: 'Number'},
    {prop: 'City', display: 'City'},
    {prop: 'Country', display: 'Country'}
  ];
  propertySelected = this.properties[0];

  valueInputSearch;
  valueComparator = '==';
  valueProperty;

  formParamsComplexGrid: FormGroup;

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  get inputSearch() { return this.formParamsComplexGrid.get('inputSearch'); }
  get typeComparator() { return this.formParamsComplexGrid.get('typeComparator'); }
  get property() { return this.formParamsComplexGrid.get('property'); }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildFormParamsGrid();
    this.property.setValue(this.propertySelected);
    this.inputSearch.valueChanges.pipe(debounceTime(500)).subscribe(() => this.valueInputSearchChanges());
  }

  valueInputSearchChanges() {
    const params: ParamsSearch = {
      inputParam: this.inputSearch.value,
      typeCompare: this.typeComparator.value,
      property: this.property.value.prop
    };
    this.paramsSearch.emit(params);
  }

  buildFormParamsGrid() {
    this.formParamsComplexGrid = this.fb.group({
      inputSearch: [null],
      typeComparator: ['Contains'],
      property: [null]
    });
  }

  addSearchParam() {
    this.onOverHead = true;
  }

  clearProp() {
    this.onOverHead = false;
  }
  addItem() {
    this.fruits.push(
      {
        shipDisplay: this.property.value.prop + ': ( ' + this.typeComparator.value + ' ) ' + this.inputSearch.value,
        prop: this.property.value.prop,
        display: this.property.value.display
      });
    this.paramsComplex.push({
        inputParam: this.inputSearch.value,
        typeCompare: this.typeComparator.value,
        property: this.property.value.prop
      });
    this.removePropertyAdd(this.property.value.prop);
    this.valueProperty = this.properties[0];
    this.inputSearch.setValue('');

    this.paramsListSearch.emit(this.paramsComplex);
    this.property.setValue(this.properties[0]);
  }

  removePropertyAdd(prop: string): void {
    const index = this.properties.findIndex(_ => _.prop === prop);
    this.properties.splice(index, 1);
  }

  // add(event: MatChipInputEvent): void {
  //   // Add fruit only when MatAutocomplete is not open
  //   // To make sure this does not conflict with OptionSelected Event
  //   if (!this.matAutocomplete.isOpen) {
  //     const input = event.input;
  //     const value = event.value;

  //     // Add our fruit
  //     if ((value || '').trim()) {
  //       this.fruits.push(value.trim());
  //     }

  //     // Reset the input value
  //     if (input) {
  //       input.value = '';
  //     }

  //   }
  // }

  remove(fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.properties.push({prop: this.fruits[index].prop, display: this.fruits[index].display});
      this.clear.emit(this.fruits[index].prop);
      this.fruits.splice(index, 1);
      this.paramsComplex.splice(index, 1);

    }

    this.paramsListSearch.emit(this.paramsComplex);
    this.property.setValue(this.properties[0]);

  }

  selected(event): void {
    this.fruits.push(event.value);
    this.fruitInput.nativeElement.value = '';
  }
}
