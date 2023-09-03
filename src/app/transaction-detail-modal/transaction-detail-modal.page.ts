import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-transaction-detail-modal',
  templateUrl: './transaction-detail-modal.page.html',
  styleUrls: ['./transaction-detail-modal.page.scss'],
})
export class TransactionDetailModalPage implements OnInit {
  transaction_detail:any
  initial_invest:any
  purchase_costs:any
  property_price_per_share:any
  purchase_cost_per_share:any
  transaction_cost_per_share:any
  vairt_fee:any
  vat:any
  number_of_shares:any
  transaction_cost:any
  total_price_share:any
  total_acquistion_cost:any
  constructor(private modalController: ModalController,
    public navprams:NavParams) { 
      console.log(this.navprams.data)
      this.transaction_detail = this.navprams.data.transaction
      this.initial_invest = this.navprams.data.initial_invest
      this.purchase_costs = this.navprams.data.purchase_costs
      if(this.navprams.data.property_price_per_share!=undefined){
      this.property_price_per_share = this.navprams.data.property_price_per_share.toFixed(4);
     }
      this.purchase_cost_per_share = this.navprams.data.purchase_cost_per_share
      if(this.navprams.data.transaction_cost_per_share!=undefined){
      this.transaction_cost_per_share = this.navprams.data.transaction_cost_per_share.toFixed(4);
      }
      this.vairt_fee = this.navprams.data.vairt_fee
      this.vat = this.navprams.data.vat
      this.number_of_shares = this.navprams.data.number_of_shares
      this.transaction_cost = this.navprams.data.transaction_cost.toFixed(2)
      this.total_price_share = parseFloat(this.property_price_per_share)+parseFloat(this.purchase_cost_per_share)+parseFloat(this.transaction_cost_per_share)
  
      this.total_acquistion_cost = parseInt(this.purchase_costs)+parseInt(this.initial_invest)+parseInt(this.transaction_cost) 
      
    }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss()
  }
}
