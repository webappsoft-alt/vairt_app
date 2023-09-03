import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { ModalController, NavParams } from '@ionic/angular';
import { CountryListPage } from '../country-list/country-list.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.page.html',
  styleUrls: ['./account-type.page.scss'],
})
export class AccountTypePage implements OnInit {
  type:any
  user_id:any
  name:any
  joint:Boolean=false
  trust:Boolean=false
  entity:Boolean=false
  retirement:Boolean=false
  primary_owner:Boolean
  country:any;
  lat:any;
  long:any;
  address:any
  placeid:any
  GoogleAutocomplete: any;
  state:any;
  city:any;
  postalCode:any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  uri:any
  upload_file:any;
  certification_file:any
  operating_file:any
  certification_uri:any
  operating_uri:any
  private fileTransfer: FileTransferObject;  
  name_trust:any
  title_trust:any
  trust_type:any
  tin:any
  tin_select:any
  doc_later:any
  name_entity:any
  title_entity:any
  entity_type:any
  doc_entity:any
  entity_id:any
  joint_owner:any
  first_name:any
  last_name:any
  joint_inv_address:any
  joint_phone_no:any
  country_code:any
  retirement_value:any
  loading:any
  ios_header:any
  constructor(public router:Router,
    public modalController:ModalController,
    private nativeGeocoder: NativeGeocoder,
    public zone:NgZone,
    public toastController:ToastController,
    public transfer:FileTransfer,
    public fileChooser:FileChooser,
    public service:ApiService) { 
    this.type='individual'
    this.tin_select = '0'
    this.trust_type = '0'
    this.entity_type = '0'
    this.user_id = window.localStorage.getItem('user_id')
    this.name = window.localStorage.getItem('full_name')
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
   
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
  }

  ngOnInit() {
  }
  acc_type(event){
    let value = event.detail.value
    if(value=='joint'){this.joint=true;this.trust=false;this.entity=false;this.retirement=false}
    if(value=='trust'){this.joint=false;this.trust=true;this.entity=false;this.retirement=false}
    if(value=='entity'){this.joint=false;this.trust=false;this.entity=true;this.retirement=false}
    if(value=='retirement'){this.joint=false;this.trust=false;this.entity=false;this.retirement=true}
    if(value=='individual'){this.joint=false;this.trust=false;this.entity=false;this.retirement=false}
  }
  async countryList() {
    const modal = await this.modalController.create({
      component: CountryListPage,
      cssClass:'country_list'
    });

    modal.onDidDismiss().then((res) => {
      console.log(res)
     if(res.data!=undefined)
     this.country = res.data.country_name
     this.country_code = res.data.code
     //this.selected_country(res.data.name,res.data.code)
    });
    return await modal.present();
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
        this.country = result[0].countryName
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

  filechooser(){
    this.fileChooser.open().then(uri =>{ 
      this.uri = uri
      let fileExtn=this.uri.split('.').reverse()[0];
      let fileMIMEType=this.getMIMEtype(fileExtn);
    this.upload_file = 'certification'+fileMIMEType;
    }).catch(e => console.log(e));
  }

  certification(){
    this.fileChooser.open().then(uri =>{ 
      this.certification_uri = uri
      let fileExtn=this.certification_uri.split('.').reverse()[0];
      let fileMIMEType=this.getMIMEtype(fileExtn);
    this.certification_file = 'certification'+fileMIMEType;
    }).catch(e => console.log(e));
  }

  operating(){
    this.fileChooser.open().then(uri =>{ 
      this.operating_uri = uri
      let fileExtn=this.operating_uri.split('.').reverse()[0];
      let fileMIMEType=this.getMIMEtype(fileExtn);
    this.operating_file = 'Operating'+fileMIMEType;
    }).catch(e => console.log(e));
  }

  getMIMEtype(extn){
    let ext=extn.toLowerCase();
    let MIMETypes={
      'txt' :'.txt',
      'docx':'.docx',
      'doc' : 'application/msword',
      'pdf' : '.pdf',
      'jpg' : '.jpeg',
      'bmp' : '.bmp',
      'png' : '.png',
      'xls' : '.xls',
      'xlsx': '.xlsx',
      'rtf' : '.rtf',
      'ppt' : '.ppt',
      'pptx': '.pptx',
    }
    return MIMETypes[ext];
  }
  next(){
    this.service.account_type(this.user_id,this.type).subscribe(res=>{
      console.log(res)
    })
    if(this.trust==true){
      this.trust_file_upload()
    }
    if(this.entity==true){
      this.entity_file_upload()
    }
    if(this.joint==true){
      this.joint_()
    }
    if(this.retirement==true){
      this.retirement_()
    }
    this.router.navigate(['investment-type'])
  }
  
  trust_file_upload(){
    if(this.doc_later==true){this.doc_later=1}
    else{this.doc_later=0};
    if(this.name_trust!=undefined && this.title_trust!=undefined && this.trust_type!=undefined && this.tin!=undefined && this.tin_select!=undefined){
    this.service.account_type_trust(this.user_id,this.name_trust,this.title_trust,this.trust_type,
      this.tin,this.tin_select,this.doc_later).subscribe(res=>{
      console.log(res)
      let trust_id = res['trust_id'];
      let fileExtn=this.uri.split('.').reverse()[0];
      let fileMIMEType=this.getMIMEtype(fileExtn);
      const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: this.uri,
          chunkedMode: false,
          mimeType:fileMIMEType,
          headers: {},
          params:{
            'type' : 'trust_agreement',
            'user_id': this.user_id,
            'ext':fileMIMEType,
            'trust_id':trust_id,
          }
        }  
  
         fileTransfer.upload(this.uri, 'https://propuae.com/vairt/vairt_api/api.php', options)
          .then((data) => {
            console.log(data)
            
         }, (err) => {
      
        });
    })
  }else{
    this.showmessage('Please select all fields');
  }
  }

  entity_file_upload(){
    if(this.doc_entity==true){this.doc_entity=1}
    else{this.doc_entity=0}
    if(this.name_entity!=undefined && this.title_entity!=undefined && this.entity_type!=undefined ){
    this.service.account_type_entity(this.user_id,this.name_entity,this.title_entity,this.entity_type,
      this.doc_later).subscribe(res=>{
      console.log(res)
      this.entity_id = res['entity_id'];
        
      if(this.certification_uri!=undefined){
      const fileTransfer: FileTransferObject = this.transfer.create();
      let fileExtn=this.certification_uri.split('.').reverse()[0];
      let fileMIMEType=this.getMIMEtype(fileExtn);
      console.log(this.entity_id)
        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: this.certification_uri,
          chunkedMode: false,
          mimeType:fileMIMEType,
          headers: {},
          params:{
            'type' : 'entity_agreement',
            'user_id': this.user_id,
            'ext':fileMIMEType,
            'entity_id':this.entity_id,
          }
        }  
  
         fileTransfer.upload(this.certification_uri, 'https://propuae.com/vairt/vairt_api/api.php', options)
          .then((data) => {
            console.log(data)
            
         }, (err) => {
      
        });
      }

      if(this.operating_uri!=undefined){
        const fileTransfer: FileTransferObject = this.transfer.create();
        let fileExtn=this.operating_uri.split('.').reverse()[0];
        console.log(this.entity_id)
        let fileMIMEType=this.getMIMEtype(fileExtn);
          let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: this.operating_uri,
            chunkedMode: false,
            mimeType:fileMIMEType,
            headers: {},
            params:{
              'type' : 'operating_agreement',
              'user_id': this.user_id,
              'ext':fileMIMEType,
              'entity_id':this.entity_id,
            }
          }  
    
           fileTransfer.upload(this.operating_uri, 'https://propuae.com/vairt/vairt_api/api.php', options)
            .then((data) => {
              console.log(data)
              
           }, (err) => {
        
          });
        }
    })  
  }else{
    this.showmessage('Please select missing fields')
  }
  }
  joint_(){
    if(this.joint_owner==true){this.joint_owner=1}
    else{this.joint_owner=0}
    if(this.joint_inv_address==true){this.joint_inv_address=1}
    else{this.joint_inv_address=0}
    if(this.joint_owner!=undefined && this.first_name!=undefined && this.last_name!=undefined && this.joint_inv_address!=undefined && this.joint_phone_no!=undefined  && this.country_code!=undefined){
    this.service.joint_account_type(this.user_id,this.joint_owner,this.first_name,this.last_name,
      this.joint_inv_address,this.joint_phone_no,this.country_code,this.autocomplete.input,
      this.state,this.postalCode).subscribe(res=>{
        console.log(res)
      })
    }else{
      this.showmessage('Please select missing fields')
    }
  }
  retirement_(){
    this.service.retirement_type(this.retirement_value,this.user_id).subscribe(res=>{
      console.log(res)
    })
  }
  async showmessage(message){
    var toast = await this.toastController.create({
      message: message,
      color:'danger',
      cssClass:'toast-alert',
      duration: 3000
    });
    toast.present();
    }
}
