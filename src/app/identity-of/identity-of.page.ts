import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService } from '../api/api.service';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
@Component({
  selector: 'app-identity-of',
  templateUrl: './identity-of.page.html',
  styleUrls: ['./identity-of.page.scss'],
})
export class IdentityOfPage implements OnInit {
  type:any
  front_img_:any
  back_img_:any
  ios_header:any
  user_id:any
  loading:any
  constructor(public router:Router,
    public toastController:ToastController,
    public service:ApiService,
    public camera:Camera) { 
    this.type = 'state id'
    this.front_img_ = 'assets/images/face-detection.png'
    this.back_img_ = 'assets/images/face-detection.png'
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
      this.ios_header = true;
    }else{
      this.ios_header = false
    }
  }

  ngOnInit() {
  }
  next(){
    this.user_id = window.localStorage.getItem('user_id')
    if(this.front_img_==undefined || this.front_img_!='assets/images/face-detection.png'){
      this.showmessage('Please select the front image')
    }if(this.back_img_==undefined || this.back_img_!='assets/images/face-detection.png'){
      this.showmessage('Please select the back image')
    }else{
      this.service.identity_photos(this.front_img_,this.back_img_,this.type,this.user_id).subscribe(res=>{
        console.log(res)
      })
  }

  if(this.type=='passport'){
    if(this.front_img_==undefined || this.front_img_=='assets/images/face-detection.png'){
      this.showmessage('Please select the front image')
  }else{
    this.service.identity_photos_front(this.front_img_,this.type,this.user_id).subscribe(res=>{
      console.log(res)
    })
    this.router.navigate(['agree-to'])
  }
  }else{
    if(this.front_img_==undefined || this.front_img_=='assets/images/face-detection.png'){
      this.showmessage('Please select the front image')
    } if(this.back_img_==undefined || this.back_img_=='assets/images/face-detection.png'){
      this.showmessage('Please select the back image')
    }else{
      this.service.identity_photos(this.front_img_,this.back_img_,this.type,this.user_id).subscribe(res=>{
        console.log(res)
      })
      this.router.navigate(['agree-to'])
    }
  }

}
  front_img(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.front_img_ = 'data:image/jpeg;base64,' + imageData;

    }, (error) => {
      console.log(error);
    });
  }
  back_img(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.back_img_ = 'data:image/jpeg;base64,' + imageData;
    }, (error) => {
      console.log(error);
    });
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
