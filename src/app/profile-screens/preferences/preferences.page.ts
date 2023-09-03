import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ApiService } from '../../api/api.service';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {
  first_name:any
  last_name:any
  address:any
  user_country:any
  countries1:any=[]
  phone:any
  user_state:any
  zip_code:any
  stocks:any
  bonds:any
  privacy_equity:any
  venture_capital:any
  business:any
  real_estate:any
  exit_investment:any
  net_worth:any
  current_income:any
  employment_status:any

  constructor(public service:ApiService,
    public appcomponent:AppComponent,) {


      let data = this.service.getProfileData();
      let purchase_data = this.service.getPurchaseData()
      console.log(purchase_data)
      this.first_name = data.user_fname
      this.last_name = data.user_lname
      this.address = data.user_address
      this.phone = data.user_mobile
      this.user_state = data.user_state
      this.zip_code = data.zip
      let chk = this.countries1.filter(policy => policy.code === data.user_country);
      if(chk.length>0){
        this.user_country = chk[0].name;
      }else{
        this.user_country = ''
      }
      if(purchase_data!=null){
      if(purchase_data.stocks!=null){
        this.stocks = purchase_data.stocks
        if(this.stocks == 1){ this.stocks = 'None'} if(this.stocks == 2){ this.stocks = 'Limited'} 
        if(this.stocks == 3){ this.stocks = 'Expierence'}
      }
      if(purchase_data.bonds!=null){
      this.bonds = purchase_data.bonds
      if(this.bonds == 1){ this.bonds = 'None'} if(this.bonds == 2){ this.bonds = 'Limited'} 
      if(this.bonds == 3){ this.bonds = 'Expierence'}
      }
      if(purchase_data.private_equity!=null){
      this.privacy_equity = purchase_data.private_equity
      if(this.privacy_equity == 1){ this.privacy_equity = 'None'} if(this.privacy_equity == 2){ this.privacy_equity = 'Limited'} 
      }
      if(purchase_data.venture_capital!=null){
      this.venture_capital = purchase_data.venture_capital
      if(this.venture_capital == 1){ this.venture_capital = 'None'} if(this.venture_capital == 2){ this.venture_capital = 'Limited'} 
      }
      if(purchase_data.realestate!=null){
      this.real_estate = purchase_data.realestate
      if(this.real_estate == 1){ this.real_estate = 'None'} if(this.real_estate == 2){ this.real_estate = 'Limited'} 
      }
      if(purchase_data.restaurant!=null){
      this.business = purchase_data.restaurant
      if(this.business == 1){ this.business = 'None'} if(this.business == 2){ this.business = 'Limited'} 
      }
      if(purchase_data.exit_investment!=null){
      this.exit_investment = purchase_data.exit_investment
      }
      if(purchase_data.current_income!=null){
      this.current_income = purchase_data.current_income
      }
      if(purchase_data.net_worth!=null){
      this.net_worth = purchase_data.net_worth
      }
      if(purchase_data.employment_status!=null){
      this.employment_status = purchase_data.employment_status
      if(this.employment_status=='not_employed'){ this.employment_status = 'Not Employed'}
      if(this.employment_status=='self_employed'){ this.employment_status = 'Self Employed'}
      if(this.employment_status=='retired'){ this.employment_status = 'Retired'}
      if(this.employment_status=='student'){ this.employment_status = 'Student'}
      }
     }
    }

  ngOnInit() {
  }
  close(){
    this.appcomponent.downSlidePre('profile')
  }
  support(){
    this.appcomponent.leftSlide('support')
  }
}
