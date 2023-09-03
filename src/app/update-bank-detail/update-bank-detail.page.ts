import { Component, OnInit } from '@angular/core';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { CountryListPage } from '../country-list/country-list.page';
import { Router } from '@angular/router'
@Component({
  selector: 'app-update-bank-detail',
  templateUrl: './update-bank-detail.page.html',
  styleUrls: ['./update-bank-detail.page.scss'],
})
export class UpdateBankDetailPage implements OnInit {
  
  bank_name:any
  iban:any
  bank_address:any
  bank_account:any
  branch_name:any
  address:any
  loading:any
  user_id:any
  holder_name:any
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
    this.user_id = window.localStorage.getItem('user_id')
    this.service.get_bank_detail(this.user_id).subscribe(res=>{
      console.log(res)
      this.bank_name = res['bank']['bank_name']
      this.iban = res['bank']['iban']
      this.bank_account = res['bank']['account']
      this.branch_name = res['bank']['branch']
      this.address = res['bank']['bank_address']
      this.holder_name = res['bank']['title']
    })
  }
  next(){
    if(this.bank_name==undefined){
      this.showmessage('Please Enter Bank Name')
    }else if(this.iban==undefined){
      this.showmessage('Please Enter IBAN Number')
    }else if(this.branch_name==undefined){
      this.showmessage('Please Enter Branch Name')
    }else if(this.bank_account==undefined){
      this.showmessage('Please Enter Bank Account')
    }else if(this.address==undefined){
      this.showmessage('Please Enter Bank Address')
    }else if(this.holder_name==undefined){
      this.showmessage('Please Enter Account Holder Name')
    }else{
      this.loading = true;
      this.service.update_bank_detail(this.user_id,this.bank_name,this.iban,
        this.branch_name,this.bank_account,this.address,this.holder_name).subscribe(res=>{
        console.log(res)
        this.loading = false;
        this.router.navigate(['withdrawl-request'])
      })
    }
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
    
}
