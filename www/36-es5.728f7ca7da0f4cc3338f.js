!function(){function i(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}function t(i,t){for(var n=0;n<t.length;n++){var e=t[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(i,e.key,e)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{PQfJ:function(n,e,o){"use strict";o.r(e),o.d(e,"IntroPageModule",function(){return w});var a,s,r,p=o("ofXK"),c=o("3Pt+"),l=o("TEn/"),d=o("tyNb"),g=o("fXoL"),f=o("Sy1n"),h=["slideWithNav"],b=function(i){return{ios_header_css_:i}},m=[{path:"",component:(a=function(){function n(t){i(this,n),this.appcomponent=t,this.slideOptions={initialSlide:0,slidesPerView:1,on:{beforeInit:function(){this.classNames.push("".concat(this.params.containerModifierClass,"flip")),this.classNames.push("".concat(this.params.containerModifierClass,"3d"));var i={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};this.params=Object.assign(this.params,i),this.originalParams=Object.assign(this.originalParams,i)},setTranslate:function(){for(var i=this,t=i.slides,n=i.rtlTranslate,e=0;e<t.length;e+=1){var o=t.eq(e),a=o[0].progress;i.params.flipEffect.limitRotation&&(a=Math.max(Math.min(o[0].progress,1),-1));var s=-180*a,r=0,p=-o[0].swiperSlideOffset,c=0;if(i.isHorizontal()?n&&(s=-s):(c=p,p=0,r=-s,s=0),o[0].style.zIndex=-Math.abs(Math.round(a))+t.length,i.params.flipEffect.slideShadows){var l=i.isHorizontal()?o.find(".swiper-slide-shadow-left"):o.find(".swiper-slide-shadow-top"),d=i.isHorizontal()?o.find(".swiper-slide-shadow-right"):o.find(".swiper-slide-shadow-bottom");0===l.length&&(l=i.$('<div class="swiper-slide-shadow-'.concat(i.isHorizontal()?"left":"top",'"></div>')),o.append(l)),0===d.length&&(d=i.$('<div class="swiper-slide-shadow-'.concat(i.isHorizontal()?"right":"bottom",'"></div>')),o.append(d)),l.length&&(l[0].style.opacity=Math.max(-a,0)),d.length&&(d[0].style.opacity=Math.max(a,0))}o.transform("translate3d(".concat(p,"px, ").concat(c,"px, 0px) rotateX(").concat(r,"deg) rotateY(").concat(s,"deg)"))}},setTransition:function(i){var t=this,n=t.slides,e=t.activeIndex,o=t.$wrapperEl;if(n.transition(i).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(i),t.params.virtualTranslate&&0!==i){var a=!1;n.eq(e).transitionEnd(function(){if(!a&&t&&!t.destroyed){a=!0,t.animating=!1;for(var i=["webkitTransitionEnd","transitionend"],n=0;n<i.length;n+=1)o.trigger(i[n])}})}}}};var e=window.localStorage.getItem("phone-model");this.ios_header="10"==e}var e,o,a;return e=n,(o=[{key:"ngOnInit",value:function(){}},{key:"ionViewDidEnter",value:function(){this.appcomponent.check_platform();var i=window.localStorage.getItem("phone-model");this.ios_header="10"==i}},{key:"move",value:function(){this.appcomponent.leftSlide("allow-location")}}])&&t(e.prototype,o),a&&t(e,a),n}(),a.\u0275fac=function(i){return new(i||a)(g.Jb(f.a))},a.\u0275cmp=g.Db({type:a,selectors:[["app-intro"]],viewQuery:function(i,t){var n;1&i&&g.vc(h,1),2&i&&g.kc(n=g.Xb())&&(t.slideWithNav=n.first)},decls:37,vars:4,consts:[[1,"skip_btn",3,"ngClass","click"],["pager","true",2,"margin-top","60px",3,"options"],["slideWithNav",""],[1,"center"],["src","assets/images/intro/intro1.png",1,"intro_img"],[1,"heading","fade-in"],[1,"sub-heading","fade-in"],["src","assets/images/intro/intro2.png",1,"intro_img"],[1,"heading"],[1,"sub-heading"],["src","assets/images/intro/intro3.png",1,"intro_img"],["src","assets/images/intro/intro4.png",1,"intro_img"],[1,"form_btn","left_rigt","ion-activatable","ripple-parent",3,"click"],["name","arrow-forward-outline"]],template:function(i,t){1&i&&(g.Ob(0,"ion-content"),g.Ob(1,"ion-buttons",0),g.Wb("click",function(){return t.move()}),g.Ob(2,"p"),g.rc(3,"Skip"),g.Nb(),g.Nb(),g.Ob(4,"ion-slides",1,2),g.Ob(6,"ion-slide"),g.Ob(7,"div",3),g.Kb(8,"img",4),g.Ob(9,"p",5),g.rc(10,"Buy or Rent a House"),g.Nb(),g.Ob(11,"p",6),g.rc(12,"Buying or renting a house with Vairt App is as easy as 1,2,3 !"),g.Nb(),g.Nb(),g.Nb(),g.Ob(13,"ion-slide"),g.Ob(14,"div",3),g.Kb(15,"img",7),g.Ob(16,"p",8),g.rc(17,"Streamlined Workflow"),g.Nb(),g.Ob(18,"p",9),g.rc(19,"Easily manage and keep track of all your transactions at one place."),g.Nb(),g.Nb(),g.Nb(),g.Ob(20,"ion-slide"),g.Ob(21,"div",3),g.Kb(22,"img",10),g.Ob(23,"p",8),g.rc(24,"One App, Many Solutions"),g.Nb(),g.Ob(25,"p",9),g.rc(26,"Provides countless opportunities to achieve your goals"),g.Nb(),g.Nb(),g.Nb(),g.Ob(27,"ion-slide"),g.Ob(28,"div",3),g.Kb(29,"img",11),g.Ob(30,"p",8),g.rc(31,"Hassle-free Search"),g.Nb(),g.Ob(32,"p",9),g.rc(33,"Our top of the line search engine provides best possible results to suit your needs on the fly!"),g.Nb(),g.Ob(34,"button",12),g.Wb("click",function(){return t.move()}),g.Kb(35,"ion-icon",13),g.Kb(36,"ion-ripple-effect"),g.Nb(),g.Nb(),g.Nb(),g.Nb(),g.Nb()),2&i&&(g.zb(1),g.fc("ngClass",g.ic(2,b,1==t.ios_header)),g.zb(3),g.fc("options",t.slideOptions))},directives:[l.o,l.i,p.i,l.L,l.K,l.s,l.C],styles:[".center[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.intro_img[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto;width:50%}ion-slide[_ngcontent-%COMP%]{height:80vh}.heading[_ngcontent-%COMP%]{font-size:20px;font-family:poppins bold;letter-spacing:0;margin-top:20px;margin-left:10px;margin-right:10px}.heading[_ngcontent-%COMP%], .sub-heading[_ngcontent-%COMP%]{color:#333;text-align:center}.sub-heading[_ngcontent-%COMP%]{font-size:14px;font-family:poppins regular;margin-top:-10px;width:85%}.submit_btn[_ngcontent-%COMP%]{margin-top:50px;margin-left:0}ion-item.btn_itm[_ngcontent-%COMP%]{width:100%;position:absolute;bottom:0;margin:auto auto 50px}.skip_btn[_ngcontent-%COMP%]{font-family:poppins semibold;float:right;color:var(--ion-color-primary);margin-right:20px;width:50px;margin-top:10px;height:50px}.form_btn[_ngcontent-%COMP%]{width:54px;height:54px;border-radius:50px;margin-top:30px;box-shadow:0 0 10px #ccc}.fade-in[_ngcontent-%COMP%]{-webkit-animation:fadeIn 2s;animation:fadeIn 2s;opacity:1}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}ion-spinner[_ngcontent-%COMP%]{width:20px}.ios_header_css_[_ngcontent-%COMP%]{margin-top:30px;margin-right:20px}"]}),a)}],u=((r=function t(){i(this,t)}).\u0275fac=function(i){return new(i||r)},r.\u0275mod=g.Hb({type:r}),r.\u0275inj=g.Gb({imports:[[d.i.forChild(m)],d.i]}),r),w=((s=function t(){i(this,t)}).\u0275fac=function(i){return new(i||s)},s.\u0275mod=g.Hb({type:s}),s.\u0275inj=g.Gb({imports:[[p.b,c.g,l.U,u]]}),s)}}])}();