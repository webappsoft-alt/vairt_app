import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CountryListPageModule } from './country-list/country-list.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ChartComponent } from './chart/chart.component';
import { enterAnimation } from './animations/nav-animation';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TransactionDetailModalPageModule } from './transaction-detail-modal/transaction-detail-modal.module';
import { RentalBreakdownModalPageModule } from './rental-breakdown-modal/rental-breakdown-modal.module';
import { FlipTransactionDetailPageModule } from './flip-transaction-detail/flip-transaction-detail.module';
import { FlipSalebreakdownDetailPageModule } from './flip-salebreakdown-detail/flip-salebreakdown-detail.module';
import { TopUpPageModule } from './top-up/top-up.module';
import { TopDownPageModule } from './top-down/top-down.module';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { EmailConnectedPageModule } from './email-connected/email-connected.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { WhyWeAskPageModule } from './why-we-ask/why-we-ask.module';
import { CurrentIncomeModelPageModule } from './current-income-model/current-income-model.module';
import { NetWorthModalPageModule } from './net-worth-modal/net-worth-modal.module';
import { AgreeTcPageModule } from './agree-tc/agree-tc.module';
import { Device } from '@ionic-native/device/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { GoogleAuthModalPageModule } from './google-auth-modal/google-auth-modal.module';
import { AuthModelPageModule } from './auth-model/auth-model.module';
import { ShareReferralPageModule } from './share-referral/share-referral.module';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { PledgeModalPageModule } from './pledge-modal/pledge-modal.module';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
  declarations: [AppComponent,ChartComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({ navAnimation : enterAnimation
  }), AppRoutingModule,
  CountryListPageModule,
  TransactionDetailModalPageModule,
  RentalBreakdownModalPageModule,
  FlipTransactionDetailPageModule,
  FlipSalebreakdownDetailPageModule,
  WhyWeAskPageModule,
  EmailConnectedPageModule,
  TopUpPageModule,
  TopDownPageModule,
  ShareReferralPageModule,
  CurrentIncomeModelPageModule,
  NetWorthModalPageModule,
  AgreeTcPageModule,
  GoogleAuthModalPageModule,
  AuthModelPageModule,
  PledgeModalPageModule,
  HttpModule,
  HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeGeocoder,
    Geolocation,
    StatusBar,
    LocationAccuracy,
    Camera,
    AndroidPermissions,
    FileChooser,
    FileTransfer,
    ScreenOrientation,
    Device,
    Keyboard,
    Clipboard,
    Toast,
    Network,
    NativePageTransitions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
