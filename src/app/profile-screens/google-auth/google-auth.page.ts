import { Component, OnInit } from '@angular/core';
import { GoogleAuthModalPage } from '../../google-auth-modal/google-auth-modal.page';
import { ModalController, NavParams } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { ApiService } from '../../api/api.service';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.page.html',
  styleUrls: ['./google-auth.page.scss'],
})
export class GoogleAuthPage implements OnInit {
  user_id:any
  qr_code:any
  secret:any
  phone:any
  loading:any
  constructor(public appcomponent:AppComponent,
    public modalController:ModalController,
    public toast:Toast,
    public service:ApiService) {
      let data = this.service.getProfileData();
      this.phone = data.user_mobile
     }

  ngOnInit() {
    this.user_id = window.localStorage.getItem('user_id')
    this.service.gen_qr_code(this.user_id).subscribe(res=>{
      console.log(res)
      this.qr_code = res['chart']
      this.secret = res['secret']
    })
  }

  async google_auth() {
    const modal = await this.modalController.create({
      component: GoogleAuthModalPage,
      cssClass:'country_list',
      componentProps:{qr_code:this.qr_code,secret:this.secret}
    });

    modal.onDidDismiss().then((res) => {
      console.log(res)
    });
    return await modal.present();
  }
  phone_save(){
    this.loading = true
    this.service.update_phone(this.user_id,this.phone).subscribe(res=>{
      console.log(res)
      this.loading =false
      this.toast_('Updated Successfully');
    })
  }
  toast_(message){
    this.toast.show(message, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
  }
  back(){
    this.appcomponent.downSlidePre('profile')
  }
  close(){
    this.appcomponent.downSlidePre('profile')
  }
}

