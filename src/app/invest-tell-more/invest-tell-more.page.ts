import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { TopDownPage } from '../top-down/top-down.page';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { ModalController, NavParams } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { NetWorthModalPage } from '../net-worth-modal/net-worth-modal.page';
import { CurrentIncomeModelPage } from '../current-income-model/current-income-model.page';
import { AppComponent } from '../app.component'
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-invest-tell-more',
  templateUrl: './invest-tell-more.page.html',
  styleUrls: ['./invest-tell-more.page.scss'],
})
export class InvestTellMorePage implements OnInit {
  reason:any
  img:any
  address:any
  purchase_price:any
  remaining_share:any
  title:any
  user_id:any
  investment_amount:any
  investment_verification:Boolean=false
  invest_ver:any
  current_value:any
  segments:any=[]
  stocks:any
  bonds:any
  equity:any
  capital:any
  business:any
  real_estate:any
  when:any
  comfort:any
  risk:any
  income:any
  worth:any
  counter:any
  balance:any
  ios_header:any
  worth_value:any
  income_value:any
  property_images:any=[]
  slideOptsOne={
      slidePerView:1,
  }
  opts = {
    initialSlide: 0,
    slidesPerView: 1,
   // autoplay: true,
  };
  constructor(public router:Router,
    public service:ApiService,
    public toast:Toast,
    public modalController:ModalController,
    public alertController: AlertController,
    public appcomponent:AppComponent,
    public statusbar:StatusBar,
    public toastController:ToastController) {
      this.counter=1;
    this.address = this.service.getInvestdata()[0].address
    this.title =  this.service.getInvestdata()[0].title
    this.purchase_price = this.service.getInvestdata()[0].purchase_price
    this.remaining_share = this.service.getInvestdata()[0].remaining_share
    this.property_images = this.service.getPropertyDetail().property_images
    if(this.service.getInvestdata()[0].invoice_id!=undefined){
      this.property_images =  this.service.getInvestdata()[0].img
    }
    this.current_value= 'stage1'
    this.balance = this.service.getBalance()
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
     this.ios_header = true;
   }else{
     this.ios_header = false
   }
   this.statusbar.hide()
    this.segments=[{'name':'Stage 1','value':'stage1',status:true},{'name':'Stage 2','value':'stage2',status:false},{'name':'Stage 3','value':'stage3',status:false},{'name':'Stage 4','value':'stage4',status:false},{'name':'Stage 5','value':'stage5',status:false}]


    if(this.service.getInvestdata()[0].stages!=undefined && this.service.getInvestdata()[0].stages=='4'){
      this.current_value = 'stage1'
      this.segments[0].status=true
      this.segments[1].status=false
      this.segments[2].status=false
      this.segments[3].status=false
      this.segments[4].status=false
    }
    if(this.service.getInvestdata()[0].stages!=undefined && this.service.getInvestdata()[0].stages=='5'){
      this.current_value = 'stage2'
      this.segments[1].status=true
      this.segments[0].status=false
      this.segments[2].status=false
      this.segments[3].status=false
      this.segments[4].status=false
    }
    if(this.service.getInvestdata()[0].stages!=undefined && this.service.getInvestdata()[0].stages=='6'){
      this.current_value = 'stage3'
      this.segments[2].status=true
      this.segments[1].status=false
      this.segments[0].status=false
      this.segments[3].status=false
      this.segments[4].status=false
    }
    if(this.service.getInvestdata()[0].stages!=undefined && this.service.getInvestdata()[0].stages=='7'){
      this.current_value = 'stage4'
      this.segments[3].status=true
      this.segments[1].status=false
      this.segments[2].status=false
      this.segments[0].status=false
      this.segments[4].status=false
    }
    if(this.service.getInvestdata()[0].stages!=undefined && this.service.getInvestdata()[0].stages=='8'){
      this.current_value = 'stage5'
      this.segments[0].status=false
      this.segments[1].status=false
      this.segments[2].status=false
      this.segments[3].status=false
      this.segments[4].status=true
    }
    
   }

  ngOnInit() {
    this.user_id = window.localStorage.getItem('user_id')
    let prop_id = window.localStorage.getItem('prop_id')
    let invoice_id = window.localStorage.getItem('invoice_id')
    if(invoice_id==undefined){
      invoice_id = this.service.getInvestdata()[0].invoice_id
    }
    this.service.user_invest4(this.user_id,prop_id,invoice_id).subscribe(res=>{
      console.log(res)
    })
    this.service.get_user_invest_detail(this.user_id).subscribe(res=>{
      console.log(res)
      this.reason = res['invest_detail'].primary_reason;
      this.stocks = res['invest_detail'].stocks;
      this.bonds = res['invest_detail'].bonds;
      this.equity = res['invest_detail'].private_equity;
      this.capital = res['invest_detail'].venture_capital
      this.real_estate = res['invest_detail'].realestate
      this.business = res['invest_detail'].restaurant
      this.when = res['invest_detail'].exit_investment
      this.comfort = res['invest_detail'].comfortable
      this.risk = res['invest_detail'].investment_type
      this.income = res['invest_detail'].current_income
      this.income_value = this.income
      this.worth = res['invest_detail'].net_worth
      this.worth_value = this.worth
    });
  }
  
  // next1(){
  //   if(this.current_value=='stage1'){
  //     if(this.reason == undefined || this.reason == 0){
  //       this.toast_('Please select Reason of investment')
  //     }else{
  //     this.counter = this.counter+1;
  //     this.segments[1].status=true
  //     this.segments[0].status=false
  //     this.service.update_user_invest_tell(this.user_id,this.reason).subscribe(res=>{
  //       console.log(res)
  //     })
  //     if(this.counter==2){
  //       this.current_value='stage2'
  //     }
  //    }
  //   }
  //   if(this.current_value=='stage2'){
  //     if(this.stocks == undefined || this.stocks==0){
  //       this.toast_('Please select Stocks');
  //     }else if(this.bonds == undefined || this.bonds==0){
  //       this.toast_('Please select bonds');
  //     }else if(this.equity == undefined || this.equity==0){
  //       this.toast_('Please select equity');
  //     }else if(this.capital == undefined || this.capital==0){
  //       this.toast_('Please select capital');
  //     }else if(this.business == undefined || this.business==0){
  //       this.toast_('Please select business');
  //     }else if(this.real_estate == undefined || this.real_estate==0){
  //       this.toast_('Please select real state');
  //     }else{
  //      this.counter = 3;
  //     this.segments[2].status=true
  //     this.segments[1].status=false
  //     this.service.level_expierence(this.stocks,this.bonds,this.equity,this.capital,this.business,
  //       this.real_estate,this.user_id).subscribe(res=>{
  //         console.log(res)
  //     })
  
  //     if(this.counter==3){
  //       this.current_value='stage3'
  //     }
  //   }
  //   if(this.current_value=='stage3'){
  //     if(this.when==undefined || this.when == 0){
  //       this.toast_('Please select exit investment year')
  //     }else if(this.comfort==undefined || this.comfort== 0){
  //       this.toast_('Please select on which investment you are comfortable')
  //     }else{
  //       this.counter = 4;
  //     this.segments[3].status=true
  //     this.segments[2].status=false
  //     this.service.when_exit_investment(this.user_id,this.when,this.comfort).subscribe(res=>{
  //       console.log(res)
  //     })
  //     if(this.counter==4){
  //       console.log(this.current_value)
  //       this.current_value='stage4'
  //       console.log(this.current_value)
  //     }
  //   }
  //   }
  //   }
    
  //   if(this.current_value=='stage4'){
  //     this.segments[4].status=true
  //     this.segments[3].status=false
  //     console.log(this.segments)
  //     this.service.exit_investment(this.user_id,this.risk).subscribe(res=>{
  //       console.log(res)
  //     })
    
    
  //     if(this.counter==5){
  //       this.current_value='stage5'
  //     }
  //   }
  //   if(this.current_value=='stage5'){
  //     this.service.current_income(this.user_id,this.income,this.worth).subscribe(res=>{
  //       console.log(res)
  //     })
  //     if(this.service.getInvestdata()[0].invoice_id!=undefined){
  //       this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,'4').subscribe(res=>{
  //         console.log(res)
  //       })
  //     }else{
  //     let prop_id = window.localStorage.getItem('prop_id')
  //     let invoice_id = window.localStorage.getItem('invoice_id')
  //     this.service.user_invest4(this.user_id,prop_id,invoice_id).subscribe(res=>{
  //       console.log(res)
  //     })
  //    }
  //      this.router.navigate(['invest-employment-info'])
  //     //this.router.navigate(['invest-agree-sign'])
  //   }
    
  // }

  next1(){
      if(this.reason == undefined || this.reason == 0){
        this.toast_('Please select Reason of investment')
      }else{
        console.log(this.reason)
      this.current_value = 'stage2'
      this.segments[1].status=true
      this.segments[0].status=false
      this.service.update_user_invest_tell(this.user_id,this.reason).subscribe(res=>{
        console.log(res)
      })
     }
  }

  next2(){
      if(this.stocks == undefined || this.stocks==0){
        this.toast_('Please select Stocks');
      }else if(this.bonds == undefined || this.bonds==0){
        this.toast_('Please select bonds');
      }else if(this.equity == undefined || this.equity==0){
        this.toast_('Please select equity');
      }else if(this.capital == undefined || this.capital==0){
        this.toast_('Please select capital');
      }else if(this.business == undefined || this.business==0){
        this.toast_('Please select business');
      }else if(this.real_estate == undefined || this.real_estate==0){
        this.toast_('Please select real state');
      }else{
        this.current_value='stage3'
      this.segments[2].status=true
      this.segments[1].status=false
      this.service.level_expierence(this.stocks,this.bonds,this.equity,this.capital,this.business,
        this.real_estate,this.user_id).subscribe(res=>{
          console.log(res)
      })
    }
  }

  next3(){
      if(this.when==undefined || this.when == 0){
        this.toast_('Please select exit investment year')
      }else if(this.comfort==undefined || this.comfort== 0){
        this.toast_('Please select on which investment you are comfortable')
      }else{
        this.current_value='stage4'
      this.segments[3].status=true
      this.segments[2].status=false
      this.service.when_exit_investment(this.user_id,this.when,this.comfort).subscribe(res=>{
        console.log(res)
      })
    }
  }

  next4(){
    if(this.risk==undefined || this.risk == 0){
      this.toast_('Please select exit investment year')
    }else{
      this.current_value='stage5'
    this.segments[4].status=true
    this.segments[3].status=false
      this.service.exit_investment(this.user_id,this.risk).subscribe(res=>{
        console.log(res)
      })
     }
   }

   next5(){
    if(this.income==undefined || this.income == 0){
      this.toast_('Please enter the income')
    }else if(this.worth == undefined || this.worth == 0){
      this.toast_('Please enter the worth')
    }else{
      console.log(this.income_value)
      console.log(this.worth_value)
      this.service.current_income(this.user_id,this.income_value,this.worth_value).subscribe(res=>{
        console.log(res)
      })
      if(this.service.getInvestdata()[0].invoice_id!=undefined){
        this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,'5').subscribe(res=>{
          console.log(res)
        })
      }else{
      let prop_id = window.localStorage.getItem('prop_id')
      let invoice_id = window.localStorage.getItem('invoice_id')
      this.service.user_invest4(this.user_id,prop_id,invoice_id).subscribe(res=>{
        console.log(res)
      })
     }
     this.service.setBackPage('invest-tell-more')
     this.appcomponent.leftSlide('invest-employment-info')
      }
    }

  async top_up() {
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
    this.appcomponent.leftSlide('login')
  }
  segmentChanged(event){
    this.current_value = event.detail.value
    for(let i=0;i<this.segments.length;i++){
      if(this.segments[i].value==this.current_value){
        this.segments[i].status=true
      }else{
        this.segments[i].status=false
      }
    }

  }
  toast_(message){
    this.toast.show(message, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
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
    });
    return await modal.present();
    }
    back1(){}
    back2(){}
    back3(){}
    back4(){}
    back5(){}
    back(){
      let page =  this.service.getBackPage()
      if(page=='new-investments'){
        this.appcomponent.downSlidePre(page)
       }else{
          this.appcomponent.downSlidePre('invest-amount')
      }
    }
    home(){
      this.appcomponent.downSlidePre('home')
    }
}

