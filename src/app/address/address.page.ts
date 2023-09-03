import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { Router } from '@angular/router'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ApiService } from '../api/api.service';

declare var google;

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  loading: boolean;
  validations_form: FormGroup;
  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  pipe:any
  autocomplete: { input: string; };
  autocompleteItems: any[];
  map:any;
  lat:any;
  long:any;
  address:any
  placeid:any
  GoogleAutocomplete: any;
  state:any;
  city:any;
  postalCode:any;
  ios_header:any
  user_id:any
  constructor(public formBuilder: FormBuilder,
    private geolocation: Geolocation,
    public zone:NgZone,
    public service:ApiService,
    private nativeGeocoder: NativeGeocoder,
    public router:Router,) { 
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
      this.autocomplete.input = window.localStorage.getItem('address')
      this.city = window.localStorage.getItem('city')
      this.state = window.localStorage.getItem('state')
      this.postalCode = window.localStorage.getItem('postal_code')
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
       this.ios_header = true;
     }else{
       this.ios_header = false
     }
    }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      address: new FormControl('', Validators.required),
    });
  }
  validation_messages = {
    'address': [
      { type: 'required', message: 'Address is required.' }
    ],
  }
  verify(){
    this.router.navigate(['address'])
  }

  async getAddressFromCoords(lattitude, longitude) {
 
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5    
    }; 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result[0])
        this.state = result[0].administrativeArea
        this.city = result[0].subAdministrativeArea
        this.lat = result[0].latitude
        this.postalCode = result[0].postalCode
    
      })
      .catch((error: any) =>{ 
        //this.address = "Address Not Available!";
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
    this.autocomplete.input = ''
  }
  onSubmit(values){
    this.user_id = window.localStorage.getItem('user_id')
    this.service.address(this.user_id,this.autocomplete.input,this.city,this.state,this.postalCode).subscribe(res=>{
      console.log(res)
      this.router.navigate(['account-type'])
    })
   
  }
}
