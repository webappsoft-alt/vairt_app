import { Component, OnInit,NgZone } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-flip-salebreakdown-detail',
  templateUrl: './flip-salebreakdown-detail.page.html',
  styleUrls: ['./flip-salebreakdown-detail.page.scss'],
})
export class FlipSalebreakdownDetailPage implements OnInit {
  initial_invest:any
  rehabilitation_cost:any
  sale_price:any
  sale_cost:any
  gross_profit:any
  total_investment:any
  estimate_net_profit:any
  net_profit:any
  partner_share:any
  roi:any
  roi_percent:any
  pledge_amount:any
  thirty_percent:any
  fourty_percent:any
  fifty_percent:any
  cash_return:any
  thirty_percent_show:any
  fourty_percent_show:any
  fifty_percent_show:any
  total_investment_new:any
  cash_return1:any
  estimate_management:any
  constructor(private modalController: ModalController,
    public zone:NgZone,
    public navprams:NavParams) {
    this.initial_invest = this.navprams.data.initial_invest
    this.rehabilitation_cost = this.navprams.data.rehabilitation_cost;
    this.total_investment = parseInt(this.initial_invest) + parseInt(this.rehabilitation_cost)
    this.sale_price = this.navprams.data.sale_price
    if(this.navprams.data.sale_cost!=undefined){
    this.sale_cost = this.navprams.data.sale_cost.toFixed(2)
    }
    this.gross_profit = this.navprams.data.gross_profit
    this.estimate_net_profit = this.navprams.data.estimate_net_profit
    this.partner_share = this.navprams.data.partner_share
    this.pledge_amount = this.navprams.data.pledge_amount
    this.estimate_management = this.navprams.data.estimate_management
    if(this.pledge_amount >= 25000 && this.pledge_amount<=49999){
      this.thirty_percent_show=true
      this.fourty_percent_show = true
      this.fifty_percent_show = true
      this.partner_share = '30'

    }if(this.pledge_amount >= 50000 && this.pledge_amount<=99999){
      this.thirty_percent_show = false;
      this.fourty_percent_show = true
      this.fifty_percent_show = true
      this.partner_share = '40'
    }if(this.pledge_amount >= 100000 && this.pledge_amount >= 100000){
      this.thirty_percent_show = false;
      this.fourty_percent_show = false
      this.fifty_percent_show = true
      this.partner_share = '50'
    }

    this.net_profit = ((this.estimate_net_profit*this.partner_share)/100).toFixed(2)
    this.roi = this.navprams.data.roi;
    if(this.pledge_amount>=25000 && this.pledge_amount<=49999){
      this.total_investment_new = this.navprams.data.total_investment_new
      this.zone.run(() => {
        this.cash_return1 = parseInt(this.total_investment_new) + parseInt(this.net_profit)
        })
      console.log(this.cash_return1)
    }if(this.pledge_amount >= 50000 && this.pledge_amount<=99999){
    this.total_investment_new = this.navprams.data.total_investment_new
    this.zone.run(() => {
      this.cash_return1 = parseInt(this.total_investment_new) + parseInt(this.net_profit)
      })
      console.log(this.cash_return1)
   }if(this.pledge_amount >= 100000){
    this.total_investment_new = this.navprams.data.total_investment_new
    this.zone.run(() => {
    this.cash_return1 = parseInt(this.total_investment_new) + parseInt(this.net_profit)
    })
   }
      this.thirty_percent = ((this.roi * 30 )/ 100).toFixed(2)
      this.fourty_percent =  ((this.roi * 40 )/ 100).toFixed(2)
      this.fifty_percent =  ((this.roi * 50 )/ 100).toFixed(2)


      // if(this.roi)
   }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss()
  }
}
