import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AuthModelPage } from '../auth-model/auth-model.page';
import { ModalController, NavParams } from '@ionic/angular';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: boolean;
  validations_form: FormGroup;
  isKeyboardHide:any
  constructor(public formBuilder: FormBuilder,
    public router:Router,
    public zone: NgZone,
    public toastController:ToastController,
    private keyboard: Keyboard,
    public modalController:ModalController,
    public appcomponent:AppComponent,
    public service:ApiService) {
      this.isKeyboardHide=true;
    }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    })
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
    ],
  }
  onSubmit(values){
    this.loading=true
    console.log(values.password)

    this.service.login(values.email,values.password).subscribe(res=>{
      console.log(res)
      let data = this.service.getDeviceData();
      console.log(data)
      if(data!=undefined){
      this.service.device_registration(data.model,data.platform,data.token,res['user_id']).subscribe(res=>{
        console.log(res)
      })
     }
      if(res['result']==false){
        this.loading=false
        this.showmessage(res['message'])
      }else{
      window.localStorage.setItem('user_id',res['user_id'])
      window.localStorage.setItem('full_name',res['full_name'])
      window.localStorage.setItem('email',res['email'])
      this.loading=false
      this.service.login_email(res['user_id']).subscribe(res=>{
        console.log(res)
      })
      if(res['2FA']==true){
        this.auth_model()
      }else{
        this.appcomponent.leftSlide('home')
      }
    }
    })
   
  }
  async auth_model(){
    const modal = await this.modalController.create({
      component: AuthModelPage,
      cssClass:'auth_',
      componentProps:{status:'true',column_name:'s_login'}
    });

    modal.onDidDismiss().then((res) => {
      console.log(res)
       if(res.data!=false){
        //this.router.navigate(['home'])
        this.appcomponent.leftSlide('home')
       }
    });
    return await modal.present();
  }
  signup(){
    this.appcomponent.leftSlide('signup')
  }
  ionViewWillEnter() {
    this.keyboard.onKeyboardWillShow().subscribe(()=>{
      this.zone.run(() => {
      this.isKeyboardHide=false;
      })
      // console.log('SHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(()=>{
      this.zone.run(() => {
      this.isKeyboardHide=true;
      })
      // console.log('HIDEK');
    });
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
    forgot(){
      this.appcomponent.leftSlide('forgot-password')
    }
}
