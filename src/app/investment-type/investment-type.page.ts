import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-investment-type',
  templateUrl: './investment-type.page.html',
  styleUrls: ['./investment-type.page.scss'],
})
export class InvestmentTypePage implements OnInit {
  select:any
  name:any
  ios_header:any
  user_id:any
  loading:any
  constructor(public router:Router,
    public service:ApiService) {
    this.select = '1'
    this.name = window.localStorage.getItem('full_name')
    this.user_id = window.localStorage.getItem('user_id')
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
    this.service.investment_type(this.user_id,this.select).subscribe(res=>{
      console.log(res)
    })
    this.router.navigate(['level-experience'])
  }
}
