import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AppComponent } from '../app.component';
import { ModalController, NavParams } from '@ionic/angular';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { LiquidateModalPage } from '../liquidate-modal/liquidate-modal.page';

@Component({
  selector: 'app-purchased-property',
  templateUrl: './purchased-property.page.html',
  styleUrls: ['./purchased-property.page.scss'],
})
export class PurchasedPropertyPage implements OnInit {
  address:any
  property_title:any
  baths:any
  size:any
  beds:any
  prop_img:any
  property_id:any
  user_id:any
  property:any
  transaction:any
  balance:any
  purchase_price:any
  share:any
  income:any
  ios_header:any
  purchaser_id:any
  constructor(public service:ApiService,
    private modalController: ModalController,
    public appcomponent:AppComponent) { 
    console.log(this.service.get_purchase_complete())
    this.size = 25000;
    this.address = this.service.get_purchase_complete().address
    this.property_title = this.service.get_purchase_complete().property_title
    this.beds = this.service.get_purchase_complete().beds
    this.baths = this.service.get_purchase_complete().baths
    this.size = this.service.get_purchase_complete().size
    this.prop_img = this.service.get_purchase_complete().property_images[0]
    this.property_id = this.service.get_purchase_complete().property_id
    this.purchase_price = this.service.get_purchase_complete().price
    this.share = this.service.get_purchase_complete().shares
    this.purchaser_id = this.service.get_purchase_complete().purchaser_id
    this.balance = this.service.getBalance()
    this.user_id = window.localStorage.getItem('user_id')
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
  }

  ngOnInit() {
    this.service.purchase_complete_property(this.property_id,this.user_id).subscribe(res=>{
      console.log(res)
      this.property = res['property'][0]
      this.transaction = res['property'][0].transaction
      this.income = res['transaction'][0].deposit_amount
    })
  }

  back(){
    this.appcomponent.downSlidePre('new-investments')
  }
  
  document(){
    this.service.setPropertyDetail(this.property,this.transaction)
    this.service.setDetailBackPage('purchased-property')
    this.appcomponent.upSlide('property-detail')
  }
  async liquidate(){
    const modal = await this.modalController.create({
      component: LiquidateModalPage,
      cssClass:'center_modal1',
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps:{
        share:this.share,
        price:this.purchase_price,
        purchaser_id:this.purchaser_id
      }
      })
      modal.onDidDismiss().then((res) => {
        console.log(res)
       
      });
      return await modal.present(); 
  }
}
