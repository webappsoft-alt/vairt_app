import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Toast } from '@ionic-native/toast/ngx';
import { ApiService } from '../api/api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  user_id:any
  tickets:any=[]
  unresolved:any
  new_tickets:any
  ios_header:any
  constructor(public router:Router,
    public appcomponent:AppComponent,
    public service:ApiService,) {
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
     }

  ngOnInit() {}

  ionViewDidEnter(){
    this.user_id = window.localStorage.getItem('user_id')
    this.service.get_tickets(this.user_id).subscribe(res=>{
      this.tickets = res['support'];
      let unresolved_ = res['unresolved']
      let ticket_ = res['tickets']
      unresolved_ == undefined ? this.unresolved = 0 : this.unresolved = unresolved_
      ticket_ == undefined ? this.new_tickets = 0 : this.new_tickets = ticket_

    })
  }
  back(){
    this.appcomponent.downSlidePre('profile')
  }
  submit_ticket(){
    this.appcomponent.leftSlide('submit-ticket')
  } 
  support_view(ticket){
    this.service.setSupportView(ticket)
    this.appcomponent.leftSlide('support-view')
  }
}
