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
import { IonInfiniteScroll } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-flip',
  templateUrl: './flip.page.html',
  styleUrls: ['./flip.page.scss'],
})
export class FlipPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  _currentPlatform:any
  active_index:any
  active_index1:any
  properties:any=[]
  search:any=[]
  intial_invest:any
  balance:any
  active_index_item:any
  data_loading:Boolean=true
  loading_more:Boolean=false
  slideOptsOne:{
    
  }
  skelton:any=[]
  flip_ids:any=[]
  lazy_image:any
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public rows: Object;
  public axes: Object;
  ios_header:any
  user_id:any
  title:any
  address:any
  img:any
  total_size:any
  offering_price:any
  size:any
  invest_property:any
  transaction:any
  share_id:any
  constructor(public navCtrl: NavController,public platform: Platform,
    public statusbar:StatusBar,
    public service:ApiService,
    public modalController:ModalController,
    public appcomponent:AppComponent,
    public router:Router) {
    if (this.platform.is('ios')) {
      this._currentPlatform = 'ios';
    } else {
      this._currentPlatform = 'android';
    }
    this.balance = this.service.getBalance()
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
    this.lazy_image = 'assets/images/lazy_load.gif'
    this.active_index_item = '0'
   }
   ionViewDidEnter(){
    this.statusbar.hide();
    this.user_id = window.localStorage.getItem('user_id')
    
  this.service.flip_property_(this.user_id).subscribe(res=>{
    console.log(res)
    this.properties = res['property']
    this.data_loading=false
    this.title = res['property'][0]['title']
    this.address = res['property'][0]['address']
    this.img = res['property'][0]['img']
    this.offering_price = res['property'][0]['property_price_per_share']
    this.size = res['property'][0]['size']
    this.invest_property = res['property'][0];
    this.transaction = res['property'][0].transaction
    this.share_id = res['property'][0].sell_share_id
    window.localStorage.setItem('total_price_per_share_flip',res['property'][0]['share_price'])
    window.localStorage.setItem('ivestment_amount_flip',res['property'][0]['available_price'])
    console.log(window.localStorage.getItem('total_price_per_share_flip'))
   })
  }
  ngOnInit() {
    this.skelton.push(1,2,3);
  }
 
  home(page){
    this.service.setBackPage('flip')
    this.appcomponent.downSlidePre(page)
  }
  inves(page){
    this.service.setBackPage('flip')
    this.appcomponent.downSlidePre(page)
  }
  portfolio(page){
    this.service.setBackPage('flip')
    this.appcomponent.downSlidePre(page)
  }

  flip(page){
    this.service.setBackPage('flip')
    this.appcomponent.leftSlide(page)
  }
  profile(page){
    this.service.setBackPage('flip')
    this.appcomponent.leftSlide(page)
  }



  
  load_more_flip_(event){
    setTimeout(() => {
     this.loading_more = true;
    this.service.load_more_flip(this.flip_ids,this.user_id).subscribe(res=>{
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
            this.flip_ids.push(res['property'][i].id)
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
    this.service.setFlipDetail(property,transaction)
    this.service.setDetailBackPage('flip')
    this.appcomponent.upSlide('flip-detail')
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
      logout(){
        this.appcomponent.presentAlertConfirm()
      }
      setting(){
        this.service.setSettingBackPage('flip')
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
        this.service.setSettingBackPage('flip')
        this.appcomponent.upSlide('notification')
      }
      close(){
        let page = this.service.getBackPage()
        this.appcomponent.downSlidePre('home')
      }
      active_item(i,property){
        console.log(i)
        this.active_index_item = i
        this.title = property.title
        this.address = property.address
        this.img = property.img
        this.offering_price = property.property_price_per_share
        this.size = property.size
        this.invest_property = property
        this.transaction = property.transaction
        this.share_id = property.sell_share_id
        window.localStorage.setItem('total_price_per_share_flip',property.share_price)
        window.localStorage.setItem('ivestment_amount_flip',property.amount)

      }
      invest(){
        this.service.setPropertyDetail(this.invest_property,this.transaction)
        this.service.setDetailBackPage('flip')
        this.service.set_invest_from('flip')
        console.log(this.share_id)
        window.localStorage.setItem('share_id',this.share_id)
        this.appcomponent.upSlide('property-detail')
      }
}
