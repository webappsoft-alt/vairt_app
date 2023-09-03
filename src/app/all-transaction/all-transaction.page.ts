import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-all-transaction',
  templateUrl: './all-transaction.page.html',
  styleUrls: ['./all-transaction.page.scss'],
})
export class AllTransactionPage implements OnInit {
  ios_header:any
  transactions:any=[]
  user_id:any
  no_trans:any
  last_id:any
  loading_more:any
  constructor(public service:ApiService,
  public appcomponent:AppComponent) {
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
     this.ios_header = true;
   }else{
     this.ios_header = false
   }
   this.user_id = window.localStorage.getItem('user_id')
   this.service.get_all_transaction(this.user_id,'').subscribe(res=>{
    console.log(res)
    this.transactions = res['transaction'];
    if(this.transactions!=undefined)
    this.last_id = this.transactions[this.transactions.length - 1].id
    if(this.transactions==undefined){
      this.no_trans = true
    }else{
      this.no_trans = false
    }
    })
   }
  ngOnInit() {
  }
  
  close(){
    this.appcomponent.downSlidePre('transaction')

  }
  incomplete(deposit_id,stage){
  }
  loadData(event) {
    setTimeout(() => {
      this.loading_more = true;
    this.service.get_all_transaction(this.user_id,this.last_id).subscribe(res=>{
      console.log(res['transaction'])  
      this.loading_more = false;
      if(res['transaction']==undefined){
        event.target.disabled = true
      }
      else{
        this.transactions = this.transactions.concat(res['transaction'])
        event.target.complete();
        this.last_id = this.transactions[this.transactions.length - 1].id
        
        }
    });
  }, 500);
  }
}
