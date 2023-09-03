import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component'
import { ApiService } from '../../api/api.service';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  curr_pass:any
  new_pass:any
  loading:any
  user_id:any
  c_pass:any
  constructor(public appcomponent:AppComponent,
    public toast:Toast,
    public service:ApiService) { }

  ngOnInit() {
  }
  close(){
    this.appcomponent.downSlidePre('profile')
  }
  update_pass(){
    this.user_id = window.localStorage.getItem('user_id')
    if(this.curr_pass == undefined){
      this.toast_('Please Enter Current Password')
    }else if(this.new_pass == undefined){
      this.toast_('Please Enter New Password')
    }else if(this.c_pass == undefined){
      this.toast_('Please Enter Confirm Password')
    }else{
      if(this.new_pass!=this.c_pass){
        this.toast_('Password does not match')
    }else{
    this.loading = true;
    this.service.update_password(this.user_id,this.curr_pass,this.new_pass).subscribe(res=>{
        console.log(res)
        this.loading = false
        if(res['result']==false){
          this.toast_(res['message'])
        }else{
          this.toast_('Updated successfully!');
        }
      })
    }
  }
}
toast_(message){
  this.toast.show(message, '3000', 'bottom').subscribe(
    toast => {
      console.log(toast);
    })
}
}
