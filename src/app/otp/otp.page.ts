import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { AppComponent } from '../app.component'
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  loading: boolean;
  validations_form: FormGroup;
  otp:any
  user_id:any
  ios_header:any
  username:any
  constructor(public formBuilder: FormBuilder,
    public router:Router,
    public statusbar:StatusBar,
    public service:ApiService,
    public appcomponent:AppComponent,
    public toastController:ToastController,) { 
      let check = window.localStorage.getItem('phone-model')
      this.username = window.localStorage.getItem('full_name')
      if(check=='10'){
       this.ios_header = true;
     }else{
       this.ios_header = false
     }
     this.statusbar.hide()
    }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      otp: new FormControl('', Validators.required),
    });
  }
  validation_messages = {
    'otp': [
      { type: 'required', message: 'OTP is required.' }
    ],
  }
  ionViewDidEnter(){
    this.user_id =  window.localStorage.getItem('user_id')
    console.log(this.user_id)
  }
  onSubmit(values){
    this.otp = window.localStorage.getItem('otp')
    this.user_id =  window.localStorage.getItem('user_id')
    this.otp = window.localStorage.getItem('otp')
    if(parseInt(values.otp) != this.otp){
      this.showmessage('Please Enter Correct Code')
    }else{
      this.service.update_email_auth(this.user_id).subscribe(res=>{
        console.log(res)
        window.localStorage.setItem('email_auth','Connected')
      })
    this.router.navigate(['setting'])
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

    resend_otp(){
      this.service.resend_otp().subscribe(res=>{
        console.log(res)
        this.otp = res['otp']
        this.showmessage1('Please check your email.OTP has been sent to your email.')
      })
    }
    async showmessage1(message){
      var toast = await this.toastController.create({
        message: message,
        color:'success',
        cssClass:'toast-alert',
        duration: 3000
      });
      toast.present();
     
      }
      back(){
        this.appcomponent.downSlidePre('email')
      }
}
