!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"4Ej5":function(e,o,i){"use strict";i.r(o),i.d(o,"DepositFundsPageModule",function(){return y});var r=i("ofXK"),a=i("3Pt+"),s=i("TEn/"),c=i("tyNb"),u=i("mrSG"),l=i("yTpj"),d=i("PPBQ"),g=i("fXoL"),p=i("yZrb"),b=i("VYYF");function f(n,t){if(1&n&&(g.Ob(0,"ion-select-option",14),g.rc(1),g.Nb()),2&n){var e=t.$implicit;g.gc("value",e.id),g.zb(1),g.sc(e.name)}}function h(n,t){1&n&&g.Kb(0,"ion-spinner")}function m(n,t){1&n&&(g.Ob(0,"span",15),g.rc(1," Proceed "),g.Kb(2,"ion-ripple-effect"),g.Nb())}var w,v,_,O=function(n){return{ios_header_css:n}},C=function(n){return{content_grid_ios:n}},x=[{path:"",component:(w=function(){function e(t,o,i,r,a){n(this,e),this.service=t,this.router=o,this.statusbar=i,this.modalController=r,this.toastController=a,this.regions=[],this.balance=this.service.getBalance();var s=window.localStorage.getItem("phone-model");this.ios_header="10"==s,this.statusbar.hide()}var o,i,r;return o=e,(i=[{key:"ngOnInit",value:function(){var n=this;this.service.get_region().subscribe(function(t){console.log(t),n.region=t.region[2].id,n.regions=t.region})}},{key:"back",value:function(){window.history.back()}},{key:"next",value:function(){var n=this;console.log(this.amount),null==this.amount||this.amount<=0?this.showmessage("Please enter amount"):(this.loading=!0,this.user_id=window.localStorage.getItem("user_id"),window.localStorage.setItem("amount",this.amount),this.service.deposit_req(this.user_id,this.amount,this.region).subscribe(function(t){console.log(t),n.loading=!1,window.localStorage.setItem("deposit_id",t.deposit_id),n.router.navigate(["deposit-instructions"])}))}},{key:"top_up",value:function(){return Object(u.a)(this,void 0,void 0,regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:this.router.navigate(["deposit-funds"]);case 1:case"end":return n.stop()}},n,this)}))}},{key:"top_down",value:function(){return Object(u.a)(this,void 0,void 0,regeneratorRuntime.mark(function n(){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.modalController.create({component:l.a,cssClass:"center",enterAnimation:d.b,leaveAnimation:d.c,componentProps:{balance:this.balance}});case 2:return(t=n.sent).onDidDismiss().then(function(n){console.log(n)}),n.next=6,t.present();case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}},n,this)}))}},{key:"showmessage",value:function(n){return Object(u.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.toastController.create({message:n,color:"danger",cssClass:"toast-alert",duration:3e3});case 2:t.sent.present();case 3:case"end":return t.stop()}},t,this)}))}}])&&t(o.prototype,i),r&&t(o,r),e}(),w.\u0275fac=function(n){return new(n||w)(g.Jb(p.a),g.Jb(c.g),g.Jb(b.a),g.Jb(s.X),g.Jb(s.gb))},w.\u0275cmp=g.Db({type:w,selectors:[["app-deposit-funds"]],decls:19,vars:11,consts:[[1,"background1",2,"position","fixed","width","100%","height","200px"],[3,"ngClass","click"],["src","assets/images/left-arrow-white.svg",1,"back_arrow",2,"width","30px"],[1,"heading"],[1,"sub-heading"],[1,"content_grid","ion-no-padding",3,"ngClass"],["mode","md",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["lines","none"],[1,"dollar"],["type","number","placeholder","Amount",3,"ngModel","ngModelChange"],[1,"form_btn","ion-activatable","ripple-parent",3,"click"],[4,"ngIf"],["class","submit-txt",4,"ngIf"],[3,"value"],[1,"submit-txt"]],template:function(n,t){1&n&&(g.Ob(0,"ion-content"),g.Ob(1,"ion-grid",0),g.Kb(2,"br"),g.Ob(3,"ion-buttons",1),g.Wb("click",function(){return t.back()}),g.Kb(4,"img",2),g.Nb(),g.Ob(5,"h4",3),g.rc(6,"Deposit"),g.Nb(),g.Ob(7,"p",4),g.rc(8,"Transfer funds directly from your personal account. In order to transfer funds, add your FIAT account so we can create funds transfer information. Funds deposit should be made from the same bank account each time."),g.Nb(),g.Nb(),g.Ob(9,"ion-grid",5),g.Ob(10,"ion-select",6),g.Wb("ngModelChange",function(n){return t.region=n}),g.qc(11,f,2,2,"ion-select-option",7),g.Nb(),g.Ob(12,"ion-item",8),g.Ob(13,"p",9),g.rc(14,"$"),g.Nb(),g.Ob(15,"ion-input",10),g.Wb("ngModelChange",function(n){return t.amount=n}),g.Nb(),g.Nb(),g.Ob(16,"button",11),g.Wb("click",function(){return t.next()}),g.qc(17,h,1,0,"ion-spinner",12),g.qc(18,m,3,0,"span",13),g.Nb(),g.Nb(),g.Nb()),2&n&&(g.zb(3),g.fc("ngClass",g.ic(7,O,1==t.ios_header)),g.zb(6),g.fc("ngClass",g.ic(9,C,1==t.ios_header)),g.zb(1),g.fc("ngModel",t.region),g.zb(1),g.fc("ngForOf",t.regions),g.zb(4),g.fc("ngModel",t.amount),g.zb(2),g.fc("ngIf",t.loading),g.zb(1),g.fc("ngIf",!t.loading))},directives:[s.o,s.q,s.i,r.i,s.H,s.eb,a.j,a.m,r.j,s.w,s.v,s.ab,r.k,s.I,s.M,s.C],styles:[".heading[_ngcontent-%COMP%]{font-family:poppins semibold;font-size:16px;width:80%;margin-left:10%}.heading[_ngcontent-%COMP%], .sub-heading[_ngcontent-%COMP%]{text-align:center;color:#fff;margin-top:0}.sub-heading[_ngcontent-%COMP%]{font-family:poppins regular;font-size:10px;width:90%;margin-left:5%}ion-buttons[_ngcontent-%COMP%]{width:50px;height:50px;margin-left:10px;margin-top:-10px}.content_grid[_ngcontent-%COMP%]{margin-top:180px}ion-select[_ngcontent-%COMP%]{font-family:poppins regular;border:1px solid #dcdcdc;margin-top:50px;width:90%;margin-left:5%}.dollar[_ngcontent-%COMP%]{background:#e0e0e0;padding:13px 22px}ion-input[_ngcontent-%COMP%]{border:1px solid #dcdcdc;font-family:poppins regular;--padding-start:30px;margin-top:0;margin-left:0}ion-content[_ngcontent-%COMP%]{--overflow:hidden}ion-item.sc-ion-input-ios-h[_ngcontent-%COMP%]:not(.item-label), ion-item.sc-ion-input-md-h[_ngcontent-%COMP%]:not(.item-label), ion-item[_ngcontent-%COMP%]:not(.item-label)   .sc-ion-input-ios-h[_ngcontent-%COMP%], ion-item[_ngcontent-%COMP%]:not(.item-label)   .sc-ion-input-md-h[_ngcontent-%COMP%]{--padding-start:10px}.form_btn[_ngcontent-%COMP%]{width:50%;height:40px;margin-left:25%;margin-top:20px}.ios_header_css[_ngcontent-%COMP%]{padding-top:20px}"]}),w)}],M=((_=function t(){n(this,t)}).\u0275fac=function(n){return new(n||_)},_.\u0275mod=g.Hb({type:_}),_.\u0275inj=g.Gb({imports:[[c.i.forChild(x)],c.i]}),_),y=((v=function t(){n(this,t)}).\u0275fac=function(n){return new(n||v)},v.\u0275mod=g.Hb({type:v}),v.\u0275inj=g.Gb({imports:[[r.b,a.g,s.U,M]]}),v)}}])}();