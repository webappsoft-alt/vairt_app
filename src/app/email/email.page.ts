import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { AppComponent } from '../app.component'
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {
  loading: boolean;
  validations_form: FormGroup;
  otp:any
  user_id:any
  ios_header:any
  username:any
  email:any
  constructor(public formBuilder: FormBuilder,
    public router:Router,
    public statusbar:StatusBar,
    public appcomponent:AppComponent,
    public service:ApiService,
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
        email: new FormControl('', Validators.required),
      });
    }
    validation_messages = {
      'email': [
        { type: 'required', message: 'Email is required.' }
      ],
    }
    ionViewDidEnter(){
      this.user_id =  window.localStorage.getItem('user_id')
      this.email = window.localStorage.getItem('email')
    }
    onSubmit(values){
      // this.otp = window.localStorage.getItem('otp')
      this.user_id =  window.localStorage.getItem('user_id')
      console.log(this.email)
      this.loading = true
        this.service.check_email(this.email).subscribe(res=>{
          console.log(res)
          this.loading = false
          if(res['result']==true){
            window.localStorage.setItem('otp',res['otp'])
          this.appcomponent.leftSlide('otp')
          this.showmessage1('OTP has been sent to your email please check your email');
        }else{
          this.showmessage('Email incorrect')
        }
      })  
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
          this.appcomponent.downSlidePre('setting')
        }
}
