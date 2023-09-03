import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { AppComponent } from '../app.component'
import { TopDownPage } from '../top-down/top-down.page';
import { ModalController, NavParams } from '@ionic/angular';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';

@Component({
  selector: 'app-trans-invest-detail',
  templateUrl: './trans-invest-detail.page.html',
  styleUrls: ['./trans-invest-detail.page.scss'],
})
export class TransInvestDetailPage implements OnInit {
  ios_header:any
  investments:any=[]
  status:any
  title:any
  balance:any
  no_data:any
  constructor(public service:ApiService,
    public appcomponent:AppComponent,
    private modalController: ModalController,
    public router:Router) { 
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
     this.ios_header = true;
   }else{
     this.ios_header = false
   }
   this.investments = this.service.get_inves_trans_detail()
   if(this.investments==undefined){
     this.no_data=true
   }else{
     this.no_data=false
   }
   this.balance = this.service.getBalance()
   if(this.service.get_inves_status()=='active'){
    this.title = 'Active Investment'
   }else{
    this.title = 'Pending Investment' 
   }
  }

  ngOnInit() {
  }
  back(){
    this.appcomponent.downSlidePre('transaction')
  }
  complete_purchase(title,img,address,purchase_price,remaining_share,stages,invoice_id,property_id){
    let data=[{title:title,img:img,address:address,purchase_price:purchase_price,remaining_share:remaining_share,invoice_id:invoice_id,stages:stages,property_id:property_id}]
    this.service.invest_data(data);
    if(stages=='1'){
      this.router.navigate(['invest-info'])
    }
    if(stages=='2'){
      this.router.navigate(['invest-account-info'])
    }
    if(stages=='3'){
      this.router.navigate(['invest-amount'])
    }
    if(stages=='4'){
      this.router.navigate(['invest-tell-more'])
    }
    if(stages=='5'){
      this.router.navigate(['invest-employment-more'])
    }
    if(stages=='6'){
      this.router.navigate(['invest-contact-info'])
    }
    if(stages=='7'){
      this.router.navigate(['invest-identity-of'])
    }
    if(stages=='8'){
      this.router.navigate(['invest-agree-sign'])
    }
    if(stages=='9'){
      this.router.navigate(['invest-fund'])
    }
    // if(stages=='10'){
    //   this.router.navigate(['confirmation'])
    // }
  }
  async top_up() {
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
 logout(){
  this.appcomponent.presentAlertConfirm()
}
setting(){
  this.service.setSettingBackPage('home')
  this.appcomponent.leftSlide('setting')
}
}
