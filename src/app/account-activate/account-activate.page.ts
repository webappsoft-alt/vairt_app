import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-account-activate',
  templateUrl: './account-activate.page.html',
  styleUrls: ['./account-activate.page.scss'],
})
export class AccountActivatePage implements OnInit {
  ios_header:any
  constructor(public appcomponent:AppComponent,
    public statusbar:StatusBar) {
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
    this.statusbar.hide()
   }

  ngOnInit() {
  }
  back(){
    window.history.back()
  }
 
}
