import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ApiService } from '../../api/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.page.html',
  styleUrls: ['./bank-account.page.scss'],
})
export class BankAccountPage implements OnInit {
  bank_main:any
  instant_show:any
  routing_number:any
  bank_distribution:any
  account_type:any
  check_img:any
  itype:any
  routing_num:any
  acc_no:any
  constructor(public appcomponent:AppComponent,
    public camera:Camera,
    public service:ApiService,) {
      this.bank_main = true
     }

  ngOnInit() {
    this.check_img = 'assets/images/upload_check.jpeg'
  }
  close(){
    this.appcomponent.downSlidePre('profile')
  }
  bank_continue(){
    this.bank_main = false
    if(this.bank_distribution=='instant'){
      this.instant_show = true
      this.routing_number = false
    }else{
      this.instant_show = false
      this.routing_number = true
    }
  }
  cancel(){
    this.instant_show = false
    this.routing_number = false
    this.bank_main = true
  }
  uplod_chk(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.check_img = 'data:image/jpeg;base64,' + imageData;
  
    }, (error) => {
      console.log(error);
    });
  }
  bank_save(){}
}
