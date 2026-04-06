import { Component, OnInit } from '@angular/core';
import { Data } from '../Service/data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
 totalEmp = 0;
  workingOnProject = 0;
  totalDepts = 0;
  newEmp2026 = 0;

  public growthChart: any;
  public deptChart: any;
  public projectChart: any;
  public salaryChart: any;

  constructor(private service: Data) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.service.getEmployee().subscribe((res: any) => {
      if (res && res.length > 0) {
        const data = res as any[];
        this.calculateStats(data);
        this.initDashboardCharts(data);
      }
    });
  }

  calculateStats(data: any[]) {
    this.totalEmp = data.length;
    this.workingOnProject = data.filter(e =>
      e.onProject === true || e.onProject === 'true' || e.onProject === 1
    ).length;
    this.totalDepts = new Set(data.map(e => e.department ? e.department.trim() : '')).size;
    this.newEmp2026 = data.filter(e => String(e.joiningYear) === '2026').length;
  }

  initDashboardCharts(data: any[]) {
    const deptCounts: any = { 'IT': 0, 'Finance': 0, 'Marketing': 0, 'HR': 0 };
    const deptSalary: any = { 'IT': 0, 'Finance': 0, 'Marketing': 0, 'HR': 0 };
    const yearCounts: any = {};

    data.forEach(e => {
      const dept = e.department ? e.department.trim() : '';
      if (deptCounts.hasOwnProperty(dept)) {
        deptCounts[dept]++;
        deptSalary[dept] += Number(e.salary || 0);
      }
      if (e.joiningYear) {
        yearCounts[e.joiningYear] = (yearCounts[e.joiningYear] || 0) + 1;
      }
    });

    const commonTheme = { mode: 'dark' as 'dark', palette: 'palette2' };
    const colors = ['#00E396', '#008FFB', '#FEB019', '#FF4560', '#775DD0'];

    this.growthChart = {
      series: [{ name: "Joined", data: Object.values(yearCounts) }],
      chart: { type: 'bar', height: 280, background: 'transparent', toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 4, columnWidth: '45%', distributed: true } },
      fill: { type: 'gradient', gradient: { shade: 'dark', type: "vertical", opacityFrom: 0.85, opacityTo: 0.55 } },
      xaxis: { categories: Object.keys(yearCounts), labels: { style: { colors: '#fff' } } },
      colors: colors,
      theme: commonTheme
    };

    this.deptChart = {
      series: Object.values(deptCounts),
      chart: { type: 'pie', height: 280 },
      labels: Object.keys(deptCounts),
      colors: colors,
      legend: { position: 'bottom', labels: { colors: '#fff' } },
      theme: commonTheme
    };

    this.projectChart = {
      series: [this.workingOnProject, (this.totalEmp - this.workingOnProject)],
      chart: { type: 'donut', height: 280 },
      stroke: { show: true, width: 2, colors: ['#1b213b'] },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              total: { show: true, label: 'TOTAL', color: '#fff', formatter: () => this.totalEmp }
            }
          }
        }
      },
      labels: ["Working", "Idle"],
      colors: ['#00D2BE', '#FFB300'],
      legend: { position: 'bottom', labels: { colors: '#fff' } },
      theme: { mode: 'dark' }
    };

    const avgSalaries = Object.keys(deptSalary).map(d =>
      deptCounts[d] > 0 ? Math.round(deptSalary[d] / deptCounts[d]) : 0
    );
    this.salaryChart = {
      series: [{ name: "Avg Salary", data: avgSalaries }],
      chart: { type: 'bar', height: 280, toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, barHeight: '50%', borderRadius: 4 } },
      colors: ['#FEB019'],
      xaxis: { categories: Object.keys(deptSalary), labels: { style: { colors: '#fff' } } },
      theme: commonTheme
    };
  }
}
