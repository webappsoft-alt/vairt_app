import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-investment-detail',
  templateUrl: './investment-detail.page.html',
  styleUrls: ['./investment-detail.page.scss'],
})
export class InvestmentDetailPage implements OnInit {
  _currentPlatform:any
  loading:any
  constructor(public navCtrl: NavController,public platform: Platform,
    public statusbar:StatusBar) {
    if (this.platform.is('ios')) {
      this._currentPlatform = 'ios';
    } else {
      this._currentPlatform = 'android';
    }
   }
   ionViewDidEnter(){
    this.statusbar.backgroundColorByHexString('#ffffff');
  }
  ngOnInit() {
  }
  home(){
    this.navCtrl.navigateForward('home', { animated: false, });
  }
  portfolio(){
    this.navCtrl.navigateForward('portfolio', { animated: false, });
  }
  inves(){
    this.navCtrl.navigateForward('new-investments', { animated: false, });
  }
  flip(){
    this.navCtrl.navigateForward('flip', { animated: false, });
  }
  next(){}
  profile(){}
}
