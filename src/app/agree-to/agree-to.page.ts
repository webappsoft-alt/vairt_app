import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ModalController, ToastController } from '@ionic/angular';
import { AgreeTcPage } from '../agree-tc/agree-tc.page';

@Component({
  selector: 'app-agree-to',
  templateUrl: './agree-to.page.html',
  styleUrls: ['./agree-to.page.scss'],
})
export class AgreeToPage implements OnInit {
agree:any
ios_header:any
loading:any

constructor(public router:Router,
  public toastController:ToastController,
  public modalController:ModalController) { 
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
  }

  ngOnInit() {
  }
  next(){
    if(this.agree==true){
    this.router.navigate(['home'])
    }else{
      this.showmessage('Please select Agree')
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
  async current_income_model(){
    const modal = await this.modalController.create({
      component: AgreeTcPage,
      cssClass:'country_list'
    });

    modal.onDidDismiss().then((res) => {
      console.log(res)
    });
    return await modal.present();
}
agree_(){
  if(this.agree==true){
    this.current_income_model()
  }
}
}
