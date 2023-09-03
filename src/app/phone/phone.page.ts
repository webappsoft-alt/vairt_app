import { Component, OnInit } from '@angular/core';
import { CountryPhone } from './country-phone.model';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhoneValidator } from '../validators/phone.validator';
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { CountryListPage } from '../country-list/country-list.page';
import { AppComponent } from '../app.component'
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {
  calling_code:any
  country_phone_group: FormGroup;
  countries: Array<CountryPhone>;
  validations_form: FormGroup;
  company_id:any
  loading:any
  phone_no:any;
  user_id:any
  code:any
  
  constructor(public formBuilder: FormBuilder,
    public service:ApiService,
    public router:Router,
    public statusbar:StatusBar,
    public appcomponent:AppComponent,
    private modalController: ModalController,
    public toastController:ToastController) {
    this.calling_code = window.localStorage.getItem('code')
    this.phone_no = window.localStorage.getItem('phone_no')
    this.statusbar.hide()
   }

  ngOnInit() {
    console.log(this.calling_code)
    if(this.calling_code==null){
      this.calling_code = 'US'
      this.code='+1'  
    }
    this.countries = [
      new CountryPhone(this.calling_code, this.calling_code),
    ];
    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });
    this.validations_form = this.formBuilder.group({
      country_phone: this.country_phone_group,
    });
  }
  validation_messages = {
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
  }
  onSubmit(values){
    this.user_id = window.localStorage.getItem('user_id')
    this.loading = true;
    this.service.user_phone(this.user_id,values.country_phone.phone).subscribe(res=>{
      console.log(res)
      this.showmessage('Phone connected successfully')
      window.localStorage.setItem('phone_auth','Connected')
      this.loading = false;
      this.appcomponent.downSlidePre('setting')
    })
  }
  
  async showmessage(message){
    var toast = await this.toastController.create({
      message: message,
      color:'success',
      cssClass:'toast-alert',
      duration: 3000
    });
    toast.present();
   
    }
    back(){
      this.appcomponent.downSlidePre('setting')
    }
    async countryList() {
      const modal = await this.modalController.create({
        component: CountryListPage,
        cssClass:'leads-filter-change'
      });
  
      modal.onDidDismiss().then((res) => {
        console.log(res)
       if(res.data!=undefined)
       this.selected_country(res.data.name)
      });
      return await modal.present();
    }
    selected_country(name){
      this.countries=[];
      this.countries = [
        new CountryPhone(name, name),
      ];
      let country = new FormControl(this.countries[0], Validators.required);
      let phone = new FormControl('', Validators.compose([
        Validators.required,
        PhoneValidator.validCountryPhone(country)
      ]));
      this.country_phone_group = new FormGroup({
        country: country,
        phone: phone
      });
      this.validations_form = this.formBuilder.group({
        country_phone: this.country_phone_group,
      });
    
    }
}
