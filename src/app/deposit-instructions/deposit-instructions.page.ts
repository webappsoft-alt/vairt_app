import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-deposit-instructions',
  templateUrl: './deposit-instructions.page.html',
  styleUrls: ['./deposit-instructions.page.scss'],
})
export class DepositInstructionsPage implements OnInit {
 amount:any
 ios_header:any
 user_id:any
  constructor(public router:Router,
    public service:ApiService,) {
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
    this.amount = window.localStorage.getItem('amount')
    console.log(this.amount)
  }
  back(){
    window.history.back()
  }
  cancel(){
    this.router.navigate(['deposit-funds'])
  }
  proceed(){
   this.user_id =  window.localStorage.getItem('user_id')
    let deposit_id = window.localStorage.getItem('deposit_id')
    console.log(deposit_id)
    this.service.deposit_inst(deposit_id).subscribe(res=>{
      console.log(res)
    })
    this.router.navigate(['bank-detail'])
  }
}
