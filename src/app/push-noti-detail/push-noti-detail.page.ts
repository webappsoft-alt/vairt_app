import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { PushNotifications } = Plugins;
@Component({
  selector: 'app-push-noti-detail',
  templateUrl: './push-noti-detail.page.html',
  styleUrls: ['./push-noti-detail.page.scss'],
})
export class PushNotiDetailPage implements OnInit {
  id = null;
 
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
  resetBadgeCount() {
    PushNotifications.removeAllDeliveredNotifications();
  }
}
