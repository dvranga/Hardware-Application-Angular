import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { HardwareRequestService } from '../hardware-request.service';
import { Admin } from '../admin';

@Component({
  selector: 'app-pie-chart1',
  templateUrl: './pie-chart1.component.html',
  styleUrls: ['./pie-chart1.component.scss']
})
export class PieChart1Component implements OnInit {

  admin:Admin=new Admin();
  data:any;
  approved:any;
  rejected:any;
  submitted:any;
  value:number;
  constructor(private router:Router, private hardWareRequestService:HardwareRequestService) {
  
  }

  ngOnInit(): void {
    this.hardWareRequestService.getHardwareRequestDetails().subscribe(response =>{
      
      this.data=response;
      this.approved=this.data.data.approved;
      this.rejected=this.data.data.rejected;
      this.submitted=this.data.data.submitted;
      console.log("data ",this.data)
      console.log("approved ",this.approved)
      console.log("rejected ",this.rejected)
      console.log("submitted ",this.submitted)
    })

    
    
  }


  
  public pieChartLabels:string[] = ['Approved', 'Rejected', 'Submitted'];

  pieChartData :number[]= [this.approved, 20, 20 ];

  public pieChartType:string = 'pie';
 
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}