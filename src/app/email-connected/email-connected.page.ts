import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-email-connected',
  templateUrl: './email-connected.page.html',
  styleUrls: ['./email-connected.page.scss'],
})
export class EmailConnectedPage implements OnInit {
  email:any
  constructor(public modlcontroller:ModalController) { }

  ngOnInit() {
  }
  dismiss(){
    this.modlcontroller.dismiss()
  }
}
