import { Component, OnInit,ViewChild , NgZone} from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController, ModalController  } from '@ionic/angular';
import { TopDownPage } from '../top-down/top-down.page';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { AppComponent } from '../app.component'
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-invest-fund',
  templateUrl: './invest-fund.page.html',
  styleUrls: ['./invest-fund.page.scss'],
})
export class InvestFundPage implements OnInit {
  reason:any
  img:any
  address:any
  purchase_price:any
  remaining_share:any
  title:any
  user_id:any
  share_amount:any
  investment_amount:any
  payment_type:any
  balance:any
  ios_header:any
  active_status:any
  property_images:any=[]
  loading:any
  minimum_share:any
  invest_type:any
  check_from:any
  opts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };
  constructor(public router:Router,
    public modalController:ModalController,
    public service:ApiService,
    public statusbar:StatusBar,
    public toast:Toast,
    public zone: NgZone,
    public appcomponent:AppComponent,
    public alertController: AlertController,
    public toastController:ToastController){ 
       this.active_status = this.service.getActiveStatus()
      this.address = this.service.getInvestdata()[0].address
      this.title =  this.service.getInvestdata()[0].title
      this.purchase_price = this.service.getInvestdata()[0].purchase_price
      this.remaining_share = this.service.getInvestdata()[0].remaining_share
      this.property_images = this.service.getPropertyDetail().property_images
      if(this.service.getInvestdata()[0].invoice_id!=undefined){
        this.property_images =  this.service.getInvestdata()[0].img
      }
      this.balance = this.service.getBalance()
      this.payment_type = 'fiat'
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
  this.statusbar.hide()
  }
  ionViewDidEnter(){
    this.user_id = window.localStorage.getItem('user_id')
    this.service.balance(this.user_id).subscribe(res=>{
      console.log(res)
      this.balance = res['balance']
      this.service.setBalance(res['balance']);

    })
  }
  ngOnInit() {
    this.invest_type = this.service.get_invest_form()
      if(this.invest_type=='home'){
      let price_per_share = parseFloat(window.localStorage.getItem('total_price_per_share'))
      this.investment_amount =  parseInt(window.localStorage.getItem('ivestment_amount'))

      let amount = this.investment_amount / price_per_share;
       this.share_amount = (Math.round(amount / 10) * 10)
       this.minimum_share = this.share_amount

       let invoice_id = window.localStorage.getItem('invoice_id')
       let prop_id = window.localStorage.getItem('prop_id')
       if(invoice_id==undefined){
        invoice_id = this.service.getInvestdata()[0].invoice_id
      }
       this.service.user_invest9(this.user_id,prop_id,invoice_id).subscribe(res=>{
         console.log(res)
       })
       this.check_from = 'home'
      }else{
        this.share_amount = parseFloat(window.localStorage.getItem('ivestment_amount_flip'))
        this.investment_amount =  parseFloat(window.localStorage.getItem('total_price_per_share_flip'))
  
         let invoice_id = window.localStorage.getItem('invoice_id')
         let prop_id = window.localStorage.getItem('prop_id')
         if(invoice_id==undefined){
          invoice_id = this.service.getInvestdata()[0].invoice_id
        }
         this.service.user_invest9(this.user_id,prop_id,invoice_id).subscribe(res=>{
           console.log(res)
         })
         this.check_from = 'flip'
      }
  }
  change(){
    let price_per_share = parseFloat(window.localStorage.getItem('total_price_per_share'))
    let total_amount = this.share_amount * price_per_share
    this.investment_amount = total_amount.toFixed(2)
  }
  next(){
    window.localStorage.setItem('ivestment_amount',this.investment_amount)
    let prop_id = window.localStorage.getItem('prop_id')
    this.user_id = window.localStorage.getItem('user_id')
    if(this.balance==0){
      this.showmessage('You cannot invest in property because you have 0 balance in your wallet')
    }else{
      if(this.share_amount < this.minimum_share){
        this.showmessage('Share cannot be less than to minimum share amount that is '+this.minimum_share)
      }else{
        if(this.service.getInvestdata()[0].invoice_id!=undefined){
          this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,'9').subscribe(res=>{
            console.log(res)
          })
        }else{
        let invoice_id = window.localStorage.getItem('invoice_id')
        this.service.user_invest9(this.user_id,prop_id,invoice_id).subscribe(res=>{
          console.log(res)
        })
    }
 
  window.localStorage.setItem('payment_method',this.payment_type)
  if(this.payment_type == 'fiat' && this.balance=='0'){
    alert('Please deposit fund to your account')
    this.payment_type='deposit'
  }else{
    if(this.active_status==true){
    if(this.payment_type=='deposit'){
      this.service.back_invest_fund('invest_fund')
      this.router.navigate(['deposit-funds'])
    }else{
    if(parseFloat(this.balance)<parseFloat(this.investment_amount)){
      this.showmessage('Your fiat balance is less than share price')
    }else{
    //this.service.setBackPage('invest-fund')
    this.router.navigate(['confirmation'])
    }
   }
   }else{
     this.service.setBackPage('invest-fund')
     this.router.navigate(['account-activate'])
     }
    }
   }
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
       this.appcomponent.downSlidePre('home')
     })
    }
   }

  change_payment(){
    console.log(this.payment_type)
  }
  back(){
    let page = this.service.getBackPage()
    console.log(page)
    if(page=='new-investments'){
      this.appcomponent.downSlidePre(page)
    }else{
      this.appcomponent.downSlidePre('invest-agree-sign')
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
    home(){
      this.appcomponent.downSlidePre('home')
    }
}

