import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { LiquidatePasswordPage } from '../liquidate-password/liquidate-password.page';

@Component({
  selector: 'app-liquidate-modal',
  templateUrl: './liquidate-modal.page.html',
  styleUrls: ['./liquidate-modal.page.scss'],
})
export class LiquidateModalPage implements OnInit {
  share:any
  price:any
  constructor(
    private modalController: ModalController,
    public navPrams:NavParams) { 
      console.log(this.navPrams.data)
      this.share = this.navPrams.data.share
      this.price = this.navPrams.data.price
    }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss()
  }
  async liq(){
    this.modalController.dismiss()
    const modal = await this.modalController.create({
      component: LiquidatePasswordPage,
      cssClass:'center_modal2',
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps:{
        share:this.share,
        price:this.price,
        purchaser_id:this.navPrams.data.purchaser_id
      }
      })
      modal.onDidDismiss().then((res) => {
        console.log(res)
       
      });
      return await modal.present(); 
  }
}
