import { Component, OnInit } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-funds-request',
  templateUrl: './funds-request.page.html',
  styleUrls: ['./funds-request.page.scss'],
})
export class FundsRequestPage implements OnInit {
  ios_header:any
  email_address:any
  memo:any
  amount:any
  loading:any
  user_id:any
  constructor(public service:ApiService,
    public appcomponent:AppComponent,                            
    public router:Router,
    public toast:Toast,) { 
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
  }

  ngOnInit() { }
  
  close(){
    this.appcomponent.downSlidePre('transaction')
  }
  next(){
    this.user_id = window.localStorage.getItem('user_id')
    console.log(this.user_id)
    if(this.email_address==undefined){
      this.toast_('Please Enter Email Address')
    }else if(this.amount==undefined){
      this.toast_('Please Enter Amount')
    }else if(this.memo==undefined){
      this.toast_('Please Enter Memo')
    }else{
      this.loading = true
      this.service.request_fund(this.user_id,this.email_address,this.amount,this.memo).subscribe(res=>{
        console.log(res)
        this.loading = false
        console.log(res['error'])
        if(res['error']==0){
          this.toast_('Email Sent Successfully')
          this.router.navigate(['transaction'])
        }else{
          this.toast_('Something wrong')
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
