import { Geography } from './../../models/geo-model';
import { Observable } from 'rxjs/Observable';
import { DemoService } from './../../services/demo.service';
import { DemoModel } from './../../models/demo-model';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { UIChart } from "primeng/components/chart/chart";
import * as dataTool from 'echarts/dist/extension/dataTool';
import * as $ from 'jQuery';

declare var echarts: any;

type MyColor = { start: string, end: string }

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public chartJSData: any;
  public competencyValue: number;
  public demoData: Observable<DemoModel[]>;
  public correlationChartData: Observable<Object>
  public filterData: DemoModel[];
  public correlationChart: any;
  public plotChart: any;
  public forceLayoutChart: any;
  public mapChart_JAPAN: any;
  public mapChart_WORLD: any;
  public correlationChartAxisLabel: string[] = ['課題設定', '解決意向', '個人的実行力', '創造性', '論理的思考', '疑う力', '内的価値', 'ヴィジョン', '自己効力', '成長', '興味', '耐性', '感情コントロール', '表現力', '共感・傾聴力', '外交性', '柔軟性', '決断力', '寛容', '影響力の行使', '情熱・宣教力', '組織への働きかけ', '地球市民', '組織へのコミットメント', '誠実さ'];
  public plotChartAxisLabel: string[] = ['課題設定', '解決意向', '個人的実行力', '創造性', '論理的思考', '疑う力', '内的価値', 'ヴィジョン', '自己効力', '成長', '興味', '耐性', '感情コントロール', '表現力', '共感・傾聴力', '外交性', '柔軟性', '決断力', '寛容', '影響力の行使', '情熱・宣教力', '組織への働きかけ', '地球市民', '組織へのコミットメント', '誠実さ', '外向性-内向性', '開放性-保守性', '繊細性-平穏性', '協調性-独立性', '誠実性-快楽性'];
  public plotColorOption: MyColor = { start: "", end: "" };
  public correlationColorOption: MyColor = { start: "", end: "" };
  @ViewChild("myRadarChart") myRadarChart: UIChart;
  constructor(public zone: NgZone, public demoService: DemoService) {
    this.filterData = [];
    //Gridデータ取得
    this.demoData = this.demoService.getAll<DemoModel>(DemoModel, "/demo/demo-data.json", {});
    this.demoData.subscribe(res => {
      this.createChartData(res);
    });

    //Plotチャートデータデータ取得
    this.demoService.getDynamic<Array<Array<number>>>("/demo/plot-chart.json", {}).subscribe(res => {
      this.initPlotChart(res);
    });

    //Correlationデータチャート
    this.demoService.getDynamic<Array<Array<number>>>("/demo/correlation-chart.json", {}).subscribe(res => {
      this.initCorrelationChart(res);
    });

    //ForceLayoutデータチャート
    this.demoService.getDynamic<{ data: Array<any>, links: Array<any>, categories: Array<any> }>("/demo/forcelayout-chart.json", {}).subscribe(res => {
      this.initForceLayoutChart(res);
    });

    //地図(Japan)データ取得
    this.demoService.get<Geography>(Geography, "/geo/japan.json", {}).subscribe(res => {
      this.initJapanMapChart(res);
    });

    //地図(World)データ取得
    this.demoService.get<Geography>(Geography, "/geo/world.json", {}).subscribe(res => {
      this.initWorldMapChart(res);
    });
  }

  ngOnInit() {
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

  createChartData(model: DemoModel[]) {
    this.chartJSData = {
      labels: ['type1', 'type2', 'type3', 'type4', 'type5'],
    }
    let datasets = [];
    console.warn(model);
    model.forEach(v => {
      let _data = [v.type1, v.type2, v.type3, v.type4, v.type5];
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
    });

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
  }

  private initCorrelationChart(model: Array<Array<number>>) {

    let data = model.map(item => [item[1], item[0], item[2]]);

    this.correlationChart = {
      tooltip: {
        position: 'top'
      },
      animation: false,
      grid: {
        height: '70%',
        y: '5%',
        x: '15%'
      },
      xAxis: {
        type: 'category',
        data: this.correlationChartAxisLabel,
        splitArea: {
          show: true
        },
        splitNumber: 1,
        axisLabel: {
          interval: 0,
          show: true,
          rotate: 60,
          textStyle: {
            fontSize: 10
          }
        }
      },
      yAxis: {
        type: 'category',
        data: this.correlationChartAxisLabel,
        splitArea: {
          show: false
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            fontSize: 10
          }
        }
      },
      visualMap: {
        min: 0.0,
        max: 1.0,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        precision: 5,
        inRange: {
          color: ['RGB(63, 167, 220)', 'RGBA(41, 60, 85, 1.00)']
        }
      },
      series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
        label: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 8,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
  }

  private initPlotChart(model: Array<Array<number>>) {
    const data = dataTool.prepareBoxplotData(model);
    this.plotChart = {
      title: [
        {
          text: 'Box Plot',
          left: 'center',
        }
      ],
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: this.plotChartAxisLabel,
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
          show: false
        },
        axisLabel: {
          interval: 0,
          show: true,
          rotate: 60,
          textStyle: {
            fontSize: 10
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: 'km/s minus 299,000',
        splitArea: {
          show: true
        },
        axisLabel: {
          interval: 0,
          show: true,
          rotate: 60,
          textStyle: {
            fontSize: 10
          }
        }
      },
      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          data: data.boxData,
          tooltip: { formatter: (param) => param.name }
        },
        {
          name: 'outlier',
          type: 'scatter',
          data: data.outliers
        }
      ]
    };
  }

  private initForceLayoutChart(model: { data: Array<any>, links: Array<any>, categories: Array<any> }) {
    this.forceLayoutChart = {
      title: {
        text: "コンピテンシーデータ",
        subtext: "A社",
        top: "top",
        left: "center"
      },
      tooltip: {},
      legend: [{
        formatter: function (name) {
          return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
        },
        tooltip: {
          show: true
        },
        selectedMode: 'false',
        bottom: 20
      }],
      animationDuration: 3000,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        name: 'コンピテンシー',
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 100
        },
        data: model.data,
        links: model.links,
        categories: model.categories,
        focusNodeAdjacency: true,
        roam: true,
        label: {
          normal: {

            show: true,
            position: 'top',

          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0,
            type: "solid"
          }
        }
      }]
    };
  }

  private initJapanMapChart(geoData: Geography) {
    echarts.registerMap("Japan", geoData);
    this.mapChart_JAPAN = {
      title: {
        text: 'Grow Coverage',
        subtext: '',
        left: 'right'
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: (params) => {
          const value = (params.value + '').split('.');
          return params.seriesName + '<br/>' + params.value;
        }
      },
      visualMap: {
        left: 'right',
        min: 0,
        max: 25000,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        text: ['High', 'Low'],
        calculable: true
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '利用者数',
          zoom: 1.5,
          aspectScale: 1,
          zoomLock: true,
          type: 'map',
          roam: "move",
          map: 'Japan',
          label: {
            normal: { textStyle: { color: "white" } }
          },
          itemStyle: {
            emphasis: {
              areaColor: "#00385E"
            }
          },
          // 文本位置修正
          textFixed: {
            Alaska: [20, -20]
          },
          data: [
            { "name": "京都府", "value": 2000 },
            { "name": "佐賀県", "value": 1520 },
            { "name": "熊本県", "value": 3000 },
            { "name": "香川県", "value": 401 },
            { "name": "愛知県", "value": 400 },
            { "name": "栃木県", "value": 1090 },
            { "name": "山梨県", "value": 700 },
            { "name": "滋賀県", "value": 500 },
            { "name": "群馬県", "value": 2000 },
            { "name": "宮城県", "value": 1000 },
            { "name": "静岡県", "value": 780 },
            { "name": "茨城県", "value": 890 },
            { "name": "沖縄県", "value": 100 },
            { "name": "山形県", "value": 890 },
            { "name": "和歌山県", "value": 800 },
            { "name": "長崎県", "value": 900 },
            { "name": "秋田県", "value": 510 },
            { "name": "岡山県", "value": 330 },
            { "name": "福岡県", "value": 2980 },
            { "name": "岐阜県", "value": 1400 },
            { "name": "青森県", "value": 800 },
            { "name": "大阪府", "value": 15000 },
            { "name": "長野県", "value": 5000 },
            { "name": "大分県", "value": 760 },
            { "name": "三重県", "value": 411 },
            { "name": "広島県", "value": 390 },
            { "name": "北海道", "value": 500 },
            { "name": "兵庫県", "value": 3020 },
            { "name": "千葉県", "value": 10000 },
            { "name": "富山県", "value": 240 },
            { "name": "東京都", "value": 24000 },
            { "name": "埼玉県", "value": 2090 },
            { "name": "山口県", "value": 1200 },
            { "name": "福島県", "value": 2190 },
            { "name": "石川県", "value": 1130 },
            { "name": "福井県", "value": 456 },
            { "name": "愛媛県", "value": 800 },
            { "name": "奈良県", "value": 400 },
            { "name": "島根県", "value": 200 },
            { "name": "岩手県", "value": 5600 },
            { "name": "鳥取県", "value": 1020 },
            { "name": "徳島県", "value": 2400 },
            { "name": "鹿児島県", "value": 300 },
            { "name": "新潟県", "value": 879 },
            { "name": "高知県", "value": 1000 },
            { "name": "宮崎県", "value": 1600 },
            { "name": "神奈川県", "value": 1500 }
          ]
        }
      ]
    };

  }

  private initWorldMapChart(geoData: Geography) {
    echarts.registerMap("World", geoData);
    this.mapChart_WORLD = {
      title: {
        text: 'Grow Coverage',
        subtext: '',
        left: 'right'
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: (params) => {
          const value = (params.value + '').split('.');
          return params.seriesName + '<br/>' + params.value;
        }
      },
      visualMap: {
        left: 'right',
        min: 0,
        max: 75000,
        inRange: {
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        text: ['High', 'Low'],
        calculable: true
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '利用者数',
          zoom: 1.8,
          aspectScale: 1,
          zoomLock: false,
          type: 'map',
          roam: "move",
          map: 'World',
          label: {
            normal: { textStyle: { color: "white" } }
          },
          itemStyle: {
            emphasis: {
              areaColor: "#00385E"
            }
          },
          // 文本位置修正
          textFixed: {
            Alaska: [20, -20]
          },
          data: [
            { "name": "Japan", "value": 70000 },
            { "name": "Vietnam", "value": 25000 },
            { "name": "United Arab Emirates", "value": 10000 }
          ]
        }
      ]
    };
  }

  private correlationColorChange(event, isFrom: boolean = false) {
    if (this.correlationChart.visualMap.inRange.color.length >= 2) {
      this.correlationChart.visualMap.inRange.color[isFrom ? 0 : 1] = isFrom ? this.correlationColorOption.start : this.correlationColorOption.end;
      let chart = echarts.init(document.getElementById("correlationChartObj"));
      chart.setOption(this.correlationChart, true);
    }
  }

  private plotColorChange(event) {

    let data_inline = this.plotChart.series[0];
    data_inline.itemStyle = data_inline.itemStyle || {};
    data_inline.itemStyle.normal = data_inline.itemStyle.normal || {};
    data_inline.itemStyle.normal.borderColor = this.plotColorOption.start;

    let data_outline = this.plotChart.series[1];
    data_outline.itemStyle = data_outline.itemStyle || {};
    data_outline.itemStyle.normal = data_outline.itemStyle.normal || {};
    data_outline.itemStyle.normal.color = this.plotColorOption.start;

    let chart = echarts.init(document.getElementById("plotChartObj"));
    chart.setOption(this.plotChart, true);
  }
}
