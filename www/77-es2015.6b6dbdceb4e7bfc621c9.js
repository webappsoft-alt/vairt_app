(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{"f6+i":function(n,e,t){"use strict";t.r(e),t.d(e,"UpdateBankDetailPageModule",function(){return m});var a=t("ofXK"),i=t("3Pt+"),o=t("TEn/"),s=t("tyNb"),r=t("mrSG"),c=t("fXoL"),l=t("yZrb");function b(n,e){1&n&&c.Kb(0,"ion-spinner")}function d(n,e){1&n&&(c.Ob(0,"span",16),c.rc(1," NEXT "),c.Kb(2,"ion-ripple-effect"),c.Nb())}const h=function(n){return{ios_header_css:n}},g=function(n){return{content_grid_ios:n}},u=[{path:"",component:(()=>{class n{constructor(n,e,t,a){this.toastController=n,this.modalController=e,this.router=t,this.service=a;let i=window.localStorage.getItem("phone-model");this.ios_header="10"==i}ngOnInit(){}ionViewDidEnter(){this.user_id=window.localStorage.getItem("user_id"),this.service.get_bank_detail(this.user_id).subscribe(n=>{console.log(n),this.bank_name=n.bank.bank_name,this.iban=n.bank.iban,this.bank_account=n.bank.account,this.branch_name=n.bank.branch,this.address=n.bank.bank_address,this.holder_name=n.bank.title})}next(){null==this.bank_name?this.showmessage("Please Enter Bank Name"):null==this.iban?this.showmessage("Please Enter IBAN Number"):null==this.branch_name?this.showmessage("Please Enter Branch Name"):null==this.bank_account?this.showmessage("Please Enter Bank Account"):null==this.address?this.showmessage("Please Enter Bank Address"):null==this.holder_name?this.showmessage("Please Enter Account Holder Name"):(this.loading=!0,this.service.update_bank_detail(this.user_id,this.bank_name,this.iban,this.branch_name,this.bank_account,this.address,this.holder_name).subscribe(n=>{console.log(n),this.loading=!1,this.router.navigate(["withdrawl-request"])}))}showmessage(n){return Object(r.a)(this,void 0,void 0,function*(){(yield this.toastController.create({message:n,color:"danger",cssClass:"toast-alert",duration:3e3})).present()})}back(){window.history.back()}}return n.\u0275fac=function(e){return new(e||n)(c.Jb(o.gb),c.Jb(o.X),c.Jb(s.g),c.Jb(l.a))},n.\u0275cmp=c.Db({type:n,selectors:[["app-update-bank-detail"]],decls:23,vars:14,consts:[[1,"background1",2,"position","fixed","width","100%","height","200px",3,"ngClass"],[3,"click"],["name","arrow-back-outline",2,"color","white","font-size","30px"],[1,"heading"],[1,"content_grid","ion-no-padding",3,"ngClass"],[1,"heading",2,"color","black","margin-top","20px"],[1,"sub-heading"],["placeholder","Bank Name",3,"ngModel","ngModelChange"],["placeholder","IBAN / Routing Number ",3,"ngModel","ngModelChange"],["placeholder","Bank Account",3,"ngModel","ngModelChange"],["placeholder","Branch Name",3,"ngModel","ngModelChange"],["type","text","placeholder","Bank Address",3,"ngModel","ngModelChange"],["type","text","placeholder","Bank account holder name",3,"ngModel","ngModelChange"],[1,"form_btn","ion-activatable","ripple-parent",3,"click"],[4,"ngIf"],["class","submit-txt",4,"ngIf"],[1,"submit-txt"]],template:function(n,e){1&n&&(c.Ob(0,"ion-content"),c.Ob(1,"ion-grid",0),c.Kb(2,"br"),c.Ob(3,"ion-buttons",1),c.Wb("click",function(){return e.back()}),c.Kb(4,"ion-icon",2),c.Nb(),c.Ob(5,"h4",3),c.rc(6,"Bank Detail"),c.Nb(),c.Nb(),c.Ob(7,"ion-grid",4),c.Ob(8,"h4",5),c.rc(9,"Withdraw Confirmation Detail "),c.Nb(),c.Ob(10,"p",6),c.rc(11,"Please update bank details from which you want to make transactions."),c.Nb(),c.Ob(12,"ion-input",7),c.Wb("ngModelChange",function(n){return e.bank_name=n}),c.Nb(),c.Ob(13,"ion-input",8),c.Wb("ngModelChange",function(n){return e.iban=n}),c.Nb(),c.Ob(14,"ion-input",9),c.Wb("ngModelChange",function(n){return e.bank_account=n}),c.Nb(),c.Ob(15,"ion-input",10),c.Wb("ngModelChange",function(n){return e.branch_name=n}),c.Nb(),c.Ob(16,"ion-input",11),c.Wb("ngModelChange",function(n){return e.address=n}),c.Nb(),c.Ob(17,"ion-input",12),c.Wb("ngModelChange",function(n){return e.holder_name=n}),c.Nb(),c.Ob(18,"button",13),c.Wb("click",function(){return e.next()}),c.qc(19,b,1,0,"ion-spinner",14),c.qc(20,d,3,0,"span",15),c.Nb(),c.Kb(21,"br"),c.Kb(22,"br"),c.Nb(),c.Nb()),2&n&&(c.zb(1),c.fc("ngClass",c.ic(10,h,1==e.ios_header)),c.zb(6),c.fc("ngClass",c.ic(12,g,1==e.ios_header)),c.zb(5),c.fc("ngModel",e.bank_name),c.zb(1),c.fc("ngModel",e.iban),c.zb(1),c.fc("ngModel",e.bank_account),c.zb(1),c.fc("ngModel",e.branch_name),c.zb(1),c.fc("ngModel",e.address),c.zb(1),c.fc("ngModel",e.holder_name),c.zb(2),c.fc("ngIf",e.loading),c.zb(1),c.fc("ngIf",!e.loading))},directives:[o.o,o.q,a.i,o.i,o.s,o.v,o.fb,i.j,i.m,a.k,o.M,o.C],styles:[".heading[_ngcontent-%COMP%]{font-family:poppins semibold;text-align:center;color:#fff;font-size:16px;width:80%;margin-left:10%;margin-top:-20px}.sub-heading[_ngcontent-%COMP%]{color:#000;font-family:poppins regular;text-align:center;margin-top:0;font-size:10px}.sub-heading[_ngcontent-%COMP%], ion-input[_ngcontent-%COMP%]{width:90%;margin-left:5%}ion-input[_ngcontent-%COMP%], ion-textarea[_ngcontent-%COMP%]{border:1px solid #dcdcdc;--padding-start:10px;margin-top:20px}ion-textarea[_ngcontent-%COMP%]{width:90%;margin-left:5%}.form_btn[_ngcontent-%COMP%]{width:50%;height:40px;margin-left:25%;margin-top:20px}.ios_header_css[_ngcontent-%COMP%]{padding-top:20px;padding-left:10px}"]}),n})()}];let p=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=c.Hb({type:n}),n.\u0275inj=c.Gb({imports:[[s.i.forChild(u)],s.i]}),n})(),m=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=c.Hb({type:n}),n.\u0275inj=c.Gb({imports:[[a.b,i.g,o.U,p]]}),n})()}}]);