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
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {
  _currentPlatform:any
  active_index:any
  active_index1:any
  properties:any=[]
  search:any=[]
  intial_invest:any
  balance:any
  ios_header:any
  user_id:any
  data_loading:Boolean=true
  slideOptsOne:{}
  lazy_image:any
  skelton:any=[]
  residual_ids:any=[]
  loading_more:any
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
    this.balance = this.service.getBalance()
    this.user_id = window.localStorage.getItem('user_id')
    this.lazy_image = 'assets/images/lazy_load.gif' 
   }

   ionViewDidEnter(){
    this.statusbar.hide();
    this.service.property_list(this.user_id).subscribe(res=>{
      console.log(res)
      this.properties = res['property']
      this.search = this.properties
      for(let i=0;i<res['property'].length;i++){
        this.residual_ids.push(res['property'][i].id)
       }
      this.data_loading=false
    })
  }

  ngOnInit() {
    this.skelton.push(1,2,3);
  }
  home(page){
    this.service.setBackPage('portfolio')
    this.appcomponent.downSlidePre(page)
  }
  inves(page){
    this.service.setBackPage('portfolio')
    this.appcomponent.downSlidePre(page)
  }
  portfolio(page){
    this.service.setBackPage('portfolio')
    this.appcomponent.leftSlide(page)
  }

  flip(page){
    this.service.setBackPage('portfolio')
    this.appcomponent.leftSlide(page)
  }
  profile(page){
    this.service.setBackPage('portfolio')
    this.appcomponent.leftSlide(page)
  }

  load_more_residual_(event){
    setTimeout(() => {
     this.loading_more = true;
    this.service.load_more_residual(this.residual_ids,this.user_id).subscribe(res=>{
      console.log(res)
      if(res['property']==undefined){
        event.target.disabled = true
        this.loading_more = false
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
  prop_detail(property,transaction){
    console.log(property)
    this.service.setPropertyDetail(property,transaction)
    this.service.setDetailBackPage('portfolio')
    this.appcomponent.upSlide('property-detail')
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
        this.service.setSettingBackPage('portfolio')
        this.appcomponent.leftSlide('setting')
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
      noti(){
        this.service.setSettingBackPage('portfolio')
        this.appcomponent.upSlide('notification')
      }
}