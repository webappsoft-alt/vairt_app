import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'
import { Toast } from '@ionic-native/toast/ngx';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  loading:any
  email:any
  constructor( public appcomponent:AppComponent,
    public service:ApiService,
    public toast:Toast,
    ) { }

  ngOnInit() {
  }
  close(){
    this.appcomponent.downSlidePre('login')
  }
  next(){
    if(this.email == undefined){
      this.toast_('Email Already Exist, Please register with new Email');
    }else{
      this.loading = true
      this.service.forgot_password(this.email).subscribe(res=>{
        console.log(res)
        if(res['result']==false){
          this.toast_(res['message'])
        }else{
          this.loading = false
          this.toast_(res['message'])
          this.appcomponent.downSlidePre('login')
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
