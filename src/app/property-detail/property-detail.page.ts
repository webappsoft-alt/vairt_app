import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren,NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IonContent, IonList, IonSlides, isPlatform,NavController,Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
import { ModalController, NavParams } from '@ionic/angular';
import { myEnterAnimation, myLeaveAnimation } from '../animations/nav-animation';
import { TransactionDetailModalPage } from '../transaction-detail-modal/transaction-detail-modal.page';
import { RentalBreakdownModalPage } from '../rental-breakdown-modal/rental-breakdown-modal.page';
import { TopDownPage } from '../top-down/top-down.page';
import { TopUpPage } from '../top-up/top-up.page';
import { AppComponent } from '../app.component'
import { AuthModelPage } from '../auth-model/auth-model.page';
import { Toast } from '@ionic-native/toast/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var google;

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
})
export class PropertyDetailPage implements OnInit {
  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  @ViewChild('barChart', {static: false}) barChart;

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
  funded_bar:any
  investment_amount:any
  initial_invest:any
  expected_apprication:any
  net_dividend:any
  prop_id:any
  property_desc:any
  net_dividend_income:any
  net_dividend_yield:any
  dividend_income_1styear:any
  dividend_income_2ndyear:any
  dividend_income_3rdyear:any
  dividend_income_4thyear:any
  dividend_income_5thyear:any
  app_1st:any
  app_2nd:any
  app_3rd:any
  app_4th:any
  app_5th:any
  avg_annulized_return:any
  roi:any
  five_years:any
  no_of_inv:any
  rent_amount:any
  yearly_rent_amount:any
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
  orignal_funded:any
  user_id:any
  total_price_share:any
  minimum_investment:any
  latitude:any
  longitude:any
  ios_header:any
  active_status:any
  check_auth:any
  property_type:any
  property_images:any=[]
  loading:any
  _currentPlatform:any
  category:any=[]
  details:any=[]
  like:Boolean=false
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
  opts = {
    initialSlide: 0,
    slidesPerView: 1,
   // autoplay: true,
  };
  opts1={
    freeMode:false,
    slidesPerView:3.2,
    slidesOffsetBefore:10,
    slidesOffsetAfter:20,
  }
  activeCategory = 0;
  beds:any
  baths:any
  size:any
  lazy_image:any
  @ViewChildren(IonList, { read: ElementRef }) lists: QueryList<ElementRef>;
  listElements = [];

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonContent) content: IonContent;
  categorySlidesVisible = false;
  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    public zone: NgZone,
    public router:Router,
    public statusbar:StatusBar,
    public platform:Platform,
    private modalController: ModalController,
    public service:ApiService,
    private toast: Toast,
    public appcomponent:AppComponent,
    private nativeGeocoder: NativeGeocoder,) { 
      this.active_status = this.service.getActiveStatus()
      this.statusbar.hide()
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
      this.prop_id = this.service.getPropertyDetail().id
      window.localStorage.setItem('prop_id',this.prop_id)
      this.title = this.service.getPropertyDetail().title
      this.investment_amount = '20000'
      this.img = this.service.getPropertyDetail().img
      this.address = this.service.getPropertyDetail().address
      this.price = this.service.getPropertyDetail().price
      this.property_desc = this.service.getPropertyDetail().property_description 
      this.minimum_investment = this.service.getPropertyDetail().minimum_investment 
      this.funded = this.service.getPropertyDetail().funded
      this.initial_invest = this.service.getPropertyDetail().initial_invest
      this.expected_apprication = '2'
      this.net_dividend_yield = this.service.getPropertyDetail().net_dividend+' %'
      if(this.service.getPropertyDetail().net_dividend_income!=undefined){
      this.net_dividend_income = this.service.getPropertyDetail().net_dividend_income.toFixed(2);
      }
      this.dividend_income_1styear = this.service.getPropertyDetail().net_dividend_income_1st;
      this.dividend_income_2ndyear = this.service.getPropertyDetail().net_dividend_income_2nd;
      this.dividend_income_3rdyear = this.service.getPropertyDetail().net_dividend_income_3rd;
      this.dividend_income_4thyear = this.service.getPropertyDetail().net_dividend_income_4th;
      this.dividend_income_5thyear = this.service.getPropertyDetail().net_dividend_income_5th;
      if(this.service.getPropertyDetail().app_1st!=undefined){
      this.app_1st = this.service.getPropertyDetail().app_1st.toFixed(2);
      }if(this.service.getPropertyDetail().app_2nd!=undefined){
      this.app_2nd = this.service.getPropertyDetail().app_2nd.toFixed(2);
      }if(this.service.getPropertyDetail().app_3rd!=undefined){
      this.app_3rd = this.service.getPropertyDetail().app_3rd.toFixed(2);
      }if(this.service.getPropertyDetail().app_4th!=undefined){      
      this.app_4th = this.service.getPropertyDetail().app_4th.toFixed(2);
      }if(this.service.getPropertyDetail().app_5th!=undefined){      
      this.app_5th = this.service.getPropertyDetail().app_5th.toFixed(2);
      }if(this.service.getPropertyDetail().avg_annulized_return!=undefined){  
      this.avg_annulized_return = this.service.getPropertyDetail().avg_annulized_return.toFixed(2)
      }if(this.service.getPropertyDetail().roi!=undefined){  
      this.roi = this.service.getPropertyDetail().roi.toFixed(2)
      }if(this.service.getPropertyDetail().five_year!=undefined){  
      this.five_years = this.service.getPropertyDetail().five_year.toFixed(2)
      }
      this.no_of_inv = this.service.getPropertyDetail().no_of_inv;
      this.rent_amount =  this.service.getPropertyDetail().rent_amount;
      this.yearly_rent_amount = this.service.getPropertyDetail().yearly_rent_amount
      if(this.service.getPropertyDetail().gross_yield!=undefined){  
      this.gross_yield = this.service.getPropertyDetail().gross_yield.toFixed(2)
      }
      this.gross_rent_per_year = this.service.getPropertyDetail().gross_rent_per_year
      this.service_charges = this.service.getPropertyDetail().service_charges
      this.net_rent = this.service.getPropertyDetail().net_rent
      this.prop_manangement = this.service.getPropertyDetail().prop_management
      this.prop_taxes = this.service.getPropertyDetail().prop_taxes
      this.cost = this.service.getPropertyDetail().cost
      this.transaction_detail_ = this.service.getTransaction()
      this.purchase_costs = this.service.getPropertyDetail().charges_cost 
      this.property_price_per_share = this.service.getPropertyDetail().property_price_per_share
      this.purchase_cost_per_share = this.service.getPropertyDetail().purchase_cost_per_share
      this.transaction_cost_per_share = this.service.getPropertyDetail().transaction_cost_per_share
      this.vairt_fee = this.service.getPropertyDetail().vairt_fee
      this.vat = this.service.getPropertyDetail().vat
      this.number_of_shares = this.service.getPropertyDetail().number_of_shares
      this.transaction_cost = this.service.getPropertyDetail().transaction_cost
      this.total_acquistion_cost = parseInt(this.purchase_costs)+parseInt(this.initial_invest)+parseInt(this.transaction_cost) 
      this.remaining_share = this.service.getPropertyDetail().remaining_share
      this.orignal_funded= this.funded
      this.total_price_share = parseFloat(this.property_price_per_share)+parseFloat(this.purchase_cost_per_share)+parseFloat(this.transaction_cost_per_share)
      window.localStorage.setItem('total_price_per_share',this.total_price_share)
      console.log(this.total_price_share)
      this.latitude  = this.service.getPropertyDetail().lat;
      this.longitude  = this.service.getPropertyDetail().lng;
      this.check_auth = this.service.getPropertyDetail().trans_auth
      this.property_type = this.service.getPropertyDetail().property_type
      this.beds = this.service.getPropertyDetail().beds
      this.baths = this.service.getPropertyDetail().baths
      this.size = this.service.getPropertyDetail().size
      if(this.funded==null){
        this.funded=0;
      }else{
        this.funded_bar = parseInt(this.funded)
        this.funded_bar = this.funded_bar/100
      }
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
      this.property_images = this.service.getPropertyDetail().property_images
      if(this.platform.is('ios')){ this._currentPlatform = 'ios'}
      else{ this._currentPlatform = 'android'}


      this.category = [{name:'ROI Values'},{name:'Yearly Chart'},{name:'Key Info'}
      ,{name:'Rental Yield'},{name:'Property Info'},{name:'Financials'}]


        this.details.push({category:'ROI',roi:[{name:'Net dividend income',value:this.net_dividend_income,typeof:typeof this.net_dividend_income},{name:'Total return on investment',value:this.roi,typeof:typeof this.roi},{name:'Expected capital appreciation',value:this.app_5th,typeof:typeof this.app_5th},{name:'Average annualized return',value:this.avg_annulized_return,typeof:typeof this.avg_annulized_return}]})

        this.details.push({category:'Chart',chart:[{}]})

        this.details.push({category:'Property Key Info',key_info:[{name:'MIN <br> INVESTMENT AMOUNT',value:'$'+this.minimum_investment,img:'assets/images/property_detail/property_key1.png',typeof:typeof this.minimum_investment},{name:'NUMBER <br> OF INVESTORS',value:this.no_of_inv,img:'assets/images/property_detail/property_key2.png',typeof:typeof this.no_of_inv},{name:'SUGGESTED <br> HOLDING PERIOD',value:'5 Years',img:'assets/images/property_detail/property_key3.png',typeof:typeof '5 Years'},{name:'YEARLY <br>RENT AMOUNT',value:'$'+this.yearly_rent_amount,img:'assets/images/property_detail/property_key4.png',typeof:typeof this.yearly_rent_amount}]})

        this.details.push({category:'Rental Yields',rental_yield:[{name:'GROSS <br> YIELD',value:this.gross_yield+' %',img:'assets/images/property_detail/rental_1.png',typeof:typeof this.gross_yield},{name:'EXPECTED DIVIDEND<br> YIELD',value:this.net_dividend_yield,img:'assets/images/property_detail/rental_2.png',typeof:typeof this.net_dividend_yield},{name:'5 YEARS EXPECTED <br> RETURN',value:this.five_years+' %',img:'assets/images/property_detail/rental_3.png',typeof:typeof this.five_years},{name:'DIVIDEND <br> FREQUENCEY',value:'Monthly',img:'assets/images/property_detail/rental_4.png',typeof:typeof 'Monthly'}]})

        this.details.push({category:'Property Info',des:[{value:this.property_desc}]})

        this.details.push({category:'Financials',fin:[{name:'Transaction <br> Detail',img:'assets/images/property_detail/fin_1.png',func:'transaction_detail'},{name:'Rental <br> Breakdown',img:'assets/images/property_detail/fin_2.png',func:'rental_breakdown'}]})

        //  this.details.push({category:'Documents',document:[{}]})
        this.details.push({category:'Location',loc:[{}]})
        this.lazy_image = 'assets/images/lazy_load.gif'

        this.like = this.service.getPropertyDetail().like
    }

  ngOnInit() {

  }
  // ionViewWillEnter(){
  //   this.platform.ready().then(async () => {
  //   this.loadMap();
  //   })
  // }
  ionViewDidEnter(){
    this.user_id = window.localStorage.getItem('user_id')
    this.createChartGraph();
    this.loadMap();

  }
  // chart(){
  //   let chart: Chart = new Chart({
  //     primaryXAxis: {
  //       valueType: 'Category'
  //   },
  //     //Initializing Primary Y Axis
  //     primaryYAxis:
  //     {
  //         majorGridLines: { width: 0 },
  //         edgeLabelPlacement: 'Shift'
  //     },
  //     axes: [
  //         {
  //             name: 'yAxis', opposedPosition: true,
  //             majorGridLines: { width: 0 },
  //             edgeLabelPlacement: 'Shift'
  //         }
  //     ],
  //   series:[{
  //           type: 'StackingBar',
  //           dataSource: [
  //               { x: '2014', y: 111.1 },
  //               { x: '2015', y: 127.3 },
  //               { x: '2016', y: 143.4 },
  //               { x: '2017', y: 159.9 }],
  //           xName: 'x', width: 2,
  //           yName: 'y', name: 'UK',
  //           fill: '#0450C2'

  //       },
  //       {
  //           type: 'StackingBar',
  //           dataSource: [
  //               { x: '2014', y: 76.9 },
  //               { x: '2015', y: 99.5 },
  //               { x: '2016', y: 121.7 },
  //               { x: '2017', y: 142.5 }],
  //           xName: 'x', width: 2,
  //           yName: 'y', name: 'Germany',
  //            fill: '#0D98FF',

  //       },
  //       {
  //           type: 'StackingBar',
  //           dataSource: [
  //               { x: '2014', y: 66.1 },
  //               { x: '2015', y: 79.3 },
  //               { x: '2016', y: 91.3 },
  //               { x: '2017', y: 102.4 }],
  //           xName: 'x', width: 2,
  //           yName: 'y', name: 'France',
  //           fill: '#0450C2'

  //       },
  //     ],
  //  }, '#element');
  // }

  createChartGraph(){
    let ctx = this.barChart.nativeElement;
    //console.log(ctx.destroy())
    ctx.height = 230;
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Year1', 'Year2', 'Year3', 'Year4', 'Year5'],
        datasets: [{
          label: 'Expected dividend income',
          data: [this.dividend_income_1styear, this.dividend_income_2ndyear, this.dividend_income_3rdyear, this.dividend_income_4thyear,this.dividend_income_5thyear],
          backgroundColor: '#018BCB', // array should have same number of elements as number of dataset
          borderColor: '#018BCB',// array should have same number of elements as number of dataset
          borderWidth: 1
        },{
          label: 'Expected appreciation income',
          data: [this.app_1st, this.app_2nd, this.app_3rd, this.app_4th, this.app_5th],
          backgroundColor: '#003B66', // array should have same number of elements as number of dataset
          borderColor: '#003B66',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
              stacked: true
          },
          y: {
              stacked: true
          }
      }
      }
    });
  }
  private loadMap(): Promise<any> {

    return new Promise((resolve, reject) => {
    //  let options = {timeout: 10000, enableHighAccuracy: true, maximumAge:3600};
    // this.geolocation.getCurrentPosition(options).then((resp) => {
      let latLng = new google.maps.LatLng(this.latitude, this.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 12,
        streetViewControl: false,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{stylers:[{ saturation: -90 },{ lightness: 30 }]},
         {featureType:'road'}]
      } 

      this.getAddressFromCoords(this.latitude, this.longitude); 
     
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      resolve(true);

      var marker1 ;
      marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(this.latitude, this.longitude),
        map: this.map,
      })

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  //});
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
  
  //wE CALL THIS FROM EACH ITEM.
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

      async transaction_detail() {
        const modal = await this.modalController.create({
          component: TransactionDetailModalPage,
          cssClass:'upload_photo',
          componentProps:{
            transaction_detail:this.transaction_detail_,
            initial_invest:this.initial_invest,
            purchase_costs:this.purchase_costs,
            property_price_per_share:this.property_price_per_share,
            purchase_cost_per_share:this.purchase_cost_per_share,
            transaction_cost_per_share:this.transaction_cost_per_share,
            vairt_fee:this.vairt_fee,
            vat:this.vat,
            number_of_shares:this.number_of_shares,
            transaction_cost:this.transaction_cost
           },
          enterAnimation: myEnterAnimation,
          leaveAnimation: myLeaveAnimation
        });
        modal.onDidDismiss().then((res) => {
          console.log(res)
        });
        return await modal.present();
      }

      async rental_breakdown() {
        const modal = await this.modalController.create({
          component: RentalBreakdownModalPage,
          cssClass:'upload_photo',
          enterAnimation: myEnterAnimation,
          leaveAnimation: myLeaveAnimation,
          componentProps:{
          gross_rent_per_year:this.gross_rent_per_year,
          service_charges:this.service_charges,
          net_rent:this.net_rent,
          prop_manangement:this.prop_manangement,
          prop_taxes:this.prop_taxes,
          net_yield:this.gross_yield,
          net_dividend_yield:this.net_dividend_yield
          }
        });
    
        modal.onDidDismiss().then((res) => {
          console.log(res)
          this.net_dividend_income = res['net_dividend_income'];
        });
        return await modal.present();
      }

   invest(){
     let data=[{title:this.title,img:this.img,address:this.address,purchase_price:this.total_acquistion_cost,remaining_share:this.remaining_share}]
       this.service.invest_data(data);
       this.service.setBackPage('property-detail')
       this.appcomponent.leftSlide('invest-info')

       if(this.property_type!='Funded'){
       if(this.active_status==false){
         this.appcomponent.leftSlide('account-activate')
       }else{
        if(this.check_auth==true){ 
          this.auth_model()
         }else{
           this.service.setBackPage('property-detail')
          this.appcomponent.leftSlide('invest-info')
         }
        }
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
    async auth_model(){
      const modal = await this.modalController.create({
        component: AuthModelPage,
        cssClass:'auth_',
        componentProps:{status:'true',column_name:'s_withdrawl'}
      });
  
      modal.onDidDismiss().then((res) => {
        console.log(res)
         if(res.data!=undefined){
          this.router.navigate(['invest-info']);
        }
      });
      return await modal.present();
    }
    initial_invest_change(event){
      let value = event.target.value
      this.service.invest_cal(this.prop_id,value,this.expected_apprication).subscribe(res=>{
        console.log(res)
        if(res['net_dividend_income']!=0){
        this.net_dividend_income = res['net_dividend_income'].toFixed(2)
        }
        else {this.net_dividend_income = res['net_dividend_income']}
        this.app_1st = res['property'][0].app_1st.toFixed(2);
        this.app_2nd = res['property'][0].app_2nd.toFixed(2);
        this.app_3rd = res['property'][0].app_3rd.toFixed(2);
        this.app_4th = res['property'][0].app_4th.toFixed(2);
        this.app_5th = res['property'][0].app_5th.toFixed(2);
        this.avg_annulized_return = res['property'][0].avg_annulized_return.toFixed(2)
        this.roi = res['property'][0].roi.toFixed(2)
        this.five_years = res['property'][0].five_year.toFixed(2)
      //  this.reloadCreateChartGraph(this.app_1st,this.app_2nd,this.app_3rd,this.app_4th,this.app_5th);
      })
    }

    expected_apprication_change(event){
      let value = event.target.value
      this.service.apprication_cal(this.prop_id,value,this.investment_amount).subscribe(res=>{
        console.log(res)
        this.net_dividend_income = res['net_dividend_income'].toFixed(2)
        this.app_1st = res['property'][0].app_1st.toFixed(2);
        this.app_2nd = res['property'][0].app_2nd.toFixed(2);
        this.app_3rd = res['property'][0].app_3rd.toFixed(2);
        this.app_4th = res['property'][0].app_4th.toFixed(2);
        this.app_5th = res['property'][0].app_5th.toFixed(2);
        this.avg_annulized_return = res['property'][0].avg_annulized_return.toFixed(2)
        this.roi = res['property'][0].roi.toFixed(2)
        this.five_years = res['property'][0].five_year.toFixed(2)
      })
    }

    reloadCreateChartGraph(appreciation1,appreciation2,appreciation3,appreciation4,appreciation5){
      this.bars.destroy()
      let ctx = this.barChart.nativeElement;
      ctx.height = 230;
      this.bars1 = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Year1', 'Year2', 'Year3', 'Year4', 'Year5'],
          datasets: [{
            label: 'Expected dividend income',
            data: [this.dividend_income_1styear, this.dividend_income_2ndyear, this.dividend_income_3rdyear, this.dividend_income_4thyear,this.dividend_income_5thyear],
            backgroundColor: '#018BCB', // array should have same number of elements as number of dataset
            borderColor: '#018BCB',// array should have same number of elements as number of dataset
            borderWidth: 1
          },{
            label: 'Expected appreciation income',
            data: [appreciation1, appreciation2, appreciation3, appreciation4, appreciation5],
            backgroundColor: '#003B66', // array should have same number of elements as number of dataset
            borderColor: '#003B66',// array should have same number of elements as number of dataset
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
        }
      });
  
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
    if(name=='transaction_detail'){
      this.transaction_detail()
    }if(name=='rental_breakdown'){
      this.rental_breakdown()
    }
  }
  fvt(){
    this.like = true;
    this.service.add_item_wishlist(this.user_id,this.prop_id,'0').subscribe(res=>{
      console.log(res)
    })
  }
  un_fvt(){
    this.like = false;
    this.service.remove_item_wishlist(this.user_id,this.prop_id,'0').subscribe(res=>{
      console.log(res)
    })
  }
}
