import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.page.html',
  styleUrls: ['./top-up.page.scss'],
})
export class TopUpPage implements OnInit {
topup:any
  constructor(public mdlcrtl:ModalController,
    public navprams:NavParams,
    public service:ApiService) { 
      this.topup = this.service.getTopUp()
    }

  ngOnInit() {
  }
  close(){
    this.mdlcrtl.dismiss()
  }
}
