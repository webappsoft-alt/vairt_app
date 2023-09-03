import { IonContent, IonList, IonSlides, isPlatform,NavController,Platform } from '@ionic/angular';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren,NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import { ModalController, NavParams } from '@ionic/angular';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { FlipTransactionDetailPage } from '../flip-transaction-detail/flip-transaction-detail.page';
import { FlipSalebreakdownDetailPage } from '../flip-salebreakdown-detail/flip-salebreakdown-detail.page';
import { TopDownPage } from '../top-down/top-down.page';
import { PledgeModalPage } from '../pledge-modal/pledge-modal.page';
import { Toast } from '@ionic-native/toast/ngx';
import { AppComponent } from '../app.component';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var google;

@Component({
  selector: 'app-flip-detail',
  templateUrl: './flip-detail.page.html',
  styleUrls: ['./flip-detail.page.scss'],
})
export class FlipDetailPage implements OnInit {
  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  @ViewChild('barChart', {static: false}) barChart;
  property_images:any=[]
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };
  pipe:any
  autocomplete: { input: string; };
  autocompleteItems: any[];
  map:any;
  lat:any;
  long:any;
  address:any
  GoogleAutocomplete: any;
  placeid:any
  img:any
  price:any
  bars:any
  bars1:any
  funded:any
  investment_amount:any
  initial_invest:any
  minimum_investment:any
  rehabilitation_cost:any
  expected_apprication:any
  pledge_amount:any
  sale_price:any
  sale_cost:any
  gross_profit:any
  total_investment:any
  investment_total:any
  net_dividend:any
  prop_id:any
  property_desc:any
  estimate_net_profit:any
  net_profit:any
  partner_share:any
  vairt_share:any
  net_dividend_income:any
  net_dividend_yield:any
  gross_yield:any
  gross_rent_per_year:any
  service_charges:any
  net_rent:any
  prop_manangement:any
  prop_taxes:any
  cost:any
  transaction_detail_:any=[]
  purchase_costs:any
  property_price_per_share:any
  purchase_cost_per_share:any
  transaction_cost_per_share:any
  vat:any
  vairt_fee:any
  number_of_shares:any
  transaction_cost:any
  title:any
  total_acquistion_cost:any
  remaining_share:any
  no_of_inv:any
  est_net_yield:any
  cash_return:any
  orignal_funded:any
  latitude:any
  longitude:any
  ios_header:any
  property_type:any
  _currentPlatform:any
  lazy_image:any
  beds:any
  baths:any
  size:any
  share:any
  like:Boolean = false
  funded_percent:any
  slideOptsOne1={
    slidesPerView:1,
    initialSlide:0,
    spaceBetween:0,
   // autoplay:true,
    loop:true,
  };
  opts={
    freeMode:false,
    slidesPerView:3.2,
    slidesOffsetBefore:10,
    slidesOffsetAfter:20,
  }

  activeCategory = 0;
  @ViewChildren(IonList, { read: ElementRef }) lists: QueryList<ElementRef>;
  listElements = [];

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonContent) content: IonContent;
  categorySlidesVisible = false;
  category:any=[]
  details:any=[]
  user_id:any
  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    public zone: NgZone,
    public router:Router,
    private modalController: ModalController,
    public platform:Platform,
    public service:ApiService,
    public statusbar:StatusBar,
    private toast: Toast,
    public appcomponent:AppComponent,
    @Inject(DOCUMENT) private document: Document,
    private nativeGeocoder: NativeGeocoder,) { 
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
      this.statusbar.hide()
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
      this.prop_id = this.service.getFlipDetail().id
      window.localStorage.setItem('prop_id',this.prop_id)
      this.title = this.service.getFlipDetail().title
      this.investment_amount = '20000'
      this.pledge_amount = 25000
      this.img = this.service.getFlipDetail().img
      this.address = this.service.getFlipDetail().address
      this.price = this.service.getFlipDetail().price
      this.property_desc = this.service.getFlipDetail().property_description 
      this.funded = this.service.getFlipDetail().funded
      this.initial_invest = this.service.getFlipDetail().initial_invest
      this.rehabilitation_cost = this.service.getFlipDetail().rehabilitation_cost 
       this.minimum_investment = this.service.getFlipDetail().minimum_investment
      this.total_investment = this.service.getFlipDetail().total_investment
      this.sale_price = this.service.getFlipDetail().sale_price
      this.sale_cost = this.service.getFlipDetail().sale_cost
      this.gross_profit = this.service.getFlipDetail().gross_profit
      this.latitude  = this.service.getFlipDetail().lat;
      this.longitude  = this.service.getFlipDetail().lng;
      this.share = this.service.getFlipDetail().share.toFixed(2);
      if(this.service.getFlipDetail().investment_total!=undefined){
       this.investment_total = this.service.getFlipDetail().investment_total.toFixed(0)
      }
      this.no_of_inv = this.service.getFlipDetail().no_of_inv;
      this.estimate_net_profit = this.service.getFlipDetail().estimate_net_profit 
      if(this.service.getFlipDetail().est_net_yield!=undefined){
      this.est_net_yield = this.service.getFlipDetail().est_net_yield.toFixed(2)
      }
      if(this.pledge_amount >= 25000){
        this.partner_share = '30'
        this.vairt_share='70%'
      }if(this.pledge_amount >= 50000){
        this.partner_share = '40'
        this.vairt_share='60%' 
      }if(this.pledge_amount >= 100000){
        this.partner_share = '50'
        this.vairt_share='50%'
      }

      this.net_profit = ((this.estimate_net_profit*this.partner_share)/100).toFixed(2)

      this.gross_rent_per_year = this.service.getFlipDetail().gross_rent_per_year
      this.service_charges = this.service.getFlipDetail().service_charges
      this.prop_manangement = this.service.getFlipDetail().prop_management
      this.prop_taxes = this.service.getFlipDetail().prop_taxes
      this.net_dividend_income = this.service.getFlipDetail().net_dividend_income
      this.net_dividend_yield = this.service.getFlipDetail().net_dividend_yield;

      let total_ = this.estimate_net_profit/2
      this.cash_return = parseInt(this.total_investment) +total_

      this.orignal_funded= this.funded
      this.beds = this.service.getFlipDetail().beds
      this.baths = this.service.getFlipDetail().baths
      this.size = this.service.getFlipDetail().size
      if(this.funded == null || this.funded== 'null'){
        this.funded=0;
      }else{
        this.funded_percent = parseInt(this.funded)
        this.funded_percent = this.funded_percent/100
      }
      this.property_images = this.service.getFlipDetail().property_images
      this.property_type = this.service.getFlipDetail().property_type
      if(this.platform.is('ios')){ 
        this._currentPlatform = 'ios'
      }else{
        this._currentPlatform = 'android'
      }
      this.lazy_image = 'assets/images/lazy_load.gif'
      this.category = [{name:'ROI Values'},{name:'Yearly Chart'},{name:'Key Info'}
      ,{name:'Rental Yield'},{name:'Property Info'},{name:'Financials'},{name:'Property Facts'}]


        this.details.push({category:'ROI',roi:[{name:'Estimate Total Investment',value:this.total_investment},{name:'Estimate Sale Costs',value:this.sale_cost},{name:'Estimate Sale Price',value:this.sale_price},{name:'Estimate Gross Profit',value:this.gross_profit}]})

        this.details.push({category:'Chart',chart:[{}]})

        this.details.push({category:'Property Key Info',key_info:[{name:'MIN <br> INVESTMENT AMOUNT',value:'$ '+this.minimum_investment,img:'assets/images/property_detail/property_key1.png',typeof:typeof this.minimum_investment},{name:'NUMBER <br> OF INVESTORS',value:this.no_of_inv,img:'assets/images/property_detail/property_key2.png',typeof:typeof this.no_of_inv},{name:'SUGGESTED <br> HOLDING PERIOD',value:'1.5 Years',img:'assets/images/property_detail/property_key3.png',typeof:typeof '1.5 Years'},{name:'ESTIMATE  <br>SALE PRICE',value:'$ '+this.sale_price,img:'assets/images/property_detail/property_key4.png',typeof:typeof this.sale_price}]})

        this.details.push({category:'Rental Yields',rental_yield:[{name:'Total <br> Investment',value:this.total_investment,img:'assets/images/property_detail/rental_1.png',typeof:typeof this.total_investment},{name:'Estimate Property <br> Acquisition Cost',value:'$ '+this.initial_invest,img:'assets/images/property_detail/rental_2.png',typeof:typeof this.initial_invest},{name:'Estimate Property <br> rehabilitation cost',value:'$ '+this.rehabilitation_cost,img:'assets/images/property_detail/rental_3.png',typeof:typeof this.rehabilitation_cost},{name:'Frequency',value:'Monthly',img:'assets/images/property_detail/rental_4.png',typeof:typeof 'Monthly'}]})

        this.details.push({category:'Property Info',des:[{value:this.property_desc}]})
       
        this.details.push({category:'Financials',fin:[{name:'Sale <br> Breakdown',img:'assets/images/property_detail/fin_1.png',func:'sale_breakdown'},{name:'Rental <br> Breakdown',img:'assets/images/property_detail/fin_2.png',func:'rental_breakdown'}]})

        this.details.push({category:'Property Facts',document:[{}]})
        this.details.push({category:'Location',loc:[{}]})
        this.like = this.service.getFlipDetail().like
    }

    ngOnInit() {
      const headerHeight = isPlatform('ios') ? 44 : 56;    
      this.document.documentElement.style.setProperty('--header-position', `calc(env(safe-area-inset-top) + ${headerHeight}px)`);
    }

  ionViewDidEnter(){
    this.user_id = window.localStorage.getItem('user_id')
      this.createChartGraph();
      this.loadMap();
  }
  // ionViewWillEnter(){
  //   this.platform.ready().then(async () => {
  //    this.loadMap();
  //   })
  // }

  createChartGraph(){
    let ctx = this.barChart.nativeElement;
    ctx.height = 230;
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Investment', 'Net Profit', 'Cash Return'],
        datasets: [{
          label: 'Partner',
          data: [this.total_investment,this.estimate_net_profit/2,this.cash_return],
          backgroundColor: '#018BCB', // array should have same number of elements as number of dataset
          borderColor: '#018BCB',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
    
    });
  }
 private loadMap(): Promise<any> {
    return new Promise((resolve, reject) => {
    let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
    // this.geolocation.getCurrentPosition(options).then((resp) => {
      let latLng = new google.maps.LatLng(this.latitude,this.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 12,
        streetViewControl: false,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{stylers:[{ saturation: -90 },{ lightness: 30 }]},
         {featureType:'road'}]
      } 

      this.getAddressFromCoords(this.latitude,this.longitude); 
     
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      resolve(true);
      var marker1 ;
      marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(this.latitude,this.longitude),
        map: this.map,
      })

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  //})
  }

  
  getAddressFromCoords(lattitude, longitude) {
    console.log(lattitude)
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5    
    }; 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.autocomplete.input = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value); 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.autocomplete.input += value+", ";
        }
        this.autocomplete.input = this.address.slice(0, -2);
        console.log(this.address)
      })
      .catch((error: any) =>{ 
        console.log(error)
        this.autocomplete.input = "";
      }); 
    }

  UpdateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }
  
  //WE CALL THIS FROM EACH ITEM.
  SelectSearchResult(item) {
    this.placeid = item.place_id
    this.geoCode(JSON.stringify(item));
    this.autocompleteItems = []
    this.autocomplete.input = ''
    this.autocomplete.input = item.description
  }
  
  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      this.lat = results[0].geometry.location.lat();
      this.long = results[0].geometry.location.lng();
       let latLng = new google.maps.LatLng(this.lat, this.long);
      let mapOptions = {
        center: latLng,
        streetViewControl: false,
        disableDefaultUI: true,
        zoom:12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{stylers:[{ saturation: -90 },{ lightness: 30 }]},
         {featureType:'road'}]
      } 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 
        var marker1 ;

        marker1 = new google.maps.Marker({
          position: new google.maps.LatLng(this.lat,this.long),
          map: this.map,
        })
   });
 }
      ClearAutocomplete(){
        this.autocompleteItems = []
        this.autocomplete.input = ''
      }

      async sale_breakdown() {
        const modal = await this.modalController.create({
          component: FlipSalebreakdownDetailPage,
          cssClass:'upload_photo',
          enterAnimation: myEnterAnimation,
          leaveAnimation: myLeaveAnimation,
          componentProps:{
            initial_invest:this.initial_invest,
            rehabilitation_cost:this.rehabilitation_cost,
            sale_price:this.sale_price,
            sale_cost:this.sale_cost,
            gross_profit:this.gross_profit,
            estimate_net_profit:this.estimate_net_profit,
            partner_share:this.partner_share,
            roi:this.investment_total,
            pledge_amount:this.pledge_amount,
            cash_return:this.cash_return,
            total_investment_new:this.total_investment,
            estimate_management:this.prop_manangement
           },
        });
    
        modal.onDidDismiss().then((res) => {
          console.log(res)
          this.net_dividend_income = res['net_dividend_income'];
         
        });
        return await modal.present();
      }

      async rental_breakdown() {
        const modal = await this.modalController.create({
          component: FlipTransactionDetailPage,
          cssClass:'upload_photo',
          enterAnimation: myEnterAnimation,
          leaveAnimation: myLeaveAnimation,
          componentProps:{
            gross_rent_per_year:this.gross_rent_per_year,
            service_charges:this.service_charges,
            prop_management:this.prop_manangement,
            prop_taxes:this.prop_taxes,
            net_dividend_income:this.net_dividend_income,
            net_dividend_yield : this.net_dividend_yield,
            total_investment:this.total_investment,
            est_net_yield:this.est_net_yield,
            partner_share:this.partner_share,
           },
        });
    
        modal.onDidDismiss().then((res) => {
          console.log(res)
         
        });
        return await modal.present();
      }

   invest(){
     let data=[{title:this.title,img:this.img,address:this.address,purchase_price:this.total_acquistion_cost,remaining_share:this.remaining_share}]
       this.service.invest_data(data);
       this.router.navigate(['invest-info']);
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
        this.router.navigate(['deposit-funds'])  
       }
  
       async top_down(){
        const modal = await this.modalController.create({
          component: TopDownPage,
          cssClass:'center',
          enterAnimation: myEnterAnimation,
          leaveAnimation: myLeaveAnimation,
          })
          modal.onDidDismiss().then((res) => {
            console.log(res)
           
          });
          return await modal.present();   
    }

    pledge_change(event){
      let value = event.target.value
      console.log(value)
      if(value==undefined){
        this.pledge_amount = this.pledge_amount
      }else{
      this.pledge_amount = value
    }
    
      // this.service.pledge_change(this.prop_id,value).subscribe(res=>{
      //   console.log(res)
      //   if(res['net_dividend_income']!=0){
      //   this.net_dividend_income = res['net_dividend_income'].toFixed(2)
      //   }
      //   else {this.net_dividend_income = res['net_dividend_income']}

      // //  this.reloadCreateChartGraph(this.app_1st,this.app_2nd,this.app_3rd,this.app_4th,this.app_5th);
      // })
    }
   async pledge_(){
      this.pledge_amount = this.pledge_amount
      if(this.property_type!='Funded'){
      const modal = await this.modalController.create({
        component: PledgeModalPage,
        cssClass:'country',
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
        componentProps:{
          pledge_amount: this.pledge_amount,
          title:this.title,
          prop_id:this.prop_id
        }
      })
      modal.present()
    }else{
      this.toast_('Property is in Funded state');
    }
    } 
    toast_(message){
      this.toast.show(message, '3000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        })
    }
   home(){
    this.navCtrl.navigateForward('home', { animated: false, });
  }
  portfolio(){
    this.navCtrl.navigateForward('portfolio', { animated: false, });
  }
  inves(){
    this.navCtrl.navigateForward('new-investments', { animated: false, });
  }
  flip(){
    this.navCtrl.navigateForward('flip', { animated: false, });
  }
  profile(){
    this.navCtrl.navigateForward('profile', { animated: false, });
  }
  logout(){
    window.localStorage.clear()
    this.router.navigate(['login'])
  }

  ngAfterViewInit() {  
    // console.log(this.lists.changes)
    this.lists.changes.subscribe(_ => { 
      this.listElements = this.lists.toArray();
    });
    this.listElements = this.lists.toArray();
  }

  onScroll(ev) { 
    const offset = ev.detail.scrollTop;
    this.categorySlidesVisible = offset > 200;
    for (let i = 0; i < this.listElements.length; i++) {
      const item = this.listElements[i].nativeElement;
      if (this.isElementInViewport(item)) {
        this.activeCategory = i;
        this.slides.slideTo(i);
        break;
      }
    }
  }
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  selectCategory(index) {
    console.log(this.listElements)
    const child = this.listElements[index].nativeElement;    
    this.content.scrollToPoint(0, child.offsetTop - 120, 1000);
  }
  async imageModal(){
    // this.service.setImageModal(this.products)
    // this.appcomponent.fadeSlide('image-modal')
}
back(){
  let page = this.service.getDetailBackPage()
  this.appcomponent.downSlidePre(page)
}
fin_fun(name){
  if(name=='sale_breakdown'){
    this.sale_breakdown()
  }if(name=='rental_breakdown'){
    this.rental_breakdown()
  }
 }
 fvt(){
  this.like = true
  this.service.add_item_wishlist(this.user_id,this.prop_id,'0').subscribe(res=>{
    console.log(res)
  })
}
  un_fvt(){
  this.like = false
  this.service.remove_item_wishlist(this.user_id,this.prop_id,'0').subscribe(res=>{
    console.log(res)
  })
  }
}
