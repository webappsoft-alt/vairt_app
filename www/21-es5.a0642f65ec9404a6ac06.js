!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{lH0F:function(e,o,i){"use strict";i.r(o),i.d(o,"CitizenshipPageModule",function(){return x});var r=i("ofXK"),c=i("3Pt+"),a=i("TEn/"),s=i("tyNb"),l=i("mrSG"),u=i("ESec"),p=i("QMr4"),d=i("fXoL"),g=i("yZrb");function f(n,t){1&n&&d.Kb(0,"ion-spinner")}function b(n,t){1&n&&(d.Ob(0,"span",13),d.rc(1," NEXT "),d.Kb(2,"ion-ripple-effect"),d.Nb())}var m,h,_,y=function(n){return{ios_header_css:n}},w=[{path:"",component:(m=function(){function e(t,o,i,r){n(this,e),this.formBuilder=t,this.router=o,this.service=i,this.modalController=r,this.validation_messages={citizenship:[{type:"required",message:"Citizenship is required."}]},this.country_name=window.localStorage.getItem("country_name"),this.country_name=null==this.country_name?"United States":window.localStorage.getItem("country_name");var c=window.localStorage.getItem("phone-model");this.ios_header="10"==c}var o,i,r;return o=e,(i=[{key:"ngOnInit",value:function(){this.validations_form=this.formBuilder.group({citizenship:new c.b("",c.o.required)})}},{key:"countryList",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function n(){var t,e=this;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.modalController.create({component:u.a,cssClass:"country_list"});case 2:return(t=n.sent).onDidDismiss().then(function(n){console.log(n),null!=n.data&&(e.country_name=n.data.country_name),e.code=n.data.code}),n.next=6,t.present();case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}},n,this)}))}},{key:"why_ask",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark(function n(){var t,e=this;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.modalController.create({component:p.a,cssClass:"half_model"});case 2:return(t=n.sent).onDidDismiss().then(function(n){console.log(n),null!=n.data&&(e.country_name=n.data.country_name),e.code=n.data.code}),n.next=6,t.present();case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}},n,this)}))}},{key:"verify",value:function(){this.user_id=window.localStorage.getItem("user_id"),console.log(this.country_name),console.log(this.user_id),this.service.citizenship(this.user_id,this.code).subscribe(function(n){console.log(n)}),this.router.navigate(["address"])}}])&&t(o.prototype,i),r&&t(o,r),e}(),m.\u0275fac=function(n){return new(n||m)(d.Jb(c.a),d.Jb(s.g),d.Jb(g.a),d.Jb(a.X))},m.\u0275cmp=d.Db({type:m,selectors:[["app-citizenship"]],decls:22,vars:6,consts:[[1,"background1",2,"position","fixed","width","100%",3,"ngClass"],["src","assets/images/citizenship.png","width","50",1,"center"],[1,"heading"],[1,"sub-heading"],[1,"content_grid"],[2,"width","95%","margin-left","2.5%"],[1,"lbl"],["lines","none",1,"item",3,"click"],["name","caret-down-outline","slot","end"],[1,"form_btn","ion-activatable","ripple-parent",3,"click"],[4,"ngIf"],["class","submit-txt",4,"ngIf"],[1,"bottom_txt",2,"text-align","center",3,"click"],[1,"submit-txt"]],template:function(n,t){1&n&&(d.Ob(0,"ion-content"),d.Ob(1,"ion-grid",0),d.Kb(2,"br"),d.Kb(3,"img",1),d.Ob(4,"h4",2),d.rc(5,"Hi Micheal "),d.Kb(6,"br"),d.rc(7," Let's start with where you're from."),d.Nb(),d.Ob(8,"p",3),d.rc(9,"You are on your way of making Smart investments and seeing your wealth grow! Before we begin, we'd like to get to know you better."),d.Nb(),d.Nb(),d.Ob(10,"ion-grid",4),d.Ob(11,"form",5),d.Ob(12,"p",6),d.rc(13,"Citizenship *"),d.Nb(),d.Ob(14,"ion-item",7),d.Wb("click",function(){return t.countryList()}),d.rc(15),d.Kb(16,"ion-icon",8),d.Nb(),d.Ob(17,"button",9),d.Wb("click",function(){return t.verify()}),d.qc(18,f,1,0,"ion-spinner",10),d.qc(19,b,3,0,"span",11),d.Nb(),d.Ob(20,"p",12),d.Wb("click",function(){return t.why_ask()}),d.rc(21,"Why we ask"),d.Nb(),d.Nb(),d.Nb(),d.Nb()),2&n&&(d.zb(1),d.fc("ngClass",d.ic(4,y,1==t.ios_header)),d.zb(14),d.tc(" ",t.country_name," "),d.zb(3),d.fc("ngIf",t.loading),d.zb(1),d.fc("ngIf",!t.loading))},directives:[a.o,a.q,r.i,c.p,c.k,c.l,a.w,a.s,r.k,a.M,a.C],styles:[".heading[_ngcontent-%COMP%]{font-family:poppins semibold;font-size:16px;width:80%;margin-left:10%}.heading[_ngcontent-%COMP%], .sub-heading[_ngcontent-%COMP%]{text-align:center;color:#fff}.sub-heading[_ngcontent-%COMP%]{font-family:poppins regular;margin-top:-7px;font-size:10px;width:90%;margin-left:5%}ion-content[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:space-between;flex-direction:column;--overflow:hidden}ion-input[_ngcontent-%COMP%]{--padding-start:10px;border:1px solid silver;height:42px}.lbl[_ngcontent-%COMP%], ion-input[_ngcontent-%COMP%]{font-family:poppins regular}.lbl[_ngcontent-%COMP%]{color:#68686a}.error-message[_ngcontent-%COMP%]{color:var(--ion-color-danger);font-family:poppins regular;border:1px solid var(--ion-color-danger)}.error-message1[_ngcontent-%COMP%]{font-family:poppins semibold;color:var(--ion-color-danger)}.ion-activatable[_ngcontent-%COMP%]{width:100%;height:50px;margin-top:30px;font-size:18px;font-weight:500}.bottom[_ngcontent-%COMP%]{width:100%;height:auto;position:absolute;bottom:7px;left:0;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:0 20px}.bottom[_ngcontent-%COMP%], .bottom_txt[_ngcontent-%COMP%]{font-family:poppins regular}.bottom_txt[_ngcontent-%COMP%]{cursor:pointer;color:var(--ion-color-primary);text-decoration:none;outline:none}.background1[_ngcontent-%COMP%]{height:250px}.content_grid[_ngcontent-%COMP%]{margin-top:230px}ion-item.item[_ngcontent-%COMP%]{font-family:poppins regular;border:1px solid silver}ion-icon[_ngcontent-%COMP%]{font-size:16px;color:silver}.ios_header_css[_ngcontent-%COMP%]{padding-top:20px}"]}),m)}],v=((_=function t(){n(this,t)}).\u0275fac=function(n){return new(n||_)},_.\u0275mod=d.Hb({type:_}),_.\u0275inj=d.Gb({imports:[[s.i.forChild(w)],s.i]}),_),x=((h=function t(){n(this,t)}).\u0275fac=function(n){return new(n||h)},h.\u0275mod=d.Hb({type:h}),h.\u0275inj=d.Gb({imports:[[r.b,c.g,a.U,c.n,v]]}),h)}}])}();