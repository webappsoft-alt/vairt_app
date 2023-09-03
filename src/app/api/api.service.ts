import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers,RequestOptions } from '@angular/http';
import { map, retry } from 'rxjs/operators';
import { LoadingController,ToastController,AlertController  } from '@ionic/angular';
import { Observable,Subscription } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  link:any;
  registerData:any=[];
  providerDetail:any=[];
  properties:any=[];
  i=0;
  interest_:any
  unseen_count_:any
  transaction:any=[]
  flip_property:any=[]
  flip_transaction:any=[]
  invest_data_:any=[]
  balance_:any
  top_up:any
  top_down:any
  invest_fund:any
  active_status:any
  ticket_view:any
  pie_value:any
  inves_trans_detail_data:any=[]
  page_name:any
  profile_data:any
  purchase_data:any
  profile_back:any
  invest_back:any
  detail_page:any
  setting_page:any
  properties_page:any
  inves_status:any
  fcmData:any
  purchase_complete_data:any
  set_invest:any
  constructor( private router:
    Router,public http: Http,
    public loadingController: LoadingController,
    public toastController:ToastController,
    ) { 
       //this.link = 'https://vairt.com/vairt_api/api.php';
       //  this.link = 'https://vairt.com/cfund/vairt_api/api.php'
         this.link = 'https://propuae.com/vairt/vairt_api/api.php'
    }
    
    login(email,password):Observable<any[]>{
      let postData = new FormData();
      postData.append('type','login');
      postData.append('email',email)
      postData.append('password',password)
      return this.http.post(this.link,postData).pipe(map(res=>res.json()))
    }

    send_otp(phone,smsHash):Observable<any[]>{
      let postData = new FormData();
      postData.append('type','send_otp');
      postData.append('phone',phone)
      postData.append('hash',smsHash)
      return this.http.post(this.link,postData).pipe(map(res=>res.json()))
    }
    // resend_otp(phone,hash):Observable<any[]>{
    //   let postData = new FormData();
    //   postData.append('type','resend_otp');
    //   postData.append('phone',phone)
    //   postData.append('hash',hash)
    //   return this.http.post(this.link,postData).pipe(map(res=>res.json()))
    // }
    username_avai(username){
      let postData = new FormData();
      postData.append('type','check_username');
      postData.append('username',username)
      return this.http.post(this.link,postData).pipe(map(res=>res.json()))
    }
    register(first_name,last_name,dob,password,email,phone,address):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','register');
    postData.append('password',password);
    postData.append('first_name',first_name);
    postData.append('last_name',last_name);
    postData.append('email',email);
    postData.append('dob',dob);
    postData.append('phone',phone);
    postData.append('address',address);
   return this.http.post(this.link,postData).pipe(map(res=>res.json()))
}
update_mothername(user_id,name):Observable<any[]>{
  let postData = new FormData();
    postData.append('type','update_mothername');
    postData.append('user_id',user_id);
    postData.append('mothername',name);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
}
citizenship(user_id,code):Observable<any[]>{
  let postData = new FormData();
    postData.append('type','citizenship');
    postData.append('user_id',user_id);
    postData.append('citizenship',code);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
}

address(user_id,user_address,city,state,postalCode):Observable<any[]>{
  let postData = new FormData();
    postData.append('type','address');
    postData.append('user_id',user_id);
    postData.append('user_address',user_address);
    postData.append('city',city);
    postData.append('state',state);
    postData.append('postalCode',postalCode);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
} 
account_type(user_id,acc_type):Observable<any[]>{
  let postData = new FormData();
    postData.append('type','account_type');
    postData.append('user_id',user_id);
    postData.append('acc_type',acc_type);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
} 
investment_type(user_id,inves_type):Observable<any[]>{
  let postData = new FormData();
  postData.append('type','investment_type');
  postData.append('inves_type',inves_type);
  postData.append('user_id',user_id);
  return this.http.post(this.link,postData).pipe(map(res=>res.json()))
}
level_expierence(stocks,bonds,equity,capital,business,real_estate,user_id):Observable<any[]>{
  let postData = new FormData();
  postData.append('type','level_expierence');
  postData.append('stocks',stocks);
  postData.append('bonds',bonds);
  postData.append('equity',equity);
  postData.append('capital',capital);
  postData.append('business',business);
  postData.append('real_estate',real_estate);
  postData.append('user_id',user_id);
  return this.http.post(this.link,postData).pipe(map(res=>res.json()))
}

when_exit_investment(user_id,investment,comfort):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','when_exit_investment');
    postData.append('investment',investment);
    postData.append('comfort',comfort);
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  exit_investment(user_id,risk):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','exit_investment');
    postData.append('risk',risk);
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  current_income(user_id,income,worth):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','current_income');
    postData.append('user_id',user_id);
    postData.append('income',income);
    postData.append('worth',worth);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  employment_info_self(user_id,employment_status,business_name,your_title,business_type,status):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','employment_info_self');
    postData.append('user_id',user_id)
    postData.append('employment_status',employment_status)
    postData.append('business_name',business_name)
    postData.append('your_title',your_title)
    postData.append('business_type',business_type)
    postData.append('status',status)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  employment_info_student(user_id,school,source_income,status):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','employment_info_student');
    postData.append('user_id',user_id)
    postData.append('school',school)
    postData.append('source_income',source_income)
    postData.append('status',status)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  employment_info_retired(user_id,recent_employer,position_held,business_type,source_income,status):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','employment_info_retired');
    postData.append('user_id',user_id)
    postData.append('recent_employer',recent_employer)
    postData.append('position_held',position_held)
    postData.append('business_type',business_type)
    postData.append('source_income',source_income)
    postData.append('status',status)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  employment_info_not_employed(user_id,source_income,status):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','employment_info_not_employed');
    postData.append('user_id',user_id)
    postData.append('source_income',source_income)
    postData.append('status',status)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  identity_photos(front_img,back_img,id_type,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','identity_photos');
    postData.append('user_id',user_id)
    postData.append('front_img',front_img)
    postData.append('back_img',back_img)
    postData.append('id_type',id_type)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  identity_photos_front(front_img,id_type,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','identity_photos_front');
    postData.append('user_id',user_id)
    postData.append('front_img',front_img)
    postData.append('id_type',id_type)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  property_list(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','property_list');
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  add_item_wishlist(user_id,id,type):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','add_item_wishlist');
    postData.append('user_id',user_id)
    postData.append('property_id',id)
    postData.append('prop_type',type)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  remove_item_wishlist(user_id,id,type):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','remove_item_wishlist');
    postData.append('user_id',user_id)
    postData.append('property_id',id)
    postData.append('prop_type',type)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  flip_property_list(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','flip_property_list');
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  load_more_flip(last_ids,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','flip_property_list');
    postData.append('last_id',last_ids)
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  load_more_residual(last_ids,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','property_list');
    postData.append('last_id',last_ids);
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  setPropertyDetail(properties,transaction){
    this.properties = properties
    this.transaction = transaction
  }
  getPropertyDetail(){
    return this.properties
  }
  getTransaction(){
    return this.transaction
  }
  invest_cal(id,initial_invest,expected_apprication):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','calculator_investment');
    postData.append('id',id)
    postData.append('initial_investment',initial_invest)
    postData.append('expected_apprication',expected_apprication)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  apprication_cal(id,expected_apprication,initial_invest):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','calculator_investment');
    postData.append('id',id)
    postData.append('initial_investment',initial_invest)
    postData.append('expected_apprication',expected_apprication)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  invest_data(data){
    this.invest_data_ = data;
  }
  getInvestdata(){
    return this.invest_data_
  }
  get_user_data(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_user_data');
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_user(first_name,last_name,country,city,phone,zip,address,user_id,
    acc_type):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_user');
    postData.append('user_id',user_id)
    postData.append('first_name',first_name)
    postData.append('last_name',last_name)
    postData.append('country',country)
    postData.append('city',city)
    postData.append('phone',phone)
    postData.append('zip',zip)
    postData.append('address',address)
    postData.append('acc_type',acc_type)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  get_user_invest_detail(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_user_invest_detail');
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_user_invest_detail(user_id,amount,distribution,verification):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_user_invest_detail');
    postData.append('user_id',user_id)
    postData.append('amount',amount)
    postData.append('distribution',distribution)
    postData.append('verification',verification)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_user_invest_tell(user_id,reason):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_user_invest_tell');
    postData.append('user_id',user_id)
    postData.append('reason',reason)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  
  cancel_invest(prop_id,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','cancel_invest');
    postData.append('prop_id',prop_id)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  setFlipDetail(property,transacion){
    this.flip_property = property
  }
  getFlipDetail(){
    return this.flip_property
  }
  profile(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','profile');
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_profile(user_id,first_name,last_name,phone,address,zip_code,pic,
    state,city,country):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_profile');
    postData.append('user_id',user_id)
    postData.append('first_name',first_name)
    postData.append('last_name',last_name)
    postData.append('phone',phone)
    postData.append('address',address)
    postData.append('zip_code',zip_code)
    postData.append('pic',pic)
    postData.append('state',state)
    postData.append('city',city)
    postData.append('country',country)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
   balance(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','available_balance');
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  
  setBalance(balance){
    this.balance_ = balance
  }

  getBalance(){
    return this.balance_
  }

  setTopUp(topup){
    this.top_up = topup
  }

  getTopUp(){
    return this.top_up
  }

  setTopDown(topdonw){
    this.top_down = topdonw
  }

  getTopDown(){
    return this.top_down
  }

  user_invest(user_id,prop_id,first_name,last_name,phone,address,zipcode,seller_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_investment');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('first_name',first_name)
    postData.append('last_name',last_name)
    postData.append('phone',phone)
    postData.append('address',address)
    postData.append('zip',zipcode)
    postData.append('seller_id',seller_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  user_invest2(user_id,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_invest2');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  user_invest3(user_id,investment_amount,amount,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_invest3');
    postData.append('user_id',user_id)
    postData.append('investment_amount',investment_amount)
    postData.append('share_amount',amount)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  user_invest4(user_id,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_invest4');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  user_invest5(user_id,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_invest5');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  user_invest6(user_id,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_invest6');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  user_invest7(user_id,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_invest7');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  user_invest8(user_id,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_invest8');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  user_invest9(user_id,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_invest9');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  user_invest10(user_id,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_invest10');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  my_investments(user_id,last_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','my_investments');
    postData.append('user_id',user_id)
    postData.append('last_id',last_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))

  }

  update_invest(user_id,prop_id,invoice_id,stage):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_invest');
    postData.append('user_id',user_id)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    postData.append('stage',stage)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  
  cancel_invoice_invest(invoice_id,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','cancel_invoice_invest');
    postData.append('invoice_id',invoice_id)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  account_type_trust(user_id,trust_name,trust_title,trust_type,tin,tin_select,doc_later):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','account_type_trust');
    postData.append('trust_name',trust_name)
    postData.append('tin',tin)
    postData.append('trust_title',trust_title)
    postData.append('trust_type',trust_type)
    postData.append('tin_select',tin_select)
    postData.append('doc_later',doc_later)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  account_type_entity(user_id,entity_name,entity_title,entity_type,doc_later):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','account_type_entity');
    postData.append('entity_name',entity_name)
    postData.append('entity_title',entity_title)
    postData.append('entity_type',entity_type)
    postData.append('doc_later',doc_later)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  joint_account_type(user_id,joint_owner,first_name,last_name,
    joint_inv_address,joint_phone_no,country,address,
    state,postalCode):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','joint_account_type');
    postData.append('joint_owner',joint_owner)
    postData.append('first_name',first_name)
    postData.append('last_name',last_name)
    postData.append('joint_inv_address',joint_inv_address)
    postData.append('phone_no',joint_phone_no)
    postData.append('country',country)
    postData.append('address',address)
    postData.append('state',state)
    postData.append('postal_code',postalCode)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  retirement_type(value,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','retirement_type');
    postData.append('value',value)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  get_trust_type(user_id,prop_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_trust_type');
    postData.append('prop_id',prop_id)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  get_retirement_type(user_id,prop_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_retirement_type');
    postData.append('prop_id',prop_id)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  get_joint_type(user_id,prop_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_joint_type');
    postData.append('prop_id',prop_id)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_type_trust(user_id,trust_name,trust_title,trust_type,tin,tin_select,doc_later):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_type_trust');
    postData.append('trust_name',trust_name)
    postData.append('tin',tin)
    postData.append('trust_title',trust_title)
    postData.append('trust_type',trust_type)
    postData.append('tin_select',tin_select)
    postData.append('doc_later',doc_later)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  update_type_entity(user_id,entity_name,entity_title,entity_type,doc_later):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_type_entity');
    postData.append('entity_name',entity_name)
    postData.append('entity_title',entity_title)
    postData.append('entity_type',entity_type)
    postData.append('doc_later',doc_later)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  update_retirement_type(value,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_retirement_type');
    postData.append('value',value)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_joint_type(user_id,joint_owner,first_name,last_name,
    joint_inv_address,joint_phone_no,country,address,
    state,postalCode):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_joint_type');
    postData.append('joint_owner',joint_owner)
    postData.append('first_name',first_name)
    postData.append('last_name',last_name)
    postData.append('joint_inv_address',joint_inv_address)
    postData.append('phone_no',joint_phone_no)
    postData.append('country',country)
    postData.append('address',address)
    postData.append('state',state)
    postData.append('postal_code',postalCode)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  user_phone(user_id,phone):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','user_phone');
    postData.append('user_id',user_id)
    postData.append('phone',phone)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  get_employment_info(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_employment_info');
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  update_user_address(address,country,city,state,zip,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_user_address');
    postData.append('user_id',user_id)
    postData.append('address',address)
    postData.append('country',country)
    postData.append('city',city)
    postData.append('state',state)
    postData.append('zip',zip)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  update_user_data(user_id,first_name,last_name,phone_no,country,address,city,zip,ssn_number):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_user_data');
    postData.append('user_id',user_id)
    postData.append('address',address)
    postData.append('country',country)
    postData.append('city',city)
    postData.append('first_name',first_name)
    postData.append('last_name',last_name)
    postData.append('phone_no',phone_no)
    postData.append('ssn_number',ssn_number)
    postData.append('zip',zip)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  get_identity(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_identity');
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  
  update_identity_photos_front(front_img,type,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_identity_photos_front');
    postData.append('front_img',front_img)
    postData.append('iden_type',type)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  update_identity_photos(front_img,back_img,type,user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_identity_photos');
    postData.append('front_img',front_img)
    postData.append('back_img',back_img)
    postData.append('iden_type',type)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  get_region():Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_region');
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  deposit_req(user_id,amount,region):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','deposit_req');
    postData.append('user_id',user_id);
    postData.append('amount',amount);
    postData.append('region',region);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  deposit_inst(deposit_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','deposit_inst');
    postData.append('deposit_id',deposit_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  bank_detail(deposit_id,user_id,bank_name,account_name,bank_address,country,account_no,detail):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','bank_detail');
    postData.append('user_id',user_id);
    postData.append('bank_name',bank_name);
    postData.append('account_name',account_name);
    postData.append('bank_address',bank_address);
    postData.append('country',country);
    postData.append('account_no',account_no);
    postData.append('detail',detail);
    postData.append('deposit_id',deposit_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
 
  back_invest_fund(value){
    this.invest_fund = value
  }
  get_back_invest_fund(){
    return this.invest_fund
  }
  pledge_change(prop_id,value):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','pledge_change');
    postData.append('prop_id',prop_id);
    postData.append('value',value);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  add_user_transaction(user_id,invest_amount,curr_date,curr_time,net_dividend,prop_id,invoice_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','add_user_transaction');
    postData.append('user_id',user_id);
    postData.append('invest_amount',invest_amount);
    postData.append('curr_date',curr_date)
    postData.append('curr_time',curr_time)
    postData.append('net_dividend',net_dividend)
    postData.append('prop_id',prop_id)
    postData.append('invoice_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  check_account_activation(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','check_account_activation');
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  setActiveStatus(res){
    this.active_status = res
  }
  getActiveStatus(){
    return this.active_status
  }
  update_account_type(acc_type,user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','update_account_type');
    postData.append('user_id',user_id)
    postData.append('acc_type',acc_type)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  signup_email(user_id):Observable<[]>{
    let postData = new FormData();
    let link="https://vairt.com/cfund/Api_Manager/send_emails/signup/"+user_id
    return this.http.post(link,postData).pipe(map(res=>res.json()))
  }
  kyc_email(user_id):Observable<[]>{
    let postData = new FormData();
    let link="https://vairt.com/cfund/Api_Manager/send_emails/kyc_completion/"+user_id
    return this.http.post(link,postData).pipe(map(res=>res.json()))
  }
  update_password(user_id,cur_password,new_pass):Observable<[]>{
    let postData = new FormData();
    postData.append('type','update_password')
    postData.append('user_id',user_id)
    postData.append('curr_pass',cur_password)
    postData.append('new_pass',new_pass)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_phone(user_id,phone):Observable<[]>{
    let postData = new FormData();
    postData.append('type','update_phone')
    postData.append('user_id',user_id)
    postData.append('phone',phone)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  gen_qr_code(user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','gen_qr_code')
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  google_auth(secret,code,user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','authenticate')
    postData.append('secret',secret)
    postData.append('code',code)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  google_auth_on(code,user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','google_auth_on')
    postData.append('code',code)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  google_auth_login(user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','google_auth_login')
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  set_security(user_id,column,value):Observable<[]>{
    let postData = new FormData();
    postData.append('type','set_security')
    postData.append('user_id',user_id)
    postData.append('column',column)
    postData.append('value',value)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  get_security(user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','get_security')
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  login_email(user_id):Observable<[]>{
    let postData = new FormData();
    let link="https://vairt.com/cfund/Api_Manager/send_emails/signin/"+user_id
    return this.http.post(link,postData).pipe(map(res=>res.json()))
  }
  purchase_success(user_id):Observable<[]>{
    let postData = new FormData();
    let link="https://vairt.com/cfund/Api_Manager/send_emails/purchase_success/"+user_id
    return this.http.post(link,postData).pipe(map(res=>res.json()))
  }
  add_ticket(user_id,help_with,title,priority,description,image):Observable<[]>{
    let postData = new FormData();
    postData.append('type','add_ticket')
    postData.append('user_id',user_id)
    postData.append('help_with',help_with)
    postData.append('title',title)
    postData.append('priority',priority)
    postData.append('description',description)
    postData.append('image',image)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  get_tickets(user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','get_tickets')
    postData.append('user_id',user_id) 
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  setSupportView(tickets){
    this.ticket_view = tickets
  }
  getSupportView(){
    return this.ticket_view
  }
  support_comment(support_id,user_id,comment,name,datetime):Observable<[]>{
    let postData = new FormData();
    postData.append('type','support_comment')
    postData.append('support_id',support_id)
    postData.append('comment',comment)
    postData.append('name',name)
    postData.append('datetime',datetime) 
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  get_support_comment(support_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','get_support_comment')
    postData.append('support_id',support_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  check_email(email):Observable<[]>{
    let postData = new FormData();
    postData.append('type','check_email')
    postData.append('email',email)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  set_page_trans(value){
    this.pie_value = value
  }
  get_page_trans(){
    return this.pie_value
  }
  get_bank_detail(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_bank_detail');
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_bank_detail(user_id,bank_name,iban,branch_name,bank_account,address,holder_name):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_bank_detail');
    postData.append('user_id',user_id);
    postData.append('bank_name',bank_name);
    postData.append('iban',iban);
    postData.append('branch_name',branch_name);
    postData.append('bank_account',bank_account);
    postData.append('address',address);
    postData.append('holder_name',holder_name);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  get_active_inves(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_active_inves');
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  get_pending_inves(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_pending_inves');
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }

  inves_trans_detail(array){
    this.inves_trans_detail_data = array
  }
  get_inves_trans_detail(){
    return this.inves_trans_detail_data
  }
  get_transaction(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','get_transaction');
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  get_all_transaction(user_id,last_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','all_transaction');
    postData.append('user_id',user_id);
    postData.append('last_id',last_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  total_gains(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','total_gains');
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  my_properties(user_id):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','my_properties');
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  save_refferal(user_id,refferal):Observable<any[]>{
    let postData = new FormData();
    postData.append('type','update_refferal_name');
    postData.append('user_id',user_id);
    postData.append('refferal',refferal);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  request_fund(user_id,email_address,amount,notes):Observable<[]>{
    let postData = new FormData();
    let link="https://vairt.com/cfund/Api_Manager/send_emails/request_funds/"+user_id
    postData.append('email',email_address);
    postData.append('notes',notes);
    postData.append('amount',amount);
    return this.http.post(link,postData).pipe(map(res=>res.json()))
  }
  referral_email(user_id,email_address):Observable<[]>{
    let postData = new FormData();
    let link="https://vairt.com/cfund/Api_Manager/send_emails/referral_email/"+user_id
    postData.append('email',email_address);
    return this.http.post(link,postData).pipe(map(res=>res.json()))
  }
  pledge_email(first_name,last_name,email,phone,address,amount,
    user_country,city,state,zip,user_id,title,prop_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','pledge_email')
    postData.append('first_name',first_name);
    postData.append('last_name',last_name);
    postData.append('email',email);
    postData.append('phone',phone);
    postData.append('address',address);
    postData.append('amount',amount);
    postData.append('country',user_country);
    postData.append('city',city);
    postData.append('state',state);
    postData.append('zip',zip);
    postData.append('user_id',user_id);
    postData.append('title',title);
    postData.append('prop_id',prop_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_email_auth(user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','update_email_auth')
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  resend_otp():Observable<[]>{
    let postData = new FormData();
    postData.append('type','resend_otp')
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  notification(user_id,last_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','notification')
    postData.append('user_id',user_id)
    postData.append('last_id',last_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  setBackPage(name){
    this.page_name = name
  }
  getBackPage(){
    return this.page_name
  }
  setProfileData(data){
    this.profile_data = data
  }
  getProfileData(){
    return this.profile_data
  }
  setPurchaseData(data){
    this.purchase_data = data
  }
  getPurchaseData(){
    return this.purchase_data
  }

  setInvestBack(page){
    this.invest_back = page
  }
  getInvestBack(){
   return this.invest_back
  }
  setDetailBackPage(page){
    this.detail_page = page
  }
  getDetailBackPage(){
    return this.detail_page
  }
  setSettingBackPage(page){
    this.setting_page = page
  }
  getSettingBackPage(){
    return this.setting_page
  }
  set_my_properties(page){
    this.properties_page=page
  }
  get_my_properties(){
    return this.properties_page
  }
  set_inves_status(type){
    this.inves_status = type
  }
  get_inves_status(){
    return this.inves_status
  }
  saveDeviceData(data){
    this.fcmData = data
  }
  getDeviceData(){
    return this.fcmData
  }
  device_registration(modal,plt,token,user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','device_registration')
    postData.append('user_id',user_id)
    postData.append('modal',modal)
    postData.append('platform',plt)
    postData.append('token',token)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  purchase_complete_property(property_id,user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','purchase_complete_property')
    postData.append('property_id',property_id)
    postData.append('user_id',user_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  forgot_password(email):Observable<[]>{
    let postData = new FormData();
    postData.append('type','forgot_password')
    postData.append('email',email)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  check_password(user_id,password,share,price,invoice_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','check_password')
    postData.append('user_id',user_id)
    postData.append('password',password)
    postData.append('share_price',price)
    postData.append('amount',share)
    postData.append('purchaser_id',invoice_id)
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  set_purchase_complete(data){
    this.purchase_complete_data = data
  }
  get_purchase_complete(){
    return this.purchase_complete_data
  }
  set_invest_from(data){
    this.set_invest= data
  }
  get_invest_form(){
    return this.set_invest
  }
  flip_property_(user_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','flip_property')
    postData.append('user_id',user_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
  update_sell_share(share_id):Observable<[]>{
    let postData = new FormData();
    postData.append('type','update_sell_share')
    postData.append('share_id',share_id);
    return this.http.post(this.link,postData).pipe(map(res=>res.json()))
  }
}
