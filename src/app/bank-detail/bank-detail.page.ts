import { Component, OnInit } from '@angular/core';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { CountryListPage } from '../country-list/country-list.page';
import { Router } from '@angular/router'
@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.page.html',
  styleUrls: ['./bank-detail.page.scss'],
})
export class BankDetailPage implements OnInit {
  bank_name:any
  account_name:any
  bank_address:any
  country:any
  account_no:any
  detail:any
  loading:any
  user_id:any
  get_value:any
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
  ionViewDidEnter(){
    this.get_value = this.service.get_back_invest_fund()
    
  }
  next(){
    this.user_id = window.localStorage.getItem('user_id')
    if(this.bank_name==undefined){
      this.showmessage('Please Enter Bank Name')
    }else if(this.account_name==undefined){
      this.showmessage('Please Enter Account Name')
    }else if(this.bank_address==undefined){
      this.showmessage('Please Enter Bank Address')
    }else if(this.country==undefined){
      this.showmessage('Please Enter Country')
    }else if(this.account_no==undefined){
      this.showmessage('Please Enter Account No')
    }else if(this.detail==undefined){
      this.showmessage('Please Enter Detail')
    }else{
      this.loading = true;
      let deposit_id = window.localStorage.getItem('deposit_id')
      this.service.bank_detail(deposit_id,this.user_id,this.bank_name,this.account_name,
        this.bank_address,this.country,this.account_no,this.detail).subscribe(res=>{
        console.log(res)
        this.loading = false;
        alert('Your request has been submitted and waiting for Admin Approval')
        if(this.get_value == 'invest_fund'){
        this.router.navigate(['invest-fund'])
        }else{
          this.router.navigate(['home'])
        }
      })
    }
  }
  ionViewWillLeave(){
    this.service.back_invest_fund('');
  }
  async showmessage(message){
    var toast = await this.toastController.create({
      message: message,
      color:'danger',
      cssClass:'toast-alert',
      duration: 3000
    });
    toast.present();
   
    }
    back(){
      window.history.back()
    }
    async countryList() {
      const modal = await this.modalController.create({
        component: CountryListPage,
        cssClass:'country_list'
      });
  
      modal.onDidDismiss().then((res) => {
        console.log(res)
       if(res.data!=undefined)
       this.country = res.data.country_name
      });
      return await modal.present();
    }
}
