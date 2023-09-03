import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-share-referral',
  templateUrl: './share-referral.page.html',
  styleUrls: ['./share-referral.page.scss'],
})
export class ShareReferralPage implements OnInit {
  referral:any
  email:any
  user_id:any
  loading:any
  loading1:any
  constructor(public modalcontroller:ModalController,
    public service:ApiService,                            
    public router:Router,
    public toast:Toast,
    public navprams:NavParams) { 
      this.referral = this.navprams.data
      console.log(this.referral)
    }

  ngOnInit() {
  }

  close(){
    this.modalcontroller.dismiss()
  }
  share(){
    this.user_id = window.localStorage.getItem('user_id')
    if(this.email==undefined){
      this.toast_('Please Enter Email Address')
    }else{
      this.loading = true
    this.service.referral_email(this.user_id,this.email).subscribe(res=>{
      console.log(res)
      this.loading = false
      if(res['error']=0){
        this.toast_('Email Sent Successfully')
        this.modalcontroller.dismiss()
      }else{
        this.toast_('Something Wrong')
      }
    })
  }
  }
  toast_(message){
    this.toast.show(message, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
  }
}
