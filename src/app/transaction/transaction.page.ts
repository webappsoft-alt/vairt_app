import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router'
import { ModalController, Platform } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { NavController } from '@ionic/angular';
import { ShareReferralPage } from '../share-referral/share-referral.page';
import { Toast } from '@ionic-native/toast/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  @ViewChild('barChart', { static: true }) barChart;
  colorArray: any = []
  transactions: any = []
  bars: any;
  ios_header: any
  user_id: any
  investments: Boolean = true
  actions: Boolean = false
  documents: Boolean = false
  friend: Boolean = false
  profile: Boolean = false
  display: Boolean = false
  active_inves: any
  pending_inves: any
  balance: any
  active_inves_array: any = []
  pending_inves_array: any = []
  my_properties_: any = []
  total_gains: any
  full_name:any
  referral:any
  constructor(public router: Router,
    public service: ApiService,
    public toast:Toast,
    private clipboard: Clipboard,
    public statusbar:StatusBar,
    public appcomponent:AppComponent,
    public modalController:ModalController,
    public navCtrl: NavController,
    private platform: Platform,) {
      this.full_name = window.localStorage.getItem('full_name')
    let check = window.localStorage.getItem('phone-model')
    if (check == '10') {
      this.ios_header = true;
    } else {
      this.ios_header = false
    }
    this.statusbar.hide();
  }

  ngOnInit() {
    this.investments = true
    this.profile = false
    this.user_id = window.localStorage.getItem('user_id')
    this.service.get_active_inves(this.user_id).subscribe(res => {
      console.log(res)
      this.active_inves = res['amount']
      this.active_inves_array = res['property']
      if (this.active_inves == undefined) { this.active_inves = 0 }
    })
    this.service.get_pending_inves(this.user_id).subscribe(res => {
      console.log(res)
      this.pending_inves = res['amount']
      this.pending_inves_array = res['property']
      if (this.pending_inves == undefined) { this.pending_inves = 0 }
    })
    this.service.balance(this.user_id).subscribe(res => {
      console.log(res)
      this.balance = res['balance']
      //  this.createBarChart(this.active_inves,this.pending_inves,this.balance);
    })
    console.log(this.user_id)
    this.service.get_transaction(this.user_id).subscribe(res => {
      console.log(res)
      this.transactions = res['transaction'];
    })
    this.createBarChart(1, 1, 0)

    this.service.total_gains(this.user_id).subscribe(res => {
      console.log(res)
      this.total_gains = res['gains']
      if (this.total_gains == undefined) { this.total_gains = 0 }

      if (this.active_inves == 0 || this.pending_inves == 0) {
        this.createBarChart(1, 1, this.balance)
      } else {
        this.createBarChart(this.active_inves, this.pending_inves, this.balance)
      }
    })
    this.service.profile(this.user_id).subscribe(res=>{
      console.log(res)
      if(res['profile'].referral!=undefined){
        this.referral = 'https://vairt.com/cfund/join/'+res['profile'].referral
      }
    })

    // this.service.my_properties(this.user_id).subscribe(res => {
    //   console.log(res)
    //   this.my_properties_ = res['property']
    // })

  }
  ionViewDidEnter() {}

  generateColorArray(num) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#1790C9', '#44474B', '#74C7CF');
    }
    return this.colorArray;
  }
  //create bar chart function for dashboard
  createBarChart(active, pending, balance) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'pie',
      data: {
        datasets: [{
          data: [active, pending, balance],
          backgroundColor: this.generateColorArray(3),  // array should have same number of elements as number of dataset
          borderColor: 'white',
        }]
      },
    });
  }
  async share_referral() {
    const modal = await this.modalController.create({
      component: ShareReferralPage,
      cssClass:'center_modal',
      componentProps:{referral:this.referral}
    });

    modal.onDidDismiss().then((res) => {
      console.log(res)
    });
    return await modal.present();
  }
  copy(){
    this.clipboard.copy(this.referral);
    this.toast_('Text Copied to clipboard')
  }
  toast_(message){
    this.toast.show(message, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
  }
  active_inves_detail() {
    this.service.inves_trans_detail(this.active_inves_array)
    this.service.set_inves_status('active')
    this.appcomponent.leftSlide('trans-invest-detail')
  }
  pending_inves_detail() {
    this.service.inves_trans_detail(this.pending_inves_array)
    this.service.set_inves_status('pending')
    this.appcomponent.leftSlide('trans-invest-detail')
  }
  my_prop() {
    this.service.set_my_properties('transaction')
    this.appcomponent.leftSlide('new-investments')
  }
 
  header_click(value) {
    console.log(value)
    if (value == 'investments') {
      this.investments = true; this.actions = false; this.documents = false;
      this.friend = false; this.profile = false;
      this.ionViewDidEnter()
    }
    if (value == 'actions') {
      this.investments = false; this.actions = true; this.documents = false;
      this.friend = false; this.profile = false
    }
    if (value == 'documents') {
      this.investments = false; this.actions = false; this.documents = true;
      this.friend = false; this.profile = false
    }
    if (value == 'friend') {
      this.investments = false; this.actions = false; this.documents = false;
      this.friend = true; this.profile = false
    }
    if (value == 'profile') {
      this.investments = false; this.actions = false; this.documents = false;
      this.friend = false; this.profile = true
      this.service.setBackPage('transaction')
      this.appcomponent.leftSlide('profile');
    }
  }
  back() {
    this.appcomponent.downSlidePre('setting')
  }
  incomplete(id,stage){
    console.log(id, stage)
    window.localStorage.setItem('deposit_id',id)
    if(stage==3){
    this.router.navigate(['deposit-instructions'])
  }
  else{
    this.router.navigate(['bank-detail'])
  }
  }
  view_all(){
    this.appcomponent.leftSlide('all-transaction')
  }
}
