// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { NavController } from '@ionic/angular';
// import { Platform } from '@ionic/angular';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController,IonSlides } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { TopDownPage } from '../top-down/top-down.page';
import { TopUpPage } from '../top-up/top-up.page';
import { ModalController, NavParams } from '@ionic/angular';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-new-investments',
  templateUrl: './new-investments.page.html',
  styleUrls: ['./new-investments.page.scss'],
})
export class NewInvestmentsPage implements OnInit {
  // _currentPlatform:any
  // constructor(public router:Router,public navCtrl: NavController,
  //   public statusbar:StatusBar,
  //   public platform: Platform) { 
  //     if (this.platform.is('ios')) {
  //       this._currentPlatform = 'ios';
  //     } else {
  //       this._currentPlatform = 'android';
  //     }
  //   }
  //   ionViewDidEnter(){
  //     this.statusbar.backgroundColorByHexString('#ffffff');
  //   }
  // ngOnInit() {
  // }
  // detail(){
  //   this.router.navigate(['investment-detail']);
  // }
  // home(){
  //   this.navCtrl.navigateForward('home', { animated: false, });
  // }
  // portfolio(){
  //   this.navCtrl.navigateForward('portfolio', { animated: false, });
  // }
  // inves(){
  //   this.navCtrl.navigateForward('new-investments', { animated: false, });
  // }
  // flip(){
  //   this.navCtrl.navigateForward('flip', { animated: false, });
  // }
  _currentPlatform:any
  active_index:any
  active_index1:any
  properties:any=[]
  flip_properties:any=[]
  investments:any=[]
  search:any=[]
  intial_invest:any
  balance:any
  user_id:any
  ios_header:any
  data_loading:Boolean=true
  last_id:any
  loading_more:Boolean=false
  skelton:any=[]
  back_btn:any
  no_data:any
  min_amount:any
  investment_amount:any
  total_price_share:any
  invested_property:any=[]
  @ViewChild('slideWithNav', { static: false }) slides: IonSlides;
  @ViewChild('slideWithNav1', { static: false }) slides1: IonSlides;

  constructor(public navCtrl: NavController,public platform: Platform,
    public statusbar:StatusBar,
    public service:ApiService,
    public modalController:ModalController,
    public appcomponent:AppComponent,
    public router:Router) {
      this.active_index='01'
      this.active_index1='01'
      if (this.platform.is('ios')) {
      this._currentPlatform = 'ios';
    } else {
      this._currentPlatform = 'android';
    }
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
    let page_chk = this.service.get_my_properties()
    if(page_chk == undefined || page_chk == null){
      this.back_btn = false;
    }else{
      this.back_btn = true
    }
   }
   
   ionViewDidEnter(){
    this.balance = this.service.getBalance()
    this.statusbar.hide();
    this.user_id = window.localStorage.getItem('user_id')
    console.log(this.user_id)
    this.service.my_investments(this.user_id,'').subscribe(res=>{
      console.log(res)
      this.investments = res['property']
      this.invested_property = res['purchase']
      if(this.investments==undefined && this.invested_property == undefined){
        this.no_data = true
      }else{
        this.no_data = false
      }
      if(this.investments!=undefined)
      this.last_id = this.investments[this.investments.length - 1].invoice_id
      this.data_loading = false

    })
  }
  loadData(event) {
    console.log(this.last_id)
    setTimeout(() => {
      this.loading_more = true;
    this.service.my_investments(this.user_id,this.last_id).subscribe(res=>{
      console.log(res['property'])  
      this.loading_more = false;    
      if(res['property']==undefined){
        event.target.disabled = true
      }
      else{
        this.investments = this.investments.concat(res['property'])
        event.target.complete();
        this.last_id = this.investments[this.investments.length - 1].invoice_id
      }
    });
  }, 500);
  }
  complete_purchase(title,img,address,purchase_price,remaining_share,stages,invoice_id,property_id,
    minimum_investment,property_price_per_share,purchase_cost_per_share,transaction_cost_per_share,
    net_dividend,seller_id){
    let data=[{title:title,img:img,address:address,purchase_price:purchase_price,remaining_share:remaining_share,
      invoice_id:invoice_id,stages:stages,property_id:property_id,net_dividend:net_dividend,minimum_investment:minimum_investment}]
    this.investment_amount =  minimum_investment 
    this.min_amount = minimum_investment
    console.log(seller_id)
    if(seller_id!='0'){
      console.log('flip')
      this.service.set_invest_from('flip')
      }else{
      console.log('hoem')
        this.service.set_invest_from('home')
      }

    if (this.min_amount.includes(',')) { 
      this.min_amount = parseFloat(this.min_amount.replace(/,/g, ''));
    }
    if (this.investment_amount.includes(',')) { 
      this.investment_amount = parseFloat(this.investment_amount.replace(/,/g, ''));
    }
    window.localStorage.setItem('ivestment_amount',this.investment_amount)
    window.localStorage.setItem('invoice_id',invoice_id)
    this.total_price_share = parseFloat(property_price_per_share)+parseFloat(purchase_cost_per_share)+parseFloat(transaction_cost_per_share)
    window.localStorage.setItem('total_price_per_share',this.total_price_share)
    this.service.invest_data(data);
    this.service.setBackPage('new-investments')
    if(stages=='1'){
      this.appcomponent.leftSlide('invest-info')
    }
    if(stages=='2'){
      this.appcomponent.leftSlide('invest-account-info')
    }
    if(stages=='3'){
      this.appcomponent.leftSlide('invest-amount')
    }
    if(stages=='4'){
      this.appcomponent.leftSlide('invest-tell-more')
    }
    if(stages=='5'){
      this.appcomponent.leftSlide('invest-employment-info')
    }
    if(stages=='6'){
      this.appcomponent.leftSlide('invest-contact-info')
    }
    if(stages=='7'){
      this.appcomponent.leftSlide('invest-identity-of')
    }
    if(stages=='8'){
      this.appcomponent.leftSlide('invest-agree-sign')
    }
    if(stages=='9'){
      this.appcomponent.leftSlide('invest-fund')
    }

  }
  ngOnInit() {
    this.skelton.push(1,2);
  }
  home(page){
    this.service.setBackPage('new-investments')
    this.appcomponent.downSlidePre(page)
  }
  portfolio(page){
    this.service.setBackPage('new-investments')
    this.appcomponent.leftSlide(page)
  }
  inves(page){
    this.service.setBackPage('new-investments')
    this.appcomponent.leftSlide(page)
  }
  flip(page){
    this.service.setBackPage('new-investments')
    this.appcomponent.leftSlide(page)
  }
  profile(page){
    this.service.setBackPage('new-investments')
    this.appcomponent.leftSlide(page)
  }
  logout(){
    this.appcomponent.presentAlertConfirm()
  }
  swipeNext(){
    this.slides.slideNext();
    this.slides.getActiveIndex().then(id => {
      let index= id+1
      if(index<10){
        this.active_index  = '0'+index
      }
  });
  }
  swipePrev(){
    this.slides.slidePrev();
    this.slides.getActiveIndex().then(id => {
      let index= id+1
      if(index<10){
        this.active_index  = '0'+index
      }
   });
  }

  swipeNext1(){
    this.slides1.slideNext();
    console.log('me')
    this.slides1.getActiveIndex().then(id => {
      let index= id+1
      if(index<10){
        this.active_index1  = '0'+index
      }
  });
  }
  swipePrev1(){
    this.slides1.slidePrev();
    this.slides1.getActiveIndex().then(id => {
      let index= id+1
      if(index<10){
        this.active_index1  = '0'+index
      }
  });
  }
  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val)
    if (val && val.trim() != '') {
      this.properties = this.search.filter((data) => {
        return (data.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }) 
    }
   
}
  prop_detail(property,transaction){
    console.log(property)
    this.service.setPropertyDetail(property,transaction)
    this.router.navigate(['property-detail'])
  }
  flip_detail(property,transaction){
    console.log(property)
    this.service.setPropertyDetail(property,transaction)
    this.router.navigate(['flip-detail'])
  }
  purchase_complete(property_images,beds,baths,size,address,property_title,property_id,price,
    shares,purchaser_id){
    let data = {property_images,beds,baths,size,address,property_title,property_id,price,shares,purchaser_id}
    this.service.set_purchase_complete(data);
    this.appcomponent.upSlide('purchased-property')
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
        })
        modal.onDidDismiss().then((res) => {
          console.log(res)
         
        });
        return await modal.present();   
      }
      setting(){
        this.service.setSettingBackPage('new-investments')
        this.appcomponent.leftSlide('setting')
      }
      ionViewWillLeave(){
        this.service.set_my_properties(undefined)
      }
      back(){
        this.appcomponent.downSlidePre('transaction')
      }
      noti(){
        this.service.setSettingBackPage('new-investments')
        this.appcomponent.upSlide('notification')
      }
}
