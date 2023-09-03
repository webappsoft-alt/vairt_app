import { Component, OnInit } from '@angular/core';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { CountryListPage } from '../country-list/country-list.page';
import { Router } from '@angular/router'

@Component({
  selector: 'app-withdrawl-request',
  templateUrl: './withdrawl-request.page.html',
  styleUrls: ['./withdrawl-request.page.scss'],
})
export class WithdrawlRequestPage implements OnInit {
  ios_header:any
  constructor(public toastController:ToastController,
    public modalController:ModalController,
    public router:Router,
    public service:ApiService) {
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
     }

  ngOnInit() {
  }
  back(){
    window.history.back()
  }
}
