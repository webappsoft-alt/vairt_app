import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-why-we-ask',
  templateUrl: './why-we-ask.page.html',
  styleUrls: ['./why-we-ask.page.scss'],
})
export class WhyWeAskPage implements OnInit {

  constructor(public mdlcrtl:ModalController) { }

  ngOnInit() {
  }
  close(){
    this.mdlcrtl.dismiss()
  }

}
