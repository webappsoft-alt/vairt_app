import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-flip-transaction-detail',
  templateUrl: './flip-transaction-detail.page.html',
  styleUrls: ['./flip-transaction-detail.page.scss'],
})
export class FlipTransactionDetailPage implements OnInit {
  gross_rent_per_year:any
  service_charges:any
  prop_management:any
  prop_taxes:any
  net_dividend_income:any
  net_dividend_yield:any
  estimat_cost:any
  estimate_net_dividend_income:any
  estimate_net_rent:any
  est_net_yield:any
  partner_share:any
  net_partner_income:any
  estimate_net_rent_:any
  constructor(private modalController: ModalController,public navprams:NavParams) { 
    this.gross_rent_per_year = this.navprams.data.gross_rent_per_year
    this.service_charges = this.navprams.data.service_charges
    this.prop_management = this.navprams.data.prop_management
    this.prop_taxes = this.navprams.data.prop_taxes
    this.net_dividend_yield = this.navprams.data.net_dividend_yield
    this.net_dividend_income = this.navprams.data.net_dividend_income

    this.estimate_net_rent = parseInt(this.gross_rent_per_year)-parseInt(this.service_charges)
    this.estimat_cost = parseInt(this.prop_management)+parseInt(this.prop_taxes)
    this.estimate_net_dividend_income = parseInt(this.estimate_net_rent) - parseInt(this.estimat_cost)
    this.estimate_net_rent_ = parseInt(this.gross_rent_per_year) -  parseInt(this.estimat_cost) - parseInt(this.service_charges)
    this.est_net_yield = this.navprams.data.est_net_yield
    this.partner_share = this.navprams.data.partner_share
    let chk = parseInt(this.estimate_net_dividend_income) * parseInt(this.partner_share)
    console.log(chk)
    this.net_partner_income = (parseInt(this.estimate_net_dividend_income) * parseInt(this.partner_share))/100;
    console.log(this.net_partner_income)
  }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss()
  }
}
