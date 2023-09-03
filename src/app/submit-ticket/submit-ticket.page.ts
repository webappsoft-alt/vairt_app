import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Router } from '@angular/router'
import { ApiService } from '../api/api.service';
import { AppComponent } from '../app.component'
@Component({
  selector: 'app-submit-ticket',
  templateUrl: './submit-ticket.page.html',
  styleUrls: ['./submit-ticket.page.scss'],
})
export class SubmitTicketPage implements OnInit {
  help_with:any
  enquiry:any
  detail:any
  pic:any
  priority_level:any
  user_id:any
  loading:any
  ios_header:any
  constructor(public service:ApiService,                            
    public router:Router,
    public appcomponent:AppComponent,
    public toast:Toast,
    public camera:Camera) {
      this.pic = 'assets/images/not-found.png'
      this.help_with = 'Getting Started'
      let check = window.localStorage.getItem('phone-model')
      if(check=='10'){
        this.ios_header = true;
      }else{
        this.ios_header = false
      }
     }

  ngOnInit() {
  }
  pic_upload(){
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
      }
      this.camera.getPicture(options).then((imageData) => {
        this.pic = 'data:image/jpeg;base64,' + imageData;
      }, (error) => {
          console.log(error);
      });
    }
    create_ticket(){
      this.user_id = window.localStorage.getItem('user_id')
        if(this.enquiry == undefined){
          this.toast_('Please write the Enquiry')
        }else if(this.priority_level==undefined){
          this.toast_('Please select priority level')
        }else{
          this.loading=true
          this.service.add_ticket(this.user_id,this.help_with,this.enquiry,this.priority_level,this.     detail,this.pic).subscribe(res=>{
            console.log(res)
            this.loading=false;
            this.appcomponent.leftSlide('support')
          })
       }
     }

      toast_(message){
        this.toast.show(message, '3000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          })
      }
      back(){
        this.appcomponent.downSlide()
      }
  }
