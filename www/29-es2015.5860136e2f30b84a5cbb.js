(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{Y4X5:function(n,t,e){"use strict";e.r(t),e.d(t,"ExitInvestmentPageModule",function(){return h});var i=e("ofXK"),o=e("3Pt+"),r=e("TEn/"),s=e("tyNb"),a=e("fXoL"),b=e("yZrb");function c(n,t){1&n&&a.Kb(0,"ion-spinner")}function g(n,t){1&n&&(a.Ob(0,"span",18),a.rc(1," NEXT "),a.Kb(2,"ion-ripple-effect"),a.Nb())}const l=function(n){return{ios_header_css:n}},p=[{path:"",component:(()=>{class n{constructor(n,t){this.router=n,this.service=t,this.high_risk="1",this.name=window.localStorage.getItem("full_name"),this.user_id=window.localStorage.getItem("user_id");let e=window.localStorage.getItem("phone-model");this.ios_header="10"==e}ngOnInit(){}next(){this.service.exit_investment(this.user_id,this.high_risk).subscribe(n=>{console.log(n)}),this.router.navigate(["current-income"])}}return n.\u0275fac=function(t){return new(t||n)(a.Jb(s.g),a.Jb(b.a))},n.\u0275cmp=a.Db({type:n,selectors:[["app-exit-investment"]],decls:40,vars:7,consts:[[1,"background1",2,"position","fixed","width","100%",3,"ngClass"],["src","assets/images/exit_invest.png","width","50",1,"center"],[1,"heading"],[1,"sub-heading"],[1,"content_grid","ion-no-padding"],[1,"margin"],[1,"title"],[3,"ngModel","ngModelChange"],[1,"ion-no-padding"],["size","1"],["value","1","mode","md"],["size","11"],[1,"txt"],["value","2","mode","md"],["value","3","mode","md"],[1,"form_btn","ion-activatable","ripple-parent",3,"click"],[4,"ngIf"],["class","submit-txt",4,"ngIf"],[1,"submit-txt"]],template:function(n,t){1&n&&(a.Ob(0,"ion-content"),a.Ob(1,"ion-grid",0),a.Kb(2,"br"),a.Kb(3,"img",1),a.Kb(4,"br"),a.Ob(5,"h4",2),a.rc(6),a.Nb(),a.Ob(7,"p",3),a.rc(8,"Please indicate what investments you would be comfortable with. Select all that apply."),a.Nb(),a.Nb(),a.Ob(9,"ion-grid",4),a.Ob(10,"ion-grid",5),a.Kb(11,"br"),a.Ob(12,"p",6),a.rc(13,"What would you need to exit this investment?"),a.Nb(),a.Ob(14,"ion-radio-group",7),a.Wb("ngModelChange",function(n){return t.high_risk=n}),a.Ob(15,"ion-row",8),a.Ob(16,"ion-col",9),a.Kb(17,"ion-radio",10),a.Nb(),a.Ob(18,"ion-col",11),a.Ob(19,"p",12),a.rc(20,"A high risk investment for a high potential return"),a.Nb(),a.Nb(),a.Nb(),a.Ob(21,"ion-row",8),a.Ob(22,"ion-col",9),a.Kb(23,"ion-radio",13),a.Nb(),a.Ob(24,"ion-col",11),a.Ob(25,"p",12),a.rc(26,"A moderate risk investment for a moderate potential return"),a.Nb(),a.Nb(),a.Nb(),a.Ob(27,"ion-row",8),a.Ob(28,"ion-col",9),a.Kb(29,"ion-radio",14),a.Nb(),a.Ob(30,"ion-col",11),a.Ob(31,"p",12),a.rc(32,"A low risk investment for a low potential return"),a.Nb(),a.Nb(),a.Nb(),a.Nb(),a.Nb(),a.Kb(33,"br"),a.Kb(34,"br"),a.Ob(35,"button",15),a.Wb("click",function(){return t.next()}),a.qc(36,c,1,0,"ion-spinner",16),a.qc(37,g,3,0,"span",17),a.Nb(),a.Kb(38,"br"),a.Kb(39,"br"),a.Nb(),a.Nb()),2&n&&(a.zb(1),a.fc("ngClass",a.ic(5,l,1==t.ios_header)),a.zb(5),a.tc(" ",t.name," ! You're more helpful than you realize"),a.zb(8),a.fc("ngModel",t.high_risk),a.zb(22),a.fc("ngIf",t.loading),a.zb(1),a.fc("ngIf",!t.loading))},directives:[r.o,r.q,i.i,r.B,r.eb,o.j,o.m,r.E,r.n,r.A,r.cb,i.k,r.M,r.C],styles:[".heading[_ngcontent-%COMP%]{font-family:poppins semibold;font-size:16px;width:80%;margin-left:10%}.heading[_ngcontent-%COMP%], .sub-heading[_ngcontent-%COMP%]{text-align:center;color:#fff}.sub-heading[_ngcontent-%COMP%]{font-family:poppins regular;margin-top:-7px;font-size:10px;width:90%;margin-left:5%}.sub-heading1[_ngcontent-%COMP%]{color:#666;font-family:poppins semibold;margin-top:-3px;margin-left:0}.txt[_ngcontent-%COMP%]{font-family:poppins regular;margin-top:-5px;color:#68686a;font-size:14px}ion-radio[_ngcontent-%COMP%]{width:16px;height:16px;--border-width:1px}.margin[_ngcontent-%COMP%]{width:92%;margin-left:4%}.background1[_ngcontent-%COMP%]{height:250px}.content_grid[_ngcontent-%COMP%]{margin-top:230px}ion-content[_ngcontent-%COMP%]{--overflow:hidden}.title[_ngcontent-%COMP%]{color:#666;font-size:14px;margin-left:15px;margin-right:20px;font-family:poppins semibold}.ios_header_css[_ngcontent-%COMP%]{padding-top:20px}"]}),n})()}];let d=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=a.Hb({type:n}),n.\u0275inj=a.Gb({imports:[[s.i.forChild(p)],s.i]}),n})(),h=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=a.Hb({type:n}),n.\u0275inj=a.Gb({imports:[[i.b,o.g,r.U,d]]}),n})()}}]);