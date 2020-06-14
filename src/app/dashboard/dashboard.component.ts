import { Component, OnInit } from '@angular/core';
import { SharingDataService } from '../sharing-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private service: SharingDataService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left'
        },
        {
          id: 'y-axis-1',
          position: 'right'
        }
      ]
    }
  };

  public labels = [];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [
    { data: [], label: 'Confirmed' },
    { data: [], label: 'Active', yAxisID: 'y-axis-1' }
  ];

  ngOnInit(): void {
    this.onPageLoad();
  }

  onPageLoad() {
    this.service.getApiData().subscribe((res) => {
      this.pushDataToChart(res);
    });
  }

  pushDataToChart(res) {
    let data = res.cases_time_series;
    let sumofActiveDeceased = 0;
    for (let i = 0; i < data.length; i++) {
      this.labels.push(data[i].date);
      this.barChartData[0].data.push(data[i].dailyconfirmed);

      sumofActiveDeceased = +data[i].totaldeceased + (+data[i].totalrecovered);
      this.barChartData[1].data.push(+data[i].totalconfirmed - sumofActiveDeceased);
    }
  }

}
