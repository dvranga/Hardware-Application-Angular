import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HardwareRequestService {

  private getUrl: string = "http://localhost:8081/hardwareapplication";

  constructor(private http: HttpClient) { }

  getHardwareRequestDetails(){
    return this.http.get(`${this.getUrl}/status/details`);
  }

  getHardwareRequestDetailsByDate(data:any){
    return this.http.post(`${this.getUrl}/status/bydate`,data);
  }

  
}


