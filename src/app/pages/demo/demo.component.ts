import { DemoModel } from './../../models/demo-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from "primeng/components/chart/chart";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public chartJSData: any;
  public competencyValue: number;
  public demoData: DemoModel[];
  public filterData: DemoModel[];
  public nameFilter: string;
  @ViewChild("myRadarChart") myRadarChart: UIChart;

  constructor() {
    this.filterData = [];
  }

  ngOnInit() {

    this.chartJSData = {
      labels: ['type1', 'type2', 'type3', 'type4', 'type5'],
    }

    this.demoData = [
      { id: 1, name: "鈴木陽子", birthday: new Date(2017, 7, 1).toDateString(), salary: 5000000, type1: 1100, type2: 2000, type3: 3000, type4: 4000, type5: 5000 },
      { id: 2, name: "Steve Jobs", birthday: new Date(2017, 7, 2).toDateString(), salary: 4000000, type1: 7850, type2: 3100, type3: 3100, type4: 4100, type5: 5100 },
      { id: 3, name: "夏目漱石", birthday: new Date(2017, 7, 3).toDateString(), salary: 6000000, type1: 2452, type2: 1230, type3: 3200, type4: 4200, type5: 5200 },
      { id: 4, name: "코고 세", birthday: new Date(2017, 7, 4).toDateString(), salary: 7000000, type1: 3567, type2: 1300, type3: 3300, type4: 4300, type5: 5300 },
      { id: 5, name: "🍎　🔞", birthday: new Date(2017, 7, 5).toDateString(), salary: 8500000, type1: 4400, type2: 2400, type3: 3410, type4: 4400, type5: 5400 },
      { id: 6, name: "User6", birthday: new Date(2017, 7, 6).toDateString(), salary: 1200000, type1: 150, type2: 5500, type3: 3500, type4: 4500, type5: 5500 },
      { id: 7, name: "User7", birthday: new Date(2017, 7, 7).toDateString(), salary: 3200000, type1: 1500, type2: 2500, type3: 3500, type4: 4500, type5: 5500 },
      { id: 8, name: "User8", birthday: new Date(2017, 7, 8).toDateString(), salary: 900000, type1: 1500, type2: 2500, type3: 3500, type4: 4500, type5: 5500 },
      { id: 9, name: "User9", birthday: new Date(2017, 7, 9).toDateString(), salary: 3820000, type1: 1500, type2: 2500, type3: 5000, type4: 4500, type5: 5500 },
      { id: 10, name: "User10", birthday: new Date(2017, 7, 10).toDateString(), salary: 6789000, type1: 1500, type2: 2500, type3: 3500, type4: 4500, type5: 5500 },
      { id: 11, name: "User11", birthday: new Date(2017, 7, 11).toDateString(), salary: 4400000, type1: 1500, type2: 2500, type3: 1000, type4: 4500, type5: 5500 }
    ];

    this.createChartData();
  }

  onChangeCompetencyValue(event: Event) {
    this.myRadarChart.refresh();
  }

  onTypeValueChanged(event: Event, row: DemoModel, rowIndex: number) {

    console.log(rowIndex);
    const newChartData = [row.type1, row.type2, row.type3, row.type4, row.type5];
    this.chartJSData.datasets[rowIndex].data = newChartData;
    this.myRadarChart.refresh();
  }

  createChartData() {
    let datasets = [];
    for (let v of this.demoData) {
      const _data = [v.type1, v.type2, v.type3, v.type4, v.type5];
      const colors = this.randomRGBColor();
      const BG_COLOR = colors[0];
      const BRD_COLOR = colors[1];
      datasets.push({
        label: v.name,
        backgroundColor: BG_COLOR,
        borderColor: BRD_COLOR,
        pointBackgroundColor: BRD_COLOR,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: BRD_COLOR,
        data: _data
      });
    }
    this.chartJSData.datasets = datasets;
  }

  randomRGBColor(): string[] {
    const R = Math.floor(Math.random() * 255);
    const G = Math.floor(Math.random() * 255);
    const B = Math.floor(Math.random() * 255);
    return [`rgba(${R},${G},${B},0.2)`, `rgba(${R},${G},${B},1)`];
  }

  onDataFilter(event) {
    console.log(this.filterData);
  }

  getFilteredData(key: any) {
    console.log(key.filteredValue);
    // console.log(key);
  }

}
