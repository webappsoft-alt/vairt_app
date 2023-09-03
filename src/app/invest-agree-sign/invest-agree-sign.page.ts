import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController, ModalController  } from '@ionic/angular';
import { TopDownPage } from '../top-down/top-down.page';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { AppComponent } from '../app.component' 
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-invest-agree-sign',
  templateUrl: './invest-agree-sign.page.html',
  styleUrls: ['./invest-agree-sign.page.scss'],
})
export class InvestAgreeSignPage implements OnInit {
  reason:any
  img:any
  address:any
  purchase_price:any
  remaining_share:any
  title:any
  user_id:any
  document_accessible:any
  delivery_of_document:any
  offering_circular:any
  subscription_agreement:any
  w_9:any
  united_state_citizen:any
  warrent_true:any
  balance:any
  risk_of_loss:any
  ios_header:any
  property_images:any=[]
  loading:any
  opts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };
  constructor(public router:Router,
    public service:ApiService,
    public statusbar:StatusBar,
    public alertController: AlertController,
    public modalController:ModalController,
    public appcomponent:AppComponent,
    public toastController:ToastController){ 
    this.address = this.service.getInvestdata()[0].address
    this.title =  this.service.getInvestdata()[0].title
    this.purchase_price = this.service.getInvestdata()[0].purchase_price
    this.remaining_share = this.service.getInvestdata()[0].remaining_share
    this.property_images = this.service.getPropertyDetail().property_images
    if(this.service.getInvestdata()[0].invoice_id!=undefined){
      this.property_images =  this.service.getInvestdata()[0].img
    }
   this.balance = this.service.getBalance()
   let check = window.localStorage.getItem('phone-model')
   if(check=='10'){
    this.ios_header = true;
  }else{
    this.ios_header = false
  }
  this.statusbar.hide()
  this.delivery_of_document = true 
  this.document_accessible = true 
  this.offering_circular = true 
  this.subscription_agreement = true 
  this.w_9 = true 
  this.united_state_citizen = true
  this.warrent_true = true 
  this.risk_of_loss = true
  }

  ngOnInit() {
    let invoice_id = window.localStorage.getItem('invoice_id')
    let prop_id = window.localStorage.getItem('prop_id')
    if(invoice_id==undefined){
      invoice_id = this.service.getInvestdata()[0].invoice_id
    }
    this.service.user_invest8(this.user_id,prop_id,invoice_id).subscribe(res=>{
      console.log(res)
    })
  }
  next(){
    let prop_id = window.localStorage.getItem('prop_id')
    this.user_id = window.localStorage.getItem('user_id')
    if(this.delivery_of_document==undefined || this.document_accessible == undefined || this.offering_circular == undefined || this.subscription_agreement == undefined || this.w_9 == undefined || this.united_state_citizen == undefined || this.warrent_true == undefined || this.risk_of_loss == undefined ){
      this.showmessage('Please read and select all investment agreement')
    }
    else{
    if(this.service.getInvestdata()[0].invoice_id!=undefined){
      console.log(this.service.getInvestdata()[0].invoice_id)
      this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,'9').subscribe(res=>{
        console.log(res)
      })
    }else{
      let invoice_id = window.localStorage.getItem('invoice_id')
      this.service.signup_email(this.user_id).subscribe(res=>{
        console.log(res)
      })
    this.service.user_invest8(this.user_id,prop_id,invoice_id).subscribe(res=>{
      console.log(res)
    })
   }
   this.service.setBackPage('invest-agree-sign')
   this.appcomponent.leftSlide('invest-fund')
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
    this.appcomponent.leftSlide('deposit-funds')  
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
  async cancel_inves(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Vairt',
      message: 'Do you want to cancel this investment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.cancel_invest()
          }
        }
      ]
    });

    await alert.present();
  }
  cancel_invest(){
    let prop_id = window.localStorage.getItem('prop_id')
    if(this.service.getInvestdata()[0].invoice_id!=undefined){
      this.service.cancel_invoice_invest(this.service.getInvestdata()[0].invoice_id,this.user_id).subscribe(res=>{
        console.log(res)
        this.appcomponent.leftSlide('new-investments')
      })
    }else{
     this.service.cancel_invest(prop_id,this.user_id).subscribe(res=>{
       console.log(res)
       this.appcomponent.leftSlide('home')
     })
   }
   }
  logout(){
    window.localStorage.clear()
    this.appcomponent.downSlidePre('login')
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
  back(){
    let page =  this.service.getBackPage()
    if(page=='new-investments'){
      this.appcomponent.downSlidePre(page)
      }else{
        this.appcomponent.downSlidePre('invest-identity-of')
      }
  }
  home(){
    this.appcomponent.downSlidePre('home')
  }
}

