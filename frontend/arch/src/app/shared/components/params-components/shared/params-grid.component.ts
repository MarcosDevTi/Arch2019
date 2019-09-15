import { ParamsSearch } from '../../../paramsSearch';
import { Injector, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ParamGrid } from './param-grid.model';

export abstract class ParamsGrid implements OnInit {
  @Input() head;
  @Input() paramGrid: ParamGrid[];
  @Output() public paramsSearch = new EventEmitter();
  @Output() public clear = new EventEmitter();
  onOverHead: boolean;
  paramSelected: any;
  selected;

  formParamsGrid: FormGroup;
  protected formBuilder: FormBuilder;
  constructor(protected injector: Injector) {
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.onInit();
    this.buildFormParamsGrid();
    this.inputSearch.valueChanges.pipe(debounceTime(500)).subscribe(() => this.valueInputSearchChanges());
  }

  buildFormParamsGrid() {
    this.formParamsGrid = this.formBuilder.group({
      inputSearch: [null],
      typeComparator: ['Contains']
    });
  }

  get inputSearch() { return this.formParamsGrid.get('inputSearch'); }
  get typeComparator() { return this.formParamsGrid.get('typeComparator'); }

  valueInputSearchChanges() {
    const index = this.paramGrid.findIndex(_ => _.property === this.paramSelected.property);
    if (this.paramGrid[index]) {
      const params: ParamsSearch = {
        inputParam: this.inputSearch.value, typeCompare: this.typeComparator.value, property: this.paramGrid[index].property
      };
      this.paramsSearch.emit(params);
    }
  }

  addSearchParam() {
    this.onOverHead = true;
  }

  sendSearch() {
    const index = this.paramGrid.findIndex(_ => _.property === this.paramSelected.property);
    const params: ParamsSearch = { inputParam: '', typeCompare: this.selected, property: this.paramGrid[index].property };
    this.paramsSearch.emit(params);
  }

  resetParamsInputs() {
    this.selected = 'Contains';
  }

  clearProp() {
    const index = this.paramGrid.findIndex(_ => _.property === this.paramSelected.property);

    this.inputSearch.setValue(null);
    this.clear.emit(this.paramGrid[index].property);
    this.onOverHead = false;
  }

  protected abstract  onInit();
}
