(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{"6Lep":function(t,e,i){"use strict";i.r(e),i.d(e,"InvestIdentityOfPageModule",function(){return w});var s=i("ofXK"),n=i("3Pt+"),o=i("TEn/"),a=i("tyNb"),c=i("mrSG"),r=i("yTpj"),g=i("PPBQ"),p=i("fXoL"),l=i("yZrb"),b=i("SmVF"),h=i("VYYF"),d=i("Sy1n"),m=i("a/9d");function _(t,e){if(1&t){const t=p.Pb();p.Ob(0,"div"),p.Ob(1,"p",21),p.rc(2,"Back Image"),p.Nb(),p.Ob(3,"img",26),p.Wb("click",function(){return p.lc(t),p.Zb().back_img()}),p.Nb(),p.Nb()}if(2&t){const t=p.Zb();p.zb(3),p.gc("src",t.back_img_,p.nc)}}function u(t,e){1&t&&p.Kb(0,"ion-spinner")}function f(t,e){1&t&&(p.Ob(0,"span",30),p.rc(1," Next "),p.Kb(2,"ion-ripple-effect"),p.Nb())}const v=function(t){return{ios_header_css_row:t}},y=[{path:"",component:(()=>{class t{constructor(t,e,i,s,n,o,a,c){this.router=t,this.service=e,this.toastController=i,this.modalController=s,this.toast=n,this.statusbar=o,this.appcomponent=a,this.camera=c,this.front_taken=!1,this.back_taken=!1,this.address=this.service.getInvestdata()[0].address,this.title=this.service.getInvestdata()[0].title,this.purchase_price=this.service.getInvestdata()[0].purchase_price,this.remaining_share=this.service.getInvestdata()[0].remaining_share,this.img=this.service.getInvestdata()[0].img,this.balance=this.service.getBalance(),this.front_img_="assets/images/face-detection.png",this.back_img_="assets/images/face-detection.png";let r=window.localStorage.getItem("phone-model");this.ios_header="10"==r,this.statusbar.hide()}ngOnInit(){let t=window.localStorage.getItem("prop_id"),e=window.localStorage.getItem("invoice_id");null==e&&(e=this.service.getInvestdata()[0].invoice_id),this.service.user_invest7(this.user_id,t,e).subscribe(t=>{console.log(t)})}ionViewDidEnter(){this.user_id=window.localStorage.getItem("user_id"),this.service.get_identity(this.user_id).subscribe(t=>{console.log(t),this.type=t.identity.type,this.front_img_=t.identity.front_img,console.log(this.front_img_),this.back_img_=t.identity.back_img,this.save_back_img=this.front_img_,this.save_front_img=this.back_img_,this.save_type=this.type,"https://propuae.com/vairt/uploads/"!=this.front_img_&&null!=this.front_img_&&"assets/images/face-detection.png"!=this.front_img_||(this.front_img_="assets/images/face-detection.png",console.log("enter")),"https://propuae.com/vairt/uploads/"!=this.back_img_&&null!=this.back_img_&&"assets/images/face-detection.png"!=this.back_img_||(this.back_img_="assets/images/face-detection.png")})}next(){null!=this.type?"passport"==this.type?null==this.front_img_||"assets/images/face-detection.png"==this.front_img_||"https://propuae.com/vairt/uploads/"==this.front_img_?this.showmessage("Please select the front image"):(this.front_pic=1==this.front_taken?this.front_img_:"",this.service.update_identity_photos_front(this.front_pic,this.type,this.user_id).subscribe(t=>{console.log(t)}),this.update()):null==this.front_img_||"assets/images/face-detection.png"==this.front_img_||"https://propuae.com/vairt/uploads/"==this.front_img_?this.showmessage("Please select the front image"):null==this.back_img_||"assets/images/face-detection.png"==this.back_img_||"https://propuae.com/vairt/uploads/"==this.back_img_?this.showmessage("Please select the back image"):(this.front_pic=1==this.front_taken?this.front_img_:"",this.back_pic=1==this.back_taken?this.back_img_:"",this.service.update_identity_photos(this.front_img_,this.back_img_,this.type,this.user_id).subscribe(t=>{console.log(t)}),this.update()):this.toast_("Please select identity type")}toast_(t){this.toast.show(t,"3000","bottom").subscribe(t=>{console.log(t)})}update(){if(null!=this.service.getInvestdata()[0].invoice_id)this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,"8").subscribe(t=>{console.log(t)});else{let t=window.localStorage.getItem("prop_id"),e=window.localStorage.getItem("invoice_id");this.service.user_invest7(this.user_id,t,e).subscribe(t=>{console.log(t)})}this.appcomponent.upSlide("invest-agree-sign")}front_img(){this.camera.getPicture({quality:70,destinationType:this.camera.DestinationType.DATA_URL,encodingType:this.camera.EncodingType.JPEG,mediaType:this.camera.MediaType.PICTURE,sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum:!1}).then(t=>{this.front_img_="data:image/jpeg;base64,"+t,this.front_taken=!0},t=>{console.log(t)})}back_img(){this.camera.getPicture({quality:70,destinationType:this.camera.DestinationType.DATA_URL,encodingType:this.camera.EncodingType.JPEG,mediaType:this.camera.MediaType.PICTURE,sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,saveToPhotoAlbum:!1}).then(t=>{this.back_img_="data:image/jpeg;base64,"+t,this.back_taken=!0},t=>{console.log(t)})}top_up(){return Object(c.a)(this,void 0,void 0,function*(){this.appcomponent.leftSlide("deposit-funds")})}top_down(){return Object(c.a)(this,void 0,void 0,function*(){const t=yield this.modalController.create({component:r.a,cssClass:"center",enterAnimation:g.b,leaveAnimation:g.b,componentProps:{balance:this.balance}});return t.onDidDismiss().then(t=>{console.log(t)}),yield t.present()})}selct(t){this.save_type!=t?(this.front_img_="assets/images/face-detection.png",this.back_img_="assets/images/face-detection.png"):(this.front_img_=this.save_front_img,this.back_img_=this.save_back_img)}showmessage(t){return Object(c.a)(this,void 0,void 0,function*(){(yield this.toastController.create({message:t,color:"danger",cssClass:"toast-alert",duration:3e3})).present()})}logout(){this.appcomponent.presentAlertConfirm()}setting(){this.service.setSettingBackPage("invest-identity-of"),this.appcomponent.leftSlide("setting")}noti(){this.service.setSettingBackPage("invest-identity-of"),this.appcomponent.upSlide("notification")}}return t.\u0275fac=function(e){return new(e||t)(p.Jb(a.g),p.Jb(l.a),p.Jb(o.gb),p.Jb(o.X),p.Jb(b.a),p.Jb(h.a),p.Jb(d.a),p.Jb(m.a))},t.\u0275cmp=p.Db({type:t,selectors:[["app-invest-identity-of"]],decls:53,vars:9,consts:[[1,"ion-no-border"],[1,"background2"],[1,"ion-padding",3,"ngClass"],["size-xs","9.6","size-sm","9.6","size-md","10","size-lg","10"],["src","assets/images/setting_white.png","width","22",3,"click"],["size-xs","1.2","size-sm","1.2","size-md","1","size-lg","1",3,"click"],["src","assets/images/bell.png","width","25",2,"float","right","margin-right","5px","position","relative"],[1,"noti"],["src","assets/images/logout_white.png","width","25",2,"float","right"],[1,"amount"],[1,"amount_txt"],["lines","none",1,"trans","ion-no-padding"],[1,"ion-no-padding",2,"width","100%"],["size","6",1,"border",3,"click"],["src","assets/images/wallet_up.png","width","32",1,"center",2,"margin-top","-2px"],[1,"top"],["size","6",2,"height","51px",3,"click"],["src","assets/images/wallet_down.png","width","32",1,"center",2,"margin-top","9px"],[1,"ion-padding"],[1,"lbl",2,"margin-top","-10px"],[1,"title"],[1,"lbl"],[3,"ngModel","ngModelChange","ionChange"],["value","passport"],["value","driving license"],["value","state id"],["width","100","height","100",1,"center",3,"src","click"],[4,"ngIf"],[1,"form_btn","ion-activatable","ripple-parent",3,"click"],["class","submit-txt",4,"ngIf"],[1,"submit-txt"]],template:function(t,e){1&t&&(p.Ob(0,"ion-header",0),p.Ob(1,"div",1),p.Ob(2,"ion-row",2),p.Ob(3,"ion-col",3),p.Ob(4,"img",4),p.Wb("click",function(){return e.setting()}),p.Nb(),p.Nb(),p.Ob(5,"ion-col",5),p.Wb("click",function(){return e.noti()}),p.Kb(6,"img",6),p.Kb(7,"div",7),p.Nb(),p.Ob(8,"ion-col",5),p.Wb("click",function(){return e.logout()}),p.Kb(9,"img",8),p.Nb(),p.Nb(),p.Ob(10,"h4",9),p.rc(11),p.Nb(),p.Ob(12,"p",10),p.rc(13,"Available Balance"),p.Nb(),p.Ob(14,"ion-item",11),p.Ob(15,"ion-row",12),p.Ob(16,"ion-col",13),p.Wb("click",function(){return e.top_up()}),p.Kb(17,"img",14),p.Ob(18,"p",15),p.rc(19,"Topup"),p.Nb(),p.Nb(),p.Ob(20,"ion-col",16),p.Wb("click",function(){return e.top_down()}),p.Kb(21,"img",17),p.Ob(22,"p",15),p.rc(23,"Topdown"),p.Nb(),p.Nb(),p.Nb(),p.Nb(),p.Nb(),p.Nb(),p.Ob(24,"ion-content",18),p.Ob(25,"h4",19),p.rc(26,"Attach Identification Documentation"),p.Nb(),p.Ob(27,"p",20),p.rc(28,"We are still unable to automatically verify your identity. At this point please provide a valid government issued ID. "),p.Nb(),p.Ob(29,"p",21),p.rc(30,"Individual Identification Documentation"),p.Nb(),p.Ob(31,"p",20),p.rc(32,"Please provide a copy of a valid ID. Acceptable forms of identification include a photo of a valid driver's license, social security card, birth certificate, or passport. "),p.Nb(),p.Ob(33,"p",21),p.rc(34,"Identity Of"),p.Nb(),p.Ob(35,"ion-select",22),p.Wb("ngModelChange",function(t){return e.type=t})("ionChange",function(){return e.selct(e.type)}),p.Ob(36,"ion-select-option",23),p.rc(37,"Passport"),p.Nb(),p.Ob(38,"ion-select-option",24),p.rc(39,"Driving License"),p.Nb(),p.Ob(40,"ion-select-option",25),p.rc(41,"State Id"),p.Nb(),p.Nb(),p.Ob(42,"p",21),p.rc(43,"Font Image"),p.Nb(),p.Ob(44,"img",26),p.Wb("click",function(){return e.front_img()}),p.Nb(),p.qc(45,_,4,1,"div",27),p.Kb(46,"br"),p.Kb(47,"br"),p.Ob(48,"button",28),p.Wb("click",function(){return e.next()}),p.qc(49,u,1,0,"ion-spinner",27),p.qc(50,f,3,0,"span",29),p.Nb(),p.Kb(51,"br"),p.Kb(52,"br"),p.Nb()),2&t&&(p.zb(2),p.fc("ngClass",p.ic(7,v,1==e.ios_header)),p.zb(9),p.tc("$",e.balance,""),p.zb(24),p.fc("ngModel",e.type),p.zb(9),p.gc("src",e.front_img_,p.nc),p.zb(1),p.fc("ngIf","passport"!=e.type),p.zb(4),p.fc("ngIf",e.loading),p.zb(1),p.fc("ngIf",!e.loading))},directives:[o.r,o.E,s.i,o.n,o.w,o.o,o.H,o.eb,n.j,n.m,o.I,s.k,o.M,o.C],styles:[".lbl[_ngcontent-%COMP%]{color:#333;font-family:poppins semibold;font-size:16px}ion-select[_ngcontent-%COMP%]{--padding-start:14px;font-family:poppins regular;width:96%;margin-left:2%;background:#f5f5f5;height:60px;border-radius:10px;--padding-end:10px}.center[_ngcontent-%COMP%]{-o-object-fit:cover;object-fit:cover}.title[_ngcontent-%COMP%]{font-size:14px}"]}),t})()}];let k=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=p.Hb({type:t}),t.\u0275inj=p.Gb({imports:[[a.i.forChild(y)],a.i]}),t})(),w=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=p.Hb({type:t}),t.\u0275inj=p.Gb({imports:[[s.b,n.g,o.U,k]]}),t})()}}]);