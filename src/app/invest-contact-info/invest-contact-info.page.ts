import { Component, OnInit,NgZone, ViewChild } from '@angular/core';
import {IonContent} from '@ionic/angular';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { CountryListPage } from '../country-list/country-list.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { TopDownPage } from '../top-down/top-down.page';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { Toast } from '@ionic-native/toast/ngx';
import { AppComponent } from '../app.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var google;

@Component({
  selector: 'app-invest-contact-info',
  templateUrl: './invest-contact-info.page.html',
  styleUrls: ['./invest-contact-info.page.scss'],
})
export class InvestContactInfoPage implements OnInit {
  @ViewChild(IonContent,{static:false}) content: IonContent;

  acc_type:any
  img:any
  address:any
  purchase_price:any
  remaining_share:any
  title:any
  edit_btn:Boolean=true
  user_id:any
  first_name:any
  last_name:any
  phone_no:any
  user_country:any
  user_address:any
  city:any
  zip:any
  firstname_edit:Boolean=true;
  lastname_edit:Boolean=true;
  phoneno_edit:Boolean=true;
  country_edit:Boolean=true;
  address_edit:Boolean=true;
  city_edit:Boolean=true
  zipcode_edit:Boolean=true
  autocomplete: { input: string; };
  autocompleteItems: any[];
  GoogleAutocomplete: any;
  lat:any;
  long:any;
  placeid:any
  country_code:any
  ssn_number:any
  balance:any
  loading:any
    countries1=[{"name":"Afghanistan","alpha2Code":"AF","code":"93","currency_code":"AFN"}, {"name":"Albania","alpha2Code":"AL","code":"355","currency_code":"ALL"}, {"name":"Algeria","alpha2Code":"DZ","code":"213","currency_code":"DZD"}, {"name":"American Samoa","alpha2Code":"AS","code":"1684","currency_code":"USD"}, {"name":"Andorra","alpha2Code":"AD","code":"376","currency_code":"EUR"}, {"name":"Angola","alpha2Code":"AO","code":"244","currency_code":"AOA"}, {"name":"Anguilla","alpha2Code":"AI","code":"1264","currency_code":"XCD"}, {"name":"Antarctica","alpha2Code":"AQ","code":"672","currency_code":"AUD"}, {"name":"Antigua and Barbuda","alpha2Code":"AG","code":"1268","currency_code":"XCD"}, {"name":"Argentina","alpha2Code":"AR","code":"54","currency_code":"ARS"}, {"name":"Armenia","alpha2Code":"AM","code":"374","currency_code":"AMD"}, {"name":"Aruba","alpha2Code":"AW","code":"297","currency_code":"AWG"}, {"name":"Australia","alpha2Code":"AU","code":"61","currency_code":"AUD"}, {"name":"Austria","alpha2Code":"AT","code":"43","currency_code":"EUR"}, {"name":"Azerbaijan","alpha2Code":"AZ","code":"994","currency_code":"AZN"}, {"name":"Bahamas","alpha2Code":"BS","code":"1242","currency_code":"BSD"}, {"name":"Bahrain","alpha2Code":"BH","code":"973","currency_code":"BHD"}, {"name":"Bangladesh","alpha2Code":"BD","code":"880","currency_code":"BDT"}, {"name":"Barbados","alpha2Code":"BB","code":"1246","currency_code":"BBD"}, {"name":"Belarus","alpha2Code":"BY","code":"375","currency_code":"BYN"}, {"name":"Belgium","alpha2Code":"BE","code":"32","currency_code":"EUR"}, {"name":"Belize","alpha2Code":"BZ","code":"501","currency_code":"BZD"}, {"name":"Benin","alpha2Code":"BJ","code":"229","currency_code":"XOF"}, {"name":"Bermuda","alpha2Code":"BM","code":"1441","currency_code":"BMD"}, {"name":"Bhutan","alpha2Code":"BT","code":"975","currency_code":"BTN"}, {"name":"Bolivia (Plurinational State of)","alpha2Code":"BO","code":"591","currency_code":"BOB"}, {"name":"Bonaire, Sint Eustatius and Saba","alpha2Code":"BQ","code":"5997","currency_code":"USD"}, {"name":"Bosnia and Herzegovina","alpha2Code":"BA","code":"387","currency_code":"BAM"}, {"name":"Botswana","alpha2Code":"BW","code":"267","currency_code":"BWP"}, {"name":"Brazil","alpha2Code":"BR","code":"55","currency_code":"BRL"}, {"name":"British Indian Ocean Territory","alpha2Code":"IO","code":"246","currency_code":"USD"}, {"name":"Virgin Islands (British)","alpha2Code":"VG","code":"1284","currency_code":""}, {"name":"Virgin Islands (U.S.)","alpha2Code":"VI","code":"1 340","currency_code":"USD"}, {"name":"Brunei Darussalam","alpha2Code":"BN","code":"673","currency_code":"BND"}, {"name":"Bulgaria","alpha2Code":"BG","code":"359","currency_code":"BGN"}, {"name":"Burkina Faso","alpha2Code":"BF","code":"226","currency_code":"XOF"}, {"name":"Burundi","alpha2Code":"BI","code":"257","currency_code":"BIF"}, {"name":"Cambodia","alpha2Code":"KH","code":"855","currency_code":"KHR"}, {"name":"Cameroon","alpha2Code":"CM","code":"237","currency_code":"XAF"}, {"name":"Canada","alpha2Code":"CA","code":"1","currency_code":"CAD"}, {"name":"Cabo Verde","alpha2Code":"CV","code":"238","currency_code":"CVE"}, {"name":"Cayman Islands","alpha2Code":"KY","code":"1345","currency_code":"KYD"}, {"name":"Central African Republic","alpha2Code":"CF","code":"236","currency_code":"XAF"}, {"name":"Chad","alpha2Code":"TD","code":"235","currency_code":"XAF"}, {"name":"Chile","alpha2Code":"CL","code":"56","currency_code":"CLP"}, {"name":"China","alpha2Code":"CN","code":"86","currency_code":"CNY"}, {"name":"Christmas Island","alpha2Code":"CX","code":"61","currency_code":"AUD"}, {"name":"Cocos (Keeling) Islands","alpha2Code":"CC","code":"61","currency_code":"AUD"}, {"name":"Colombia","alpha2Code":"CO","code":"57","currency_code":"COP"}, {"name":"Comoros","alpha2Code":"KM","code":"269","currency_code":"KMF"}, {"name":"Congo","alpha2Code":"CG","code":"242","currency_code":"XAF"}, {"name":"Congo (Democratic Republic of the)","alpha2Code":"CD","code":"243","currency_code":"CDF"}, {"name":"Cook Islands","alpha2Code":"CK","code":"682","currency_code":"NZD"}, {"name":"Costa Rica","alpha2Code":"CR","code":"506","currency_code":"CRC"}, {"name":"Croatia","alpha2Code":"HR","code":"385","currency_code":"HRK"}, {"name":"Cuba","alpha2Code":"CU","code":"53","currency_code":"CUC"}, {"name":"Cura\u00c3\u00a7ao","alpha2Code":"CW","code":"599","currency_code":"ANG"}, {"name":"Cyprus","alpha2Code":"CY","code":"357","currency_code":"EUR"}, {"name":"Czech Republic","alpha2Code":"CZ","code":"420","currency_code":"CZK"}, {"name":"Denmark","alpha2Code":"DK","code":"45","currency_code":"DKK"}, {"name":"Djibouti","alpha2Code":"DJ","code":"253","currency_code":"DJF"}, {"name":"Dominica","alpha2Code":"DM","code":"1767","currency_code":"XCD"}, {"name":"Dominican Republic","alpha2Code":"DO","code":"1809","currency_code":"DOP"}, {"name":"Ecuador","alpha2Code":"EC","code":"593","currency_code":"USD"}, {"name":"Egypt","alpha2Code":"EG","code":"20","currency_code":"EGP"}, {"name":"El Salvador","alpha2Code":"SV","code":"503","currency_code":"USD"}, {"name":"Equatorial Guinea","alpha2Code":"GQ","code":"240","currency_code":"XAF"}, {"name":"Eritrea","alpha2Code":"ER","code":"291","currency_code":"ERN"}, {"name":"Estonia","alpha2Code":"EE","code":"372","currency_code":"EUR"}, {"name":"Ethiopia","alpha2Code":"ET","code":"251","currency_code":"ETB"}, {"name":"Falkland Islands (Malvinas)","alpha2Code":"FK","code":"500","currency_code":"FKP"}, {"name":"Faroe Islands","alpha2Code":"FO","code":"298","currency_code":"DKK"}, {"name":"Fiji","alpha2Code":"FJ","code":"679","currency_code":"FJD"}, {"name":"Finland","alpha2Code":"FI","code":"358","currency_code":"EUR"}, {"name":"France","alpha2Code":"FR","code":"33","currency_code":"EUR"}, {"name":"French Guiana","alpha2Code":"GF","code":"594","currency_code":"EUR"}, {"name":"French Polynesia","alpha2Code":"PF","code":"689","currency_code":"XPF"}, {"name":"Gabon","alpha2Code":"GA","code":"241","currency_code":"XAF"}, {"name":"Gambia","alpha2Code":"GM","code":"220","currency_code":"GMD"}, {"name":"Georgia","alpha2Code":"GE","code":"995","currency_code":"GEL"}, {"name":"Germany","alpha2Code":"DE","code":"49","currency_code":"EUR"}, {"name":"Ghana","alpha2Code":"GH","code":"233","currency_code":"GHS"}, {"name":"Gibraltar","alpha2Code":"GI","code":"350","currency_code":"GIP"}, {"name":"Greece","alpha2Code":"GR","code":"30","currency_code":"EUR"}, {"name":"Greenland","alpha2Code":"GL","code":"299","currency_code":"DKK"}, {"name":"Grenada","alpha2Code":"GD","code":"1473","currency_code":"XCD"}, {"name":"Guadeloupe","alpha2Code":"GP","code":"590","currency_code":"EUR"}, {"name":"Guam","alpha2Code":"GU","code":"1671","currency_code":"USD"}, {"name":"Guatemala","alpha2Code":"GT","code":"502","currency_code":"GTQ"}, {"name":"Guernsey","alpha2Code":"GG","code":"44","currency_code":"GBP"}, {"name":"Guinea","alpha2Code":"GN","code":"224","currency_code":"GNF"}, {"name":"Guinea-Bissau","alpha2Code":"GW","code":"245","currency_code":"XOF"}, {"name":"Guyana","alpha2Code":"GY","code":"592","currency_code":"GYD"}, {"name":"Haiti","alpha2Code":"HT","code":"509","currency_code":"HTG"}, {"name":"Holy See","alpha2Code":"VA","code":"379","currency_code":"EUR"}, {"name":"Honduras","alpha2Code":"HN","code":"504","currency_code":"HNL"}, {"name":"Hong Kong","alpha2Code":"HK","code":"852","currency_code":"HKD"}, {"name":"Hungary","alpha2Code":"HU","code":"36","currency_code":"HUF"}, {"name":"Iceland","alpha2Code":"IS","code":"354","currency_code":"ISK"}, {"name":"India","alpha2Code":"IN","code":"91","currency_code":"INR"}, {"name":"Indonesia","alpha2Code":"ID","code":"62","currency_code":"IDR"}, {"name":"Iran (Islamic Republic of)","alpha2Code":"IR","code":"98","currency_code":"IRR"}, {"name":"Iraq","alpha2Code":"IQ","code":"964","currency_code":"IQD"}, {"name":"Ireland","alpha2Code":"IE","code":"353","currency_code":"EUR"}, {"name":"Isle of Man","alpha2Code":"IM","code":"44","currency_code":"GBP"}, {"name":"Israel","alpha2Code":"IL","code":"972","currency_code":"ILS"}, {"name":"Italy","alpha2Code":"IT","code":"39","currency_code":"EUR"}, {"name":"Jamaica","alpha2Code":"JM","code":"1876","currency_code":"JMD"}, {"name":"Japan","alpha2Code":"JP","code":"81","currency_code":"JPY"}, {"name":"Jersey","alpha2Code":"JE","code":"44","currency_code":"GBP"}, {"name":"Jordan","alpha2Code":"JO","code":"962","currency_code":"JOD"}, {"name":"Kazakhstan","alpha2Code":"KZ","code":"76","currency_code":"KZT"}, {"name":"Kenya","alpha2Code":"KE","code":"254","currency_code":"KES"}, {"name":"Kiribati","alpha2Code":"KI","code":"686","currency_code":"AUD"}, {"name":"Kuwait","alpha2Code":"KW","code":"965","currency_code":"KWD"}, {"name":"Kyrgyzstan","alpha2Code":"KG","code":"996","currency_code":"KGS"}, {"name":"Latvia","alpha2Code":"LV","code":"371","currency_code":"EUR"}, {"name":"Lebanon","alpha2Code":"LB","code":"961","currency_code":"LBP"}, {"name":"Lesotho","alpha2Code":"LS","code":"266","currency_code":"LSL"}, {"name":"Liberia","alpha2Code":"LR","code":"231","currency_code":"LRD"}, {"name":"Libya","alpha2Code":"LY","code":"218","currency_code":"LYD"}, {"name":"Liechtenstein","alpha2Code":"LI","code":"423","currency_code":"CHF"}, {"name":"Lithuania","alpha2Code":"LT","code":"370","currency_code":"EUR"}, {"name":"Luxembourg","alpha2Code":"LU","code":"352","currency_code":"EUR"}, {"name":"Macao","alpha2Code":"MO","code":"853","currency_code":"MOP"}, {"name":"Macedonia (the former Yugoslav Republic of)","alpha2Code":"MK","code":"389","currency_code":"MKD"}, {"name":"Madagascar","alpha2Code":"MG","code":"261","currency_code":"MGA"}, {"name":"Malawi","alpha2Code":"MW","code":"265","currency_code":"MWK"}, {"name":"Malaysia","alpha2Code":"MY","code":"60","currency_code":"MYR"}, {"name":"Maldives","alpha2Code":"MV","code":"960","currency_code":"MVR"}, {"name":"Mali","alpha2Code":"ML","code":"223","currency_code":"XOF"}, {"name":"Malta","alpha2Code":"MT","code":"356",
  "currency_code":"EUR"}, {"name":"Marshall Islands","alpha2Code":"MH","code":"692","currency_code":"USD"}, {"name":"Martinique","alpha2Code":"MQ","code":"596","currency_code":"EUR"}, {"name":"Mauritania","alpha2Code":"MR","code":"222","currency_code":"MRO"}, {"name":"Mauritius","alpha2Code":"MU","code":"230","currency_code":"MUR"}, {"name":"Mayotte","alpha2Code":"YT","code":"262","currency_code":"EUR"}, {"name":"Mexico","alpha2Code":"MX","code":"52","currency_code":"MXN"}, {"name":"Micronesia (Federated States of)","alpha2Code":"FM","code":"691","currency_code":""}, {"name":"Moldova (Republic of)","alpha2Code":"MD","code":"373","currency_code":"MDL"}, {"name":"Monaco","alpha2Code":"MC","code":"377","currency_code":"EUR"}, {"name":"Mongolia","alpha2Code":"MN","code":"976","currency_code":"MNT"}, {"name":"Montenegro","alpha2Code":"ME","code":"382","currency_code":"EUR"}, {"name":"Montserrat","alpha2Code":"MS","code":"1664","currency_code":"XCD"}, {"name":"Morocco","alpha2Code":"MA","code":"212","currency_code":"MAD"}, {"name":"Mozambique","alpha2Code":"MZ","code":"258","currency_code":"MZN"}, {"name":"Myanmar","alpha2Code":"MM","code":"95","currency_code":"MMK"}, {"name":"Namibia","alpha2Code":"NA","code":"264","currency_code":"NAD"}, {"name":"Nauru","alpha2Code":"NR","code":"674","currency_code":"AUD"}, {"name":"Nepal","alpha2Code":"NP","code":"977","currency_code":"NPR"}, {"name":"Netherlands","alpha2Code":"NL","code":"31","currency_code":"EUR"}, {"name":"New Caledonia","alpha2Code":"NC","code":"687","currency_code":"XPF"}, {"name":"New Zealand","alpha2Code":"NZ","code":"64","currency_code":"NZD"}, {"name":"Nicaragua","alpha2Code":"NI","code":"505","currency_code":"NIO"}, {"name":"Niger","alpha2Code":"NE","code":"227","currency_code":"XOF"}, {"name":"Nigeria","alpha2Code":"NG","code":"234","currency_code":"NGN"}, {"name":"Niue","alpha2Code":"NU","code":"683","currency_code":"NZD"}, {"name":"Norfolk Island","alpha2Code":"NF","code":"672","currency_code":"AUD"}, {"name":"Northern Mariana Islands","alpha2Code":"MP","code":"1670","currency_code":"USD"}, {"name":"Norway","alpha2Code":"NO","code":"47","currency_code":"NOK"}, {"name":"Oman","alpha2Code":"OM","code":"968","currency_code":"OMR"}, {"name":"Pakistan","alpha2Code":"PK","code":"92","currency_code":"PKR"}, {"name":"Palau","alpha2Code":"PW","code":"680","currency_code":"(none"}, {"name":"Palestine, State of","alpha2Code":"PS","code":"970","currency_code":"ILS"}, {"name":"Panama","alpha2Code":"PA","code":"507","currency_code":"PAB"}, {"name":"Papua New Guinea","alpha2Code":"PG","code":"675","currency_code":"PGK"}, {"name":"Paraguay","alpha2Code":"PY","code":"595","currency_code":"PYG"}, {"name":"Peru","alpha2Code":"PE","code":"51","currency_code":"PEN"}, {"name":"Philippines","alpha2Code":"PH","code":"63","currency_code":"PHP"}, {"name":"Pitcairn","alpha2Code":"PN","code":"64","currency_code":"NZD"}, {"name":"Poland","alpha2Code":"PL","code":"48","currency_code":"PLN"}, {"name":"Portugal","alpha2Code":"PT","code":"351","currency_code":"EUR"}, {"name":"Puerto Rico","alpha2Code":"PR","code":"1787","currency_code":"USD"}, {"name":"Qatar","alpha2Code":"QA","code":"974","currency_code":"QAR"}, {"name":"Republic of Kosovo","alpha2Code":"XK","code":"383","currency_code":"EUR"}, {"name":"R\u00c3\u00a9union","alpha2Code":"RE","code":"262","currency_code":"EUR"}, {"name":"Romania","alpha2Code":"RO","code":"40","currency_code":"RON"}, {"name":"Russian Federation","alpha2Code":"RU","code":"7","currency_code":"RUB"}, {"name":"Rwanda","alpha2Code":"RW","code":"250","currency_code":"RWF"}, {"name":"Saint Barth\u00c3\u00a9lemy","alpha2Code":"BL","code":"590","currency_code":"EUR"}, {"name":"Saint Helena, Ascension and Tristan da Cunha","alpha2Code":"SH","code":"290","currency_code":"SHP"}, {"name":"Saint Kitts and Nevis","alpha2Code":"KN","code":"1869","currency_code":"XCD"}, {"name":"Saint Lucia","alpha2Code":"LC","code":"1758","currency_code":"XCD"}, {"name":"Saint Martin (French part)","alpha2Code":"MF","code":"590","currency_code":"EUR"}, {"name":"Saint Pierre and Miquelon","alpha2Code":"PM","code":"508","currency_code":"EUR"}, {"name":"Saint Vincent and the Grenadines","alpha2Code":"VC","code":"1784","currency_code":"XCD"}, {"name":"Samoa","alpha2Code":"WS","code":"685","currency_code":"WST"}, {"name":"San Marino","alpha2Code":"SM","code":"378","currency_code":"EUR"}, {"name":"Sao Tome and Principe","alpha2Code":"ST","code":"239","currency_code":"STD"}, {"name":"Saudi Arabia","alpha2Code":"SA","code":"966","currency_code":"SAR"}, {"name":"Senegal","alpha2Code":"SN","code":"221","currency_code":"XOF"}, {"name":"Serbia","alpha2Code":"RS","code":"381","currency_code":"RSD"}, {"name":"Seychelles","alpha2Code":"SC","code":"248","currency_code":"SCR"}, {"name":"Sierra Leone","alpha2Code":"SL","code":"232","currency_code":"SLL"}, {"name":"Singapore","alpha2Code":"SG","code":"65","currency_code":"BND"}, {"name":"Sint Maarten (Dutch part)","alpha2Code":"SX","code":"1721","currency_code":"ANG"}, {"name":"Slovakia","alpha2Code":"SK","code":"421","currency_code":"EUR"}, {"name":"Slovenia","alpha2Code":"SI","code":"386","currency_code":"EUR"}, {"name":"Solomon Islands","alpha2Code":"SB","code":"677","currency_code":"SBD"}, {"name":"Somalia","alpha2Code":"SO","code":"252","currency_code":"SOS"}, {"name":"South Africa","alpha2Code":"ZA","code":"27","currency_code":"ZAR"}, {"name":"South Georgia and the South Sandwich Islands","alpha2Code":"GS","code":"500","currency_code":"GBP"}, {"name":"South Korea","alpha2Code":"KR","code":"82","currency_code":"KRW"}, {"name":"South Sudan","alpha2Code":"SS","code":"211","currency_code":"SSP"}, {"name":"Spain","alpha2Code":"ES","code":"34","currency_code":"EUR"}, {"name":"Sri Lanka","alpha2Code":"LK","code":"94","currency_code":"LKR"}, {"name":"Sudan","alpha2Code":"SD","code":"249","currency_code":"SDG"}, {"name":"Suriname","alpha2Code":"SR","code":"597","currency_code":"SRD"}, {"name":"Svalbard and Jan Mayen","alpha2Code":"SJ","code":"4779","currency_code":"NOK"}, {"name":"Swaziland","alpha2Code":"SZ","code":"268","currency_code":"SZL"}, {"name":"Sweden","alpha2Code":"SE","code":"46","currency_code":"SEK"}, {"name":"Switzerland","alpha2Code":"CH","code":"41","currency_code":"CHF"}, {"name":"Syrian Arab Republic","alpha2Code":"SY","code":"963","currency_code":"SYP"}, {"name":"Taiwan","alpha2Code":"TW","code":"886","currency_code":"TWD"}, {"name":"Tajikistan","alpha2Code":"TJ","code":"992","currency_code":"TJS"}, {"name":"Tanzania, United Republic of","alpha2Code":"TZ","code":"255","currency_code":"TZS"}, {"name":"Thailand","alpha2Code":"TH","code":"66","currency_code":"THB"}, {"name":"Timor-Leste","alpha2Code":"TL","code":"670","currency_code":"USD"}, {"name":"Togo","alpha2Code":"TG","code":"228","currency_code":"XOF"}, {"name":"Tokelau","alpha2Code":"TK","code":"690","currency_code":"NZD"}, {"name":"Tonga","alpha2Code":"TO","code":"676","currency_code":"TOP"}, {"name":"Trinidad and Tobago","alpha2Code":"TT","code":"1868","currency_code":"TTD"}, {"name":"Tunisia","alpha2Code":"TN","code":"216","currency_code":"TND"}, {"name":"Turkey","alpha2Code":"TR","code":"90","currency_code":"TRY"}, {"name":"Turkmenistan","alpha2Code":"TM","code":"993","currency_code":"TMT"}, {"name":"Turks and Caicos Islands","alpha2Code":"TC","code":"1649","currency_code":"USD"}, {"name":"Tuvalu","alpha2Code":"TV","code":"688","currency_code":"AUD"}, {"name":"Uganda","alpha2Code":"UG","code":"256","currency_code":"UGX"}, {"name":"Ukraine","alpha2Code":"UA","code":"380","currency_code":"UAH"}, {"name":"United Arab Emirates","alpha2Code":"AE","code":"971","currency_code":"AED"}, {"name":"United Kingdom of Great Britain and Northern Ireland","alpha2Code":"GB","code":"44","currency_code":"GBP"}, {"name":"United States of America","alpha2Code":"US","code":"1","currency_code":"USD"}, {"name":"Uruguay","alpha2Code":"UY","code":"598","currency_code":"UYU"}, {"name":"Uzbekistan","alpha2Code":"UZ","code":"998","currency_code":"UZS"}, {"name":"Vanuatu","alpha2Code":"VU","code":"678","currency_code":"VUV"}, {"name":"Venezuela (Bolivarian Republic of)","alpha2Code":"VE","code":"58","currency_code":"VEF"}, {"name":"Viet Nam","alpha2Code":"VN","code":"84","currency_code":"VND"}, {"name":"Wallis and Futuna","alpha2Code":"WF","code":"681","currency_code":"XPF"}, {"name":"Western Sahara","alpha2Code":"EH","code":"212","currency_code":"MAD"}, {"name":"Yemen","alpha2Code":"YE","code":"967","currency_code":"YER"}, {"name":"Zambia","alpha2Code":"ZM","code":"260","currency_code":"ZMW"}, {"name":"Zimbabwe","alpha2Code":"ZW","code":"263","currency_code":"BWP"}]
ios_header:any
  constructor(public router:Router,
    public service:ApiService,
    public statusbar:StatusBar,
    public modalController:ModalController,
    public alertController: AlertController,
    private nativeGeocoder: NativeGeocoder,
    public appcomponent:AppComponent,
    public zone:NgZone,
    private toast: Toast,
    public toastController:ToastController,) {
    this.address = this.service.getInvestdata()[0].address
    this.title =  this.service.getInvestdata()[0].title
    this.purchase_price = this.service.getInvestdata()[0].purchase_price
    this.remaining_share = this.service.getInvestdata()[0].remaining_share
    this.img = this.service.getInvestdata()[0].img
    this.user_id= window.localStorage.getItem('user_id')
    this.balance = this.service.getBalance()
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
     this.ios_header = true;
   }else{
     this.ios_header = false
   }
   this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
   this.autocomplete = { input: '' };
   this.autocompleteItems = [];
   this.statusbar.hide()
   }

  ngOnInit() {
    let prop_id = window.localStorage.getItem('prop_id')
    let invoice_id = window.localStorage.getItem('invoice_id')
    if(invoice_id==undefined){
      invoice_id = this.service.getInvestdata()[0].invoice_id
    }
    this.service.user_invest6(this.user_id,prop_id,invoice_id).subscribe(res=>{
      console.log(res)
    })
    this.service.get_user_data(this.user_id).subscribe(res=>{
      console.log(res['user'])
      this.first_name = res['user'].user_fname
      this.last_name = res['user'].user_lname
      this.phone_no = res['user'].user_mobile
      this.autocomplete.input = res['user'].user_address
      this.city = res['user'].user_city
      this.zip = res['user'].zip
      this.country_code = res['user'].user_country
      this.acc_type = res['user'].itype
      let chk = this.countries1.filter(policy => policy.code === res['user'].user_country);
      this.ssn_number = res['user'].ssn
      if(chk.length>0){
        this.user_country = chk[0].name;
      }else{
        this.user_country = ''
      }
     
    })
  }
  // ionViewDidEnter(){
  //   let prop_id = window.localStorage.getItem('prop_id')
  //   this.service.user_invest(this.user_id,prop_id,this.first_name,this.last_name,
  //     this.phone_no,this.user_address,this.zip).subscribe(res=>{
  //     console.log(res)
  //   })
  // }
  next(){
    this.service.update_user_data(this.user_id,this.first_name,this.last_name,this.phone_no,
      this.country_code,this.address,this.city,this.zip,this.ssn_number).subscribe(res=>{
        console.log(res)
      })
      if(this.service.getInvestdata()[0].invoice_id!=undefined){
        this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,'7').subscribe(res=>{
          console.log(res)
        })
      }else{
      let prop_id = window.localStorage.getItem('prop_id')
      let invoice_id = window.localStorage.getItem('invoice_id')
      this.service.user_invest6(this.user_id,prop_id,invoice_id).subscribe(res=>{
        console.log(res)
      })
     }
      this.appcomponent.leftSlide('invest-identity-of')
  }
  toast_(message){
    this.toast.show(message, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
  }
  async countryList() {
    const modal = await this.modalController.create({
      component: CountryListPage,
      cssClass:'country_list'
    });

    modal.onDidDismiss().then((res) => {
      console.log(res)
     if(res.data!=undefined)
     this.user_country = res.data.name
     this.country_code = res.data.code
    });
    return await modal.present();
  }

  update(){
    this.edit_btn = true;
    this.service.update_user(this.first_name,this.last_name,this.country_code,this.city,
      this.phone_no,this.zip,this.user_address,this.user_id,this.acc_type).subscribe(res=>{
        console.log(res)
        this.showmessage('updated successfully')
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
    async cancel_inves(){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Vairt',
        message: 'Do you want to cancel this investment?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yes',
            handler: () => {
              this.cancel_invest()
            }
          }
        ]
      });
  
      await alert.present();
    }
    cancel_invest(){
     let prop_id = window.localStorage.getItem('prop_id')
     if(this.service.getInvestdata()[0].invoice_id!=undefined){
       this.service.cancel_invoice_invest(this.service.getInvestdata()[0].invoice_id,this.user_id).subscribe(res=>{
         console.log(res)
         this.appcomponent.leftSlide('new-investments')
       })
     }else{
      this.service.cancel_invest(prop_id,this.user_id).subscribe(res=>{
        console.log(res)
        this.appcomponent.leftSlide('home')
      })
    }
    }
    async top_up() {
      // const modal = await this.modalController.create({
      //   component: TopUpPage,
      //   cssClass:'center',
      //   enterAnimation: myEnterAnimation,
      //   leaveAnimation: myLeaveAnimation,
      //   componentProps:{
      //     balance:this.balance
      //   }
      //   })
      //   modal.onDidDismiss().then((res) => {
      //     console.log(res)
         
      //   });
      //   return await modal.present(); 
        this.appcomponent.leftSlide('deposit-funds')  
       }
  
  
       async top_down(){
        const modal = await this.modalController.create({
          component: TopDownPage,
          cssClass:'center',
          enterAnimation: myEnterAnimation,
          leaveAnimation: myLeaveAnimation,
          componentProps:{
            balance:this.balance
          }
          })
          modal.onDidDismiss().then((res) => {
            console.log(res)
           
          });
          return await modal.present();   
        }
    logout(){
      this.appcomponent.presentAlertConfirm()
    }
    async getAddressFromCoords(lattitude, longitude) {
   
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5    
      }; 
      this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
        .then((result: NativeGeocoderResult[]) => {
          this.city = result[0].subAdministrativeArea
          this.zip = result[0].postalCode
          this.user_country  = result[0].countryName
          let chk = this.countries1.filter(policy => policy.name === this.user_country);
          if(chk.length>0){
            this.country_code = chk[0].code;
          }else{
            this.country_code = ''
          }
        })
        .catch((error: any) =>{ 
          //this.address = "Address Not Available!";
        }); 
    }
    UpdateSearchResults(){
      // this.content.scrollToBottom(0);
       if (this.user_address == '') {
         this.autocompleteItems = [];
         return;
       }
       this.GoogleAutocomplete.getPlacePredictions({ input: this.user_address },
       (predictions, status) => {
         this.autocompleteItems = [];
         this.zone.run(() => {
           predictions.forEach((prediction) => {
             this.autocompleteItems.push(prediction);
           });
         });
       });
     }
     
     //wE CALL THIS FROM EACH ITEM.
     SelectSearchResult(item) {
       this.placeid = item.place_id
       this.geoCode(JSON.stringify(item));
       this.autocompleteItems = []
       this.user_address = ''
       this.user_address = item.description
       this.user_address = this.user_address
   
     }
     
     geoCode(address:any) {
       let geocoder = new google.maps.Geocoder();
       geocoder.geocode({ 'address': address }, (results, status) => {
         if (status == google.maps.places.PlacesServiceStatus.OK) {
           this.zone.run(() => {
           this.getAddressFromCoords(results[0].geometry.location.lat(),results[0].geometry.location.lng())
           });
           //originLongitude.value = results[0].geometry.location.lng();
       }
      });
    }
     //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
     ClearAutocomplete(){
       this.autocompleteItems = []
       this.user_address = ''
     }
     setting(){
      this.service.setSettingBackPage('invest-contact-info')
      this.appcomponent.leftSlide('setting')
    }
    noti(){
      this.service.setSettingBackPage('invest-contact-info')
      this.appcomponent.upSlide('notification')
    }
}
