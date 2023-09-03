import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-employment-info',
  templateUrl: './employment-info.page.html',
  styleUrls: ['./employment-info.page.scss'],
})
export class EmploymentInfoPage implements OnInit {
  employment_status:any
  business_name:any
  title:any
  business_type:any
  user_id:any
  name:any
  status:any
  self_employed:any
  student:any
  retired:any
  not_employed:any
  school:any
  source_income:any
  recent_employer:any
  position_held:any
  ios_header:any
  loading:any
  constructor(public router:Router,
    public toastController:ToastController,
    public appcomponent:AppComponent,
    public service:ApiService) { 
      this.status = 'self_employed'
      this.self_employed = true;
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
    }

  ngOnInit() {
  }
  next(){
    this.user_id = window.localStorage.getItem('user_id')
    this.name = window.localStorage.getItem('full_name')
    console.log('call')
    console.log(this.retired)
    if(this.self_employed==true){
    if(this.business_name == undefined || this.title == undefined || this.business_type == undefined){
      this.showmessage('Please fill your fields')
    }else{
    this.service.employment_info_self(this.user_id,this.employment_status,this.business_name,this.title,this.business_type,this.status).subscribe(res=>{
      console.log(res)
    })
    this.appcomponent.leftSlide('identity-of')
  }
  }
  if(this.student==true){
    if(this.school!=undefined && this.source_income !=undefined){
    this.service.employment_info_student(this.user_id,this.school,this.source_income,this.status).subscribe(res=>{
      console.log(res)
    })
    this.appcomponent.leftSlide('identity-of')
    }else{
      this.showmessage('Please fill your fields') 
    }
  }
   if(this.retired==true){
    console.log('retured')
    if(this.recent_employer!=undefined && this.position_held != undefined && this.business_type !=undefined && this.source_income !=undefined){
    this.service.employment_info_retired(this.user_id,this.recent_employer,this.position_held,this.business_type,this.source_income,this.status).subscribe(res=>{
      console.log(res)
    })
    this.appcomponent.leftSlide('identity-of')
    }else{
      this.showmessage('Please fill your fields') 
    }
  }
  if(this.not_employed==true){
    if(this.source_income!=undefined){
    this.service.employment_info_not_employed(this.user_id,this.source_income,this.status).subscribe(res=>{
      console.log(res)
    })
    this.appcomponent.leftSlide('identity-of')
    }else{
      this.showmessage('Please fill your fields') 
    }
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
    status_type(event){
      let value = event.detail.value
      if(value=='self_employed'){this.self_employed=true;this.retired=false;this.student=false;this.not_employed=false}
      if(value=='student'){this.self_employed=false;this.retired=false;this.student=true;this.not_employed=false}
      if(value=='retired'){this.self_employed=false;this.retired=true;this.student=false;this.not_employed=false}
      if(value=='not_employed'){this.self_employed=false;this.retired=false;this.student=false;this.not_employed=true}
    }
}
