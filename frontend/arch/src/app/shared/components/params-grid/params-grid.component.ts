import { ParamsSearch } from './../../paramsSearch';
import {Component, Input, Output, OnInit, } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-params-grid',
  templateUrl: './params-grid.component.html',
  styleUrls: ['./params-grid.component.scss']
})
export class ParamsGridComponent implements OnInit {
  onOverHead: boolean;
  @Input() head;
  @Input() label;
  @Input() property;
  @Input() placeHolder: string;
  @Output() public paramsSearch = new EventEmitter();
  @Output() public clear = new EventEmitter();
  toppings = new FormControl();
  toppingList: string[] = ['Equals', 'Contains'];
  selected = 'Contains';

  formParamsGrid: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.buildFormParamsGrid();
    this.inputSearch.valueChanges.pipe(debounceTime(500)).subscribe(() => this.valueInputSearchChanges());
  }

  buildFormParamsGrid() {
    this.formParamsGrid = this.fb.group({
      inputSearch: [null],
      typeComparator: ['Contains']
    });
  }

  get inputSearch() { return this.formParamsGrid.get('inputSearch'); }
  get typeComparator() { return this.formParamsGrid.get('typeComparator'); }

  addSearchParam() {
    this.onOverHead = true;
  }

  submitForm() {

  }

  valueInputSearchChanges() {
    const params: ParamsSearch = { inputParam: this.inputSearch.value, typeCompare: this.typeComparator.value, property: this.property };
    this.paramsSearch.emit(params);

  }


  sendSearch() {
    const params: ParamsSearch = { inputParam: '', typeCompare: this.selected, property: this.property };
    this.paramsSearch.emit(params);
  }

  resetParamsInputs() {
    this.selected = 'Contains';

  }

  clearProp() {
    this.inputSearch.setValue(null);
    this.clear.emit(this.property);
    this.onOverHead = false;
    //this.resetParamsInputs();
  }
}
