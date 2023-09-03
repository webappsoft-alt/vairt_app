import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController,ToastController,AlertController, ModalController  } from '@ionic/angular';
import { TopDownPage } from '../top-down/top-down.page';
import { myEnterAnimation } from '../animations/nav-animation';
import { Toast } from '@ionic-native/toast/ngx';
import { AppComponent } from '../app.component' 
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-invest-identity-of',
  templateUrl: './invest-identity-of.page.html',
  styleUrls: ['./invest-identity-of.page.scss'],
})
export class InvestIdentityOfPage implements OnInit {
  address:any
  title:any
  purchase_price:any
  remaining_share:any
  img:any
  user_id:any
  front_img_:any
  back_img_:any
  save_front_img:any
  save_back_img:any
  type:any
  save_type:any
  balance:any
  ios_header:any
  loading:any
  front_taken:Boolean=false
  back_taken:Boolean=false
  front_pic:any
  back_pic:any
  constructor(public router:Router,
    public service:ApiService,
    public toastController:ToastController,
    public modalController:ModalController,
    private toast: Toast,
    public statusbar:StatusBar,
    public appcomponent:AppComponent,
    public camera:Camera) {
    this.address = this.service.getInvestdata()[0].address
    this.title =  this.service.getInvestdata()[0].title
    this.purchase_price = this.service.getInvestdata()[0].purchase_price
    this.remaining_share = this.service.getInvestdata()[0].remaining_share
    this.img = this.service.getInvestdata()[0].img
    this.balance = this.service.getBalance()
    this.front_img_ = 'assets/images/face-detection.png'
    this.back_img_ = 'assets/images/face-detection.png'
    let check = window.localStorage.getItem('phone-model')
    if(check=='10'){
     this.ios_header = true;
   }else{
     this.ios_header = false
   }
   this.statusbar.hide()
   }

  ngOnInit() {
    let prop_id = window.localStorage.getItem('prop_id')
    let invoice_id = window.localStorage.getItem('invoice_id')
    if(invoice_id==undefined){
      invoice_id = this.service.getInvestdata()[0].invoice_id
    }
    this.service.user_invest7(this.user_id,prop_id,invoice_id).subscribe(res=>{
      console.log(res)
    })
  }
  ionViewDidEnter(){
    this.user_id = window.localStorage.getItem('user_id')
    this.service.get_identity(this.user_id).subscribe(res=>{
      console.log(res)
      this.type = res['identity']['type']
      this.front_img_= res['identity']['front_img']
      console.log(this.front_img_)
      this.back_img_= res['identity']['back_img']
      this.save_back_img = this.front_img_
      this.save_front_img = this.back_img_
      this.save_type = this.type
      if(this.front_img_=='https://propuae.com/vairt/uploads/' || this.front_img_ == undefined || this.front_img_ == 'assets/images/face-detection.png'){
      this.front_img_ ='assets/images/face-detection.png'
      console.log('enter')
    } if(this.back_img_=='https://propuae.com/vairt/uploads/' || this.back_img_ == undefined ||         this.back_img_ == 'assets/images/face-detection.png'){
      this.back_img_ ='assets/images/face-detection.png'
     }
    })

  }
  next(){
    if(this.type!=null){
     
    if(this.type=='passport'){
      if(this.front_img_==undefined || this.front_img_=='assets/images/face-detection.png' || this.front_img_=='https://propuae.com/vairt/uploads/'){
        this.showmessage('Please select the front image')
    }else{
      if(this.front_taken == true){this.front_pic = this.front_img_}else{this.front_pic =''}
      this.service.update_identity_photos_front(this.front_pic,this.type,this.user_id).subscribe(res=>{
        console.log(res)
      })
      this.update()
    }
    }else{
      if(this.front_img_==undefined || this.front_img_=='assets/images/face-detection.png' || this.front_img_=='https://propuae.com/vairt/uploads/'){
        this.showmessage('Please select the front image')
      }else if(this.back_img_==undefined || this.back_img_=='assets/images/face-detection.png' || this.back_img_=='https://propuae.com/vairt/uploads/'){
        this.showmessage('Please select the back image')
      }else{
        if(this.front_taken == true){this.front_pic = this.front_img_}else{this.front_pic =''}
        if(this.back_taken == true){this.back_pic = this.back_img_}else{this.back_pic =''}
        this.service.update_identity_photos(this.front_img_,this.back_img_,this.type,this.user_id).subscribe(res=>{
          console.log(res)
        })
        this.update()
      }
    }

  }else{
    this.toast_('Please select identity type')
  }
  }
  toast_(message){
    this.toast.show(message, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      })
  }
  update(){
    if(this.service.getInvestdata()[0].invoice_id!=undefined){
      this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,'8').subscribe(res=>{
        console.log(res)
      })
    }else{
    let prop_id = window.localStorage.getItem('prop_id')
    let invoice_id = window.localStorage.getItem('invoice_id')
    this.service.user_invest7(this.user_id,prop_id,invoice_id).subscribe(res=>{
      console.log(res)
    })
   }
    this.appcomponent.upSlide('invest-agree-sign')
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
      this.front_taken = true
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
      this.back_taken = true
    }, (error) => {
      console.log(error);
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
    this.appcomponent.leftSlide('deposit-funds')  
     }


     async top_down(){
      const modal = await this.modalController.create({
        component: TopDownPage,
        cssClass:'center',
        enterAnimation: myEnterAnimation,
        leaveAnimation: myEnterAnimation,
        componentProps:{
          balance:this.balance
        }
        })
        modal.onDidDismiss().then((res) => {
          console.log(res)
         
        });
        return await modal.present();   
      }
  selct(type){
    if(this.save_type!=type){
      this.front_img_ = 'assets/images/face-detection.png'
      this.back_img_ = 'assets/images/face-detection.png'
    }else{
      this.front_img_ = this.save_front_img
      this.back_img_ = this.save_back_img
    }
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
    logout(){
      this.appcomponent.presentAlertConfirm()
    }
    setting(){
      this.service.setSettingBackPage('invest-identity-of')
      this.appcomponent.leftSlide('setting')
    }
    noti(){
      this.service.setSettingBackPage('invest-identity-of')
      this.appcomponent.upSlide('notification')
    }
}
