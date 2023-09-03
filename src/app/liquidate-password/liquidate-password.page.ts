import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-liquidate-password',
  templateUrl: './liquidate-password.page.html',
  styleUrls: ['./liquidate-password.page.scss'],
})
export class LiquidatePasswordPage implements OnInit {
  password:any
  user_id:any
  loading:any
  constructor(private modalController: ModalController,
    public toastController:ToastController,
    public navprams:NavParams,
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    public service:ApiService) { 
      console.log(this.navprams.data.purchaser_id)
    }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss()
  }
  next(){
    if(this.password==undefined){
      this.showmessage('Please enter your vairt password','danger')
    }else{
      this.loading = true
      this.user_id = window.localStorage.getItem('user_id')
      this.service.check_password(this.user_id,this.password,
        this.navprams.data.share,this.navprams.data.price,
        this.navprams.data.purchaser_id).subscribe(res=>{
        console.log(res)
        this.loading = false
        if(res['result']==false){
          this.showmessage('Your password is incorrect','danger')
        }else{
          this.modalController.dismiss()
          this.showmessage('Liquidated Successfully','success')
        }
      })
    }
  }
  async showmessage(message,color){
    var toast = await this.toastController.create({
      message: message,
      color:color,
      cssClass:'toast-alert',
      duration: 3000
    });
    toast.present();
   
    }
    leftSlide(page) {
      let options: NativeTransitionOptions = {
        direction: 'left',
        duration: 400,
        slowdownfactor: -1,
        iosdelay: 0,
      }
      this.nativePageTransitions.slide(options)
      this.navCtrl.navigateRoot(page);
    }
}
