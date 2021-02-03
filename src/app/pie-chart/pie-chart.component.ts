import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { HardwareRequestService } from '../hardware-request.service';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  data:any;
  approved:number=0;
  rejected:number=0;
  submitted:number=0;

  hardwareRequest!:FormGroup;

  constructor(private router:Router, private hardWareRequestService:HardwareRequestService,
            private route:ActivatedRoute,
            private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.hardWareRequestService.getHardwareRequestDetails().subscribe(response =>{
          this.data=response;
          this.approved=this.data.data.approved;
          this.rejected=this.data.data.rejected;
          this.submitted=this.data.data.submitted;
          this.updatePieChartData();
        })

        this.hardwareRequest=this.formBuilder.group({
          createDate:['',Validators.required],
          modifiedDate:['',Validators.required]
        })

        console.log("this.hardwareRequest ",this.hardwareRequest);

  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

    submit(){
      console.log("this.hardwareRequest ",this.hardwareRequest.value.createDate);
      console.log("this.hardwareRequest ",this.hardwareRequest.value.modifiedDate);
      var hardWareRequestDTO={
        'createDate': this.hardwareRequest.controls['createDate'].value,
        'modifiedDate':this.hardwareRequest.controls['modifiedDate'].value
      }
          this.hardWareRequestService.getHardwareRequestDetailsByDate(hardWareRequestDTO).subscribe(response =>{
          this.data=response;
          console.log(this.data,"data and response ",response)
          this.approved=this.data.data.approved;
          this.rejected=this.data.data.rejected;
          this.submitted=this.data.data.submitted;
          this.updatePieChartData();
        })
      console.log("hardWareRequestDTO ",hardWareRequestDTO);
      
    }
    
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[0].data[tooltipItems.index] + ' %';
        }
      }
    },
  };

  pieChartLabels: Label[] = ['Approved', 'Rejected', 'submitted'];

  pieChartData: number[] = [this.approved, this.rejected, this.submitted];

  updatePieChartData(){
    this.pieChartData = [this.approved, this.rejected, this.submitted];
  }

  pieChartType: ChartType = 'pie';

  pieChartLegend = true;

  pieChartPlugins = [];

  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

}
