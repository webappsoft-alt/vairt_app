import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ApiService } from '../../api/api.service';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.page.html',
  styleUrls: ['./reference.page.scss'],
})
export class ReferencePage implements OnInit {
  loading:any
  referral:any
  user_id:any
  constructor(public service:ApiService,
    public toast:Toast,
    public appcomponent:AppComponent) { }

  ngOnInit() {
  }
  close(){
    this.appcomponent.downSlidePre('profile')
  }
  refferal_save(){
    this.user_id = window.localStorage.getItem('user_id')
    var regex = new RegExp("^[0-9a-zA-Z\b ]+$");
    
    var regex1 = this.referral.replace(/\s/g);
    var substring = undefined;  
    let check = regex1.indexOf(substring) !== -1
    
    if (regex.exec(this.referral) == null) {
       this.toast_('Please remove special characters')
    } 
    else if(check==true){ 
      this.toast_('Please remove white space') 
   }
    else{
     this.loading = true
      this.service.save_refferal(this.user_id,this.referral).subscribe(res=>{
           console.log(res)
           this.loading = false
         if(res['result']==false){
           this.toast_('Name already exist');
         }else{
           this.toast_('Updated successfully')
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
