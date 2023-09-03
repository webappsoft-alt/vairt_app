import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController, ModalController  } from '@ionic/angular';
import { CurrentIncomeModelPage } from '../current-income-model/current-income-model.page';
import { NetWorthModalPage } from '../net-worth-modal/net-worth-modal.page';

@Component({
  selector: 'app-current-income',
  templateUrl: './current-income.page.html',
  styleUrls: ['./current-income.page.scss'],
})
export class CurrentIncomePage implements OnInit {
name:any
user_id:any
income:any
income_value:any
worth:any
worth_value:any
ios_header:any
loading:any
  constructor(public router:Router,
    public toastController:ToastController,
    public modalController:ModalController,
    public service:ApiService,) {
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
     }

  ngOnInit() { }
  next(){
    this.user_id =  window.localStorage.getItem('user_id')
    this.name = window.localStorage.getItem('full_name')
    if(this.income == undefined || this.worth == undefined){
      this.showmessage('Please fill your fields')
    }else{
    this.service.current_income(this.user_id,this.income,this.worth).subscribe(res=>{
      console.log(res)
    })
    this.router.navigate(['employment-info'])
  }
}
async showmessage(message){
  var toast = await this.toastController.create({
    message: message,
    color:'danger',
    cssClass:'toast-alert',
    duration: 3000
  });
  toast.present();
 
  }
  async current_income_model(){
      const modal = await this.modalController.create({
        component: CurrentIncomeModelPage,
        cssClass:'country_list'
      });
  
      modal.onDidDismiss().then((res) => {
        console.log(res)
       if(res.data!=undefined)
        this.income = res.data
        this.income_value = res.role
        console.log(this.income_value)
      });
      return await modal.present();
  }
 async net_worth_model(){
  const modal = await this.modalController.create({
    component: NetWorthModalPage,
    cssClass:'country_list'
  });

  modal.onDidDismiss().then((res) => {
    console.log(res)
   if(res.data!=undefined)
    this.worth = res.data
    this.worth_value = res.role
    console.log(this.worth_value)
  });
  return await modal.present();
  }
}
