import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { Router } from '@angular/router'
import { TopDownPage } from '../top-down/top-down.page';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { ModalController, NavParams } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-deposit-funds',
  templateUrl: './deposit-funds.page.html',
  styleUrls: ['./deposit-funds.page.scss'],
})
export class DepositFundsPage implements OnInit {
  regions:any=[]
  region:any
  user_id:any
  amount:any
  loading:any
  balance:any
  ios_header:any
  constructor( public service:ApiService,
    public router:Router,
    public statusbar:StatusBar,
    public modalController:ModalController,
    public toastController:ToastController,) { 
      this.balance = this.service.getBalance()
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
       this.ios_header = true;
     }else{
       this.ios_header = false
     }
     this.statusbar.hide()
    }

  ngOnInit() {
    this.service.get_region().subscribe(res=>{
      console.log(res)
      this.region=res['region'][2]['id']
      this.regions = res['region'];
    })
  }
  back(){
    window.history.back()
  }
  next(){
    console.log(this.amount)
    if(this.amount==undefined || this.amount <= 0){
      this.showmessage('Please enter amount')
    }else{
      this.loading = true
    this.user_id = window.localStorage.getItem('user_id')
    window.localStorage.setItem('amount',this.amount)
    this.service.deposit_req(this.user_id,this.amount,this.region).subscribe(res=>{
      console.log(res)
      this.loading = false
      window.localStorage.setItem('deposit_id',res['deposit_id'])
      this.router.navigate(['deposit-instructions'])
    })
  }
  }
  async top_up() {
    // const modal = await this.modalController.create({
    //   component: TopUpPage,
    //   cssClass:'center',
    //   enterAnimation: myEnterAnimation,
    //   leaveAnimation: myLeaveAnimation,
    //   componentProps:{
    //     balance:this.balance
    //   }
    //   })
    //   modal.onDidDismiss().then((res) => {
    //     console.log(res)
       
    //   });
    //   return await modal.present(); 
      this.router.navigate(['deposit-funds'])  
     }


     async top_down(){
      const modal = await this.modalController.create({
        component: TopDownPage,
        cssClass:'center',
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
        componentProps:{
          balance:this.balance
        }
        })
        modal.onDidDismiss().then((res) => {
          console.log(res)
         
        });
        return await modal.present();   
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
}
