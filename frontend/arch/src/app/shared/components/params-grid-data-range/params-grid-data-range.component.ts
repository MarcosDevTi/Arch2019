import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParamsSearch } from '../../paramsSearch';

@Component({
  selector: 'app-params-grid-data-range',
  templateUrl: './params-grid-data-range.component.html',
  styleUrls: ['./params-grid-data-range.component.scss']
})
export class ParamsGridDataRangeComponent implements OnInit {
  @Input() placeHolder;
  //@Output() public paramsSearch = new EventEmitter();
  paramsComplex: ParamsSearch[] = [];
  paramsDates: ParamsSearch[] = [];
  step1 = true;
  gridDataForm: FormGroup;
  idData = 0;
  onOverHead: boolean;

  selectable = true;
  removable = true;
  dates: any[] = [];
  componentVisibility = true;
  dateMin = null;
  dateMax = null;

  comparatorsData = ['min', 'max', 'equals'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildGridDataForm();
  }

  addSearchParam() {
    this.onOverHead = true;
    this.comparatorsData = ['min', 'max', 'equals'];
    this.dates = [];
  }

  clearProp() {
    this.onOverHead = false;
    this.dateMax = null;
    this.dateMin = null;
    this.comparatorsData = ['min', 'max', 'equals'];
    this.firstDateComparator.enable();
  }

  get firstDate() { return this.gridDataForm.get('firstDate'); }
  get firstDateComparator() { return this.gridDataForm.get('firstDateComparator'); }

  buildGridDataForm() {
    this.gridDataForm = this.fb.group({
      firstDate: [],
      firstDateComparator: ['min'],
      secondDate: [],
      property: [null]
    });
  }

  addDate(date: Date) {
    console.log(date);
    const objInsert = {
      id: this.idData,
      display: date,
      comparator: this.firstDateComparator.value,
    };
    const indexComparator = this.comparatorsData.indexOf(this.firstDateComparator.value);
    this.comparatorsData.splice(indexComparator, 1);
    this.handlerComponent();
    this.dates.push(objInsert);
    console.log('data obj', objInsert);
    this.valueInputSearchChanges();
    this.idData = this.idData + 1;
    this.verifyComparator();
    this.verifyDateRange();
  }

  valueInputSearchChanges() {
    console.log('dates', this.dates)
    console.log('first comparator', this.firstDateComparator.value);
    // const params: ParamsSearch = {
    //   inputParam: this.inputSearch.value,
    //   typeCompare: this.typeComparator.value,
    //   property: this.property.value.prop
    // };
    // this.paramsSearch.emit(params);
  }

  buildParams() {
    this.dates.forEach(_ => {
      const param = {
        inputParam: _.display,
        typeCompare: _.comparator,
        property: _.property
      };

      this.paramsDates.push(param);
      console.log('this.paramsDates', this.paramsDates);
    });
  }

  handlerComponent() {
    if (this.comparatorsData.length === 1) {
      this.firstDateComparator.setValue(this.comparatorsData[0]);
      this.firstDate.setValue(null);
      this.componentVisibility = true;
    } else {
      if (this.firstDateComparator.value === 'equals') {
        this.componentVisibility = false;
      } else {
        const indexComparator = this.comparatorsData.indexOf('equals');
        this.comparatorsData.splice(indexComparator, 1);
        this.firstDate.setValue(null);
      }
      if (this.comparatorsData.length === 0) {
        this.componentVisibility = false;
      }
    }
  }

  remove(data) {
    this.comparatorsData.push(data.comparator);
    if (this.comparatorsData.length === 2) {
      this.comparatorsData.push('equals');
    }
    const index = this.dates.indexOf(data);

    this.dates.splice(index, 1);
    this.firstDate.setValue(null);
    this.componentVisibility = true;
    this.verifyComparator();
    this.verifyDateRange();
  }

  verifyDateRange() {
    if (this.dates.length === 1) {
      if (this.dates[0].comparator === 'min') {
        this.dateMin = this.dates[0].display;
        this.dateMax = null;
      } else {
        this.dateMax = this.dates[0].display;
        this.dateMin = null;
      }
    } else {
      this.dateMax = null;
      this.dateMin = null;
    }
  }

  verifyComparator() {
    if (this.comparatorsData.length === 1) {
      this.firstDateComparator.setValue(this.comparatorsData[0]);
      this.firstDateComparator.disable();
    } else {
      this.firstDateComparator.enable();
    }
  }

}
