(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{nWY6:function(n,t,e){"use strict";e.r(t),e.d(t,"SettingPageModule",function(){return g});var o=e("ofXK"),i=e("3Pt+"),r=e("TEn/"),c=e("tyNb"),a=e("mrSG"),s=e("fXoL"),l=e("yZrb"),b=e("Sy1n"),p=e("VYYF");const d=[{path:"",component:(()=>{class n{constructor(n,t,e,o,i,r){this.platform=n,this.modalController=t,this.service=e,this.appcomponent=o,this.statusbar=i,this.router=r}ionViewDidEnter(){this.email=window.localStorage.getItem("email");let n=window.localStorage.getItem("email_auth");this.email_stauts=null!=n?window.localStorage.getItem("email_auth"):"Not Connected";let t=window.localStorage.getItem("phone_auth");this.phone_connected=null!=t?window.localStorage.getItem("phone_auth"):"Not Connected",this.statusbar.hide(),this.user_id=window.localStorage.getItem("user_id"),this.service.get_user_data(this.user_id).subscribe(n=>{console.log(n),this.user_email=n.user.user_email,this.phone_connected=null==n.user.user_mobile?"Not Connected":"Connected",window.localStorage.setItem("phone_no",n.user.user_mobile)})}ngOnInit(){this._currentPlatform=this.platform.is("ios")?"ios":"android"}email_(){return Object(a.a)(this,void 0,void 0,function*(){this.appcomponent.leftSlide("email")})}phone(){this.appcomponent.leftSlide("phone")}close(){let n=this.service.getSettingBackPage();this.appcomponent.downSlidePre(n)}signout(){window.localStorage.clear(),this.appcomponent.downSlidePre("login")}transaction(){this.appcomponent.leftSlide("transaction")}change_currency(){}feedback(){}privacy(){}}return n.\u0275fac=function(t){return new(t||n)(s.Jb(r.bb),s.Jb(r.X),s.Jb(l.a),s.Jb(b.a),s.Jb(p.a),s.Jb(c.g))},n.\u0275cmp=s.Db({type:n,selectors:[["app-setting"]],decls:49,vars:3,consts:[[1,"ion-no-border"],["lines","none",1,"transparent"],["src","assets/images/settings.png","width","20"],[1,"title"],["src","assets/images/close.png","slot","end","width","20",1,"close",3,"click"],["lines","none"],[1,"heading"],[1,"des"],[1,"main-heading"],["lines","none",2,"border","1px solid #d4d4d4","height","45px",3,"click"],["slot","start",1,"sub-title"],["slot","end",1,"des",2,"margin-top","10px"],["name","chevron-forward-outline","slot","end",2,"color","#dedfe0","margin-top","8px"],["lines","none",2,"border-bottom","1px solid #d4d4d4","height","45px",3,"click"],["slot","end",1,"des",2,"margin-top","10px","margin-right","15px"],["slot","start",1,"sub-title",2,"margin-top","10px"],["name","chevron-forward-outline","slot","end",2,"color","#dedfe0"],["lines","none",2,"border-bottom","1px solid #d4d4d4","margin-bottom","10px","height","45px",3,"click"],["lines","none",1,"transparent",2,"margin-top","-10px","margin-top","-10px","position","fixed","bottom","0","width","100%"],["slot","start",1,"main-heading",2,"margin-left","0px",3,"click"],["slot","end",1,"main-heading"]],template:function(n,t){1&n&&(s.Ob(0,"ion-header",0),s.Ob(1,"ion-toolbar"),s.Ob(2,"ion-item",1),s.Kb(3,"img",2),s.Ob(4,"p",3),s.rc(5,"Setting"),s.Nb(),s.Ob(6,"img",4),s.Wb("click",function(){return t.close()}),s.Nb(),s.Nb(),s.Nb(),s.Nb(),s.Ob(7,"ion-content"),s.Ob(8,"ion-item",5),s.Ob(9,"p",6),s.rc(10,"Tap to sync now"),s.Nb(),s.Nb(),s.Ob(11,"p",7),s.rc(12,"Last automatic sync: Just now"),s.Nb(),s.Ob(13,"h4",8),s.rc(14,"USER SETTINGS"),s.Nb(),s.Ob(15,"ion-item",9),s.Wb("click",function(){return t.email_()}),s.Ob(16,"p",10),s.rc(17,"Email"),s.Nb(),s.Ob(18,"p",11),s.rc(19),s.Nb(),s.Kb(20,"ion-icon",12),s.Nb(),s.Ob(21,"ion-item",13),s.Wb("click",function(){return t.phone()}),s.Ob(22,"p",10),s.rc(23,"Phone"),s.Nb(),s.Ob(24,"p",11),s.rc(25),s.Nb(),s.Kb(26,"ion-icon",12),s.Nb(),s.Ob(27,"ion-item",13),s.Wb("click",function(){return t.change_currency()}),s.Ob(28,"p",10),s.rc(29,"Default Currency"),s.Nb(),s.Ob(30,"p",14),s.rc(31,"USD"),s.Nb(),s.Nb(),s.Ob(32,"ion-item",13),s.Wb("click",function(){return t.transaction()}),s.Ob(33,"p",15),s.rc(34,"Transaction"),s.Nb(),s.Kb(35,"ion-icon",16),s.Nb(),s.Ob(36,"h4",8),s.rc(37,"HELP"),s.Nb(),s.Ob(38,"ion-item",13),s.Wb("click",function(){return t.feedback()}),s.Ob(39,"p",15),s.rc(40,"Send feedback"),s.Nb(),s.Nb(),s.Ob(41,"ion-item",17),s.Wb("click",function(){return t.privacy()}),s.Ob(42,"p",15),s.rc(43,"Privacy policy"),s.Nb(),s.Nb(),s.Ob(44,"ion-item",18),s.Ob(45,"p",19),s.Wb("click",function(){return t.signout()}),s.rc(46,"Signout"),s.Nb(),s.Ob(47,"p",20),s.rc(48),s.Nb(),s.Nb(),s.Nb()),2&n&&(s.zb(19),s.sc(t.email_stauts),s.zb(6),s.sc(t.phone_connected),s.zb(23),s.sc(t.email))},directives:[r.r,r.T,r.w,r.o,r.s],styles:[".close[_ngcontent-%COMP%]{margin-top:-5px;margin-right:0;float:right}ion-content[_ngcontent-%COMP%], ion-toolbar[_ngcontent-%COMP%]{--background:var(--ion-color-secondary)}.title[_ngcontent-%COMP%]{font-family:poppins regular;color:#898989;margin-left:10px}ion-item.transparent[_ngcontent-%COMP%]{--background:var(--ion-color-secondary)}.heading[_ngcontent-%COMP%]{font-family:poppins semibold;color:var(--ion-color-primary);display:block;margin-left:auto;margin-right:auto}.des[_ngcontent-%COMP%]{font-size:.8rem;margin-top:5px}.des[_ngcontent-%COMP%], .main-heading[_ngcontent-%COMP%]{font-family:poppins regular;color:#898989;margin-left:20px}.main-heading[_ngcontent-%COMP%]{font-size:.9rem}.sub-title[_ngcontent-%COMP%]{font-family:poppins regular;color:var(--ion-color-primary);margin-top:10px}ion-icon[_ngcontent-%COMP%]{margin-right:0;font-size:20px}"]}),n})()}];let m=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=s.Hb({type:n}),n.\u0275inj=s.Gb({imports:[[c.i.forChild(d)],c.i]}),n})(),g=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=s.Hb({type:n}),n.\u0275inj=s.Gb({imports:[[o.b,i.g,r.U,m]]}),n})()}}]);