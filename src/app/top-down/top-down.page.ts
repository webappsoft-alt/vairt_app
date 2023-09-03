import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from '../api/api.service';
@Component({
  selector: 'app-top-down',
  templateUrl: './top-down.page.html',
  styleUrls: ['./top-down.page.scss'],
})
export class TopDownPage implements OnInit {
  topdown:any
  constructor(public mdlcrtl:ModalController,
    public navprams:NavParams,
    public service:ApiService) { 
      this.topdown = this.service.getTopDown()
    }

  ngOnInit() {
  }
  close(){
    this.mdlcrtl.dismiss()
  }
}
