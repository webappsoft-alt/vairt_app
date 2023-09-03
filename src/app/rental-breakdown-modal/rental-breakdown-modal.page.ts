import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-rental-breakdown-modal',
  templateUrl: './rental-breakdown-modal.page.html',
  styleUrls: ['./rental-breakdown-modal.page.scss'],
})
export class RentalBreakdownModalPage implements OnInit {
  gross_rent_per_year:any
  net_rent:any
  prop_manangement:any
  prop_taxes:any
  service_charges:any
  net_dividend_yield:any
  cost:any
  net_yield:any
  dividend_yield:any
  constructor(private modalController: ModalController,
    public navprams:NavParams) {
    this.gross_rent_per_year = this.navprams.data.gross_rent_per_year
    this.net_rent = this.navprams.data.net_rent;
    this.prop_manangement = this.navprams.data.prop_manangement
    this.prop_taxes = this.navprams.data.prop_taxes
    this.service_charges = this.navprams.data.service_charges
    this.net_yield = this.navprams.data.net_yield
    this.net_dividend_yield = this.navprams.data.net_dividend_yield;
    this.cost = parseInt(this.prop_manangement) + parseInt(this.prop_taxes)
    this.dividend_yield = parseInt(this.net_rent) - parseInt(this.cost)
   }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss()
  }
}
