import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Toast } from '@ionic-native/toast/ngx';
import { ApiService } from '../api/api.service';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-support-view',
  templateUrl: './support-view.page.html',
  styleUrls: ['./support-view.page.scss'],
})
export class SupportViewPage implements OnInit {
  ios_header:any
  title:any
  priority:any
  message:any
  pic:any
  comment:any
  des:any
  comments:any=[]
  user_id:any
  support_id:any
  constructor(public router:Router,
    public toast:Toast,
    public appcomponent:AppComponent,
    public service:ApiService,) { 
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
   this.title =  this.service.getSupportView().title
   this.priority = this.service.getSupportView().priority
   this.des = this.service.getSupportView().des
   this.pic = this.service.getSupportView().image
   this.support_id = this.service.getSupportView().id
   if(this.pic=='https://propuae.com/vairt/uploads/'){
     this.pic = 'assets/images/not-found.png';
   }
  }

  ngOnInit() {
  }
  back(){
    this.appcomponent.downSlide()
  }
  ionViewDidEnter(){
    console.log(this.support_id)
    this.service.get_support_comment(this.support_id).subscribe(res=>{
      console.log(res)
      this.comments = res['comment'];
    })
  }
  send_comment(){
   let name =  window.localStorage.getItem('full_name')
   this.user_id = window.localStorage.getItem('user_id')
   if(this.comment==undefined){
    this.toast_('Please Enter comment')
   }else{
   var currentdate = new Date(); 
   var datetime = currentdate.getFullYear() + "-"  
                + currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + " " 
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    if(this.comments==undefined){this.comments=[]} 
    this.comments.push({comments:this.comment,username:name,datetime:datetime})
    
    this.service.support_comment(this.support_id,this.user_id,this.comment,name,datetime).subscribe(res=>{
      console.log(res)
      this.comment = '';

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
