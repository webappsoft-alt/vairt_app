import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-exit-investment',
  templateUrl: './exit-investment.page.html',
  styleUrls: ['./exit-investment.page.scss'],
})
export class ExitInvestmentPage implements OnInit {
  moderate_risk:any
  high_risk:any
  low_risk:any
  name:any
  ios_header:any
  user_id:any
  loading:any
  
  constructor(public router:Router,
    public service:ApiService) { 
   // this.moderate_risk = 'moderate'
    this.high_risk = '1'
  //  this.low_risk = 'low'
  this.name = window.localStorage.getItem('full_name')
  this.user_id =  window.localStorage.getItem('user_id')
  let check = window.localStorage.getItem('phone-model')
  if(check=='10'){
    this.ios_header = true;
  }else{
    this.ios_header = false
  }
  }
  ngOnInit() {
  }
  next(){
    this.service.exit_investment(this.user_id,this.high_risk).subscribe(res=>{
      console.log(res)
    })
    this.router.navigate(['current-income'])
  }
}
