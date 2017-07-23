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
  @ViewChild("myRadarChart") myRadarChart: UIChart;

  constructor() { }

  ngOnInit() {
    this.chartJSData = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };
  }

  onChangeCompetencyValue(event: Event) {
    console.log(this.competencyValue);
    this.chartJSData.datasets[0].data = [11, 22, 33, 44, 55, 66, 77];
    console.log(this.chartJSData.datasets);
    this.myRadarChart.refresh();
  }

}
