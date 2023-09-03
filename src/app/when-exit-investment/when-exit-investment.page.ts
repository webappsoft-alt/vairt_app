import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-when-exit-investment',
  templateUrl: './when-exit-investment.page.html',
  styleUrls: ['./when-exit-investment.page.scss'],
})
export class WhenExitInvestmentPage implements OnInit {
  when:any
  comfort:any
  name:any
  user_id:any
  ios_header:any
  loading:any
  constructor(public router:Router,
    public service:ApiService) { 
    this.when = '1'
    this.comfort = '1'
    this.name = window.localStorage.getItem('full_name')
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
    this.user_id = window.localStorage.getItem('user_id')
    this.service.when_exit_investment(this.user_id,this.when,this.comfort).subscribe(res=>{
      console.log(res)
    })
    this.router.navigate(['exit-investment'])
  }
}
