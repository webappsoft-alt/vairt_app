import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-level-experience',
  templateUrl: './level-experience.page.html',
  styleUrls: ['./level-experience.page.scss'],
})
export class LevelExperiencePage implements OnInit {
  stocks:any
  bonds:any
  equity:any
  capital:any
  business:any
  real_estate:any
  user_id:any
  name:any
  ios_header:any
  loading:any
  constructor(public router:Router,
    public service:ApiService) { 
    this.stocks='1'
    this.bonds='1'
    this.equity='1'
    this.capital='1'
    this.business='1'
    this.real_estate='1'
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
    this.name = window.localStorage.getItem('full_name')
    this.service.level_expierence(this.stocks,this.bonds,this.equity,this.capital,this.business,
      this.real_estate,this.user_id).subscribe(res=>{
        console.log(res)
      })
    this.router.navigate(['when-exit-investment'])
  }

}
