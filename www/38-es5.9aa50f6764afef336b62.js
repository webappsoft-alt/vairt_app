!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{y2Ol:function(t,i,o){"use strict";o.r(i),o.d(i,"InvestAgreeSignPageModule",function(){return C});var r=o("ofXK"),c=o("3Pt+"),s=o("TEn/"),a=o("tyNb"),l=o("mrSG"),b=o("yTpj"),d=o("PPBQ"),u=o("fXoL"),g=o("yZrb"),p=o("VYYF"),h=o("Sy1n"),f=function(e){return{ios_header_backbtn:e}},m=function(e){return{ios_header_css_back:e}};function v(e,n){if(1&e){var t=u.Pb();u.Ob(0,"ion-slide"),u.Ob(1,"ion-grid",26),u.Ob(2,"img",27),u.Wb("click",function(){return u.lc(t),u.Zb().back()}),u.Nb(),u.Ob(3,"ion-buttons",28),u.Wb("click",function(){return u.lc(t),u.Zb().home()}),u.Kb(4,"ion-icon",29),u.Nb(),u.Nb(),u.Nb()}if(2&e){var i=n.$implicit,o=u.Zb();u.zb(1),u.pc("background-image","url("+i+")"),u.zb(1),u.fc("ngClass",u.ic(4,f,1==o.ios_header)),u.zb(1),u.fc("ngClass",u.ic(6,m,1==o.ios_header))}}function _(e,n){1&e&&u.Kb(0,"ion-spinner")}function O(e,n){1&e&&(u.Ob(0,"span",30),u.rc(1," Continue "),u.Kb(2,"ion-ripple-effect"),u.Nb())}var w,x,y,N=[{path:"",component:(w=function(){function t(n,i,o,r,c,s,a){e(this,t),this.router=n,this.service=i,this.statusbar=o,this.alertController=r,this.modalController=c,this.appcomponent=s,this.toastController=a,this.property_images=[],this.opts={initialSlide:0,slidesPerView:1,autoplay:!0},this.address=this.service.getInvestdata()[0].address,this.title=this.service.getInvestdata()[0].title,this.purchase_price=this.service.getInvestdata()[0].purchase_price,this.remaining_share=this.service.getInvestdata()[0].remaining_share,this.property_images=this.service.getPropertyDetail().property_images,null!=this.service.getInvestdata()[0].invoice_id&&(this.property_images=this.service.getInvestdata()[0].img),this.balance=this.service.getBalance();var l=window.localStorage.getItem("phone-model");this.ios_header="10"==l,this.statusbar.hide(),this.delivery_of_document=!0,this.document_accessible=!0,this.offering_circular=!0,this.subscription_agreement=!0,this.w_9=!0,this.united_state_citizen=!0,this.warrent_true=!0,this.risk_of_loss=!0}var i,o,r;return i=t,(o=[{key:"ngOnInit",value:function(){var e=window.localStorage.getItem("invoice_id"),n=window.localStorage.getItem("prop_id");null==e&&(e=this.service.getInvestdata()[0].invoice_id),this.service.user_invest8(this.user_id,n,e).subscribe(function(e){console.log(e)})}},{key:"next",value:function(){var e=window.localStorage.getItem("prop_id");if(this.user_id=window.localStorage.getItem("user_id"),null==this.delivery_of_document||null==this.document_accessible||null==this.offering_circular||null==this.subscription_agreement||null==this.w_9||null==this.united_state_citizen||null==this.warrent_true||null==this.risk_of_loss)this.showmessage("Please read and select all investment agreement");else{if(null!=this.service.getInvestdata()[0].invoice_id)console.log(this.service.getInvestdata()[0].invoice_id),this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,"9").subscribe(function(e){console.log(e)});else{var n=window.localStorage.getItem("invoice_id");this.service.signup_email(this.user_id).subscribe(function(e){console.log(e)}),this.service.user_invest8(this.user_id,e,n).subscribe(function(e){console.log(e)})}this.service.setBackPage("invest-agree-sign"),this.appcomponent.leftSlide("invest-fund")}}},{key:"top_up",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.appcomponent.leftSlide("deposit-funds");case 1:case"end":return e.stop()}},e,this)}))}},{key:"top_down",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.modalController.create({component:b.a,cssClass:"center",enterAnimation:d.b,leaveAnimation:d.c,componentProps:{balance:this.balance}});case 2:return(n=e.sent).onDidDismiss().then(function(e){console.log(e)}),e.next=6,n.present();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}},e,this)}))}},{key:"cancel_inves",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var n,t=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.alertController.create({cssClass:"my-custom-class",header:"Vairt",message:"Do you want to cancel this investment?",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:function(e){console.log("Confirm Cancel: blah")}},{text:"Yes",handler:function(){t.cancel_invest()}}]});case 2:return n=e.sent,e.next=5,n.present();case 5:case"end":return e.stop()}},e,this)}))}},{key:"cancel_invest",value:function(){var e=this,n=window.localStorage.getItem("prop_id");null!=this.service.getInvestdata()[0].invoice_id?this.service.cancel_invoice_invest(this.service.getInvestdata()[0].invoice_id,this.user_id).subscribe(function(n){console.log(n),e.appcomponent.leftSlide("new-investments")}):this.service.cancel_invest(n,this.user_id).subscribe(function(n){console.log(n),e.appcomponent.leftSlide("home")})}},{key:"logout",value:function(){window.localStorage.clear(),this.appcomponent.downSlidePre("login")}},{key:"showmessage",value:function(e){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.toastController.create({message:e,color:"danger",cssClass:"toast-alert",duration:3e3});case 2:n.sent.present();case 3:case"end":return n.stop()}},n,this)}))}},{key:"back",value:function(){var e=this.service.getBackPage();this.appcomponent.downSlidePre("new-investments"==e?e:"invest-identity-of")}},{key:"home",value:function(){this.appcomponent.downSlidePre("home")}}])&&n(i.prototype,o),r&&n(i,r),t}(),w.\u0275fac=function(e){return new(e||w)(u.Jb(a.g),u.Jb(g.a),u.Jb(p.a),u.Jb(s.a),u.Jb(s.X),u.Jb(h.a),u.Jb(s.gb))},w.\u0275cmp=u.Db({type:w,selectors:[["app-invest-agree-sign"]],decls:83,vars:17,consts:[[1,"ion-no-border"],["pager","true",1,"ion-no-padding","slides",3,"pager","options"],[4,"ngFor","ngForOf"],[1,"ion-padding"],[1,"address"],[1,"type"],[1,"ion-no-padding",2,"margin-top","-10px"],["size","6"],[1,"sub_title"],[1,"price_btn",2,"margin-top","-10px"],[1,"sub_title",2,"text-align","right"],[1,"price_btn","right"],[1,"hori_divider"],[1,"heading"],[1,"info"],[1,"ion-no-padding","adjust"],["size","1"],["mode","md",3,"ngModel","ngModelChange"],["size","11"],[1,"txt"],[1,"form_btn","ion-activatable","ripple-parent",3,"click"],[4,"ngIf"],["class","submit-txt",4,"ngIf"],[1,"row",3,"click"],["src","assets/images/cancel.png","width","20",2,"margin-top","2px"],[1,"trans_btn",2,"color","#b8babb","width","auto","margin-top","0px"],[1,"background-img"],["src","assets/images/left-arrow-white.svg",1,"back_arrow",2,"width","30px",3,"ngClass","click"],[1,"home_btn",3,"ngClass","click"],["name","home",1,"home_icon"],[1,"submit-txt"]],template:function(e,n){1&e&&(u.Ob(0,"ion-header",0),u.Ob(1,"ion-slides",1),u.qc(2,v,5,8,"ion-slide",2),u.Nb(),u.Nb(),u.Ob(3,"ion-content",3),u.Ob(4,"p",4),u.rc(5),u.Nb(),u.Ob(6,"p",5),u.rc(7),u.Nb(),u.Ob(8,"ion-row",6),u.Ob(9,"ion-col",7),u.Ob(10,"p",8),u.rc(11,"Purchase Price "),u.Nb(),u.Ob(12,"button",9),u.rc(13),u.Nb(),u.Nb(),u.Ob(14,"ion-col",7),u.Ob(15,"p",10),u.rc(16,"Remaining Share"),u.Nb(),u.Ob(17,"button",11),u.rc(18),u.Nb(),u.Nb(),u.Nb(),u.Kb(19,"div",12),u.Ob(20,"h4",13),u.rc(21,"Agree and Sign"),u.Nb(),u.Ob(22,"p",14),u.rc(23,"Read the information below and check the boxes to confirm. After you complete your investment copies of all doucment will be accessible on your dashboard."),u.Nb(),u.Ob(24,"ion-row",15),u.Ob(25,"ion-col",16),u.Ob(26,"ion-checkbox",17),u.Wb("ngModelChange",function(e){return n.document_accessible=e}),u.Nb(),u.Nb(),u.Ob(27,"ion-col",18),u.Ob(28,"p",19),u.rc(29,"Read the information below and check the boxes to confirm. After you complete your investment copies of all doucment will be accessible on your dashboard."),u.Nb(),u.Nb(),u.Nb(),u.Ob(30,"ion-row",15),u.Ob(31,"ion-col",16),u.Ob(32,"ion-checkbox",17),u.Wb("ngModelChange",function(e){return n.delivery_of_document=e}),u.Nb(),u.Nb(),u.Ob(33,"ion-col",18),u.Ob(34,"p",19),u.rc(35,"I have reviewed and agree to the Electronic Consent and Delivery of Documents Form."),u.Nb(),u.Nb(),u.Nb(),u.Ob(36,"ion-row",15),u.Ob(37,"ion-col",16),u.Ob(38,"ion-checkbox",17),u.Wb("ngModelChange",function(e){return n.offering_circular=e}),u.Nb(),u.Nb(),u.Ob(39,"ion-col",18),u.Ob(40,"p",19),u.rc(41,"I have recieved and reviewed the Offering Circular."),u.Nb(),u.Nb(),u.Nb(),u.Ob(42,"ion-row",15),u.Ob(43,"ion-col",16),u.Ob(44,"ion-checkbox",17),u.Wb("ngModelChange",function(e){return n.subscription_agreement=e}),u.Nb(),u.Nb(),u.Ob(45,"ion-col",18),u.Ob(46,"p",19),u.rc(47,"I have reviewed and agree to the Subscription Agreement."),u.Nb(),u.Nb(),u.Nb(),u.Ob(48,"ion-row",15),u.Ob(49,"ion-col",16),u.Ob(50,"ion-checkbox",17),u.Wb("ngModelChange",function(e){return n.w_9=e}),u.Nb(),u.Nb(),u.Ob(51,"ion-col",18),u.Ob(52,"p",19),u.rc(53,"I have reviewed the Form W-9 and certify under penality of perjurcy each of the statements contained in Part || therof."),u.Nb(),u.Nb(),u.Nb(),u.Ob(54,"ion-row",15),u.Ob(55,"ion-col",16),u.Ob(56,"ion-checkbox",17),u.Wb("ngModelChange",function(e){return n.united_state_citizen=e}),u.Nb(),u.Nb(),u.Ob(57,"ion-col",18),u.Ob(58,"p",19),u.rc(59,"I am a United States citizen or resident."),u.Nb(),u.Nb(),u.Nb(),u.Ob(60,"ion-row",15),u.Ob(61,"ion-col",16),u.Ob(62,"ion-checkbox",17),u.Wb("ngModelChange",function(e){return n.warrent_true=e}),u.Nb(),u.Nb(),u.Ob(63,"ion-col",18),u.Ob(64,"p",19),u.rc(65,"I repersent and warrant that the answers provided here in are current, ture, correct and complete and may be relied upon by the issuer and its manager and their respective affiliates. I will notify the manager of any change to the information provided heere in promptly, but in any event within thirty days of such change."),u.Nb(),u.Nb(),u.Nb(),u.Ob(66,"ion-row",15),u.Ob(67,"ion-col",16),u.Ob(68,"ion-checkbox",17),u.Wb("ngModelChange",function(e){return n.risk_of_loss=e}),u.Nb(),u.Nb(),u.Ob(69,"ion-col",18),u.Ob(70,"p",19),u.rc(71,"I repersent such knowledge and expierence in financial and business matters that i can evaluate the risks of this investment, and i can bear the economic rish of this invesment including the rish of complete loss."),u.Nb(),u.Nb(),u.Nb(),u.Kb(72,"div",12),u.Kb(73,"br"),u.Ob(74,"button",20),u.Wb("click",function(){return n.next()}),u.qc(75,_,1,0,"ion-spinner",21),u.qc(76,O,3,0,"span",22),u.Nb(),u.Kb(77,"br"),u.Ob(78,"div",23),u.Wb("click",function(){return n.cancel_inves()}),u.Kb(79,"img",24),u.Ob(80,"button",25),u.rc(81,"Cancel Investment"),u.Nb(),u.Nb(),u.Kb(82,"br"),u.Nb()),2&e&&(u.zb(1),u.fc("pager",!0)("options",n.opts),u.zb(1),u.fc("ngForOf",n.property_images),u.zb(3),u.tc("#",n.title,""),u.zb(2),u.sc(n.address),u.zb(6),u.tc("$",n.purchase_price,""),u.zb(5),u.tc("$",n.remaining_share," "),u.zb(8),u.fc("ngModel",n.document_accessible),u.zb(6),u.fc("ngModel",n.delivery_of_document),u.zb(6),u.fc("ngModel",n.offering_circular),u.zb(6),u.fc("ngModel",n.subscription_agreement),u.zb(6),u.fc("ngModel",n.w_9),u.zb(6),u.fc("ngModel",n.united_state_citizen),u.zb(6),u.fc("ngModel",n.warrent_true),u.zb(6),u.fc("ngModel",n.risk_of_loss),u.zb(7),u.fc("ngIf",n.loading),u.zb(1),u.fc("ngIf",!n.loading))},directives:[s.r,s.L,r.j,s.o,s.E,s.n,s.m,s.c,c.j,c.m,r.k,s.K,s.q,r.i,s.i,s.s,s.M,s.C],styles:["ion-content[_ngcontent-%COMP%]{font-family:poppins regular}.background-img[_ngcontent-%COMP%]{height:250px;background-size:cover;background-position:50%;border-bottom-left-radius:15px;border-bottom-right-radius:15px}ion-slides.images[_ngcontent-%COMP%]{background:transparent;padding-top:0;padding-bottom:0;top:0}.set-height[_ngcontent-%COMP%]{width:93%;margin-left:0}.address[_ngcontent-%COMP%]{white-space:break-spaces;font-family:poppins semibold}.type[_ngcontent-%COMP%]{color:#b8babb;margin-top:-5px;font-size:13px}.sub_title[_ngcontent-%COMP%]{color:#333;font-size:13px;height:10px}.price_btn[_ngcontent-%COMP%]{background:var(--ion-color-primary);color:#fff;text-align:center;width:auto;padding:8px 10px;border-radius:5px}.right[_ngcontent-%COMP%]{float:right;margin-right:20px;margin-top:-2px}.hori_divider[_ngcontent-%COMP%]{width:100%;height:1px;background-color:#dcdcdc;margin-top:10px}.heading[_ngcontent-%COMP%]{color:var(--ion-color-primary);margin-left:10px;font-size:15px}ion-select[_ngcontent-%COMP%]{--padding-start:10px;border:1px solid silver;width:94%;margin-left:3%}.lbl[_ngcontent-%COMP%], ion-select[_ngcontent-%COMP%]{font-family:poppins regular}.lbl[_ngcontent-%COMP%]{color:#9a9a9a;margin-left:10px;margin-top:30px;font-size:13px}ion-input[_ngcontent-%COMP%]{--padding-start:10px;font-family:poppins regular;border:1px solid silver;width:93%;margin-left:3%;margin-top:5px}.trans_btn[_ngcontent-%COMP%]{background:transparent;border:none;outline:none;text-align:center;width:100%;color:var(--ion-color-primary);margin-top:15px}.center[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto}.info[_ngcontent-%COMP%]{color:#858587;font-family:poppins regular;text-align:justify;width:90%;margin-left:5%;margin-top:5px;font-size:12px}.prim_lbl[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:12px;margin-top:30px;text-align:right;margin-right:10px}.adjust[_ngcontent-%COMP%]{width:90%;margin-left:5%;margin-top:10px}ion-checkbox[_ngcontent-%COMP%], ion-radio[_ngcontent-%COMP%]{width:17px;height:17px}ion-checkbox[_ngcontent-%COMP%]{--border-color:#dcdcdc;--border-width:1px}.txt[_ngcontent-%COMP%]{margin-top:-2px}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:center}"]}),w)}],k=((y=function n(){e(this,n)}).\u0275fac=function(e){return new(e||y)},y.\u0275mod=u.Hb({type:y}),y.\u0275inj=u.Gb({imports:[[a.i.forChild(N)],a.i]}),y),C=((x=function n(){e(this,n)}).\u0275fac=function(e){return new(e||x)},x.\u0275mod=u.Hb({type:x}),x.\u0275inj=u.Gb({imports:[[r.b,c.g,s.U,k]]}),x)}}])}();