(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{zpxl:function(t,e,n){"use strict";n.r(e),n.d(e,"InvestAmountPageModule",function(){return y});var i=n("ofXK"),o=n("3Pt+"),s=n("TEn/"),r=n("tyNb"),a=n("mrSG"),c=n("yTpj"),l=n("PPBQ"),m=n("fXoL"),b=n("yZrb"),h=n("VYYF"),d=n("SmVF"),g=n("Sy1n");const p=function(t){return{ios_header_backbtn:t}},u=function(t){return{ios_header_css_back:t}};function _(t,e){if(1&t){const t=m.Pb();m.Ob(0,"ion-slide"),m.Ob(1,"ion-grid",39),m.Ob(2,"img",40),m.Wb("click",function(){return m.lc(t),m.Zb().back()}),m.Nb(),m.Ob(3,"ion-buttons",41),m.Wb("click",function(){return m.lc(t),m.Zb().home()}),m.Kb(4,"ion-icon",42),m.Nb(),m.Nb(),m.Nb()}if(2&t){const t=e.$implicit,n=m.Zb();m.zb(1),m.pc("background-image","url("+t+")"),m.zb(1),m.fc("ngClass",m.ic(4,p,1==n.ios_header)),m.zb(1),m.fc("ngClass",m.ic(6,u,1==n.ios_header))}}function v(t,e){if(1&t&&(m.Ob(0,"p",43),m.rc(1),m.Nb()),2&t){const t=m.Zb();m.zb(1),m.sc(t.error_message)}}function f(t,e){1&t&&m.Kb(0,"ion-spinner")}function w(t,e){1&t&&(m.Ob(0,"span",44),m.rc(1," Continue "),m.Kb(2,"ion-ripple-effect"),m.Nb())}const O=[{path:"",component:(()=>{class t{constructor(t,e,n,i,o,s,r,a){this.router=t,this.service=e,this.statusbar=n,this.toast=i,this.alertController=o,this.modalController=s,this.appcomponent=r,this.toastController=a,this.investment_verification=!1,this.showerror=!1,this.property_images=[],this.opts={initialSlide:0,slidesPerView:1},this.distribution="0",this.address=this.service.getInvestdata()[0].address,this.title=this.service.getInvestdata()[0].title,this.purchase_price=this.service.getInvestdata()[0].purchase_price,this.remaining_share=this.service.getInvestdata()[0].remaining_share,this.investment_amount=this.service.getPropertyDetail().minimum_investment,this.min_amount=this.investment_amount,this.check_amount=this.investment_amount,this.property_images=this.service.getPropertyDetail().property_images,null!=this.service.getInvestdata()[0].invoice_id&&(this.property_images=this.service.getInvestdata()[0].img),this.balance=this.service.getBalance(),null!=this.min_amount&&"undefined"!=this.min_amount||(this.min_amount=this.service.getInvestdata()[0].minimum_investment,this.investment_amount=this.min_amount),console.log(this.min_amount),this.min_amount.includes(",")&&(this.min_amount=parseFloat(this.min_amount.replace(/,/g,""))),this.investment_amount.includes(",")&&(this.investment_amount=parseFloat(this.investment_amount.replace(/,/g,"")));let c=window.localStorage.getItem("phone-model");this.ios_header="10"==c,this.statusbar.hide(),this.invest_type=this.service.get_invest_form(),this.min_amount="home"==this.invest_type?this.min_amount:"1"}ngOnInit(){this.user_id=window.localStorage.getItem("user_id");let t=window.localStorage.getItem("invoice_id");null==t&&(t=this.service.getInvestdata()[0].invoice_id);let e=window.localStorage.getItem("prop_id"),n=parseFloat(window.localStorage.getItem("total_price_per_share"));window.localStorage.setItem("ivestment_amount",this.investment_amount),console.log(n),this.share_amount=this.investment_amount/n;let i=10*Math.round(this.share_amount/10);this.service.user_invest3(this.user_id,this.investment_amount,i,e,t).subscribe(t=>{console.log(t)}),this.service.get_user_invest_detail(this.user_id).subscribe(t=>{console.log(t),this.distribution=t.invest_detail.investment_type,this.investment_verification=0!=t.invest_detail.investment_verification})}next(){if(null==this.distribution||"undefined"==this.distribution||""==this.distribution)this.toast_("Please select distribution");else if(this.invest_ver=0==this.investment_verification?"0":"1",null==this.investment_amount)this.showmessage("Please add investment amount");else{const t=/[0-9,]/;let e=String.fromCharCode(this.inputchar);if(t.test(e)&&this.showmessage("Amount can only be in numbers"),this.investment_amount<this.min_amount)this.showmessage("Investment amount cannot be less than minimum investment");else{this.service.update_user_invest_detail(this.user_id,this.investment_amount,this.distribution,this.invest_ver).subscribe(t=>{console.log(t)});let t=parseFloat(window.localStorage.getItem("total_price_per_share"));window.localStorage.setItem("ivestment_amount",this.investment_amount),this.share_amount=this.investment_amount/t;let e=this.share_amount.toFixed(0),n=window.localStorage.getItem("prop_id");if(null!=this.service.getInvestdata()[0].invoice_id)this.service.update_invest(this.user_id,this.service.getInvestdata()[0].property_id,this.service.getInvestdata()[0].invoice_id,"4").subscribe(t=>{console.log(t)});else{let t=window.localStorage.getItem("invoice_id");this.service.user_invest3(this.user_id,this.investment_amount,e,n,t).subscribe(t=>{console.log(t)})}this.service.setBackPage("invest-amount"),this.appcomponent.leftSlide("invest-tell-more")}}}toast_(t){this.toast.show(t,"3000","bottom").subscribe(t=>{console.log(t)})}top_up(){return Object(a.a)(this,void 0,void 0,function*(){this.appcomponent.leftSlide("deposit-funds")})}top_down(){return Object(a.a)(this,void 0,void 0,function*(){const t=yield this.modalController.create({component:c.a,cssClass:"center",enterAnimation:l.b,leaveAnimation:l.c,componentProps:{balance:this.balance}});return t.onDidDismiss().then(t=>{console.log(t)}),yield t.present()})}showmessage(t){return Object(a.a)(this,void 0,void 0,function*(){(yield this.toastController.create({message:t,color:"danger",cssClass:"toast-alert",duration:3e3})).present()})}cancel_inves(){return Object(a.a)(this,void 0,void 0,function*(){const t=yield this.alertController.create({cssClass:"my-custom-class",header:"Vairt",message:"Do you want to cancel this investment?",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:t=>{console.log("Confirm Cancel: blah")}},{text:"Yes",handler:()=>{this.cancel_invest()}}]});yield t.present()})}cancel_invest(){let t=window.localStorage.getItem("prop_id");console.log(this.service.getInvestdata()[0].invoice_id),null!=this.service.getInvestdata()[0].invoice_id?this.service.cancel_invoice_invest(this.service.getInvestdata()[0].invoice_id,this.user_id).subscribe(t=>{console.log(t),this.appcomponent.leftSlide("new-investments")}):this.service.cancel_invest(t,this.user_id).subscribe(t=>{console.log(t),this.appcomponent.leftSlide("home")})}logout(){window.localStorage.clear(),this.appcomponent.leftSlide("login")}back(){let t=this.service.getBackPage();this.appcomponent.downSlidePre("new-investments"==t?t:"invest-account-info")}check_min(){console.log(this.investment_amount)}check_amount_(t,e){this.inputchar=String.fromCharCode(t.charCode),/[0-9,]/.test(this.inputchar)?(this.showerror=!1,this.error_message=""):(this.error_message="Amount can be only in numbers",this.showerror=!0,t.preventDefault()),this.investment_amount<this.min_amount&&(this.showerror=!0,this.error_message="Investment amount cannot be less than from minimum amount")}home(){this.appcomponent.downSlidePre("home")}}return t.\u0275fac=function(e){return new(e||t)(m.Jb(r.g),m.Jb(b.a),m.Jb(h.a),m.Jb(d.a),m.Jb(s.a),m.Jb(s.X),m.Jb(g.a),m.Jb(s.gb))},t.\u0275cmp=m.Db({type:t,selectors:[["app-invest-amount"]],decls:71,vars:14,consts:[[1,"ion-no-border"],["pager","true",1,"ion-no-padding","slides",3,"pager","options"],[4,"ngFor","ngForOf"],[1,"ion-padding"],[1,"address"],[1,"type"],[1,"ion-no-padding",2,"margin-top","-10px"],["size","6"],[1,"sub_title"],[1,"price_btn",2,"margin-top","-10px"],[1,"sub_title",2,"text-align","right"],[1,"price_btn","right"],[1,"hori_divider"],[1,"heading"],[1,"prim_lbl"],[1,"background","ion-no-padding"],["size","auto",2,"height","70px","display","flex"],["src","assets/images/investment_amount.svg","width","20",1,"input_img"],["size","9",2,"height","70px"],[1,"input_lbl"],["type","number",1,"input",3,"ngModel","keypress","keyup","ngModelChange"],["class","error_message",4,"ngIf"],[1,"heading_row","ion-no-padding"],[2,"margin-top","6px"],[3,"ngModel","ngModelChange"],[1,"ion-no-padding","adjust"],["size","1"],["value","0","mode","md"],["size","11"],[1,"txt"],["value","1","mode","md"],["mode","md",3,"ngModel","ngModelChange"],[1,"info"],[1,"form_btn","ion-activatable","ripple-parent",3,"click"],[4,"ngIf"],["class","submit-txt",4,"ngIf"],[1,"row",3,"click"],["src","assets/images/cancel.png","width","20",2,"margin-top","2px"],[1,"trans_btn",2,"color","#b8babb","width","auto","margin-top","0px"],[1,"background-img"],["src","assets/images/left-arrow-white.svg",1,"back_arrow",2,"width","30px",3,"ngClass","click"],[1,"home_btn",3,"ngClass","click"],["name","home",1,"home_icon"],[1,"error_message"],[1,"submit-txt"]],template:function(t,e){1&t&&(m.Ob(0,"ion-header",0),m.Ob(1,"ion-slides",1),m.qc(2,_,5,8,"ion-slide",2),m.Nb(),m.Nb(),m.Ob(3,"ion-content",3),m.Ob(4,"p",4),m.rc(5),m.Nb(),m.Ob(6,"p",5),m.rc(7),m.Nb(),m.Ob(8,"ion-row",6),m.Ob(9,"ion-col",7),m.Ob(10,"p",8),m.rc(11,"Purchase Price "),m.Nb(),m.Ob(12,"button",9),m.rc(13),m.Nb(),m.Nb(),m.Ob(14,"ion-col",7),m.Ob(15,"p",10),m.rc(16,"Remaining Share"),m.Nb(),m.Ob(17,"button",11),m.rc(18),m.Nb(),m.Nb(),m.Nb(),m.Kb(19,"div",12),m.Ob(20,"h4",13),m.rc(21,"Investment Amount"),m.Nb(),m.Ob(22,"p",5),m.rc(23,"Next tell us how much you'd like to invest"),m.Nb(),m.Ob(24,"p",14),m.rc(25),m.Nb(),m.Ob(26,"ion-row",15),m.Ob(27,"ion-col",16),m.Kb(28,"img",17),m.Nb(),m.Ob(29,"ion-col",18),m.Ob(30,"p",19),m.rc(31,"Investment Amount"),m.Nb(),m.Ob(32,"ion-input",20),m.Wb("keypress",function(t){return e.check_amount_(t,e.investment_amount)})("keyup",function(){return e.check_min()})("ngModelChange",function(t){return e.investment_amount=t}),m.Nb(),m.Nb(),m.Nb(),m.qc(33,v,2,1,"p",21),m.Kb(34,"br"),m.Ob(35,"ion-row",22),m.Ob(36,"p",23),m.rc(37,"Distributions"),m.Nb(),m.Nb(),m.Kb(38,"br"),m.Ob(39,"ion-radio-group",24),m.Wb("ngModelChange",function(t){return e.distribution=t}),m.Ob(40,"ion-row",25),m.Ob(41,"ion-col",26),m.Kb(42,"ion-radio",27),m.Nb(),m.Ob(43,"ion-col",28),m.Ob(44,"p",29),m.rc(45,"i want to reinvest my distributions."),m.Nb(),m.Nb(),m.Nb(),m.Ob(46,"ion-row",25),m.Ob(47,"ion-col",26),m.Kb(48,"ion-radio",30),m.Nb(),m.Ob(49,"ion-col",28),m.Ob(50,"p",29),m.rc(51,"i want my distributions paid out in cash."),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Kb(52,"br"),m.Ob(53,"ion-row",25),m.Ob(54,"ion-col",26),m.Ob(55,"ion-checkbox",31),m.Wb("ngModelChange",function(t){return e.investment_verification=t}),m.Nb(),m.Nb(),m.Ob(56,"ion-col",28),m.Ob(57,"p",29),m.rc(58,"Verification of Investment amount."),m.Nb(),m.Nb(),m.Nb(),m.Ob(59,"p",32),m.rc(60," certify that the total amount of my investment in this offering does not exceed 10% of the greater of my annual income or net worth, determined as provided in Rule 501 of Regulation D*, unless I am investing via an entity in which case I certify that the total amount of this investment in this offering does not exceed 10% of the greater of the entity's annual revenue or net assets at the most recently completed fiscal year end.."),m.Nb(),m.Kb(61,"div",12),m.Kb(62,"br"),m.Ob(63,"button",33),m.Wb("click",function(){return e.next()}),m.qc(64,f,1,0,"ion-spinner",34),m.qc(65,w,3,0,"span",35),m.Nb(),m.Kb(66,"br"),m.Ob(67,"div",36),m.Wb("click",function(){return e.cancel_inves()}),m.Kb(68,"img",37),m.Ob(69,"button",38),m.rc(70,"Cancel Investment"),m.Nb(),m.Nb(),m.Nb()),2&t&&(m.zb(1),m.fc("pager",!0)("options",e.opts),m.zb(1),m.fc("ngForOf",e.property_images),m.zb(3),m.tc("#",e.title,""),m.zb(2),m.sc(e.address),m.zb(6),m.tc("$",e.purchase_price,""),m.zb(5),m.tc("$",e.remaining_share," "),m.zb(7),m.tc("(Minimum Investment: $ ",e.min_amount,")"),m.zb(7),m.fc("ngModel",e.investment_amount),m.zb(1),m.fc("ngIf",e.showerror),m.zb(6),m.fc("ngModel",e.distribution),m.zb(16),m.fc("ngModel",e.investment_verification),m.zb(9),m.fc("ngIf",e.loading),m.zb(1),m.fc("ngIf",!e.loading))},directives:[s.r,s.L,i.j,s.o,s.E,s.n,s.v,s.ab,o.j,o.m,i.k,s.B,s.eb,s.A,s.cb,s.m,s.c,s.K,s.q,i.i,s.i,s.s,s.M,s.C],styles:["ion-content[_ngcontent-%COMP%]{font-family:poppins regular}.background-img[_ngcontent-%COMP%]{height:250px;background-size:cover;background-position:50%;border-bottom-left-radius:15px;border-bottom-right-radius:15px}ion-slides.images[_ngcontent-%COMP%]{background:transparent;padding-top:0;padding-bottom:0;top:-48px}.set-height[_ngcontent-%COMP%]{width:93%;margin-left:0}.address[_ngcontent-%COMP%]{white-space:break-spaces;font-family:poppins semibold}.type[_ngcontent-%COMP%]{color:#b8babb;margin-top:-5px;font-size:13px}.sub_title[_ngcontent-%COMP%]{color:#333;font-size:13px;height:10px}.price_btn[_ngcontent-%COMP%]{background:var(--ion-color-primary);color:#fff;text-align:center;width:auto;padding:8px 10px;border-radius:5px}.right[_ngcontent-%COMP%]{float:right;margin-right:20px;margin-top:-2px}.hori_divider[_ngcontent-%COMP%]{width:100%;height:1px;background-color:#dcdcdc;margin-top:10px}.heading[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:15px}ion-select[_ngcontent-%COMP%]{--padding-start:10px;border:1px solid silver;width:94%;margin-left:3%}.lbl[_ngcontent-%COMP%], ion-select[_ngcontent-%COMP%]{font-family:poppins regular}.lbl[_ngcontent-%COMP%]{color:#9a9a9a;margin-left:10px;margin-top:30px;font-size:13px}.trans_btn[_ngcontent-%COMP%]{background:transparent;border:none;outline:none;text-align:center;width:100%;color:var(--ion-color-primary);margin-top:15px}.center[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto}.info[_ngcontent-%COMP%]{color:#858587;font-family:poppins regular;text-align:justify;width:90%;margin-left:5%;margin-top:5px;font-size:12px}.prim_lbl[_ngcontent-%COMP%]{color:var(--ion-color-primary);font-size:12px;margin-top:30px;text-align:right;margin-right:10px}.adjust[_ngcontent-%COMP%]{width:90%;margin-left:5%;margin-top:10px}ion-radio[_ngcontent-%COMP%]{width:20px;height:20px}ion-checkbox[_ngcontent-%COMP%]{width:17px;height:17px;--border-color:#dcdcdc;--border-width:1px}ion-input[_ngcontent-%COMP%]{font-family:poppins regular}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:center}.error_message[_ngcontent-%COMP%]{font-family:poppins regular;margin-left:23px;font-size:13px;color:var(--ion-color-danger);margin-right:20px}ion-buttons.ios_header_css_back[_ngcontent-%COMP%]{margin-top:40px}"]}),t})()}];let x=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=m.Hb({type:t}),t.\u0275inj=m.Gb({imports:[[r.i.forChild(O)],r.i]}),t})(),y=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=m.Hb({type:t}),t.\u0275inj=m.Gb({imports:[[i.b,o.g,s.U,x]]}),t})()}}]);