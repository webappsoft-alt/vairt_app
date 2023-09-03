import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    ios_header:any
    pic:any
    user_id:any
    full_name:any
    constructor(public appcomponent:AppComponent,
      public service:ApiService, ) { 
      this.pic='assets/images/default.svg'
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
    }
    ngOnInit() {
      this.user_id = window.localStorage.getItem('user_id')
      this.service.profile(this.user_id).subscribe(res=>{
        console.log(res)
        this.full_name = res['profile']['user_fname']+' '+res['profile']['user_lname']
        this.service.setProfileData(res['profile'])
        this.service.setPurchaseData(res['purchase_detail'])
        if(res['profile'].user_photo == 'https://propuae.com/vairt/uploads/'){
          this.pic = 'assets/images/default.svg'
        }else{
          this.pic = res['profile'].user_photo
        }
  
      })
    }
    ionViewDidEnter(){
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
    }
    close(){
      let page = this.service.getBackPage()
      console.log(page)
      this.appcomponent.downSlidePre(page)
    }
    edit(){
      this.appcomponent.upSlide('edit-profile');
    }
    move(page){
      this.appcomponent.leftSlide(page);
    }
  
}
