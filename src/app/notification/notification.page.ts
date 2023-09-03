import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component'
import { ApiService } from '../api/api.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  loading:any
  skelton:any=[]
  user_id:any
  last_id:any
  loading_more:Boolean=false
  notification:any=[]
  constructor(public appcomponent:AppComponent,
    public service:ApiService) { }

    ngOnInit() {
      this.skelton.push(1,2);
      this.loading = true
      this.user_id = window.localStorage.getItem('user_id')
      console.log(this.user_id)
      this.service.notification(this.user_id,'').subscribe(res=>{
        console.log(res)
        this.loading = false;     
        this.notification = res['noti']
        this.last_id = this.notification[this.notification.length - 1].id
      })
    }
    close(){
      let page = this.service.getSettingBackPage()
      this.appcomponent.downSlidePre(page)
    }
    loadData(event) {
      setTimeout(() => {
        this.loading_more = true;
      this.service.notification(this.user_id,this.last_id).subscribe(res=>{
        console.log(res['noti'])  
       this.loading_more = false;     
        if(res['noti']==undefined){
          event.target.disabled = true
        }
        else{
          this.notification = this.notification.concat(res['noti'])
          event.target.complete();
          this.last_id = this.notification[this.notification.length - 1].id
         }
      });
    }, 500);
    }
}
