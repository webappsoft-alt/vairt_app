
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController,IonSlides,IonContent } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { TopDownPage } from '../top-down/top-down.page';
import { AppComponent } from '../app.component'
import { FcmService } from '../services/fcm.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

_currentPlatform:any
  active_index:any
  active_index1:any
  properties:any=[]
  flip_properties:any=[]
  search:any=[]
  intial_invest:any
  user_id:any
  balance:any
  top_up_balance:any
  top_down_balance:any
  ios_header:any
  data_loading:Boolean=true
  slideOptsOne:{}
  lazy_image:any
  flip_last_id:any
  residual_last_id:any
  residual_ids:any=[]
  flip_ids:any=[]
  load_flip:Boolean = false
  skelton:any=[]
  chk_img:any
  size:any
  loading_more:any
  loading_more1:any
  no_data:Boolean=false
  flip_property:Boolean=true
  funded:any=12
  residual_property:Boolean = false
  loaded:Boolean = false;
  @ViewChild('slideWithNav', { static: false }) slides: IonSlides;
  @ViewChild('slideWithNav1', { static: false }) slides1: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(public navCtrl: NavController,public platform: Platform,
    public statusbar:StatusBar,
    public service:ApiService,
    public appcomponent:AppComponent,
    public zone:NgZone,
    public fcmservice:FcmService,
    private modalController: ModalController,
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
    this.lazy_image = 'assets/images/lazy_load.gif'
    this.fcmservice.initPush();
    this.chk_img = 'assets/images/property1.jpeg'
    this.size = '2000'
   }

   ionViewDidEnter(){
     this.user_id = window.localStorage.getItem('user_id')
     console.log(this.user_id)
    this.statusbar.hide();
    this.check_account_activation();
    this.appcomponent.check_platform();
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
    this.service.balance(this.user_id).subscribe(res=>{
      console.log(res)
      this.balance = res['balance']
      if(res['email_auth']=='1'){
        window.localStorage.setItem('email_auth','Conntected')
      }else{
        window.localStorage.setItem('email_auth','Not Conntected')
      }
      if(res['phone_auth']=='1'){
        window.localStorage.setItem('phone_status','Conntected')
      }else{
        window.localStorage.setItem('phone_status','Not Conntected')
      }
      this.service.setBalance(res['balance']);
      this.service.setTopUp(res['top_up'])
      this.service.setTopDown(res['top_down'])
    })

  }

  check_account_activation(){
    this.user_id = window.localStorage.getItem('user_id')
    this.service.check_account_activation(this.user_id).subscribe(res=>{
      console.log(res)
      this.service.setActiveStatus(res['result']);
    })
  }

     async top_up() {
         this.appcomponent.upSlide('deposit-funds')  
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

  ngOnInit() {
    this.skelton.push(1,2);
    this.user_id = window.localStorage.getItem('user_id')

    this.service.flip_property_list(this.user_id).subscribe(res=>{
      console.log(res)
      this.data_loading = false
      this.flip_properties = res['property']
      for(let i=0;i<res['property'].length;i++){
        this.flip_ids.push(res['property'][i].id)
       }
      // this.flip_last_id = this.flip_properties[this.flip_properties.length - 1].id
    }) 
  }
  load_more_flip_(event){
    setTimeout(() => {
     this.loading_more = true;
    this.service.load_more_flip(this.flip_ids,this.user_id).subscribe(res=>{
      console.log(res)
      if(res['property']==undefined){
        event.target.disabled = true
        this.loading_more = false
        this.no_data = true;
      }
      else{
        for(let i=0;i<res['property'].length;i++){
        this.flip_properties.push(res['property'][i])
        this.search = this.flip_properties
        event.target.complete();
         this.loading_more = false
       }
          for(let i=0;i<res['property'].length;i++){
            this.flip_ids.push(res['property'][i].id)
           }
       }
    })
  }, 500);
  }
  residual(){
    this.service.property_list(this.user_id).subscribe(res=>{
      console.log(res)
      this.properties = res['property']
      this.search = this.properties
       for(let i=0;i<res['property'].length;i++){
        this.residual_ids.push(res['property'][i].id)
       }
    })
  }
  load_more_residual_(event){
    setTimeout(() => {
     this.loading_more1 = true;
     this.service.load_more_residual(this.residual_ids,this.user_id).subscribe(res=>{
      console.log(res)
      if(res['property']==undefined){
       event.target.disabled = true
       //this.no_data = true
       this.loading_more1 = false
      }
      else{
        for(let i=0;i<res['property'].length;i++){
        this.properties.push(res['property'][i])
        this.search = this.properties
         event.target.complete();
         this.loading_more = false
       }
          for(let i=0;i<res['property'].length;i++){
            this.residual_ids.push(res['property'][i].id)
          }
       }
    })
  }, 500);
  }
  home(page){
    this.service.setBackPage('home')
   // this.navCtrl.navigateForward('home', { animated: false, });
  }
  portfolio(page){
    this.service.setBackPage('home')
    this.appcomponent.leftSlide(page)
    // this.navCtrl.navigateForward('portfolio', { animated: false, });
  }
  inves(page){
    this.service.setBackPage('home')
    this.appcomponent.leftSlide(page)
    // this.navCtrl.navigateForward('new-investments', { animated: false, });
  }
  flip(page){
    this.service.setBackPage('home')
    this.appcomponent.leftSlide(page)
  //  this.navCtrl.navigateForward('flip', { animated: false, });
  }
  profile(page){
    this.service.setBackPage('home')
    this.appcomponent.leftSlide(page)
   // this.navCtrl.navigateForward('profile', { animated: false, });
  }
  logout(){
    this.appcomponent.presentAlertConfirm()
  }
  swipeNext(){
    this.slides.slideNext();
    this.slides.getActiveIndex().then(id => {
      let index= id+1
      if(index%3==0){
        this.load_more_residual()
       }
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
    this.slides1.getActiveIndex().then(id => {
      let index = id+1
      if(index%3 == 0){
       this.load_more_flip()
      }
      if(index<10){
        this.active_index1 = '0'+index
      }
   });
  }
  swipePrev1(){
    this.slides1.slidePrev();
    this.slides1.getActiveIndex().then(id => {
      let index= id+1
      if(index<10){
        this.active_index1 = '0'+index
      }
    });
  }
  slideChanged(e: any) {
    this.slides.getActiveIndex().then((id: number) => {
        console.log(id);
        let index = id+1
        if(index % 3 == 0){
          this.load_more_residual()
         }
    });
}
  slideChanged1(e: any) {
    this.slides1.getActiveIndex().then((id: number) => {
        console.log(id);
        let index = id+1
        if(index % 3 == 0){
          this.load_more_flip()
         }
    });
}
  
  load_more_flip(){
    this.load_flip = true
    this.service.load_more_flip(this.flip_ids,this.user_id).subscribe(res=>{
      console.log(res)
        if(res['property']!=undefined){
        for(let i=0;i<res['property'].length;i++)
          this.flip_properties.push(res['property'][i])
          this.search = this.flip_properties
          this.load_flip = false
          for(let i=0;i<res['property'].length;i++){
            this.flip_ids.push(res['property'][i].id)
          }
         }else{
          this.load_flip = false
        }
    })
  }
  load_more_residual(){
    this.service.load_more_residual(this.residual_ids,this.user_id).subscribe(res=>{
      console.log(res)
        if(res['property']!=undefined){
        for(let i=0;i<res['property'].length;i++)
          this.properties.push(res['property'][i])
          for(let i=0;i<res['property'].length;i++){
            this.residual_ids.push(res['property'][i].id)
           }
       }else{
        this.load_flip = false
       }
    })
  }
  ScrollToBottom() {
    this.content.scrollToBottom(0);
  }
  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val)
    if (val && val.trim() != '') {
      this.properties = this.search.filter((data) => {
        return (data.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }) 
    }else{
      this.properties = this.search
    }
  }
  fvt(i,id){
    this.properties[i].like = true;
    this.service.add_item_wishlist(this.user_id,id,'0').subscribe(res=>{
      console.log(res)
    })
  }
  un_fvt(i,id){
    this.properties[i].like = false;
    this.service.remove_item_wishlist(this.user_id,id,'0').subscribe(res=>{
      console.log(res)
    })
  }
  fvt_flip(i,id){
    this.flip_properties[i].like = true;
    this.service.add_item_wishlist(this.user_id,id,'0').subscribe(res=>{
      console.log(res)
    })
  }
  un_fvt_flip(i,id){
    this.flip_properties[i].like = false;
    this.service.remove_item_wishlist(this.user_id,id,'0').subscribe(res=>{
      console.log(res)
    })
  }
  prop_detail(property,transaction){
    this.service.setPropertyDetail(property,transaction)
    this.service.setDetailBackPage('home')
    this.service.set_invest_from('home')
    this.appcomponent.upSlide('property-detail')
  }
  flip_detail(property,transaction){
    this.service.setFlipDetail(property,transaction)
    this.service.setDetailBackPage('home')
    this.appcomponent.upSlide('flip-detail')
  }
  setting(){
    this.service.setSettingBackPage('home')
    this.appcomponent.leftSlide('setting')
  }
  noti(){
    this.service.setSettingBackPage('home')
    this.appcomponent.upSlide('notification')
  }
}
