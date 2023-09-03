import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-current-income-model',
  templateUrl: './current-income-model.page.html',
  styleUrls: ['./current-income-model.page.scss'],
})
export class CurrentIncomeModelPage implements OnInit {
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
      'value':'100000',
      'income':'$50,000 - $100,000'
    },{
      'value':'200000',
      'income':'$100,000 - $200,000'
    },{
      'value':'300000',
      'income':'$200,000 - $300,000'
    },{
      'value':'500000',
      'income':'$300,000 - $500,000'
    },{
      'value':'5000000',
      'income':'Greater than $5000,000'
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
