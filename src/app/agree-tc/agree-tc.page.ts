import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agree-tc',
  templateUrl: './agree-tc.page.html',
  styleUrls: ['./agree-tc.page.scss'],
})
export class AgreeTcPage implements OnInit {
  ios_header:any
  constructor(public router:Router,
    public modalController:ModalController) {
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
    this.modalController.dismiss()
    this.router.navigate(['agree-to'])
  } 
  link(name){
    window.open(name,'_self')
  }
}
