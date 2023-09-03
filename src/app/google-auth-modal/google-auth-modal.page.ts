import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { Toast } from '@ionic-native/toast/ngx';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-google-auth-modal',
  templateUrl: './google-auth-modal.page.html',
  styleUrls: ['./google-auth-modal.page.scss'],
})
export class GoogleAuthModalPage implements OnInit {
  ios_header:any
  qr_code:any
  secret:any
  code:any
  user_id:any
  image:any
  loading:any
  loading1:any
  constructor(public modalController:ModalController,
    public navprms:NavParams,
    public toast:Toast,
    public appcomponent:AppComponent,
    public service:ApiService) {
    let check = window.localStorage.getItem('phone-model')
    this.qr_code = this.navprms.data.qr_code
    this.loading1 = true
    setTimeout(() => {
     this.loading1 = false
     }, 3000);
    this.secret = this.navprms.data.secret
    this.image = 'assets/images/spinner.gif'
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
   }

  ngOnInit() {
  }
  auth(){
    this.user_id = window.localStorage.getItem('user_id')
    if(this.code == undefined){
      this.toast_('Please Enter code')
    }else{
      this.loading = true
    this.service.google_auth(this.secret,this.code,this.user_id).subscribe(res=>{
      console.log(res)
      this.loading = false
      if(res['code']=='OK'){
        this.toast_('Authenticated Successfully')
        this.modalController.dismiss();
      }else{
        this.toast_('Authentication Failed')
      }
    })
  }
  }
  dismiss(){
    this.modalController.dismiss()
  }
  toast_(message){
    this.toast.show(message, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
  }
  close(){
    this.appcomponent.downSlide()
  }
}
