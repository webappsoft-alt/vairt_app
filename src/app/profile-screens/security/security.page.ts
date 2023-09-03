import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ApiService } from '../../api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthModelPage } from 'src/app/auth-model/auth-model.page';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
  login_security:any
  trans_security:any
  session_security:any
  send_email_security:any
  ip_address_security:any
  user_id:any
  qr_code:any
  secret:any
  constructor(public service:ApiService,
    public appcomponent:AppComponent,
    public modalController:ModalController,) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.user_id = window.localStorage.getItem('user_id')
    this.service.gen_qr_code(this.user_id).subscribe(res=>{
      console.log(res)
      this.qr_code = res['chart']
      this.secret = res['secret']
    })
    this.service.get_security(this.user_id).subscribe(res=>{
      console.log(res)
      if(res['result']==true){
        if(res['security']['s_login']==0){ this.login_security = false} else {this.login_security = true}
        if(res['security']['s_withdrawl']==0){ this.trans_security = false} else {this.trans_security = true}
        if(res['security']['s_session']==0){ this.session_security = false} else {this.session_security = true}
        if(res['security']['s_email']==0){ this.send_email_security = false} else {this.send_email_security = true}  
      }
    })
  }
  login_sec(){
    this.auth_model(this.login_security,'s_login')
}
trans_sec(){
  this.auth_model(this.trans_security,'s_withdrawl')
}
session_alive(){
  if(this.session_security==true){
  this.service.set_security(this.user_id,'s_session','1').subscribe(res=>{
    console.log(res)
  })
}else{
  this.service.set_security(this.user_id,'s_session','0').subscribe(res=>{
    console.log(res)
  })
}
}
send_email_sec(){
  if(this.send_email_security==true){
    this.service.set_security(this.user_id,'s_email','1').subscribe(res=>{
      console.log(res)
    })
  }else{
    this.service.set_security(this.user_id,'s_email','0').subscribe(res=>{
      console.log(res)
    })
  }
}
async auth_model(status,column_name){
  const modal = await this.modalController.create({
    component: AuthModelPage,
    cssClass:'auth_',
    componentProps:{qr_code:this.qr_code,secret:this.secret,status:status,column_name:column_name}
  });

  modal.onDidDismiss().then((res) => {
    console.log(res)
  });
  return await modal.present();
}
close(){
  this.appcomponent.downSlidePre('profile')
}
}
