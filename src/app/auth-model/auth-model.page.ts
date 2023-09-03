import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-auth-model',
  templateUrl: './auth-model.page.html',
  styleUrls: ['./auth-model.page.scss'],
})
export class AuthModelPage implements OnInit {
  user_id:any
  code:any
  status:any
  loading:any
  status_value:any
  column_name:any
  constructor(public modalController:ModalController,
    public toast:Toast,
    public service:ApiService,
    public navprams:NavParams,
    ) { 
      this.status = this.navprams.data.status;
      this.column_name = this.navprams.data.column_name;
      console.log(this.column_name)
      if(this.status == false){ 
        this.status_value = 0
      }else { 
        this.status_value = 1
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
      this.service.google_auth_on(this.code,this.user_id).subscribe(res=>{
        console.log(res)
        this.loading = false
        if(res['code']=='OK'){
          this.toast_('Authenticated Successfully')
          this.service.set_security(this.user_id,this.column_name,this.status_value).subscribe(res=>{
            console.log(res)
          })
          this.modalController.dismiss(true);
        }else{
          this.toast_('Authentication Failed')
        }
      })
     
    }
  }
  dismiss(){
    this.modalController.dismiss(false)
  }

  toast_(message){
    this.toast.show(message, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
  }

}
