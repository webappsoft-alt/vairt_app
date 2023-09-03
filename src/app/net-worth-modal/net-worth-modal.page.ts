import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-net-worth-modal',
  templateUrl: './net-worth-modal.page.html',
  styleUrls: ['./net-worth-modal.page.scss'],
})
export class NetWorthModalPage implements OnInit {
  income:any=[]
  search:any=[]
  ios_header:any
    constructor(private modalController: ModalController,) {
      this.income=[{
        'value':'10000',
        'income':'Less Than $10,000'
      },{
        'value':'25000',
        'income':'$10,000 - $25,000'
      },{
        'value':'50000',
        'income':'$25,000 - $50,000'
      },{
        'value':'200000',
        'income':'$50,000 - $200,000'
      },{
        'value':'1000000',
        'income':'$200,000 - $1M'
      },{
        'value':'3000000',
        'income':'$1M - $3M'
      },{
        'value':'5000000',
        'income':'$3M - $5M'
      },{
        'value':'10000000',
        'income':'$5M - $10M'
      },{
        'value':'10000000',
        'income':'Greater than $10000000'
      }]
      this.search = this.income
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
     }
  
    ngOnInit() {
    }
    selected(name,value){
      this.modalController.dismiss(name,value)
    }
    close(){
      this.modalController.dismiss();
    }
    getItems(ev: any) {
      const val = ev.target.value;
      console.log(val)
      if (val && val.trim() != '') {
        this.income = this.search.filter((data) => {
          return (data.value.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else{
        this.income = this.search;
      }
    }
  }
  