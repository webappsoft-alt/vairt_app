import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.page.html',
  styleUrls: ['./strategy.page.scss'],
})
export class StrategyPage implements OnInit {
  years:any
  investment:any
  loading:any
  constructor(public router:Router) { 
    this.years = '1'
    this.investment='comfortable'
  }

  ngOnInit() {
  }
  next(){
    this.router.navigate(['level-experience'])
  }
}
