!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{XktO:function(n,o,i){"use strict";i.r(o),i.d(o,"PurchasedPropertyPageModule",function(){return N});var r,c,a,s=i("ofXK"),p=i("3Pt+"),b=i("TEn/"),l=i("tyNb"),d=i("mrSG"),g=i("PPBQ"),h=i("t+2E"),m=i("fXoL"),u=i("yZrb"),_=i("Sy1n"),f=function(e){return{ios_header_css_row:e}},O=[{path:"",component:(r=function(){function n(t,o,i){e(this,n),this.service=t,this.modalController=o,this.appcomponent=i,console.log(this.service.get_purchase_complete()),this.size=25e3,this.address=this.service.get_purchase_complete().address,this.property_title=this.service.get_purchase_complete().property_title,this.beds=this.service.get_purchase_complete().beds,this.baths=this.service.get_purchase_complete().baths,this.size=this.service.get_purchase_complete().size,this.prop_img=this.service.get_purchase_complete().property_images[0],this.property_id=this.service.get_purchase_complete().property_id,this.purchase_price=this.service.get_purchase_complete().price,this.share=this.service.get_purchase_complete().shares,this.purchaser_id=this.service.get_purchase_complete().purchaser_id,this.balance=this.service.getBalance(),this.user_id=window.localStorage.getItem("user_id");var r=window.localStorage.getItem("phone-model");this.ios_header="10"==r}var o,i,r;return o=n,(i=[{key:"ngOnInit",value:function(){var e=this;this.service.purchase_complete_property(this.property_id,this.user_id).subscribe(function(t){console.log(t),e.property=t.property[0],e.transaction=t.property[0].transaction,e.income=t.transaction[0].deposit_amount})}},{key:"back",value:function(){this.appcomponent.downSlidePre("new-investments")}},{key:"document",value:function(){this.service.setPropertyDetail(this.property,this.transaction),this.service.setDetailBackPage("purchased-property"),this.appcomponent.upSlide("property-detail")}},{key:"liquidate",value:function(){return Object(d.a)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.modalController.create({component:h.a,cssClass:"center_modal1",enterAnimation:g.b,leaveAnimation:g.c,componentProps:{share:this.share,price:this.purchase_price,purchaser_id:this.purchaser_id}});case 2:return(t=e.sent).onDidDismiss().then(function(e){console.log(e)}),e.next=6,t.present();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}},e,this)}))}}])&&t(o.prototype,i),r&&t(o,r),n}(),r.\u0275fac=function(e){return new(e||r)(m.Jb(u.a),m.Jb(b.X),m.Jb(_.a))},r.\u0275cmp=m.Db({type:r,selectors:[["app-purchased-property"]],decls:138,vars:19,consts:[[1,"ion-no-border","header"],[1,"row",2,"border","none",3,"ngClass"],[1,"close_btn",3,"click"],["name","chevron-back-outline",1,"close"],[1,"title"],[1,"set_width"],[1,"prop_img"],[3,"src"],[1,"row_"],["src","assets/images/bed.svg","width","17"],[1,"assc"],[1,"vertical"],["src","assets/images/bath.svg","width","17",2,"margin-left","10px"],["src","assets/images/location.svg","width","17",2,"margin-left","10px"],[1,"address"],[1,"title_"],["lines","none",2,"margin-top","-5px"],[1,"view_document",3,"click"],["slot","end",1,"view_document",3,"click"],[1,"documents_sec"],[1,"title",2,"padding-top","15px"],[1,"ion-padding",2,"margin-top","-10px"],["size","5.8",1,"items","ion-no-padding"],[1,"row_d"],[1,"download"],["name","cloud-download-outline"],[1,"name_file"],["size","0.2"],[1,"ion-padding",2,"margin-top","-22px"],[1,"balance_div"],[1,"sheet_heading"],[1,"title_","balance_title"],[1,"row_sheet","ion-no-padding"],["size","5.5"],[1,"sheet_inner_heading"],["size","1"],[1,"dot"],[1,"price"],[1,"sheet_inner_heading","active"],[1,"price","active"],[1,"row_sheet","ion-no-padding",2,"border-bottom","none"]],template:function(e,t){1&e&&(m.Ob(0,"ion-header",0),m.Ob(1,"div",1),m.Ob(2,"ion-buttons",2),m.Wb("click",function(){return t.back()}),m.Kb(3,"ion-icon",3),m.Nb(),m.Ob(4,"h4",4),m.rc(5,"Documents"),m.Nb(),m.Nb(),m.Nb(),m.Ob(6,"ion-content"),m.Kb(7,"br"),m.Ob(8,"div",5),m.Ob(9,"ion-avatar",6),m.Kb(10,"img",7),m.Nb(),m.Ob(11,"div",8),m.Kb(12,"img",9),m.Ob(13,"p",10),m.rc(14),m.Nb(),m.Kb(15,"div",11),m.Kb(16,"img",12),m.Ob(17,"p",10),m.rc(18),m.Nb(),m.Kb(19,"div",11),m.Kb(20,"img",13),m.Ob(21,"p",10),m.rc(22),m.ac(23,"number"),m.Nb(),m.Nb(),m.Ob(24,"p",14),m.rc(25),m.Nb(),m.Ob(26,"p",15),m.rc(27),m.Nb(),m.Ob(28,"ion-item",16),m.Ob(29,"button",17),m.Wb("click",function(){return t.document()}),m.rc(30,"View Document"),m.Nb(),m.Ob(31,"button",18),m.Wb("click",function(){return t.liquidate()}),m.rc(32,"Liquidate"),m.Nb(),m.Nb(),m.Nb(),m.Kb(33,"br"),m.Kb(34,"br"),m.Ob(35,"div",19),m.Ob(36,"h4",20),m.rc(37,"Documents"),m.Nb(),m.Ob(38,"ion-row",21),m.Ob(39,"ion-col",22),m.Ob(40,"div",23),m.Ob(41,"p",24),m.rc(42,"Download"),m.Nb(),m.Kb(43,"ion-icon",25),m.Nb(),m.Ob(44,"p",26),m.rc(45,"5 YR Financial Proforma.xlsx(Restricted)"),m.Nb(),m.Nb(),m.Kb(46,"ion-col",27),m.Ob(47,"ion-col",22),m.Ob(48,"div",23),m.Ob(49,"p",24),m.rc(50,"Download"),m.Nb(),m.Kb(51,"ion-icon",25),m.Nb(),m.Ob(52,"p",26),m.rc(53,"Independent Market Report.pdf(Restricted)"),m.Nb(),m.Nb(),m.Nb(),m.Ob(54,"ion-row",28),m.Ob(55,"ion-col",22),m.Ob(56,"div",23),m.Ob(57,"p",24),m.rc(58,"Download"),m.Nb(),m.Kb(59,"ion-icon",25),m.Nb(),m.Ob(60,"p",26),m.rc(61,"Investment Memorandum .pdf(Restricted)"),m.Nb(),m.Nb(),m.Kb(62,"ion-col",27),m.Ob(63,"ion-col",22),m.Ob(64,"div",23),m.Ob(65,"p",24),m.rc(66,"Download"),m.Nb(),m.Kb(67,"ion-icon",25),m.Nb(),m.Ob(68,"p",26),m.rc(69,"Third party valuation.pdf(Restricted)"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Kb(70,"br"),m.Kb(71,"br"),m.Ob(72,"div",29),m.Ob(73,"h4",30),m.rc(74,"Balance Sheet"),m.Nb(),m.Ob(75,"p",31),m.rc(76,"A Beautiful Mountain Top House 5 Year Lease Signed"),m.Nb(),m.Ob(77,"ion-row",32),m.Ob(78,"ion-col",33),m.Ob(79,"p",34),m.rc(80,"Investment"),m.Nb(),m.Nb(),m.Ob(81,"ion-col",35),m.Ob(82,"p",36),m.rc(83,":"),m.Nb(),m.Nb(),m.Ob(84,"ion-col",33),m.Ob(85,"p",37),m.rc(86),m.Nb(),m.Nb(),m.Nb(),m.Ob(87,"ion-row",32),m.Ob(88,"ion-col",33),m.Ob(89,"p",38),m.rc(90,"Total Investment"),m.Nb(),m.Nb(),m.Ob(91,"ion-col",35),m.Ob(92,"p",36),m.rc(93,":"),m.Nb(),m.Nb(),m.Ob(94,"ion-col",33),m.Ob(95,"p",39),m.rc(96),m.Nb(),m.Nb(),m.Nb(),m.Ob(97,"ion-row",32),m.Ob(98,"ion-col",33),m.Ob(99,"p",34),m.rc(100,"Rental Income"),m.Nb(),m.Nb(),m.Ob(101,"ion-col",35),m.Ob(102,"p",36),m.rc(103,":"),m.Nb(),m.Nb(),m.Ob(104,"ion-col",33),m.Ob(105,"p",37),m.rc(106),m.Nb(),m.Nb(),m.Nb(),m.Ob(107,"ion-row",32),m.Ob(108,"ion-col",33),m.Ob(109,"p",38),m.rc(110,"Total Rental Income"),m.Nb(),m.Nb(),m.Ob(111,"ion-col",35),m.Ob(112,"p",36),m.rc(113,":"),m.Nb(),m.Nb(),m.Ob(114,"ion-col",33),m.Ob(115,"p",39),m.rc(116),m.Nb(),m.Nb(),m.Nb(),m.Ob(117,"ion-row",32),m.Ob(118,"ion-col",33),m.Ob(119,"p",34),m.rc(120,"Profit"),m.Nb(),m.Nb(),m.Ob(121,"ion-col",35),m.Ob(122,"p",36),m.rc(123,":"),m.Nb(),m.Nb(),m.Ob(124,"ion-col",33),m.Ob(125,"p",37),m.rc(126),m.Nb(),m.Nb(),m.Nb(),m.Ob(127,"ion-row",40),m.Ob(128,"ion-col",33),m.Ob(129,"p",38),m.rc(130,"Fiat Wallet"),m.Nb(),m.Nb(),m.Ob(131,"ion-col",35),m.Ob(132,"p",36),m.rc(133,":"),m.Nb(),m.Nb(),m.Ob(134,"ion-col",33),m.Ob(135,"p",39),m.rc(136),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Kb(137,"br"),m.Nb()),2&e&&(m.zb(1),m.fc("ngClass",m.ic(17,f,1==t.ios_header)),m.zb(9),m.gc("src",t.prop_img,m.nc),m.zb(4),m.sc(t.beds),m.zb(4),m.sc(t.baths),m.zb(4),m.sc(m.cc(23,13,t.size,"1.0-0","en")),m.zb(3),m.sc(t.address),m.zb(2),m.sc(t.property_title),m.zb(59),m.tc("$ ",t.purchase_price,""),m.zb(10),m.tc("$ ",t.purchase_price,""),m.zb(10),m.tc("$ ",t.income,""),m.zb(10),m.tc("$ ",t.income,""),m.zb(10),m.tc("$ ",t.share,""),m.zb(10),m.tc("$ ",t.balance,""))},directives:[b.r,s.i,b.i,b.s,b.o,b.e,b.w,b.E,b.n],pipes:[s.d],styles:["ion-content[_ngcontent-%COMP%]{--background:#f5f5f5}ion-header.header[_ngcontent-%COMP%]{background:#f5f5f5}.set_width[_ngcontent-%COMP%]{width:95%;margin-left:2.5%;border-radius:5px;background-color:#fff}.close_btn[_ngcontent-%COMP%], .heading[_ngcontent-%COMP%]{margin-left:15px}.sub-heading[_ngcontent-%COMP%]{font-family:poppins regular;margin-top:10px;text-align:left;width:90%;margin-left:5%}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;width:100%;margin-top:10px}.title[_ngcontent-%COMP%]{font-family:poppins semibold;color:#000;margin-left:15px}.ios_header_css_row[_ngcontent-%COMP%]{padding-top:30px}ion-avatar.prop_img[_ngcontent-%COMP%]{width:96%;margin-left:2%;height:140px;padding-top:10px;--border-radius:5px}.address[_ngcontent-%COMP%]{margin-top:10px;font-size:12px;font-family:poppins italic}.address[_ngcontent-%COMP%], .title_[_ngcontent-%COMP%]{padding-left:15px;padding-right:15px;width:100%}.title_[_ngcontent-%COMP%]{font-family:poppins semibold;font-size:15px;color:var(--ion-color-primary);margin-top:-10px}.row_[_ngcontent-%COMP%]{width:auto;background:var(--ion-color-primary);border-radius:30px;display:flex;flex-direction:row;align-items:center;justify-content:center;max-width:215px;margin-top:12px;height:35px;margin-right:0;padding:0 20px}.row_[_ngcontent-%COMP%], .vertical[_ngcontent-%COMP%]{margin-left:10px}.vertical[_ngcontent-%COMP%]{background:#fff;width:1px;height:20px}.assc[_ngcontent-%COMP%]{font-size:13px;margin-left:5px;padding-top:5px}.assc[_ngcontent-%COMP%], .view_document[_ngcontent-%COMP%]{color:#fff;font-family:poppins regular}.view_document[_ngcontent-%COMP%]{background:var(--ion-color-primary);font-size:14px;text-decoration:none;border:none;width:auto;padding:10px 20px;border-radius:24px;margin-bottom:15px}.documents_sec[_ngcontent-%COMP%]{background-color:#bde7fa;width:100%}.items[_ngcontent-%COMP%]{background-color:var(--ion-color-primary);border-radius:5px;color:#fff;font-family:poppins regular}.download[_ngcontent-%COMP%]{text-align:left;opacity:.7}.row_d[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:space-between;width:90%;margin-left:5%;margin-top:-5px}.name_file[_ngcontent-%COMP%]{color:#fff;font-size:12px;margin-top:-12px;margin-left:12px;margin-right:12px;text-decoration:underline;letter-spacing:.6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.balance_div[_ngcontent-%COMP%]{background:#fff;width:95%;margin-left:2.5%;border:1px solid #dcdcdc;border-radius:10px}.sheet_heading[_ngcontent-%COMP%]{font-family:poppins semibold;color:#000;margin-left:15px;text-align:center}.balance_title[_ngcontent-%COMP%]{text-align:center;margin-top:-2px;padding-left:5px;padding-right:5px;padding-bottom:10px}.balance_title[_ngcontent-%COMP%], .row_sheet[_ngcontent-%COMP%]{border-bottom:1px solid #dcdcdc;margin-left:5%;width:90%}.row_sheet[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:space-between;height:60px;margin-top:-5px}.sheet_inner_heading[_ngcontent-%COMP%]{color:#000;font-family:poppins semibold;font-size:14px;text-align:left}.dot[_ngcontent-%COMP%]{color:var(--ion-color-primary);display:block;margin-left:auto;margin-right:auto;text-align:center}.price[_ngcontent-%COMP%]{color:#909090;font-family:poppins semibold;text-align:right}.active[_ngcontent-%COMP%]{color:var(--ion-color-primary)}"]}),r)}],w=((a=function t(){e(this,t)}).\u0275fac=function(e){return new(e||a)},a.\u0275mod=m.Hb({type:a}),a.\u0275inj=m.Gb({imports:[[l.i.forChild(O)],l.i]}),a),N=((c=function t(){e(this,t)}).\u0275fac=function(e){return new(e||c)},c.\u0275mod=m.Hb({type:c}),c.\u0275inj=m.Gb({imports:[[s.b,p.g,b.U,w]]}),c)}}])}();