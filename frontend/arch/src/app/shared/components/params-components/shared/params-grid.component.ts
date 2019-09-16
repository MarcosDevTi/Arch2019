import { ParamsSearch } from '../../../paramsSearch';
import { Injector, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ParamGrid } from './param-grid.model';

export abstract class ParamsGrid implements OnInit {
  @Input() head;
  @Input() paramGrid: ParamGrid[];
  @Output() public paramsSearch = new EventEmitter();
  @Output() public clear = new EventEmitter();
  onOverHead: boolean;
  paramSelected: any;
  comparatorSelected: string;
  comparators: string[];

  formParamsGrid: FormGroup;
  protected formBuilder: FormBuilder;
  constructor(protected injector: Injector) {
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.onInit();
    this.buildFormParamsGrid();
    this.setDefaultComparators();
    this.afterOnInit();
    this.setPropertyDefault();
    this.inputSearch.valueChanges.pipe(debounceTime(500)).subscribe(() => this.valueInputSearchChanges());
  }

  setDefaultComparators() {
    this.comparatorSelected = 'Contains';
    this.typeComparator.setValue('Contains');
  }

  buildFormParamsGrid() {
    this.formParamsGrid = this.formBuilder.group({
      inputSearch: [null, Validators.required],
      typeComparator: [null, Validators.required],
      property: [null, Validators.required]
    });
  }

  setPropertyDefault() {
    if (this.paramGrid.length > 0) {
      this.property.setValue(this.paramGrid[0].property);
    }
  }

  get inputSearch() { return this.formParamsGrid.get('inputSearch'); }
  get typeComparator() { return this.formParamsGrid.get('typeComparator'); }
  get property() { return this.formParamsGrid.get('property'); }

  valueInputSearchChanges() {
    const params = ParamsSearch.fromJson(this.formParamsGrid.value);
    this.paramsSearch.emit(params);
  }

  addSearchParam() {
    this.onOverHead = true;
  }

  sendSearch() {
    const index = this.paramGrid.findIndex(_ => _.property === this.paramSelected.property);
    const params: ParamsSearch = { inputSearch: '', typeComparator: this.comparatorSelected, property: this.paramGrid[index].property };
    this.paramsSearch.emit(params);
  }

  resetParamsInputs() {
    this.comparatorSelected = 'Contains';
  }

  clearProp() {
    const index = this.paramGrid.findIndex(_ => _.property === this.paramSelected.property);

    this.inputSearch.setValue(null);
    this.clear.emit(this.paramGrid[index].property);
    this.onOverHead = false;
  }

  protected abstract onInit();
  protected abstract afterOnInit();
}
