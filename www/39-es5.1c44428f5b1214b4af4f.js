!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{zpxl:function(n,i,o){"use strict";o.r(i),o.d(i,"InvestAmountPageModule",function(){return I});var s=o("ofXK"),r=o("3Pt+"),a=o("TEn/"),c=o("tyNb"),l=o("mrSG"),u=o("yTpj"),m=o("PPBQ"),h=o("fXoL"),b=o("yZrb"),p=o("VYYF"),d=o("SmVF"),g=o("Sy1n"),v=function(t){return{ios_header_backbtn:t}},_=function(t){return{ios_header_css_back:t}};function f(t,e){if(1&t){var n=h.Pb();h.Ob(0,"ion-slide"),h.Ob(1,"ion-grid",39),h.Ob(2,"img",40),h.Wb("click",function(){return h.lc(n),h.Zb().back()}),h.Nb(),h.Ob(3,"ion-buttons",41),h.Wb("click",function(){return h.lc(n),h.Zb().home()}),h.Kb(4,"ion-icon",42),h.Nb(),h.Nb(),h.Nb()}if(2&t){var i=e.$implicit,o=h.Zb();h.zb(1),h.pc("background-image","url("+i+")"),h.zb(1),h.fc("ngClass",h.ic(4,v,1==o.ios_header)),h.zb(1),h.fc("ngClass",h.ic(6,_,1==o.ios_header))}}function w(t,e){if(1&t&&(h.Ob(0,"p",43),h.rc(1),h.Nb()),2&t){var n=h.Zb();h.zb(1),h.sc(n.error_message)}}function O(t,e){1&t&&h.Kb(0,"ion-spinner")}function x(t,e){1&t&&(h.Ob(0,"span",44),h.rc(1," Continue "),h.Kb(2,"ion-ripple-effect"),h.Nb())}var y,k,C,N=[{path:"",component:(y=function(){function n(e,i,o,s,r,a,c,l){t(this,n),this.router=e,this.service=i,this.statusbar=o,this.toast=s,this.alertController=r,this.modalController=a,this.appcomponent=c,this.toastController=l,this.investment_verification=!1,this.showerror=!1,this.property_images=[],this.opts={initialSlide:0,slidesPerView:1},this.distribution="0",this.address=this.service.getInvestdata()[0].address,this.title=this.service.getInvestdata()[0].title,this.purchase_price=this.service.getInvestdata()[0].purchase_price,this.remaining_share=this.service.getInvestdata()[0].remaining_share,this.investment_amount=this.service.getPropertyDetail().minimum_investment,this.min_amount=this.investment_amount,this.check_amount=this.investment_amount,this.property_images=this.service.getPropertyDetail().property_images,null!=this.service.getInvestdata()[0].invoice_id&&(this.property_images=this.service.getInvestdata()[0].img),this.balance=this.service.getBalance(),null!=this.min_amount&&"undefined"!=this.min_amount||(this.min_amount=this.service.getInvestdata()[0].minimum_investment,this.investment_amount=this.min_amount),console.log(this.min_amount),this.min_amount.includes(",")&&(this.min_amount=parseFloat(this.min_amount.replace(/,/g,""))),this.investment_amount.includes(",")&&(this.investment_amount=parseFloat(this.investment_amount.replace(/,/g,"")));var u=window.localStorage.getItem("phone-model");this.ios_header="10"==u,this.statusbar.hide(),this.invest_type=this.service.get_invest_form(),this.min_amount="home"==this.invest_type?this.min_amount:"1"}var i,o,s;return i=n,(o=[{key:"ngOnInit",value:function(){var t=this;this.user_id=window.localStorage.getItem("user_id");var e=window.localStorage.getItem("invoice_id");null==e&&(e=this.service.getInvestdata()[0].invoice_id);var n=window.localStorage.getItem("prop_id"),i=parseFloat(window.localStorage.getItem("total_price_per_share"));window.localStorage.setItem("ivestment_amount",this.investment_amount),console.log(i),this.share_amount=this.investment_amount/i;var o=10*Math.round(this.share_amount/10);this.service.user_invest3(this.user_id,this.investment_amount,o,n,e).subscribe(function(t){console.log(t)}),this.service.get_user_invest_detail(this.user_id).subscribe(function(e){console.log(e),t.distribution=e.invest_detail.investment_type,t.investment_verification=0!=e.invest_detail.investment_verification})}},{key:"next",value:function(){if(null==this.distribution||"undefined"==this.distribution||""==this.distribution)this.toast_("Please select distribution");else if(this.invest_ver=0==this.investment_verification?"0":"1",null==this.investment_amount)this.showmessage("Please add investment amount");else{var t=String.fromCharCode(this.inputchar);if(/[0-9,]/.test(t)&&this.showmessage("Amount can only be in numbers"),this.investment_amount<this.min_amount)this.showmessage("Investment amount cannot be less than minimum investment");else{this.service.update_user_invest_detail(this.user_id,this.investment_amount,this.distribution,this.invest_ver).subscribe(function(t){console.log(t)});var e=parseFloat(window.localStorage.getItem("total_price_per_share"));window.localStorage.setItem("ivestment_amount",this.investment_amount),this.share_amount=this.investment_amount/e;var n=this.share_amount.toFixed(0),i=window.localStorage.getItem("prop_id");if(null!=this.service.getInvestdata()[0].invoice_id)this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,"4").subscribe(function(t){console.log(t)});else{var o=window.localStorage.getItem("invoice_id");this.service.user_invest3(this.user_id,this.investment_amount,n,i,o).subscribe(function(t){console.log(t)})}this.service.setBackPage("invest-amount"),this.appcomponent.leftSlide("invest-tell-more")}}}},{key:"toast_",value:function(t){this.toast.show(t,"3000","bottom").subscribe(function(t){console.log(t)})}},{key:"top_up",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.appcomponent.leftSlide("deposit-funds");case 1:case"end":return t.stop()}},t,this)}))}},{key:"top_down",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.modalController.create({component:u.a,cssClass:"center",enterAnimation:m.b,leaveAnimation:m.c,componentProps:{balance:this.balance}});case 2:return(e=t.sent).onDidDismiss().then(function(t){console.log(t)}),t.next=6,e.present();case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}},t,this)}))}},{key:"showmessage",value:function(t){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.toastController.create({message:t,color:"danger",cssClass:"toast-alert",duration:3e3});case 2:e.sent.present();case 3:case"end":return e.stop()}},e,this)}))}},{key:"cancel_inves",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var e,n=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.alertController.create({cssClass:"my-custom-class",header:"Vairt",message:"Do you want to cancel this investment?",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:function(t){console.log("Confirm Cancel: blah")}},{text:"Yes",handler:function(){n.cancel_invest()}}]});case 2:return e=t.sent,t.next=5,e.present();case 5:case"end":return t.stop()}},t,this)}))}},{key:"cancel_invest",value:function(){var t=this,e=window.localStorage.getItem("prop_id");console.log(this.service.getInvestdata()[0].invoice_id),null!=this.service.getInvestdata()[0].invoice_id?this.service.cancel_invoice_invest(this.service.getInvestdata()[0].invoice_id,this.user_id).subscribe(function(e){console.log(e),t.appcomponent.leftSlide("new-investments")}):this.service.cancel_invest(e,this.user_id).subscribe(function(e){console.log(e),t.appcomponent.leftSlide("home")})}},{key:"logout",value:function(){window.localStorage.clear(),this.appcomponent.leftSlide("login")}},{key:"back",value:function(){var t=this.service.getBackPage();this.appcomponent.downSlidePre("new-investments"==t?t:"invest-account-info")}},{key:"check_min",value:function(){console.log(this.investment_amount)}},{key:"check_amount_",value:function(t,e){this.inputchar=String.fromCharCode(t.charCode),/[0-9,]/.test(this.inputchar)?(this.showerror=!1,this.error_message=""):(this.error_message="Amount can be only in numbers",this.showerror=!0,t.preventDefault()),this.investment_amount<this.min_amount&&(this.showerror=!0,this.error_message="Investment amount cannot be less than from minimum amount")}},{key:"home",value:function(){this.appcomponent.downSlidePre("home")}}])&&e(i.prototype,o),s&&e(i,s),n}(),y.\u0275fac=function(t){return new(t||y)(h.Jb(c.g),h.Jb(b.a),h.Jb(p.a),h.Jb(d.a),h.Jb(a.a),h.Jb(a.X),h.Jb(g.a),h.Jb(a.gb))},y.\u0275cmp=h.Db({type:y,selectors:[["app-invest-amount"]],decls:71,vars:14,consts:[[1,"ion-no-border"],["pager","true",1,"ion-no-padding","slides",3,"pager","options"],[4,"ngFor","ngForOf"],[1,"ion-padding"],[1,"address"],[1,"type"],[1,"ion-no-padding",2,"margin-top","-10px"],["size","6"],[1,"sub_title"],[1,"price_btn",2,"margin-top","-10px"],[1,"sub_title",2,"text-align","right"],[1,"price_btn","right"],[1,"hori_divider"],[1,"heading"],[1,"prim_lbl"],[1,"background","ion-no-padding"],["size","auto",2,"height","70px","display","flex"],["src","assets/images/investment_amount.svg","width","20",1,"input_img"],["size","9",2,"height","70px"],[1,"input_lbl"],["type","number",1,"input",3,"ngModel","keypress","keyup","ngModelChange"],["class","error_message",4,"ngIf"],[1,"heading_row","ion-no-padding"],[2,"margin-top","6px"],[3,"ngModel","ngModelChange"],[1,"ion-no-padding","adjust"],["size","1"],["value","0","mode","md"],["size","11"],[1,"txt"],["value","1","mode","md"],["mode","md",3,"ngModel","ngModelChange"],[1,"info"],[1,"form_btn","ion-activatable","ripple-parent",3,"click"],[4,"ngIf"],["class","submit-txt",4,"ngIf"],[1,"row",3,"click"],["src","assets/images/cancel.png","width","20",2,"margin-top","2px"],[1,"trans_btn",2,"color","#b8babb","width","auto","margin-top","0px"],[1,"background-img"],["src","assets/images/left-arrow-white.svg",1,"back_arrow",2,"width","30px",3,"ngClass","click"],[1,"home_btn",3,"ngClass","click"],["name","home",1,"home_icon"],[1,"error_message"],[1,"submit-txt"]],template:function(t,e){1&t&&(h.Ob(0,"ion-header",0),h.Ob(1,"ion-slides",1),h.qc(2,f,5,8,"ion-slide",2),h.Nb(),h.Nb(),h.Ob(3,"ion-content",3),h.Ob(4,"p",4),h.rc(5),h.Nb(),h.Ob(6,"p",5),h.rc(7),h.Nb(),h.Ob(8,"ion-row",6),h.Ob(9,"ion-col",7),h.Ob(10,"p",8),h.rc(11,"Purchase Price "),h.Nb(),h.Ob(12,"button",9),h.rc(13),h.Nb(),h.Nb(),h.Ob(14,"ion-col",7),h.Ob(15,"p",10),h.rc(16,"Remaining Share"),h.Nb(),h.Ob(17,"button",11),h.rc(18),h.Nb(),h.Nb(),h.Nb(),h.Kb(19,"div",12),h.Ob(20,"h4",13),h.rc(21,"Investment Amount"),h.Nb(),h.Ob(22,"p",5),h.rc(23,"Next tell us how much you'd like to invest"),h.Nb(),h.Ob(24,"p",14),h.rc(25),h.Nb(),h.Ob(26,"ion-row",15),h.Ob(27,"ion-col",16),h.Kb(28,"img",17),h.Nb(),h.Ob(29,"ion-col",18),h.Ob(30,"p",19),h.rc(31,"Investment Amount"),h.Nb(),h.Ob(32,"ion-input",20),h.Wb("keypress",function(t){return e.check_amount_(t,e.investment_amount)})("keyup",function(){return e.check_min()})("ngModelChange",function(t){return e.investment_amount=t}),h.Nb(),h.Nb(),h.Nb(),h.qc(33,w,2,1,"p",21),h.Kb(34,"br"),h.Ob(35,"ion-row",22),h.Ob(36,"p",23),h.rc(37,"Distributions"),h.Nb(),h.Nb(),h.Kb(38,"br"),h.Ob(39,"ion-radio-group",24),h.Wb("ngModelChange",function(t){return e.distribution=t}),h.Ob(40,"ion-row",25),h.Ob(41,"ion-col",26),h.Kb(42,"ion-radio",27),h.Nb(),h.Ob(43,"ion-col",28),h.Ob(44,"p",29),h.rc(45,"i want to reinvest my distributions."),h.Nb(),h.Nb(),h.Nb(),h.Ob(46,"ion-row",25),h.Ob(47,"ion-col",26),h.Kb(48,"ion-radio",30),h.Nb(),h.Ob(49,"ion-col",28),h.Ob(50,"p",29),h.rc(51,"i want my distributions paid out in cash."),h.Nb(),h.Nb(),h.Nb(),h.Nb(),h.Kb(52,"br"),h.Ob(53,"ion-row",25),h.Ob(54,"ion-col",26),h.Ob(55,"ion-checkbox",31),h.Wb("ngModelChange",function(t){return e.investment_verification=t}),h.Nb(),h.Nb(),h.Ob(56,"ion-col",28),h.Ob(57,"p",29),h.rc(58,"Verification of Investment amount."),h.Nb(),h.Nb(),h.Nb(),h.Ob(59,"p",32),h.rc(60," certify that the total amount of my investment in this offering does not exceed 10% of the greater of my annual income or net worth, determined as provided in Rule 501 of Regulation D*, unless I am investing via an entity in which case I certify that the total amount of this investment in this offering does not exceed 10% of the greater of the entity's annual revenue or net assets at the most recently completed fiscal year end.."),h.Nb(),h.Kb(61,"div",12),h.Kb(62,"br"),h.Ob(63,"button",33),h.Wb("click",function(){return e.next()}),h.qc(64,O,1,0,"ion-spinner",34),h.qc(65,x,3,0,"span",35),h.Nb(),h.Kb(66,"br"),h.Ob(67,"div",36),h.Wb("click",function(){return e.cancel_inves()}),h.Kb(68,"img",37),h.Ob(69,"button",38),h.rc(70,"Cancel Investment"),h.Nb(),h.Nb(),h.Nb()),2&t&&(h.zb(1),h.fc("pager",!0)("options",e.opts),h.zb(1),h.fc("ngForOf",e.property_images),h.zb(3),h.tc("#",e.title,""),h.zb(2),h.sc(e.address),h.zb(6),h.tc("$",e.purchase_price,""),h.zb(5),h.tc("$",e.remaining_share," "),h.zb(7),h.tc("(Minimum Investment: $ ",e.min_amount,")"),h.zb(7),h.fc("ngModel",e.investment_amount),h.zb(1),h.fc("ngIf",e.showerror),h.zb(6),h.fc("ngModel",e.distribution),h.zb(16),h.fc("ngModel",e.investment_verification),h.zb(9),h.fc("ngIf",e.loading),h.zb(1),h.fc("ngIf",!e.loading))},directives:[a.r,a.L,s.j,a.o,a.E,a.n,a.v,a.ab,r.j,r.m,s.k,a.B,a.eb,a.A,a.cb,a.m,a.c,a.K,a.q,s.i,a.i,a.s,a.M,a.C],styles:["ion-content[_ngcontent-%COMP%]{font-family:poppins regular}.background-img[_ngcontent-%COMP%]{height:250px;background-size:cover;background-position:50%;border-bottom-left-radius:15px;border-bottom-right-radius:15px}ion-slides.images[_ngcontent-%COMP%]{background:transparent;padding-top:0;padding-bottom:0;top:-48px}.set-height[_ngcontent-%COMP%]{width:93%;margin-left:0}.address[_ngcontent-%COMP%]{white-space:break-spaces;font-family:poppins semibold}.type[_ngcontent-%COMP%]{color:#b8babb;margin-top:-5px;font-size:13px}.sub_title[_ngcontent-%COMP%]{color:#333;font-size:13px;height:10px}.price_btn[_ngcontent-%COMP%]{background:var(--ion-color-primary);color:#fff;text-align:center;width:auto;padding:8px 10px;border-radius:5px}.right[_ngcontent-%COMP%]{float:right;margin-right:20px;margin-top:-2px}.hori_divider[_ngcontent-%COMP%]{width:100%;height:1px;background-color:#dcdcdc;margin-top:10px}.heading[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:15px}ion-select[_ngcontent-%COMP%]{--padding-start:10px;border:1px solid silver;width:94%;margin-left:3%}.lbl[_ngcontent-%COMP%], ion-select[_ngcontent-%COMP%]{font-family:poppins regular}.lbl[_ngcontent-%COMP%]{color:#9a9a9a;margin-left:10px;margin-top:30px;font-size:13px}.trans_btn[_ngcontent-%COMP%]{background:transparent;border:none;outline:none;text-align:center;width:100%;color:var(--ion-color-primary);margin-top:15px}.center[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto}.info[_ngcontent-%COMP%]{color:#858587;font-family:poppins regular;text-align:justify;width:90%;margin-left:5%;margin-top:5px;font-size:12px}.prim_lbl[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:12px;margin-top:30px;text-align:right;margin-right:10px}.adjust[_ngcontent-%COMP%]{width:90%;margin-left:5%;margin-top:10px}ion-radio[_ngcontent-%COMP%]{width:20px;height:20px}ion-checkbox[_ngcontent-%COMP%]{width:17px;height:17px;--border-color:#dcdcdc;--border-width:1px}ion-input[_ngcontent-%COMP%]{font-family:poppins regular}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:center}.error_message[_ngcontent-%COMP%]{font-family:poppins regular;margin-left:23px;font-size:13px;color:var(--ion-color-danger);margin-right:20px}ion-buttons.ios_header_css_back[_ngcontent-%COMP%]{margin-top:40px}"]}),y)}],P=((C=function e(){t(this,e)}).\u0275fac=function(t){return new(t||C)},C.\u0275mod=h.Hb({type:C}),C.\u0275inj=h.Gb({imports:[[c.i.forChild(N)],c.i]}),C),I=((k=function e(){t(this,e)}).\u0275fac=function(t){return new(t||k)},k.\u0275mod=h.Hb({type:k}),k.\u0275inj=h.Gb({imports:[[s.b,r.g,a.U,P]]}),k)}}])}();