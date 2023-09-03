import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { CountryListPage } from '../country-list/country-list.page';
import { WhyWeAskPage } from '../why-we-ask/why-we-ask.page';

@Component({
  selector: 'app-citizenship',
  templateUrl: './citizenship.page.html',
  styleUrls: ['./citizenship.page.scss'],
})
export class CitizenshipPage implements OnInit {
  loading: boolean;
  validations_form: FormGroup;
  country_name:any
  user_id:any
  code:any
  ios_header:any
  constructor(public formBuilder: FormBuilder,
    public router:Router,
    public service:ApiService,
    public modalController:ModalController) { 
     this.country_name = window.localStorage.getItem('country_name');
      if(this.country_name==null){
        this.country_name = 'United States'
       }else{
         this.country_name =  window.localStorage.getItem('country_name');
       }
       let check = window.localStorage.getItem('phone-model')
       if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
    }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      citizenship: new FormControl('', Validators.required),
    });
  }
  validation_messages = {
    'citizenship': [
      { type: 'required', message: 'Citizenship is required.' }
    ],
  }
  async countryList() {
    const modal = await this.modalController.create({
      component: CountryListPage,
      cssClass:'country_list'
    });

    modal.onDidDismiss().then((res) => {
      console.log(res)
     if(res.data!=undefined)
      this.country_name = res.data.country_name
      this.code = res.data.code
    });
    return await modal.present();
  }

  async why_ask() {
    const modal = await this.modalController.create({
      component: WhyWeAskPage,
      cssClass:'half_model'
    });

    modal.onDidDismiss().then((res) => {
      console.log(res)
     if(res.data!=undefined)
      this.country_name = res.data.country_name
      this.code = res.data.code
    });
    return await modal.present();
  }

  verify(){
    this.user_id = window.localStorage.getItem('user_id')
    console.log(this.country_name)
    console.log(this.user_id)
    this.service.citizenship(this.user_id,this.code).subscribe(res=>{
      console.log(res)
    })
    this.router.navigate(['address'])
  }
}