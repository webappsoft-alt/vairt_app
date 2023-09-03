import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { TopDownPage } from '../top-down/top-down.page';
import { ModalController, NavParams } from '@ionic/angular';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { Toast } from '@ionic-native/toast/ngx';
import { AppComponent } from '../app.component'
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-invest-amount',
  templateUrl: './invest-amount.page.html',
  styleUrls: ['./invest-amount.page.scss'],
})
export class InvestAmountPage implements OnInit {
  distribution:any
  img:any
  address:any
  purchase_price:any
  remaining_share:any
  title:any
  user_id:any
  investment_amount:any
  investment_verification:Boolean=false
  invest_ver:any
  share_amount:any
  balance:any
  ios_header:any
  check_amount:any
  showerror:Boolean=false
  property_images:any=[]
  loading:any
  error_message:any
  min_amount:any
  inputchar:any
  invest_type:any
  opts = {
    initialSlide: 0,
    slidesPerView: 1,
   // autoplay: true,
  };
  constructor(public router:Router,
    public service:ApiService,
    public statusbar:StatusBar,
    public toast:Toast,
    public alertController: AlertController,
    public modalController:ModalController,
    public appcomponent:AppComponent,
    public toastController:ToastController) {
    this.distribution = '0'
    this.address = this.service.getInvestdata()[0].address
    this.title =  this.service.getInvestdata()[0].title
    this.purchase_price = this.service.getInvestdata()[0].purchase_price
    this.remaining_share = this.service.getInvestdata()[0].remaining_share
    this.investment_amount =  this.service.getPropertyDetail().minimum_investment 
    this.min_amount = this.investment_amount
    this.check_amount = this.investment_amount
    this.property_images = this.service.getPropertyDetail().property_images
    if(this.service.getInvestdata()[0].invoice_id!=undefined){
      this.property_images =  this.service.getInvestdata()[0].img
    }
      this.balance = this.service.getBalance()
      if(this.min_amount==undefined || this.min_amount == 'undefined'){
        this.min_amount =  this.service.getInvestdata()[0].minimum_investment 
        this.investment_amount = this.min_amount
      }
      console.log(this.min_amount)
      if (this.min_amount.includes(',')) { 
        this.min_amount = parseFloat(this.min_amount.replace(/,/g, ''));
      }
      if (this.investment_amount.includes(',')) { 
        this.investment_amount = parseFloat(this.investment_amount.replace(/,/g, ''));
      }

      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
      this.statusbar.hide()
      this.invest_type = this.service.get_invest_form()
      if(this.invest_type=='home'){
        this.min_amount = this.min_amount
      }else{
        this.min_amount = '1'
      }
  }

  ngOnInit() {
   this.user_id = window.localStorage.getItem('user_id')
   ////inert step on page load////
   let invoice_id = window.localStorage.getItem('invoice_id')
    if(invoice_id==undefined){
      invoice_id = this.service.getInvestdata()[0].invoice_id
    }
   let prop_id = window.localStorage.getItem('prop_id')
   let price_per_share = parseFloat(window.localStorage.getItem('total_price_per_share'))
   window.localStorage.setItem('ivestment_amount',this.investment_amount)
   console.log(price_per_share)

   this.share_amount = this.investment_amount / price_per_share;
   let amount = (Math.round(this.share_amount / 10) * 10)

   this.service.user_invest3(this.user_id,this.investment_amount,amount,prop_id,invoice_id).subscribe(res=>{
     console.log(res)
   })
   /////end insert steps///////
   this.service.get_user_invest_detail(this.user_id).subscribe(res=>{
     console.log(res)
     this.distribution = res['invest_detail'].investment_type
     let set = res['invest_detail'].investment_verification
     if(set==0){
       this.investment_verification=false
     }else{
       this.investment_verification=true
     }
   })
  }

  next(){
    if(this.distribution==undefined || this.distribution == 'undefined' || this.distribution == ''){
      this.toast_('Please select distribution')
    }else{
    if(this.investment_verification==false){
      this.invest_ver='0'
    }else{
      this.invest_ver='1'
    }
    if(this.investment_amount==undefined){
      this.showmessage('Please add investment amount')
    }else{ 
      const pattern = /[0-9,]/;
      let inputChar = String.fromCharCode(this.inputchar); 
      if(pattern.test(inputChar)){
        this.showmessage('Amount can only be in numbers')
      }
      if(this.investment_amount<this.min_amount){
        this.showmessage('Investment amount cannot be less than minimum investment')
      }else{
        this.service.update_user_invest_detail(this.user_id,this.investment_amount,this.distribution,
          this.invest_ver).subscribe(res=>{
          console.log(res)
        })
        let price_per_share = parseFloat(window.localStorage.getItem('total_price_per_share'))
        window.localStorage.setItem('ivestment_amount',this.investment_amount)
        this.share_amount = this.investment_amount / price_per_share;
        let amount = this.share_amount.toFixed(0)
       
        let prop_id = window.localStorage.getItem('prop_id')
       
        if(this.service.getInvestdata()[0].invoice_id!=undefined){
          this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,'4').subscribe(res=>{
            console.log(res)
        })
        }else{
          let invoice_id = window.localStorage.getItem('invoice_id')
          this.service.user_invest3(this.user_id,this.investment_amount,amount,prop_id,invoice_id).subscribe(res=>{
            console.log(res)
          })
      }
      this.service.setBackPage('invest-amount')
      this.appcomponent.leftSlide('invest-tell-more')
      }
    }
    }
  }

  toast_(message){
    this.toast.show(message, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
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


  async showmessage(message){
    var toast = await this.toastController.create({
      message: message,
      color:'danger',
      cssClass:'toast-alert',
      duration: 3000
    });
    toast.present();
   
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
      console.log(this.service.getInvestdata()[0].invoice_id)
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
      this.appcomponent.leftSlide('login')
    }
    back(){
      let page =  this.service.getBackPage()
      if(page=='new-investments'){
        this.appcomponent.downSlidePre(page)
        }else{
          this.appcomponent.downSlidePre('invest-account-info')
        }
    }
    check_min(){
      console.log(this.investment_amount)
    }
    check_amount_(event:any,investment_amount){
      const pattern = /[0-9,]/;
       this.inputchar = String.fromCharCode(event.charCode);
      if (!pattern.test(this.inputchar)) {
        this.error_message = 'Amount can be only in numbers'
        this.showerror = true
         event.preventDefault();
      }else{
        this.showerror = false
        this.error_message='';
      }

        if(this.investment_amount<this.min_amount){
        this.showerror=true;
        this.error_message = 'Investment amount cannot be less than from minimum amount'
      }
    }
    home(){
      this.appcomponent.downSlidePre('home')
    }
}
