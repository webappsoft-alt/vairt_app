import { Component } from '@angular/core';
const { SplashScreen } = Plugins;
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Router } from '@angular/router'
import { ApiService } from './api/api.service';
import { NavController } from '@ionic/angular'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Device } from '@ionic-native/device/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';
import { FcmService } from './services/fcm.service';

declare var google;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  address: any
  loading: any
  phone_code: any;
  country_name: any;
  latitude: number;
  longitude: number;
  disableButton: Boolean;
  user_id: any;
  isStatusBarLight = true;
  countries = [
    { "code": "AF", "callingcode": "93" },
    { "code": "AL", "callingcode": "355" },
    { "code": "DZ", "callingcode": "213" },
    { "code": "AS", "callingcode": "1684" },
    { "code": "AD", "callingcode": "376" },
    { "code": "AO", "callingcode": "244" },
    { "code": "AI", "callingcode": "1264" },
    { "code": "AQ", "callingcode": "672" },
    { "code": "AG", "callingcode": "1268" },
    { "code": "AR", "callingcode": "54" }, { "code": "AM", "callingcode": "374" }, { "code": "AW", "callingcode": "297" }, { "code": "AU", "callingcode": "61" }, { "code": "AT", "callingcode": "43" }, { "code": "AZ", "callingcode": "994" }, { "code": "BS", "callingcode": "1242" }, { "code": "BH", "callingcode": "973" }, { "code": "BD", "callingcode": "880" }, { "code": "BB", "callingcode": "1246" }, { "code": "BY", "callingcode": "375" }, { "code": "BE", "callingcode": "32" }, { "code": "BZ", "callingcode": "501" }, { "code": "BJ", "callingcode": "229" }, { "code": "BM", "callingcode": "1441" }, { "code": "BT", "callingcode": "975" }, { "code": "BO", "callingcode": "591" }, { "code": "BQ", "callingcode": "5997" }, { "code": "BA", "callingcode": "387" }, { "code": "BW", "callingcode": "267" }, { "code": "BR", "callingcode": "55" }, { "code": "IO", "callingcode": "246" }, { "code": "VG", "callingcode": "1284" }, { "code": "VI", "callingcode": "1 340" }, { "code": "BN", "callingcode": "673" }, { "code": "BG", "callingcode": "359" }, { "code": "BF", "callingcode": "226" }, { "code": "BI", "callingcode": "257" }, { "code": "KH", "callingcode": "855" }, { "code": "CM", "callingcode": "237" }, { "code": "CA", "callingcode": "1" }, { "code": "CV", "callingcode": "238" }, { "code": "KY", "callingcode": "1345" }, { "code": "CF", "callingcode": "236" }, { "code": "TD", "callingcode": "235" }, { "code": "CL", "callingcode": "56" }, { "code": "CN", "callingcode": "86" }, { "code": "CX", "callingcode": "61" }, { "code": "CC", "callingcode": "61" }, { "code": "CO", "callingcode": "57" }, { "code": "KM", "callingcode": "269" }, { "code": "CG", "callingcode": "242" }, { "code": "CD", "callingcode": "243" }, { "code": "CK", "callingcode": "682" }, { "code": "CR", "callingcode": "506" }, { "code": "HR", "callingcode": "385" }, { "code": "CU", "callingcode": "53" }, { "code": "CW", "callingcode": "599" }, { "code": "CY", "callingcode": "357" }, { "code": "CZ", "callingcode": "420" }, { "code": "DK", "callingcode": "45" }, { "code": "DJ", "callingcode": "253" }, { "code": "DM", "callingcode": "1767" }, { "code": "DO", "callingcode": "1809" }, { "code": "EC", "callingcode": "593" }, { "code": "EG", "callingcode": "20" }, { "code": "SV", "callingcode": "503" }, { "code": "GQ", "callingcode": "240" }, { "code": "ER", "callingcode": "291" }, { "code": "EE", "callingcode": "372" }, { "code": "ET", "callingcode": "251" }, { "code": "FK", "callingcode": "500" }, { "code": "FO", "callingcode": "298" }, { "code": "FJ", "callingcode": "679" }, { "code": "FI", "callingcode": "358" }, { "code": "FR", "callingcode": "33" }, { "code": "GF", "callingcode": "594" }, { "code": "PF", "callingcode": "689" }, { "code": "GA", "callingcode": "241" }, { "code": "GM", "callingcode": "220" }, { "code": "GE", "callingcode": "995" }, { "code": "DE", "callingcode": "49" }, { "code": "GH", "callingcode": "233" }, { "code": "GI", "callingcode": "350" }, { "code": "GR", "callingcode": "30" }, { "code": "GL", "callingcode": "299" }, { "code": "GD", "callingcode": "1473" }, { "code": "GP", "callingcode": "590" }, { "code": "GU", "callingcode": "1671" }, { "code": "GT", "callingcode": "502" }, { "code": "GG", "callingcode": "44" }, { "code": "GN", "callingcode": "224" }, { "code": "GW", "callingcode": "245" }, { "code": "GY", "callingcode": "592" }, { "code": "HT", "callingcode": "509" }, { "code": "VA", "callingcode": "379" }, { "code": "HN", "callingcode": "504" }, { "code": "HK", "callingcode": "852" }, { "code": "HU", "callingcode": "36" }, { "code": "IS", "callingcode": "354" }, { "code": "IN", "callingcode": "91" }, { "code": "ID", "callingcode": "62" }, { "code": "IR", "callingcode": "98" }, { "code": "IQ", "callingcode": "964" }, { "code": "IE", "callingcode": "353" }, { "code": "IM", "callingcode": "44" }, { "code": "IL", "callingcode": "972" }, { "code": "IT", "callingcode": "39" }, { "code": "JM", "callingcode": "1876" }, { "code": "JP", "callingcode": "81" }, { "code": "JE", "callingcode": "44" }, { "code": "JO", "callingcode": "962" }, { "code": "KZ", "callingcode": "76" }, { "code": "KE", "callingcode": "254" }, { "code": "KI", "callingcode": "686" }, { "code": "KW", "callingcode": "965" }, { "code": "KG", "callingcode": "996" }, { "code": "LV", "callingcode": "371" }, { "code": "LB", "callingcode": "961" }, { "code": "LS", "callingcode": "266" }, { "code": "LR", "callingcode": "231" }, { "code": "LY", "callingcode": "218" }, { "code": "LI", "callingcode": "423" }, { "code": "LT", "callingcode": "370" }, { "code": "LU", "callingcode": "352" }, { "code": "MO", "callingcode": "853" }, { "code": "MK", "callingcode": "389" }, { "code": "MG", "callingcode": "261" }, { "code": "MW", "callingcode": "265" }, { "code": "MY", "callingcode": "60" }, { "code": "MV", "callingcode": "960" }, { "code": "ML", "callingcode": "223" }, { "code": "MT", "callingcode": "356" }, { "code": "MH", "callingcode": "692" }, { "code": "MQ", "callingcode": "596" }, { "code": "MR", "callingcode": "222" }, { "code": "MU", "callingcode": "230" }, { "code": "YT", "callingcode": "262" }, { "code": "MX", "callingcode": "52" }, { "code": "FM", "callingcode": "691" }, { "code": "MD", "callingcode": "373" }, { "code": "MC", "callingcode": "377" }, { "code": "MN", "callingcode": "976" }, { "code": "ME", "callingcode": "382" }, { "code": "MS", "callingcode": "1664" }, { "code": "MA", "callingcode": "212" }, { "code": "MZ", "callingcode": "258" }, { "code": "MM", "callingcode": "95" }, { "code": "NA", "callingcode": "264" }, { "code": "NR", "callingcode": "674" }, { "code": "NP", "callingcode": "977" }, { "code": "NL", "callingcode": "31" }, { "code": "NC", "callingcode": "687" }, { "code": "NZ", "callingcode": "64" }, { "code": "NI", "callingcode": "505" }, { "code": "NE", "callingcode": "227" }, { "code": "NG", "callingcode": "234" }, { "code": "NU", "callingcode": "683" }, { "code": "NF", "callingcode": "672" }, { "code": "MP", "callingcode": "1670" }, { "code": "NO", "callingcode": "47" }, { "code": "OM", "callingcode": "968" }, { "code": "PK", "callingcode": "92" }, { "code": "PW", "callingcode": "680" }, { "code": "PS", "callingcode": "970" }, { "code": "PA", "callingcode": "507" }, { "code": "PG", "callingcode": "675" }, { "code": "PY", "callingcode": "595" }, { "code": "PE", "callingcode": "51" }, { "code": "PH", "callingcode": "63" }, { "code": "PN", "callingcode": "64" }, { "code": "PL", "callingcode": "48" }, { "code": "PT", "callingcode": "351" }, { "code": "PR", "callingcode": "1787" }, { "code": "QA", "callingcode": "974" }, { "code": "XK", "callingcode": "383" }, { "code": "RE", "callingcode": "262" }, { "code": "RO", "callingcode": "40" }, { "code": "RU", "callingcode": "7" }, { "code": "RW", "callingcode": "250" }, { "code": "BL", "callingcode": "590" }, { "code": "SH", "callingcode": "290" }, { "code": "KN", "callingcode": "1869" }, { "code": "LC", "callingcode": "1758" }, { "code": "MF", "callingcode": "590" }, { "code": "PM", "callingcode": "508" }, { "code": "VC", "callingcode": "1784" }, { "code": "WS", "callingcode": "685" }, { "code": "SM", "callingcode": "378" }, { "code": "ST", "callingcode": "239" }, { "code": "SA", "callingcode": "966" }, { "code": "SN", "callingcode": "221" }, { "code": "RS", "callingcode": "381" }, { "code": "SC", "callingcode": "248" }, { "code": "SL", "callingcode": "232" }, { "code": "SG", "callingcode": "65" }, { "code": "SX", "callingcode": "1721" }, { "code": "SK", "callingcode": "421" }, { "code": "SI", "callingcode": "386" }, { "code": "SB", "callingcode": "677" }, { "code": "SO", "callingcode": "252" }, { "code": "ZA", "callingcode": "27" }, { "code": "GS", "callingcode": "500" }, { "code": "KR", "callingcode": "82" }, { "code": "SS", "callingcode": "211" }, { "code": "ES", "callingcode": "34" }, { "code": "LK", "callingcode": "94" }, { "code": "SD", "callingcode": "249" }, { "code": "SR", "callingcode": "597" }, { "code": "SJ", "callingcode": "4779" }, { "code": "SZ", "callingcode": "268" }, { "code": "SE", "callingcode": "46" }, { "code": "CH", "callingcode": "41" }, { "code": "SY", "callingcode": "963" }, { "code": "TW", "callingcode": "886" }, { "code": "TJ", "callingcode": "992" }, { "code": "TZ", "callingcode": "255" }, { "code": "TH", "callingcode": "66" }, { "code": "TL", "callingcode": "670" }, { "code": "TG", "callingcode": "228" }, { "code": "TK", "callingcode": "690" }, { "code": "TO", "callingcode": "676" }, { "code": "TT", "callingcode": "1868" }, { "code": "TN", "callingcode": "216" }, { "code": "TR", "callingcode": "90" }, { "code": "TM", "callingcode": "993" }, { "code": "TC", "callingcode": "1649" }, { "code": "TV", "callingcode": "688" }, { "code": "UG", "callingcode": "256" }, { "code": "UA", "callingcode": "380" }, { "code": "AE", "callingcode": "971" }, { "code": "GB", "callingcode": "44" }, { "code": "US", "callingcode": "1" }, { "code": "UY", "callingcode": "598" }, { "code": "UZ", "callingcode": "998" }, { "code": "VU", "callingcode": "678" }, { "code": "VE", "callingcode": "58" }, { "code": "VN", "callingcode": "84" }, { "code": "WF", "callingcode": "681" }, { "code": "EH", "callingcode": "212" }, { "code": "YE", "callingcode": "967" }, { "code": "ZM", "callingcode": "260" }, { "code": "ZW", "callingcode": "263" }]
    currentScreenOrientation:any
  constructor(private platform: Platform, 
    //public statusbar: StatusBar,
    public router: Router,
    public navCtrl: NavController,
     public service: ApiService,
    private nativeGeocoder: NativeGeocoder,
    private device: Device,
    private androidpermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private screenOrientation: ScreenOrientation,
    private nativePageTransitions: NativePageTransitions,
    private network: Network,
    private fcmService: FcmService,
    public alertController: AlertController,
    private geolocation: Geolocation,) {
      
      this.phone_code = window.localStorage.getItem('phone_code');
        // if(this.phone_code==null){
        // this.enable_location();
        // }
        this.init()
       this.check_internet_connection();
    }
  init() {

    this.platform.ready().then(async () => {
      setTimeout(() => {
        SplashScreen.hide({
          fadeOutDuration: 500
        });
      }, 100)
      //this.fcmService.initPush();
      this.screenOrientation_()
      this.setPortrait();
      this.check_account_activation()
      //this.checkmove()
      this.user_id = window.localStorage.getItem('user_id')
    })
  }

  checkmove(){
    if( this.user_id != null ){
       this.leftSlide('home')
    }
    else{
      this.check_platform()
      this.leftSlide('intro')
    }
  }
 
  back() {
    window.history.back();
  }

  setPortrait(){
    // set to portrait
    //alert(this.screenOrientation.ORIENTATIONS.PORTRAIT)
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  check_account_activation(){
    this.user_id = window.localStorage.getItem('user_id')
    console.log(this.user_id)
    this.service.check_account_activation(this.user_id).subscribe(res=>{
      console.log(res)
      this.service.setActiveStatus(res['result']);
    })
  }

  check_platform(){
    if(this.platform.is('ios')){ 
      window.localStorage.setItem('platform','ios')
      const iphoneModel = this.device.model;
      let m = iphoneModel.match(/iPhone(\d+),?(\d+)?/);
     if(m==null){
      m = iphoneModel.match(/iPad(\d+),?(\d+)?/);
     }
     const model = +m[1];
      if (model > 10) { 
        window.localStorage.setItem('phone-model','10')
        window.localStorage.setItem('platform','ios') 
      }else{
        window.localStorage.setItem('phone-model','9')
        window.localStorage.setItem('platform','ios')
      }
    }else{
      window.localStorage.setItem('platform','android')
    }
  }
  screenOrientation_(){
    this.currentScreenOrientation = this.screenOrientation.type; // logs the current orientation, example: 'landscape'
    if(this.currentScreenOrientation=='landscape-primary' || this.currentScreenOrientation=='landscape-secondary' || this.currentScreenOrientation=='landscape'){
      this.setPortrait()
    }
    // detect orientation changes
    this.screenOrientation.onChange().subscribe(
      () => {
       // alert("Orientation Changed"+this.screenOrientation.type);
        this.currentScreenOrientation = this.screenOrientation.type;
        if(this.currentScreenOrientation=='landscape-primary' || this.currentScreenOrientation=='landscape-secondary' || this.currentScreenOrientation=='landscape'){
          this.setPortrait()
        }
      });
  }
    
      leftSlide(page) {
        let options: NativeTransitionOptions = {
          direction: 'left',
          duration: 400,
          slowdownfactor: -1,
          iosdelay: 0,
        }
        this.nativePageTransitions.slide(options)
        this.navCtrl.navigateRoot(page);
      }

      rightSlide(page) {
        let options: NativeTransitionOptions = {
          direction: 'right',
          duration: 400,
          slowdownfactor: -1,
          iosdelay: 50,
        }
          this.nativePageTransitions.slide(options)
          this.navCtrl.navigateRoot(page);
      }

      upSlide(page) {
      let options: NativeTransitionOptions = {
        direction: 'up',
        duration: 400,
        slowdownfactor: -1,
        iosdelay: 0,
      }
      this.nativePageTransitions.slide(options)
      this.navCtrl.navigateRoot(page);
    }

     
      downSlidePre(page) {
      let options: NativeTransitionOptions = {
        direction: 'down',
        duration: 500,
        slowdownfactor: -1,
        iosdelay: 0,
        slidePixels: 0,
      }
       this.nativePageTransitions.slide(options)
       this.navCtrl.navigateBack(page);
      }

      downSlide() {
        let options: NativeTransitionOptions = {
          direction: 'down',
          duration: 400,
          slowdownfactor: 10,
          iosdelay: 0,
          slidePixels: 20,
        }
        this.nativePageTransitions.slide(options)
        this.navCtrl.pop();
        }

      fadeSlide(page) {
      this.nativePageTransitions.fade(null);
      this.navCtrl.navigateForward(page);
      }

      check_internet_connection(){
      // watch network for a disconnection
        let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
          console.log('network was disconnected :-(');
        });

        // stop disconnect watch
        disconnectSubscription.unsubscribe();


        // watch network for a connection
        let connectSubscription = this.network.onConnect().subscribe(() => {
          console.log('network connected!');
          setTimeout(() => {
            if (this.network.type === 'wifi') {
              console.log('we got a wifi connection, woohoo!');
            }
          }, 3000);
        });
        // stop connect watch
        connectSubscription.unsubscribe();
       }

       async presentAlertConfirm() {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Confirm!',
          message: 'Do You want to logout?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Yes',
              handler: () => {
                window.localStorage.clear()
                this.downSlidePre('login')
              }
            }
          ]
        });
        await alert.present();
      }

}
