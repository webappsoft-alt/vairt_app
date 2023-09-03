<?php 
header("access-control-allow-origin: *");
header("access-control-allow-credentials: true");
header("access-control-allow-headers: Content-Type, *");   
include_once('includes/connection.php');
require_once 'PHPGangsta/GoogleAuthenticator.php';

// declare(strict_types=1);
//require_once('vendor/autoload.php');
mysqli_query($conn, "set sql_mode = ''");
require_once('stripe/init.php');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$data = array();
$logo = 'https://propcrm.co/app/application/views/admin/profile/logo/';
$root = 'https://propuae.com/vairt/uploads/';
$property_photos ='https://vairt.com/platform/application/views/gallery/'; 
$documents = '/vairt/uploads/';
if(!empty($_POST['type']))
{	
	 switch($_POST['type']) 
 {
     	 case 'login':
	if(!empty($_POST['email'])){
	    $email = mysqli_real_escape_string($conn,$_POST['email']);
	    $password = mysqli_real_escape_string($conn,hash('sha256', $_POST['password']));
        $user = mysqli_query($conn,"select * from e_users where user_email='{$email}' and user_password='{$password}'"); 		
        $rq=mysqli_fetch_assoc($user);
        $by_user = $rq['user_id'];
		if(mysqli_num_rows($user)>0){
		    $timestamp = time();
		    $data['timestamp'] = $timestamp;
		    mysqli_query($conn,"update e_users set user_active='{$timestamp}' where user_id='{$by_user}'");
		    $chk = mysqli_query($conn,"select * from e_security where user_id='{$by_user}' AND (s_login=1 OR s_login='1')");
		    if(mysqli_num_rows($chk)>0){
		       $data['2FA'] = true;
		    }else{
		       $data['2FA'] = false; 
		    }
		   $data['user_id'] = $by_user;
		   $data['full_name'] = $rq['user_fname'].' '.$rq['user_lname'];
		   $data['email'] = $rq['user_email'] ;
		   $data['result']=true;
		   $data['message']='login Successfully';
		   $ip = getenv('HTTP_CLIENT_IP')?:
            getenv('HTTP_X_FORWARDED_FOR')?:
            getenv('HTTP_X_FORWARDED')?:
            getenv('HTTP_FORWARDED_FOR')?:
            getenv('HTTP_FORWARDED')?:
            getenv('REMOTE_ADDR');
            $data['ip'] = $ip;
		}else{
    			$data['result']=false;
    			$data['message']='Login Failed';
    	}
	   }
	break;
	
		case 'check_email':
	    $email = mysqli_real_escape_string($conn,$_POST['email']);
	      $user = mysqli_query($conn,"select * from e_users where user_email='{$email}'"); 
   
      	if(mysqli_num_rows($user)>0){
         $data['result']=false;
        } else{
            $data['result']=true;
        }
	break;

	 case 'register':
	   $first_name = mysqli_real_escape_string($conn,$_POST['first_name']);
	   $last_name = mysqli_real_escape_string($conn,$_POST['last_name']);
	   $password = mysqli_real_escape_string($conn,hash('sha256', $_POST['password']));
	   $email = mysqli_real_escape_string($conn,$_POST['email']);
       $phone = mysqli_real_escape_string($conn,$_POST['phone']);
  	   $user = mysqli_query($conn,"select * from e_users where user_email='{$email}'"); 
   
      	if(mysqli_num_rows($user)>0){
         $data['result']=false;
         $data['message']='Email Already Exist, Please register with Another Email';
        } else{
        $dob = $_POST['dob'];
        $upd_query = "insert into e_users (user_fname,user_lname,user_email,user_password,dob,user_mobile,user_status,steps,user_type,user_intype,admin_active) values ('{$first_name}','{$last_name}','{$email}','{$password}','{$dob}','{$phone}','1','2',
        'user','website','0')";
        if(mysqli_query($conn,$upd_query) or die(mysqli_error($conn))){
            $curr_date = date('Y-m-d H:i:s');
            $user_id = mysqli_insert_id($conn);
            mysqli_query($conn,"insert into e_history (history_comment,history_date,user_id) values ('Signup Successfull','{$curr_date}','{$user_id}')");
            $randomNumber;
             for ($randomNumber = mt_rand(1, 4), $i = 1; $i < 4; $i++) {
                    $randomNumber .= mt_rand(0, 4);
              }
         //   sendEmail($email,$first_name,'Vairt OTP',$randomNumber);
            $data['user_id'] = $user_id;
            $data['full_name'] = $first_name.' '.$last_name;
            $data['email'] = $email;
            $data['otp'] = $randomNumber;
            $data['result'] = true;
            $data['message'] = 'Registered Successfully!';
            }else{
                $data['result'] = false;
            }
          }
        break;
        case 'update_mothername':
            mysqli_query($conn,"update e_users set mother_name='{$_POST['mothername']}' where user_id='{$_POST['user_id']}'");
        break;
	    
	    
        case 'citizenship':
            $query =  mysqli_query($conn,"update e_users set user_country='{$_POST['citizenship']}' where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result'] = true;
            }else{
              $data['result'] = false;  
            }
        break;
	    
	    case 'address':
	       $query =  mysqli_query($conn,"update e_users set user_address='{$_POST['user_address']}', user_city='{$_POST['city']}',user_state='{$_POST['state']}'
	       ,zip='{$_POST['postalCode']}' where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result'] = true;
            }else{
              $data['result'] = false;  
            }
	    break;
	    
	    case 'account_type':
	         $query =  mysqli_query($conn,"update e_users set itype='{$_POST['acc_type']}' where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result'] = true;
            }else{
              $data['result'] = false;  
            }
	    break;
	    
	     case 'investment_type':
	         $query =  mysqli_query($conn,"insert into purchaser_detail (primary_reason,user_id) values('{$_POST['inves_type']}','{$_POST['user_id']}')");
            if($query){
                $data['result'] = true;
            }else{
              $data['result'] = false;  
            }
	    break;
	    
	    case 'level_expierence':
	        $chk = mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'");
	         if(mysqli_num_rows($chk)>0){
	         $query =  mysqli_query($conn,"update purchaser_detail set stocks='{$_POST['stocks']}',bonds='{$_POST['bonds']}',private_equity='{$_POST['equity']}'
	         ,venture_capital='{$_POST['capital']}',realestate='{$_POST['real_estate']}',restaurant='{$_POST['business']}' where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result'] = true;
            }else{
              $data['result'] = false;  
            }
	       }else{
	           mysqli_query($conn,"insert into purchaser_detail(stocks,bonds,private_equity,venture_capital,realestate,restaurant,user_id)
	           values('{$_POST['stocks']}','{$_POST['bonds']}','{$_POST['equity']}','{$_POST['capital']}','{$_POST['real_estate']}','{$_POST['business']}','{$_POST['user_id']}')");
	       }
	    break;
	    
	     case 'when_exit_investment':
	          $chk = mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'");
	         if(mysqli_num_rows($chk)>0){
	         $query =  mysqli_query($conn,"update purchaser_detail set exit_investment='{$_POST['investment']}',comfortable='{$_POST['comfort']}'  where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result'] = true;
            }else{
              $data['result'] = false;  
            }
	       }else{
	           mysqli_query($conn,"insert into purchaser_detail(exit_investment,comfortable,user_id) values('{$_POST['investment']}','{$_POST['comfort']}','{$_POST['user_id']}')");
	       }
	    break;
	    
	     case 'exit_investment':
	         $chk = mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'");
	         if(mysqli_num_rows($chk)>0){
	         $query =  mysqli_query($conn,"update purchaser_detail set investment_type='{$_POST['risk']}' where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result'] = true;
            }else{
              $data['result'] = false;  
            }
	        }else{
	         mysqli_query($conn,"insert into purchaser_detail(investment_type,user_id) values('{$_POST['risk']}','{$_POST['user_id']}')");
	        }
	    break;
	    
	    case 'current_income':
	        $chk = mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'");
	         if(mysqli_num_rows($chk)>0){
	         $query =  mysqli_query($conn,"update purchaser_detail set current_income='{$_POST['income']}', net_worth='{$_POST['worth']}' where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result'] = true;
            }else{
              $data['result'] = false;  
            }
	       }else{
	        mysqli_query($conn,"insert into purchaser_detail(current_income,net_worth,user_id) values('{$_POST['income']}','{$_POST['worth']}','{$_POST['user_id']}')");
	       }
	    break;
	    
	    case 'employment_info_self':
	         $query =  mysqli_query($conn,"update purchaser_detail set employment_status='{$_POST['employment_status']}', business_name='{$_POST['business_name']}'
	         , your_title='{$_POST['your_title']}' , business_type='{$_POST['business_type']}' where user_id='{$_POST['user_id']}'");
            if($query){
                $curr_date = date('Y-m-d H:i:s');
	            $query = mysqli_query($conn,"insert into e_history (history_comment,history_date,user_id) values ('User completed Employment detail','{$curr_date}','{$_POST['user_id']}')") or die(mysqli_error($conn));
                $data['result'] = true;
            }else{
              $data['result'] = false;  
            }
	    break;
	    
	    case 'employment_info_student':
	          $query =  mysqli_query($conn,"update purchaser_detail set school='{$_POST['school']}', ssoi='{$_POST['source_income']}', employment_status='{$_POST['status']}'
	          where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result'] = true;
                $curr_date = date('Y-m-d H:i:s');
	            $query = mysqli_query($conn,"insert into e_history (history_comment,history_date,user_id) values ('User completed Employment detail','{$curr_date}','{$_POST['user_id']}')") or die(mysqli_error($conn));
            }else{
              $data['result'] = false;  
            }
	   // break;
	    
	    case 'employment_info_retired':
	          $query =  mysqli_query($conn,"update purchaser_detail set recent_employment='{$_POST['recent_employer']}', recent_position ='{$_POST['position_held']}'
	         ,industry_type ='{$_POST['business_type']}', soi='{$_POST['source_income']}', employment_status='{$_POST['status']}' where user_id='{$_POST['user_id']}'") or die (mysqli_error($conn));
            if($query){
                $data['result'] = true;
                $curr_date = date('Y-m-d H:i:s');
	            $query = mysqli_query($conn,"insert into e_history (history_comment,history_date,user_id) values ('User completed Employment detail','{$curr_date}','{$_POST['user_id']}')") or die(mysqli_error($conn));
            }else{
              $data['result'] = false;  
            }
	    break;
	    
	    case 'employment_info_not_employed':
	          $query =  mysqli_query($conn,"update purchaser_detail set esoi ='{$_POST['source_income']}', employment_status='{$_POST['status']}' where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result'] = true;
                $curr_date = date('Y-m-d H:i:s');
	            $query = mysqli_query($conn,"insert into e_history (history_comment,history_date,user_id) values ('User completed Employment detail','{$curr_date}','{$_POST['user_id']}')") or die(mysqli_error($conn));
            }else{
              $data['result'] = false;  
            }
	    break;
	    
	      case 'identity_photos':
	          if($_POST['front_img']!='assets/images/face-detection.png'){
	          $front_img = image_resize_str($_POST['front_img'], 320, 'front_img', $_POST['user_id']);
	          }
	          if($_POST['back_img']!='assets/images/face-detection.png'){
              $back_img = image_resize_str1($_POST['back_img'], 320, 'back_img', $_POST['user_id']);
                $query =  mysqli_query($conn,"insert into kyc_photo (back_image,front_image,type,user_id) values ('{$back_img}',
    	         '{$front_img}','{$_POST['id_type']}','{$_POST['user_id']}')") or die (mysqli_error($conn));
                if($query){
                    $curr_date = date('Y-m-d H:i:s');
	                $query = mysqli_query($conn,"insert into e_history (history_comment,history_date,user_id) values ('User completed identification step and moved to last step of KYC','{$curr_date}','{$_POST['user_id']}')") or die(mysqli_error($conn));
                    $data['result'] = true;
                }else{
                  $data['result'] = false;  
                }
	          }
	       
	       
	    break;
	    
	    case 'identity_photos_front':
	          if($_POST['front_img']!='assets/images/face-detection.png'){
	           $front_img = image_resize_str($_POST['front_img'], 320, 'front_img', $_POST['user_id']);
	           $query =  mysqli_query($conn,"insert into kyc_photo (back_image,front_image,type,user_id) values ('',
    	         '{$front_img}','{$_POST['id_type']}','{$_POST['user_id']}')") or die (mysqli_error($conn));
                if($query){
                    $data['result'] = true;
                }else{
                  $data['result'] = false;  
                }
	          }
                
	          
	       
	    break;
	    
	    case 'available_balance':
	       $upscale= hash('sha256','Credit');
           $downscale= hash('sha256','Debit');
           $oru_id = $_POST['user_id'];
           $ctr = mysqli_fetch_assoc(mysqli_query($conn,"select sum(amount) as am from deposit_request where oru_id='{$oru_id}' and status='1' and scale='{$upscale}'"));
           $dtr= mysqli_fetch_assoc(mysqli_query($conn,"select sum(amount) as am from deposit_request where oru_id='{$oru_id}' and status='1' and scale='{$downscale}'"));
           $upscale= ($ctr['am']>0)?$ctr['am']:0;
           $downscale= ($dtr['am']>0)?$dtr['am']:0;
           $data['balance'] =  $upscale-$downscale;
	       $data['top_up'] =  $upscale;
   	       $data['top_down'] = $downscale;
	     break;
	    
	    case 'property_list':
	           //$query = mysqli_query($conn,"select * from e_property where market_approve='1' and admin_approval='1' and (investment_type='1' OR  investment_type='2')") or die(mysqli_error($conn));
	       	   $query = mysqli_query($conn,"SELECT *, (SELECT properties_status FROM `additional_info` WHERE property_id = e_property.id limit 1) as pstatus FROM `e_property` where market_approve = 1 and admin_approval = 1 and (investment_type='1' OR investment_type='2') order by FIELD((SELECT properties_status FROM `additional_info` WHERE property_id = e_property.id limit 1), 'Generating Income', 'Investing', 'Funded')"); 
	           $i = 0;
	           while($row = mysqli_fetch_assoc($query)){    
	               $photo = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_photos where temp_id='{$row['id']}'"));
	               $additional_row =mysqli_fetch_assoc(mysqli_query($conn,"select sum(perc) AS count from purchaser where property_id='{$row['id']}' and status='1' 
	               and stages='10'"));
	               $expected_row = mysqli_query($conn,"select sum(charges) AS charge from other_charges where property_id='{$row['id']}'");
	               $expected_charge = mysqli_fetch_assoc($expected_row);
	               $additional_row_all = mysqli_fetch_assoc(mysqli_query($conn,"select * from additional_info where property_id='{$row['id']}'"));
	               $no_of_inv = mysqli_query($conn,"select * from purchaser where property_id='{$row['id']}' and status=1 and stages=10");
	               $invoice_id = mysqli_fetch_assoc(mysqli_query($conn,"select * from invoice where property_id='{$row['id']}' and status=1 and stages=10"));
	               $purchaser_data = mysqli_fetch_assoc($no_of_inv);
	               $data['property'][$i]['id'] = $row['id'];
	               $data['property'][$i]['title'] = $row['property_title'];
	               $data['property'][$i]['address'] = $row['address'];
	               $data['property'][$i]['price'] = $row['price'];
	               $data['property'][$i]['lat'] = $row['latitude'];
	               $data['property'][$i]['lng'] = $row['longitude'];
	               $des = clean($row['property_description']);
	               $data['property'][$i]['property_description'] = $des;
	               $data['property'][$i]['initial_invest'] = $additional_row_all['initial_investment'];
	               $data['property'][$i]['funded'] = number_format($additional_row['count'],2,".", "");
	               $data['property'][$i]['img'] = $property_photos.$photo['name'];
	               $data['property'][$i]['no_of_inv'] = mysqli_num_rows($no_of_inv);
	               $data['property'][$i]['rent_amount'] = $additional_row_all['current_rent'];
	               $data['property'][$i]['rehabilitation_cost'] = $additional_row_all['rehab'];
	               $data['property'][$i]['minimum_investment'] = number_format($additional_row_all['minimum_investment']);
	               $data['property'][$i]['property_type'] = $additional_row_all['properties_status'];
	               $data['property'][$i]['yearly_rent_amount'] = number_format($additional_row_all['current_rent']*12);
	               $query_photos = mysqli_query($conn,"select * from e_photos where temp_id='{$row['id']}'");
	               $j=0;
	               while($row_photos = mysqli_fetch_assoc($query_photos)){
	                  $data['property'][$i]['property_images'][$j] = $property_photos.$row_photos['name'];
	                  $j++;
	               }
	               $chk = mysqli_query($conn,"select * from e_security where user_id='{$_POST['user_id']}' AND (s_withdrawl=1 OR s_withdrawl='1')");
        		    if(mysqli_num_rows($chk)>0){
        		       $data['property'][$i]['trans_auth'] = true;
        		    }else{
        		       $data['property'][$i]['trans_auth'] = false; 
        		    }
	            //net Dividend Income Formula
	               
	               $costing=($additional_row_all['pm_fee']+$additional_row_all['insurance']);
	               $gross_rent = $additional_row_all['current_rent']*12;

	               $net_rent = $gross_rent-$additional_row_all['service_charges'];
                   $net_yeild=($net_rent-$costing);
                
                   $data['property'][$i]['net_dividend'] =  number_format((($net_yeild/$additional_row_all['initial_investment'])*100),2,".", "");
                   $net_yield =  number_format((($net_yeild/$additional_row_all['initial_investment'])*100),2,".", "");
                   
                   $net_value = ($net_yield * $additional_row_all['initial_investment']) / 100 ;
                   $invest_percent = (20000 * 100) / $additional_row_all['initial_investment'] ;
                   $data['property'][$i]['net_dividend_income'] = 5*(($net_value * $invest_percent)/100);
                   
                  //gross yield formula
	               $gross_yield = ($net_rent/$additional_row_all['initial_investment'])*100;
	               $data['property'][$i]['gross_yield'] = $gross_yield;
                   
                   //net Dividend Income Formula for first 2nd year
                     $sec = (($net_value * $invest_percent)/100); + 5*(($net_value * $invest_percent)/100);
                     $third  = (($net_value * $invest_percent)/100) + $sec;
                     $forth  = (($net_value * $invest_percent)/100) + $third;
                     $fifth  = (($net_value * $invest_percent)/100) + $forth;
                     $data['property'][$i]['net_dividend_income_1st'] = $sec;
                     $data['property'][$i]['net_dividend_income_2nd'] = $third;
                     $data['property'][$i]['net_dividend_income_3rd'] = $forth;
                     $data['property'][$i]['net_dividend_income_4th'] = $fifth;
                     $data['property'][$i]['net_dividend_income_5th'] = 5*(($net_value * $invest_percent)/100);
                     
                      //annual apperication 
                    
                    $annual_appr= ($additional_row_all['initial_investment']+$expected_charge['charge']+$additional_row_all['transaction_cost']+$additional_row_all['vat'])-$additional_row_all['initial_investment'];
                    $annual_appr= ($annual_appr/$additional_row_all['initial_investment'])*100; 
                         
                     //expected capital apperication formula
                     
                        $ic= ($additional_row_all['initial_investment']*$annual_appr)/100;
                        $pc = (20000*100)/$additional_row_all['initial_investment'];
                        $first = ($ic*$pc)/100;
                        $firstr = $first+(($first*$annual_appr)/100); 
                        $net2nd_r = $firstr+(($firstr*$annual_appr)/100);
                        $net3rd_r = $net2nd_r+(($net2nd_r*$annual_appr)/100);
                        $net4th_r = $net3rd_r+(($net3rd_r*$annual_appr)/100);
                        $net5th_r = $net4th_r+(($net4th_r*$annual_appr)/100);
                      //  $data['property'][$i]['expected_capital_apprication_2nd'] = $firstr;
                
                     // expected capital apperication formula
                     
                      $inv= 20000;
                      $prv= 2.00;
                      $t1=  $additional_row_all['initial_investment'];
                      $p1= ($inv*100)/$t1;                     
                      $roi= ($t1*$prv)/100;
                      $net_roi= (($roi*$p1)/100);
                      $nf2=(($net_roi*$prv)/100);
                      $net_2nd= $net_roi+($net_roi+$nf2);
                      $nf3=(($net_2nd*$prv)/100);
                      $net_3rd= $net_roi+($net_2nd+$nf3);
                      $nf4=(($net_3rd*$prv)/100);
                      $net_4th= $net_roi+($net_3rd+$nf4);
                      $nf5=(($net_4th*$prv)/100);
                      $net_5th= $net_roi+($net_4th+$nf5);                      
                      
                      $data['property'][$i]['app_1st'] = $net_roi;
                      $data['property'][$i]['app_2nd'] = $net_2nd;   
                      $data['property'][$i]['app_3rd'] = $net_3rd;   
                      $data['property'][$i]['app_4th'] = $net_4th;   
                      $data['property'][$i]['app_5th'] = $net_5th;
                    
                      //ROI Formula
                      $net_dividend_income = 5*(($net_value * $invest_percent)/100);
                      $return_on_investment=$net_5th+$net_dividend_income;
                      $data['property'][$i]['roi'] = $return_on_investment;
                      
                      //Average annualized return
                       $prv= 2.00;
                       $inv= 20000;
                       $p2s= $net_2nd/$inv;
                       $p3s= $net_3rd/$inv;
                       $p4s= $net_4th/$inv;
                       $p5s= $net_5th/$inv;
                       $total_nf= $prv+ $p2s+ $p3s+ $p4s+ $p5s; 
                       $net_dividend_yield = number_format((($net_yeild/$additional_row_all['initial_investment'])*100),2,".", "");
                       $avg_annualized_return = $total_nf + $net_dividend_yield;
                       $data['property'][$i]['avg_annulized_return'] = $avg_annualized_return;
                       
                        //total expected after five years
                       
                        $inv = '20000';
                        $five = $inv + $net_5th + 5*(($net_value * $invest_percent)/100);
                        $data['property'][$i]['five_year'] =  $five;
                     
                     
                    //Rental Breakdown
                     
	                 $data['property'][$i]['gross_rent_per_year'] = $additional_row_all['current_rent']*12;
    	             $data['property'][$i]['service_charges'] = $additional_row_all['service_charges'];
                     $data['property'][$i]['net_rent']= ($additional_row_all['current_rent']*12)-$additional_row_all['service_charges'];
                     $data['property'][$i]['prop_management'] = $additional_row_all['pm_fee'];
                     $data['property'][$i]['prop_taxes'] = $additional_row_all['insurance'];
                     $data['property'][$i]['cost'] = $additional_row_all['pm_fee']+$additional_row_all['insurance'];
                     
                    //Transaction Detail
                    
                    $j=0;
                    $total_cost=0;
                    $other_charges =  mysqli_query($conn,"select * from other_charges where property_id='{$row['id']}'");
                    while($charges_row=mysqli_fetch_assoc($other_charges)){
                    $data['property'][$i]['transaction'][$j]['name'] = $charges_row['title'];
                    $data['property'][$i]['transaction'][$j]['charges'] = $charges_row['charges'];
                    $total_cost = $total_cost+$charges_row['charges'];
                    $j++;
                    }
                    $data['property'][$i]['charges_cost'] = $total_cost;
                    if($additional_row_all['number_of_shares']){
                    $property_price_per_share = ($additional_row_all['initial_investment']/$additional_row_all['number_of_shares']);
                    $purchase_cost_per_share = (($expected_charge['charge'])/$additional_row_all['number_of_shares']);
                    $transaction_cost_per_share = (($additional_row_all['vairt_fee']+$additional_row_all['vat'])/$additional_row_all['number_of_shares']);
                    }else{
                        $property_price_per_share=0;
                        $purchase_cost_per_share=0;
                        $transaction_cost_per_share=0;
                    }
                    $data['property'][$i]['property_price_per_share'] = $property_price_per_share;
                    $data['property'][$i]['purchase_cost_per_share'] = $purchase_cost_per_share;
                    $data['property'][$i]['transaction_cost_per_share'] = $transaction_cost_per_share;
                    $data['property'][$i]['vairt_fee'] = $additional_row_all['vairt_fee'];
                    $data['property'][$i]['vat'] = $additional_row_all['vat'];
                    $data['property'][$i]['transaction_cost'] = $additional_row_all['vairt_fee']+$additional_row_all['vat'];
                    $data['property'][$i]['number_of_shares'] = $additional_row_all['number_of_shares'];
                    
                    $remaining_share = $additional_row_all['number_of_shares'] - $purchaser_data['amount_reserved'];
                    $data['property'][$i]['remaining_share'] = $remaining_share;
                    
                  $i++;
	           }
	       break;
	       
	       case 'calculator_investment':
	        
	        $expected_row = mysqli_query($conn,"select sum(charges) AS charge from other_charges where property_id='{$_POST['id']}'");
	        $expected_charge = mysqli_fetch_assoc($expected_row);
         	$additional_row_all = mysqli_fetch_assoc(mysqli_query($conn,"select * from additional_info where property_id='{$_POST['id']}'"));
                    
                    //net Dividend Income
                    
	              $costing=($additional_row_all['pm_fee']+$additional_row_all['insurance']);
	               $gross_rent = $additional_row_all['current_rent']*12;

	               $net_rent = $gross_rent-$additional_row_all['service_charges'];
                   $net_yeild=($net_rent-$costing);
                
                   $net_yield =  number_format((($net_yeild/$additional_row_all['initial_investment'])*100),2,".", "");
                   
                   $net_value = ($net_yield * $additional_row_all['initial_investment']) / 100 ;
                   $invest_percent = ($_POST['initial_investment'] * 100) / $additional_row_all['initial_investment'] ;
                   $data['net_dividend_income'] = 5*(($net_value * $invest_percent)/100);
                  
                  
                 // expected capital apperication formula
                     
                      $inv= $_POST['initial_investment'];
                      $prv= (float)$_POST['expected_apprication'];
                      $t1=  $additional_row_all['initial_investment'];
                      $p1= ($inv*100)/$t1;                     
                      $roi= ($t1*$prv)/100;
                      $net_roi= (($roi*$p1)/100);
                      $nf2=(($net_roi*$prv)/100);
                      $net_2nd= $net_roi+($net_roi+$nf2);
                      $nf3=(($net_2nd*$prv)/100);
                      $net_3rd= $net_roi+($net_2nd+$nf3);
                      $nf4=(($net_3rd*$prv)/100);
                      $net_4th= $net_roi+($net_3rd+$nf4);
                      $nf5=(($net_4th*$prv)/100);
                      $net_5th= $net_roi+($net_4th+$nf5);                      
                      $net_rois= $net_roi+$net_2nd+$net_3rd+$net_4th+$net_5th;
                      $net_dividend_income = 5*(($net_value * $invest_percent)/100);
                      $return_on_investment=($net_roi+($net_dividend_income));
                      $data['property'][0]['app_1st'] = $net_roi;
                      $data['property'][0]['app_2nd'] = $net_2nd;   
                      $data['property'][0]['app_3rd'] = $net_3rd;   
                      $data['property'][0]['app_4th'] = $net_4th;   
                      $data['property'][0]['app_5th'] = $net_5th;  

                      //Average annualized return
                      
                      $prv= (float)$_POST['expected_apprication'];
                      $inv= $_POST['initial_investment'];
                      if ($inv != 0 && $inv != NULL){
                      $p2s= number_format($net_2nd,2,".", "")/$inv;
                      }else{
                        $p2s=0;  
                      }if ($inv != 0 && $inv != NULL){
                      $p3s= number_format($net_3rd,2,".", "")/$inv;
                      }else{
                        $p3s=0;  
                      }if ($inv != 0 && $inv != NULL){
                      $p4s= number_format($net_4th,2,".", "")/$inv;
                      }else{
                          $p4s=0;
                      }if ($inv != 0 && $inv != NULL){
                      $p5s= number_format($net_5th,2,".", "")/$inv;
                      }else{
                          $p5s=0;
                      }
                      $total_nf= $prv+ $p2s+ $p3s+ $p4s+ $p5s; 
                      $net_dividend_yield = number_format((($net_yeild/$additional_row_all['initial_investment'])*100),2,".", "");
                      $avg_annualized_return = $total_nf + $net_dividend_yield;
                      $data['property'][0]['avg_annulized_return'] = $avg_annualized_return;
                       
                      //ROI Formula
                      $net_dividend_income = 5*(($net_value * $invest_percent)/100);
                      $return_on_investment=$net_5th+$net_dividend_income;
                      $data['property'][0]['roi'] = $return_on_investment;
                       
                     //total expected after five years
                       
                     $inv = $_POST['initial_investment'];
                     $five = $inv + $net_5th + 5*(($net_value * $invest_percent)/100);
                     $data['property'][0]['five_year'] =  $five;
                 break;
                 
                case 'get_user_data':
                   $user = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_users where user_id='{$_POST['user_id']}'"));
                   $data['user'] = $user;
                break;
	        
	        case 'update_user':
	            mysqli_query($conn,"update e_users set user_fname='{$_POST['first_name']}',user_lname='{$_POST['last_name']}'
	            ,user_country='{$_POST['country']}',user_address='{$_POST['address']}',user_city='{$_POST['city']}'
	            ,zip='{$_POST['zip']}',phone='{$_POST['phone']}' where user_id='{$_POST['user_id']}'");
	        break;
	        
	        case 'get_user_invest_detail':
	            $detail = mysqli_fetch_assoc(mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'"));
	            $data['invest_detail'] = $detail;
	        break;
	        
	        case 'update_user_invest_detail':
	            $chk = mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'");
	            if(mysqli_num_rows($chk)>0){
	           $query = mysqli_query($conn,"update purchaser_detail set investment_amount='{$_POST['amount']}', investment_type='{$_POST['distribution']}',
	            investment_verification='{$_POST['verification']}' where user_id='{$_POST['user_id']}'") or die (mysqli_error($conn));
	            if($query){
	                $data['result'] = true;
	            }else{
	                $data['result'] = false;
	            } 
	            }else{
	                $query = mysqli_query($conn,"insert into purchaser_detail(investment_amount,investment_type,investment_verification,user_id) 
	                values ('{$_POST['amount']}','{$_POST['distribution']}','{$_POST['verification']}','{$_POST['user_id']}')");
    	            if($query){
    	                $data['result'] = true;
    	            }else{
    	                $data['result'] = false;
    	            }
	            }
	           
	        break;
	        
	        case 'update_user_invest_tell':
	            $chk = mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'");
	            if(mysqli_num_rows($chk)>0){
	              mysqli_query($conn,"update purchaser_detail set primary_reason='{$_POST['reason']}' where user_id='{$_POST['user_id']}'");
	            }else{
	             mysqli_query($conn,"insert into purchaser_detail(primary_reason,user_id) values('{$_POST['reason']}','{$_POST['user_id']}')");
	            }
	        break;
	        
	        
	        
	        case 'flip_property_list':
	           //$query = mysqli_query($conn,"select * from e_property where market_approve='1' and admin_approval='1' and investment_type='3'") or die(mysqli_error($conn));
	          $query = mysqli_query($conn,"SELECT *, (SELECT properties_status FROM `additional_info` WHERE property_id = e_property.id limit 1) as pstatus FROM `e_property` where market_approve = 1 and investment_type='3' order by FIELD((SELECT properties_status FROM `additional_info` WHERE property_id = e_property.id limit 1), 'Generating Income', 'Investing', 'Funded')"); 
	           $i = 0;
	           while($row = mysqli_fetch_assoc($query)){    
	               $photo = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_photos where temp_id='{$row['id']}'"));
	               $additional_row = mysqli_fetch_assoc(mysqli_query($conn,"select sum(perc) AS count from purchaser where property_id='{$row['id']}' and status='1' and admin_approval='1'
	               and stages='10'"));
	               $expected_row = mysqli_query($conn,"select sum(charges) AS charge from other_charges where property_id='{$row['id']}'");
	               $expected_charge = mysqli_fetch_assoc($expected_row);
	               $additional_row_all = mysqli_fetch_assoc(mysqli_query($conn,"select * from additional_info where property_id='{$row['id']}'"));
	               $no_of_inv = mysqli_query($conn,"select * from purchaser where property_id='{$row['id']}' and status=1 and stages=10");
	               $purchaser_data = mysqli_fetch_assoc($no_of_inv);
	               $data['property'][$i]['id'] = $row['id'];
	               $data['property'][$i]['title'] = $row['property_title'];
	               $data['property'][$i]['address'] = $row['address'];
	               $data['property'][$i]['price'] = $row['price'];
	               $data['property'][$i]['lat'] = $row['latitude'];
	               $data['property'][$i]['lng'] = $row['longitude'];
	               $des = clean($row['property_description']);
	               $data['property'][$i]['property_description'] = $des;
	               $data['property'][$i]['initial_invest'] = $additional_row_all['initial_investment'];
	               $data['property'][$i]['funded'] = $additional_row['count'];
	               $data['property'][$i]['img'] = $property_photos.$photo['name'];
	               $data['property'][$i]['no_of_inv'] = mysqli_num_rows($no_of_inv);
	               $data['property'][$i]['rent_amount'] = $additional_row_all['current_rent'];
	               $data['property'][$i]['rehabilitation_cost'] = $additional_row_all['rehab'];
	               $data['property'][$i]['total_investment'] = $additional_row_all['initial_investment'] + $additional_row_all['rehab'];
	               $data['property'][$i]['minimum_investment'] = $additional_row_all['minimum_investment'];
	               $data['property'][$i]['sale_price'] = $additional_row_all['sale_price'];
	               $data['property'][$i]['property_type'] = $additional_row_all['properties_status'];
	               $data['property'][$i]['sale_cost'] = (7/100)*$additional_row_all['sale_price'];
	               $sale_cost= (7/100)*$additional_row_all['sale_price'];
	               $gross_profit = ($additional_row_all['sale_price']-($additional_row_all['rehab']+$additional_row_all['initial_investment']));
	               $Estimate_gross_profit = $gross_profit-$sale_cost;
	               $data['property'][$i]['gross_profit'] =  $Estimate_gross_profit;
	               $data['property'][$i]['investment_total'] = ($Estimate_gross_profit*100)/($additional_row_all['rehab']+$additional_row_all['initial_investment']);
	               $data['property'][$i]['estimate_net_profit'] = $Estimate_gross_profit - $additional_row_all['pm_fee'];
	               
	               $query_photos = mysqli_query($conn,"select * from e_photos where temp_id='{$row['id']}'");
	               $j=0;
	               while($row_photos = mysqli_fetch_assoc($query_photos)){
	                  $data['property'][$i]['property_images'][$j] = $property_photos.$row_photos['name'];
	                  $j++;
	               }
	               
	               //$cash_return=((($Estimate_gross_profit-$sale_cost)*(33/100)))+((70*(33/100)));
	               //$data['property'][$i]['cash_return'] = $cash_return;
	               
	                $data['property'][$i]['gross_rent_per_year'] = $additional_row_all['current_rent']*12;
    	            $data['property'][$i]['service_charges'] = $additional_row_all['service_charges'];
    	           $costing=($additional_row_all['pm_fee']+$additional_row_all['insurance']);
    	           $gross_rent = $additional_row_all['current_rent']*12;
    	           $net_rent = $gross_rent-$additional_row_all['service_charges'];
                   $net_yeild=($net_rent-$costing);
                   $net_yield =  number_format((($net_yeild/$additional_row_all['initial_investment'])*100),2,".", "");
                   $data['property'][$i]['net_dividend_yield'] = $net_yield;
                   $net_value = ($net_yield * $additional_row_all['initial_investment']) / 100 ;
                   $invest_percent = (20000 * 100) / $additional_row_all['initial_investment'] ;
                   $data['property'][$i]['net_dividend_income'] = 5*(($net_value * $invest_percent)/100);
                   
                   $gross_rent = $additional_row_all['current_rent']*12;
	               $net_yeild_= $gross_rent-$additional_row_all['service_charges'];
	               
	               $est_net_yield =($net_rent/$additional_row_all['initial_investment'])*100;
	               
    	            $data['property'][$i]['est_net_yield'] = $est_net_yield;
    	            
    	            $data['property'][$i]['prop_management'] = $additional_row_all['pm_fee'];
                    $data['property'][$i]['prop_taxes'] = $additional_row_all['insurance'];
                    
                 
	               
                  $i++;
	           }
	       break;
	       
	       case 'my_investments':
	          $query = mysqli_query($conn,"select * from invoice where user_id='{$_POST['user_id']}' order by id desc");
	          $i = 0;
	          while($row=mysqli_fetch_assoc($query)){
	             $property = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_property where id='{$row['property_id']}'"));
	             $photo = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_photos where temp_id='{$row['property_id']}'"));
	             $additional_row_all = mysqli_fetch_assoc(mysqli_query($conn,"select * from additional_info where property_id='{$row['property_id']}'"));
	             $data['property'][$i]['title'] = $property['property_title'];
	             $data['property'][$i]['shares'] = $row['share_amount'];
	             $data['property'][$i]['amount'] = $row['amount'];
	             $data['property'][$i]['stages'] = $row['stages'];
	             $data['property'][$i]['address'] = $property['address'];
	             $data['property'][$i]['date_added'] = $row['dateadded'];
	             $data['property'][$i]['invoice_id'] = $row['id'];
	             $data['property'][$i]['property_id'] = $row['property_id'];
	               $query_photos = mysqli_query($conn,"select * from e_photos where temp_id='{$row['property_id']}'");
	               $j=0;
	               while($row_photos = mysqli_fetch_assoc($query_photos)){
	                  $data['property'][$i]['property_images'][$j] = $property_photos.$row_photos['name'];
	                  $j++;
	               }
	             $no_of_inv = mysqli_query($conn,"select * from purchaser where property_id='{$row['id']}' and status=1 and stages=10");
	             $purchaser_data = mysqli_fetch_assoc($no_of_inv);
	             $remaining_share = $additional_row_all['number_of_shares'] - $purchaser_data['amount_reserved'];
                 $data['property'][$i]['remaining_share'] = $remaining_share;
	             $expected_row = mysqli_query($conn,"select sum(charges) AS charge from other_charges where property_id='{$row['property_id']}'");
	             $expected_charge = mysqli_fetch_assoc($expected_row);
	              if($additional_row_all['number_of_shares']){
                    $property_price_per_share = ($additional_row_all['initial_investment']/$additional_row_all['number_of_shares']);
                    $purchase_cost_per_share = (($expected_charge['charge'])/$additional_row_all['number_of_shares']);
                    $transaction_cost_per_share = (($additional_row_all['vairt_fee']+$additional_row_all['vat'])/$additional_row_all['number_of_shares']);
                  }else{
                    $property_price_per_share=0;
                    $purchase_cost_per_share=0;
                    $transaction_cost_per_share=0;
                 }
                  $data['property'][$i]['purchase_price'] = $property_price_per_share + $transaction_cost_per_share;
                    $total_cost=0;
                    $other_charges =  mysqli_query($conn,"select * from other_charges where property_id='{$row['property_id']}'");
                    while($charges_row=mysqli_fetch_assoc($other_charges)){
                    $total_cost = $total_cost+$charges_row['charges'];
                    }
                  $init_inv = $additional_row_all['initial_investment'];
                  $trans_cost = $additional_row_all['vairt_fee']+$additional_row_all['vat'];
                  $data['property'][$i]['property_value'] = number_format($total_cost+$init_inv+$trans_cost,2,".", "");
                  $data['property'][$i]['price'] =  $row['share_amount'] * $property_price_per_share;

	            $i++;
	          }
	       break;
	    
	        case 'profile':
	           $profile = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_users where user_id='{$_POST['user_id']}'"));
	           $data['profile'] = $profile;
	           
	           $purchase_detail = mysqli_fetch_assoc(mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'"));
	           $data['purchase_detail'] = $purchase_detail;
	           
	        break;
	        
	        case 'update_profile':
	            $query  = mysqli_query($conn,"update e_users set user_fname='{$_POST['first_name']}',user_lname='{$_POST['last_name']}',
	            user_mobile='{$_POST['phone']}',user_address='{$_POST['address']}',zip='{$_POST['zip_code']}' where user_id='{$_POST['user_id']}'");
	            if($_POST['pic']!='assets/images/profile-user.png'){
	            $front_img = image_resize_str2($_POST['pic'], 320, 'profile_pic', $_POST['user_id']);
	            }
	        break;
	        
	     case "forgot_password":
	      
        	if(!empty($_POST['email'])){
        		$query = mysqli_query($conn,"select * from users where email='{$_POST['email']}' and company_id='{$_POST['company_id']}'");
        		if(mysqli_num_rows($query) > 0){
        		$get_res = mysqli_fetch_assoc($query);
        		$length = 8;    
                $password = substr(str_shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz'),1,$length);
        		$sha_password = mysqli_real_escape_string($conn,hash('sha256', $password));
        		$text = "Hello {$get_res['first_name']}\n";
        		$text .= "Your Password is: {$password}\n";
        		$text .= "\nRegards, \n";
        		$text .= "Prop Crm Team\n";
        		
        		$mailSubject = "Password From Prop Crm App";
        	    
        		$select_usage = sendEmail($get_res['email'], $mailSubject, $text);
        		
        
                if($select_usage)
                {
                    mysqli_query($conn,"update users set password='{$sha_password}' where email='{$_POST['email']}' and company_id='{$_POST['company_id']}' ");
                        $data['result']=true;
                        $data['message']='Password Sent Successfully to your email. Please check SPAM folder if you will not see it in inbox';
                } else {
                        $data['result']=false;
                        $data['message']='Error!!!';
                }
        	}else{
        	    $data['result'] = false;
        	    $data['message'] = 'Your Email or company id does not exist';
        	 }
        	}

	        break;
	        
	        case 'user_investment':
	            $date = date('Y-m-d');
	           // $count = mysqli_query($conn,"select * from invoice where user_id='{$_POST['user_id']}' and property_id='{$_POST['prop_id']}' and stages = '1'");
	           // if(mysqli_num_rows($count)>0){
	                
	           //     $stages = mysqli_fetch_assoc(mysqli_query($conn,"select * from invoice where user_id='{$_POST['user_id']}' and property_id='{$_POST['prop_id']}'"));
	           //     mysqli_query($conn,"update invoice set first_name='{$_POST['first_name']}',last_name='{$_POST['last_name']}',mobile='{$_POST['phone']}',
	           //     address='{$_POST['address']}',stages='{$stages['stages']}' where user_id='{$_POST['user_id']}' and property_id='{$_POST['prop_id']}'");
	           // }else{
	           $query =  mysqli_query($conn,"insert into invoice (property_id,user_id,first_name,last_name,mobile,address,stages,zip,dateadded) values('{$_POST['prop_id']}',
	            '{$_POST['user_id']}','{$_POST['first_name']}','{$_POST['last_name']}','{$_POST['phone']}',
	            '{$_POST['address']}','1','{$_POST['zip']}','{$date}')");
	            $data['invoice_id'] = mysqli_insert_id($conn);
	         //   }
	        break;
	        
	        case 'user_invest2':
	            $date = date('Y-m-d');
	            mysqli_query($conn,"update invoice set stages='2',dateadded='{$date}' where id='{$_POST['invoice_id']}'");
	        break;
	        
	         case 'user_invest3':
	            $date = date('Y-m-d');
    	        $query = mysqli_query($conn,"update invoice set stages='3',dateadded='{$date}',amount='{$_POST['investment_amount']}',
	            share_amount = '{$_POST['share_amount']}' where id='{$_POST['invoice_id']}'");
	            if($query){
	                $data['result'] = true;
	            }else{
	                $data['result'] = false; 
	            }
	        break;
	        
	         case 'user_invest4':
	            $date = date('Y-m-d');
    	        $query = mysqli_query($conn,"update invoice set stages='4',dateadded='{$date}' where id='{$_POST['invoice_id']}'");
	            if($query){
	                $curr_date = date('Y-m-d H:i:s');
	                $query = mysqli_query($conn,"insert into e_history (history_comment,history_date,user_id) values ('Completed Suitability details and moved to employment history step','{$curr_date}','{$_POST['user_id']}')") or die(mysqli_error($conn));
	                $data['result'] = true;
	            }else{
	                $data['result'] = false; 
	            }
	        break;
	        
	          case 'user_invest5':
	            $date = date('Y-m-d');
    	        $query = mysqli_query($conn,"update invoice set stages='5',dateadded='{$date}' where id='{$_POST['invoice_id']}'");
	            if($query){
	                $data['result'] = true;
	            }else{
	                $data['result'] = false; 
	            }
	        break;
	        
	         case 'user_invest6':
	            $date = date('Y-m-d');
    	        $query = mysqli_query($conn,"update invoice set stages='6',dateadded='{$date}' where id='{$_POST['invoice_id']}'");
	            if($query){
	                $data['result'] = true;
	            }else{
	                $data['result'] = false; 
	            }
	        break;
	        
	        case 'user_invest7':
	            $date = date('Y-m-d');
    	        $query = mysqli_query($conn,"update invoice set stages='7',dateadded='{$date}' where id='{$_POST['invoice_id']}'");
	            if($query){
	                $data['result'] = true;
	            }else{
	                $data['result'] = false; 
	            }
	        break;
	        
	        case 'user_invest8':
	            $date = date('Y-m-d');
    	        $query = mysqli_query($conn,"update invoice set stages='8',dateadded='{$date}' where id='{$_POST['invoice_id']}'");
	            if($query){
	                $data['result'] = true;
	            }else{
	                $data['result'] = false; 
	            }
	        break;
	        
	            case 'user_invest9':
	            $date = date('Y-m-d');
    	        $query = mysqli_query($conn,"update invoice set stages='9',dateadded='{$date}' where id='{$_POST['invoice_id']}'");
	            if($query){
	                $data['result'] = true;
	            }else{
	                $data['result'] = false; 
	            }
	        break;
	            case 'user_invest10':
	            $date = date('Y-m-d');
    	        $query = mysqli_query($conn,"update invoice set stages='10',dateadded='{$date}' where id='{$_POST['invoice_id']}'");
	            if($query){
	                $curr_date = date('Y-m-d H:i:s');
	                $query = mysqli_query($conn,"insert into e_history (history_comment,history_date,user_id) values ('Profile completed and sent for verification','{$curr_date}','{$_POST['user_id']}')") or die(mysqli_error($conn));
	                $data['result'] = true;
	            }else{
	                $data['result'] = false; 
	            }
	        break;
	        
	        case 'update_invest':
	         $query = mysqli_query($conn,"update invoice set stages='{$_POST['stage']}' where id='{$_POST['invoice_id']}' and property_id='{$_POST['prop_id']}' and user_id='{$_POST['user_id']}'");
	         if($query){
	                $data['result'] = true;
	         }else{
	                $data['result'] = false; 
	         }
	        break;
	        
	        case 'cancel_invest':
	            $query = mysqli_query($conn,"delete from invoice where property_id='{$_POST['prop_id']}' and user_id='{$_POST['user_id']}' ORDER BY id DESC LIMIT 1");
	        break;
	   
	      case 'cancel_invoice_invest':
    	    $query = mysqli_query($conn,"delete from invoice where id='{$_POST['invoice_id']}' and user_id='{$_POST['user_id']}'");
    	  break;
    	  
    	   case 'trust_agreement':
            $sourcePath = $_FILES['file']['tmp_name'];
            $newfile=$_POST["trust_id"].$_POST['ext']; 
            $targetPath = $_SERVER['DOCUMENT_ROOT'] . $documents.$newfile;
            if(move_uploaded_file($sourcePath,$targetPath)) {
          $query = mysqli_query($conn,"update purchaser_trust set doc_title='{$newfile}' where id='{$_POST['trust_id']}'");
                if($query){
                $data['result']=true;
            }else{
                 $data['result']=false; 
            }
            $data['result'] = "Upload and move success";
            } else {
            $data ['result'] = $target_path;
            $data ['result'] = "There was an error uploading the file, please try again!";
            }
         break;
         
         case 'account_type_trust':
            $query = mysqli_query($conn,"insert into purchaser_trust (name,title,type,tin,jurisdiction,doc_later,user_id) values ('{$_POST['trust_name']}',
             '{$_POST['trust_title']}','{$_POST['trust_type']}','{$_POST['tin']}','{$_POST['tin_select']}','{$_POST['doc_later']}','{$_POST['user_id']}')");
             $data['trust_id'] = mysqli_insert_id($conn);
           //  mysqli_query($conn,"insert into purchaser_detail (user_id) values ('{$_POST['user_id']}')");
         break;
         
           case 'entity_agreement':
            $sourcePath = $_FILES['file']['tmp_name'];
            $newfile=$_POST["entity_id"].$_POST['ext']; 
            $targetPath = $_SERVER['DOCUMENT_ROOT'] . $documents.$newfile;
            if(move_uploaded_file($sourcePath,$targetPath)) {
            $query = mysqli_query($conn,"update purchaser_trust set doc_title='{$newfile}' where id='{$_POST['entity_id']}'");
             if($query){
                $data['result']=true;
            }else{
                 $data['result']=false; 
            }
            $data['name'] = $newfile;
            $data['result'] = "Upload and move success";
            $data['name'] = $newfile;
            } else {
            $data ['result'] = $target_path;
            $data ['result'] = "There was an error uploading the file, please try again!";
            }
         break;
         
         case 'operating_agreement':
            $sourcePath = $_FILES['file']['tmp_name'];
            $newfile=$_POST["entity_id"].'_'.$_POST['ext']; 
            $targetPath = $_SERVER['DOCUMENT_ROOT'] . $documents.$newfile;
            if(move_uploaded_file($sourcePath,$targetPath)) {
            $query = mysqli_query($conn,"update purchaser_trust set doc_title1='{$newfile}' where id='{$_POST['entity_id']}'");
            if($query){
                $data['result']=true;
            }else{
                 $data['result']=false; 
            }
            $data['name'] = $newfile;
            $data['result'] = "Upload and move success";
            } else {
            $data ['result'] = $target_path;
            $data ['result'] = "There was an error uploading the file, please try again!";
            }
         break;
         
         case 'account_type_entity':
             $query = mysqli_query($conn,"insert into purchaser_trust (name,title,type,doc_later,user_id) values ('{$_POST['entity_name']}',
             '{$_POST['entity_title']}','{$_POST['entity_type']}','{$_POST['doc_later']}','{$_POST['user_id']}')");
             $data['entity_id'] = mysqli_insert_id($conn);
             //mysqli_query($conn,"insert into purchaser_detail (user_id) values ('{$_POST['user_id']}')");
         break;
         
         case 'joint_account_type':
              $query = mysqli_query($conn,"insert into purchaser_spouse (first_name,last_name,contact_info,phone,c_residence,state,
              city,zip,pid,user_id) values ('{$_POST['first_name']}',
             '{$_POST['last_name']}','{$_POST['joint_inv_address']}','{$_POST['phone_no']}','{$_POST['country']}','{$_POST['state']}'
             ,'{$_POST['address']}','{$_POST['postal_code']}','{$_POST['joint_owner']}','{$_POST['user_id']}')") or die(mysqli_error($conn));

            // mysqli_query($conn,"insert into purchaser_detail (user_id) values ('{$_POST['user_id']}')"); 
         break;
         
         case 'retirement_type':
             $query = mysqli_query($conn,"update purchaser_detail set retirement_account='{$_POST['value']}' where user_id='{$_POST['user_id']}')");
              if($query){
                    $data['result']=true;
                }else{
                     $data['result']=false; 
                }
         break;
         
         case 'get_trust_type':
            $query =  mysqli_fetch_assoc(mysqli_query($conn,"select * from purchaser_trust where user_id='{$_POST['user_id']}'"));
            $data['values'] = $query;
         break;
         
         case 'get_retirement_type':
             $query =  mysqli_fetch_assoc(mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'"));
            $data['values'] = $query['retirement_account'];
         break;
         
         case 'get_joint_type':
              $query =  mysqli_fetch_assoc(mysqli_query($conn,"select * from purchaser_spouse where user_id='{$_POST['user_id']}'"));
            $data['values'] = $query;
         break;
         
         case 'update_type_trust':
              $chk = mysqli_query($conn,"select * from purchaser_trust where user_id='{$_POST['user_id']}'");
             if(mysqli_num_rows($chk)>0){
             $query = mysqli_query($conn,"update purchaser_trust set name='{$_POST['trust_name']}',title='{$_POST['trust_title']}',
             type='{$_POST['trust_type']}', tin='{$_POST['tin']}', jurisdiction='{$_POST['tin_select']}', doc_later='{$_POST['doc_later']}'
             where user_id='{$_POST['user_id']}'");
             $trust_id = mysqli_fetch_assoc(mysqli_query($conn,"select * from purchaser_trust where user_id='{$_POST['user_id']}'"));
            if($query){
                $data['trust_id'] = $trust_id['id'];
                $data['result']=true;
            }else{
                 $data['result']=false; 
            }
          }else{
              $query = mysqli_query($conn,"insert into purchaser_trust (name,title,type,tin,jurisdiction,doc_later,user_id)
              values ('{$_POST['trust_name']}','{$_POST['trust_title']}','{$_POST['trust_type']}','{$_POST['tin']}',
              '{$_POST['tin_select']}','{$_POST['doc_later']}','{$_POST['user_id']}')");
                if($query){
                 $data['trust_id'] = mysqli_insert_id($conn);
                 $data['result']=true;
                }else{
                 $data['result']=false; 
                }
            }
         break;
         
          case 'update_type_entity':
              $chk = mysqli_query($conn,"select * from purchaser_trust where user_id='{$_POST['user_id']}'");
             if(mysqli_num_rows($chk)>0){
               $query = mysqli_query($conn,"update purchaser_trust set name='{$_POST['entity_name']}',title='{$_POST['entity_title']}',
                 type='{$_POST['entity_type']}', doc_later='{$_POST['doc_later']}'
                 where user_id='{$_POST['user_id']}'");
                 $trust_id = mysqli_fetch_assoc(mysqli_query($conn,"select * from purchaser_trust where user_id='{$_POST['user_id']}'"));
                if($query){
                    $data['entity_id'] = $trust_id;
                    $data['result']=true;
                }else{
                     $data['result']=false; 
                }
             }else{
              $query = mysqli_query($conn,"insert into purchaser_trust (name,title,type,doc_later,user_id)
              values ('{$_POST['entity_name']}','{$_POST['entity_title']}','{$_POST['entity_type']}','{$_POST['doc_later']}','{$_POST['user_id']}')");
                if($query){
                 $data['entity_id'] = mysqli_insert_id($conn);
                 $data['result']=true;
                }else{
                 $data['result']=false; 
                }
             }
         
         break;
      
         case 'update_retirement_type':
             $chk = mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'");
             if(mysqli_num_rows($chk)>0){
                mysqli_query($conn,"update purchaser_detail set retirement_account='{$_POST['value']}' where user_id='{$_POST['user_id']}'");
             }else{
                 mysqli_query($conn,"insert into purchaser_detail (retirement_account,user_id) values ('{$_POST['value']}','{$_POST['user_id']}')");
             }
         break;
         
         case 'update_joint_type':
             $chk = mysqli_query($conn,"select * from purchaser_spouse where user_id='{$_POST['user_id']}'");
             if(mysqli_num_rows($chk)>0){
             $query = mysqli_query($conn,"update purchaser_spouse set first_name='{$_POST['first_name']}',last_name='{$_POST['last_name']}',
             contact_info='{$_POST['joint_inv_address']}', phone='{$_POST['phone_no']}', c_residence='{$_POST['country']}', state='{$_POST['state']}'
             , zip='{$_POST['postal_code']}', pid='{$_POST['joint_owner']}' where user_id='{$_POST['user_id']}'");
            if($query){
                $data['result']=true;
                $data['already']='updated';
            }else{
                 $data['result']=false; 
            }
           }else{
              $query = mysqli_query($conn,"insert into purchaser_spouse (first_name,last_name,contact_info,phone,c_residence,state,zip,pid,user_id)
             values('{$_POST['first_name']}','{$_POST['last_name']}','{$_POST['joint_inv_address']}','{$_POST['phone_no']}','{$_POST['country']}',
             '{$_POST['state']}','{$_POST['postal_code']}','{$_POST['joint_owner']}','{$_POST['user_id']}')");
            if($query){
                $data['result']=true;
                $data['already']='insert';
            }else{
                 $data['result']=false; 
            }
          }
         break;
         
         case 'user_phone':
             mysqli_query($conn,"update e_users set user_mobile='{$_POST['phone']}' where user_id='{$_POST['user_id']}'");
         break;
         
         case 'get_employment_info':
             $employment = mysqli_fetch_assoc(mysqli_query($conn,"select * from purchaser_detail where user_id='{$_POST['user_id']}'"));
             $data['employment'] = $employment;
         break;
         
         case 'update_user_address':
	           $query = mysqli_query($conn,"update e_users set user_country='{$_POST['country']}',user_address='{$_POST['address']}',user_city='{$_POST['city']}'
	            ,zip='{$_POST['zip']}',user_state='{$_POST['state']}' where user_id='{$_POST['user_id']}'");
	            if($query){
	                $data['result']=true;
	            }else{
	              $data['result']=false;   
	            }
	        break;
	        
	          case 'update_user_data':
	            mysqli_query($conn,"update e_users set user_fname='{$_POST['first_name']}',user_lname='{$_POST['last_name']}'
	            ,user_country='{$_POST['country']}',user_address='{$_POST['address']}',user_city='{$_POST['city']}'
	            ,zip='{$_POST['zip']}',user_mobile='{$_POST['phone_no']}',ssn='{$_POST['ssn_number']}' where user_id='{$_POST['user_id']}'");
	        break;
	        
	        case 'get_identity':
	            $identity = mysqli_fetch_assoc(mysqli_query($conn,"select * from kyc_photo where user_id='{$_POST['user_id']}'"));
	            $data['identity']['type'] = $identity['type'];
	            $data['identity']['front_img'] = $root.$identity['front_image'];
	            $data['identity']['back_img'] = $root.$identity['back_image'];
	        break;
	        
	        case 'update_identity_photos_front':
	            mysqli_query($conn,"update kyc_photo set front_image='{$_POST['front_img']}', type='{$_POST['iden_type']}'
	            where user_id='{$_POST['user_id']}'");
	        break;
	        
	        case 'update_identity_photos':
	              mysqli_query($conn,"update kyc_photo set front_image='{$_POST['front_img']}',back_image='{$_POST['back_img']}', type='{$_POST['iden_type']}'
	            where user_id='{$_POST['user_id']}'");
	        break;
	        
	        case 'get_region':
	           $query =  mysqli_query($conn,"select * from region");
	            $i=0;
	            while($row =mysqli_fetch_assoc($query)){
	               $data['region'][$i]['name'] = $row['title'];
	               $data['region'][$i]['id'] = $row['id'];
	               $i++;
	           }
	        break;
	        
	        case 'deposit_req':
	            $date = date('Y-m-d H:i:s');
	            mysqli_query($conn,"insert into deposit_request(oru_id,amount,regions,datetime,description) values('{$_POST['user_id']}',
	            '{$_POST['amount']}','{$_POST['region']}','{$date}','wire')");
	        break;
	        
	        case 'bank_detail':
	            mysqli_query($conn,"insert into docs(bank_name,account_name,bank_address,bank_country,bank_account,description) 
	            values ('{$_POST['bank_name']}','{$_POST['account_name']}','{$_POST['bank_address']}','{$_POST['country']}'
	            ,'{$_POST['account_no']}','{$_POST['detail']}')");
	        break;
	        
	      
	        
	        case 'add_user_transaction':
	            $timestamp = strtotime($_POST['curr_date']);
	            $start_date = date('d',$timestamp);
	            $percent = ($_POST['invest_amount'] * $_POST['net_dividend']) / 100;
	            $one_day_profit = number_format($percent,2)/365;
	            $random_number = date("Ymdhis") . rand(100000000000000, 999999999999999);
                $upscale= hash('sha256','Credit');

	            if($start_date=='1' or $start_date=='01'){ 
                     //first month
                     $time_first_plus = strtotime($_POST['curr_date']);
                     $first_month_plus = date("Y/m/01", strtotime("+1 month", $time_first_plus));
                     $first_month_plus_timestamp = strtotime($first_month_plus);
                     $firstMonthdaysRemaining = (int)date('t', $first_month_plus_timestamp);
                     $first_month = $one_day_profit * $firstMonthdaysRemaining;
                     $first_amount = number_format($first_month,2);
                    $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$first_month_plus}','Rental Share from property','{$first_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                     //second month
                     $time_two_plus = strtotime($_POST['curr_date']);
                     $two_month_plus = date("Y/m/01", strtotime("+1 month", $time_two_plus));
                     $two_month_plus_timestamp = strtotime($two_month_plus);
                     $twoMonthdaysRemaining = (int)date('t', $two_month_plus_timestamp);
                     $second_month = $one_day_profit * $twoMonthdaysRemaining;
                     $second_amount = number_format($second_month,2);
                     $second_datetime = date("Y/m/01", strtotime("+1 month", strtotime($first_month_plus))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$second_datetime}','Rental Share from property','{$second_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
	                  
	                  //third month
                     $time_three_plus = strtotime($two_month_plus);
                     $three_month_plus = date("Y/m/01", strtotime("+1 month", $time_three_plus));
                     $three_month_plus_timestamp = strtotime($three_month_plus);
                     $threeMonthdaysRemaining = (int)date('t', $three_month_plus_timestamp);
                     $three_month = $one_day_profit * $threeMonthdaysRemaining;
                     $third_amount = number_format($three_month,2);
                     $third_datetime = date("Y/m/01", strtotime("+1 month", strtotime($second_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$third_datetime}','Rental Share from property','{$third_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
     
                      //four month
                     $time_four_plus = strtotime($three_month_plus);
                     $four_month_plus = date("Y/m/01", strtotime("+1 month", $time_four_plus));
                     $four_month_plus_timestamp = strtotime($four_month_plus);
                     $fourMonthdaysRemaining = (int)date('t', $four_month_plus_timestamp);
                     $four_month = $one_day_profit * $fourMonthdaysRemaining;
                     $four_amount = number_format($four_month,2);
                     $four_datetime = date("Y/m/01", strtotime("+1 month", strtotime($third_datetime))).' '.$_POST['curr_time'];

                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$four_datetime}','Rental Share from property','{$four_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                    
                      //fifth month
                     $time_fifth_plus = strtotime($four_month_plus);
                     $fifth_month_plus = date("Y/m/01", strtotime("+1 month", $time_fifth_plus));
                     $fifth_month_plus_timestamp = strtotime($fifth_month_plus);
                     $fifthMonthdaysRemaining = (int)date('t', $fifth_month_plus_timestamp);
                     $fifth_month = $one_day_profit * $fifthMonthdaysRemaining;
                     $fifth_amount = number_format($fifth_month,2);
                     $fifth_datetime = date("Y/m/01", strtotime("+1 month", strtotime($four_datetime))).' '.$_POST['curr_time'];

                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$fifth_datetime}','Rental Share from property','{$fifth_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                      //six month
                     $time_six_plus = strtotime($fifth_month_plus);
                     $six_month_plus = date("Y/m/01", strtotime("+1 month", $time_six_plus));
                     $six_month_plus_timestamp = strtotime($six_month_plus);
                     $sixMonthdaysRemaining = (int)date('t', $six_month_plus_timestamp);
                     $six_month = $one_day_profit * $sixMonthdaysRemaining;
                     $six_amount = number_format($six_month,2);
                     $six_datetime = date("Y/m/01", strtotime("+1 month", strtotime($fifth_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$six_datetime}','Rental Share from property','{$six_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                      //seven month
                     $time_seven_plus = strtotime($six_month_plus);
                     $seven_month_plus = date("Y/m/01", strtotime("+1 month", $time_fifth_plus));
                     $seven_month_plus_timestamp = strtotime($seven_month_plus);
                     $sevenMonthdaysRemaining = (int)date('t', $seven_month_plus_timestamp);
                     $seven_month = $one_day_profit * $sevenMonthdaysRemaining;
                     $seven_amount = number_format($seven_month,2);
                     $seven_datetime = date("Y/m/01", strtotime("+1 month", strtotime($six_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$seven_datetime}','Rental Share from property','{$seven_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                      //eight month
                     $time_eight_plus = strtotime($seven_month_plus);
                     $eight_month_plus = date("Y/m/01", strtotime("+1 month", $time_eight_plus));
                     $eight_month_plus_timestamp = strtotime($eight_month_plus);
                     $eightMonthdaysRemaining = (int)date('t', $eight_month_plus_timestamp);
                     $eight_month = $one_day_profit * $eightMonthdaysRemaining;
                     $eight_amount = number_format($eight_month,2);
                     $eight_datetime = date("Y/m/01", strtotime("+1 month", strtotime($seven_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$eight_datetime}','Rental Share from property','{$eight_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                     //nine month
                     $time_nine_plus = strtotime($eight_month_plus);
                     $nine_month_plus = date("Y/m/01", strtotime("+1 month", $time_nine_plus));
                     $nine_month_plus_timestamp = strtotime($nine_month_plus);
                     $nineMonthdaysRemaining = (int)date('t', $nine_month_plus_timestamp);
                     $nine_month = $one_day_profit * $nineMonthdaysRemaining;
                     $nine_amount = number_format($nine_month,2);
                     $nine_datetime = date("Y/m/01", strtotime("+1 month", strtotime($eight_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$nine_datetime}','Rental Share from property','{$nine_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                     //ten month
                     $time_ten_plus = strtotime($nine_month_plus);
                     $ten_month_plus = date("Y/m/01", strtotime("+1 month", $time_ten_plus));
                     $ten_month_plus_timestamp = strtotime($ten_month_plus);
                     $tenMonthdaysRemaining = (int)date('t', $ten_month_plus_timestamp);
                     $ten_month = $one_day_profit * $tenMonthdaysRemaining;
                     $ten_amount = number_format($ten_month,2);
                     $ten_datetime = date("Y/m/01", strtotime("+1 month", strtotime($nine_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$ten_datetime}','Rental Share from property','{$ten_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                    
                      //elev month
                     $time_elev_plus = strtotime($ten_month_plus);
                     $elev_month_plus = date("Y/m/01", strtotime("+1 month", $time_elev_plus));
                     $elev_month_plus_timestamp = strtotime($elev_month_plus);
                     $elevMonthdaysRemaining = (int)date('t', $elev_month_plus_timestamp);
                     $elev_month = $one_day_profit * $elevMonthdaysRemaining;
                     $elev_amount = number_format($elev_month,2);
                     $elev_datetime = date("Y/m/01", strtotime("+1 month", strtotime($ten_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$elev_datetime}','Rental Share from property','{$elev_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                       //twel month
                     $time_twel_plus = strtotime($time_elev_plus);
                     $twel_month_plus = date("Y/m/01", strtotime("+1 month", $time_twel_plus));
                     $twel_month_plus_timestamp = strtotime($twel_month_plus);
                     $twelMonthdaysRemaining = (int)date('t', $twel_month_plus_timestamp);
                     $twel_month = $one_day_profit * $twelMonthdaysRemaining;
                     $twel_amount = number_format($twel_month,2);
                     $twel_datetime = date("Y/m/01", strtotime("+1 month", strtotime($elev_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$twel_datetime}','Rental Share from property','{$twel_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                      if($query){$data['result']=true;}else{$data['result']=false;}
                      
	            }else{ 
                    //first month	                
                     $timestamp = strtotime($_POST['curr_date']);
	                 $daysRemaining = (int)date('t', $timestamp) - (int)date('j', $timestamp);
                     $first_month = $one_day_profit * $daysRemaining;
                     $first_amount = number_format($first_month,2) ;
                     $first_datetime = date("Y/m/01", strtotime("+1 month", $timestamp)).' '.$_POST['curr_time'];

                    $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$first_datetime}','Rental Share from property','{$first_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                    
                    //second month
                     $time_two_plus = strtotime($_POST['curr_date']);
                     $two_month_plus = date("Y/m/01", strtotime("+1 month", $time_two_plus));
                     $two_month_plus_timestamp = strtotime($two_month_plus);
                     $twoMonthdaysRemaining = (int)date('t', $two_month_plus_timestamp);
                     $second_month = $one_day_profit * $twoMonthdaysRemaining;
                     $second_amount = number_format($second_month,2);
                     $second_datetime = date("Y/m/01", strtotime("+1 month", strtotime($first_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$second_datetime}','Rental Share from property','{$second_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
	                  
	                  //third month
                     $time_three_plus = strtotime($two_month_plus);
                     $three_month_plus = date("Y/m/01", strtotime("+1 month", $time_three_plus));
                     $three_month_plus_timestamp = strtotime($three_month_plus);
                     $threeMonthdaysRemaining = (int)date('t', $three_month_plus_timestamp);
                     $three_month = $one_day_profit * $threeMonthdaysRemaining;
                     $third_amount = number_format($three_month,2);
                     $third_datetime = date("Y/m/01", strtotime("+1 month", strtotime($second_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$third_datetime}','Rental Share from property','{$third_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
     
                      //four month
                     $time_four_plus = strtotime($three_month_plus);
                     $four_month_plus = date("Y/m/01", strtotime("+1 month", $time_four_plus));
                     $four_month_plus_timestamp = strtotime($four_month_plus);
                     $fourMonthdaysRemaining = (int)date('t', $four_month_plus_timestamp);
                     $four_month = $one_day_profit * $fourMonthdaysRemaining;
                     $four_amount = number_format($four_month,2);
                     $four_datetime = date("Y/m/01", strtotime("+1 month", strtotime($third_datetime))).' '.$_POST['curr_time'];

                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$four_datetime}','Rental Share from property','{$four_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                    
                      //fifth month
                     $time_fifth_plus = strtotime($four_month_plus);
                     $fifth_month_plus = date("Y/m/01", strtotime("+1 month", $time_fifth_plus));
                     $fifth_month_plus_timestamp = strtotime($fifth_month_plus);
                     $fifthMonthdaysRemaining = (int)date('t', $fifth_month_plus_timestamp);
                     $fifth_month = $one_day_profit * $fifthMonthdaysRemaining;
                     $fifth_amount = number_format($fifth_month,2);
                     $fifth_datetime = date("Y/m/01", strtotime("+1 month", strtotime($four_datetime))).' '.$_POST['curr_time'];

                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$fifth_datetime}','Rental Share from property','{$fifth_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                      //six month
                     $time_six_plus = strtotime($fifth_month_plus);
                     $six_month_plus = date("Y/m/01", strtotime("+1 month", $time_six_plus));
                     $six_month_plus_timestamp = strtotime($six_month_plus);
                     $sixMonthdaysRemaining = (int)date('t', $six_month_plus_timestamp);
                     $six_month = $one_day_profit * $sixMonthdaysRemaining;
                     $six_amount = number_format($six_month,2);
                     $six_datetime = date("Y/m/01", strtotime("+1 month", strtotime($fifth_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$six_datetime}','Rental Share from property','{$six_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                      //seven month
                     $time_seven_plus = strtotime($six_month_plus);
                     $seven_month_plus = date("Y/m/01", strtotime("+1 month", $time_fifth_plus));
                     $seven_month_plus_timestamp = strtotime($seven_month_plus);
                     $sevenMonthdaysRemaining = (int)date('t', $seven_month_plus_timestamp);
                     $seven_month = $one_day_profit * $sevenMonthdaysRemaining;
                     $seven_amount = number_format($seven_month,2);
                     $seven_datetime = date("Y/m/01", strtotime("+1 month", strtotime($six_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$seven_datetime}','Rental Share from property','{$seven_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                      //eight month
                     $time_eight_plus = strtotime($seven_month_plus);
                     $eight_month_plus = date("Y/m/01", strtotime("+1 month", $time_eight_plus));
                     $eight_month_plus_timestamp = strtotime($eight_month_plus);
                     $eightMonthdaysRemaining = (int)date('t', $eight_month_plus_timestamp);
                     $eight_month = $one_day_profit * $eightMonthdaysRemaining;
                     $eight_amount = number_format($eight_month,2);
                     $eight_datetime = date("Y/m/01", strtotime("+1 month", strtotime($seven_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$eight_datetime}','Rental Share from property','{$eight_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                     //nine month
                     $time_nine_plus = strtotime($eight_month_plus);
                     $nine_month_plus = date("Y/m/01", strtotime("+1 month", $time_nine_plus));
                     $nine_month_plus_timestamp = strtotime($nine_month_plus);
                     $nineMonthdaysRemaining = (int)date('t', $nine_month_plus_timestamp);
                     $nine_month = $one_day_profit * $nineMonthdaysRemaining;
                     $nine_amount = number_format($nine_month,2);
                     $nine_datetime = date("Y/m/01", strtotime("+1 month", strtotime($eight_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$nine_datetime}','Rental Share from property','{$nine_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                     
                     //ten month
                     $time_ten_plus = strtotime($nine_month_plus);
                     $ten_month_plus = date("Y/m/01", strtotime("+1 month", $time_ten_plus));
                     $ten_month_plus_timestamp = strtotime($ten_month_plus);
                     $tenMonthdaysRemaining = (int)date('t', $ten_month_plus_timestamp);
                     $ten_month = $one_day_profit * $tenMonthdaysRemaining;
                     $ten_amount = number_format($ten_month,2);
                     $ten_datetime = date("Y/m/01", strtotime("+1 month", strtotime($nine_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$ten_datetime}','Rental Share from property','{$ten_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                    
                      //elev month
                     $time_elev_plus = strtotime($ten_month_plus);
                     $elev_month_plus = date("Y/m/01", strtotime("+1 month", $time_elev_plus));
                     $elev_month_plus_timestamp = strtotime($elev_month_plus);
                     $elevMonthdaysRemaining = (int)date('t', $elev_month_plus_timestamp);
                     $elev_month = $one_day_profit * $elevMonthdaysRemaining;
                     $elev_amount = number_format($elev_month,2);
                     $elev_datetime = date("Y/m/01", strtotime("+1 month", strtotime($ten_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$elev_datetime}','Rental Share from property','{$elev_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                    if($query){$data['result']=true;}else{$data['result']=false;}
                      //twel month
                     $time_twel_plus = strtotime($time_elev_plus);
                     $twel_month_plus = date("Y/m/01", strtotime("+1 month", $time_twel_plus));
                     $twel_month_plus_timestamp = strtotime($twel_month_plus);
                     $twelMonthdaysRemaining = (int)date('t', $twel_month_plus_timestamp);
                     $twel_month = $one_day_profit * $twelMonthdaysRemaining;
                     $twel_amount = number_format($twel_month,2);
                     $twel_datetime = date("Y/m/01", strtotime("+1 month", strtotime($elev_datetime))).' '.$_POST['curr_time'];
                     $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$twel_datetime}','Rental Share from property','{$twel_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                      if($query){$data['result']=true;}else{$data['result']=false;}
                    
                      //thir month
                     $time_thir_plus = strtotime($_POST['curr_date']);
                     $thir_month_plus = date("Y/m/d", strtotime("+13 month", $time_thir_plus));
                     $thir_month_plus_timestamp = strtotime($thir_month_plus);
                     $thirMonthdaysEnd = date('d', $thir_month_plus_timestamp);
                     $thir_month = $one_day_profit * $thirMonthdaysEnd;
                     $thirt_amount = number_format($thir_month,2);
                      $query = mysqli_query($conn,"insert into deposit_request(contact_id,booking_id,listing_id,purchaser_id,
                     amount_type,datetime,description,amount,oru_id,status,scale) values('{$random_number}',1,'{$_POST['prop_id']}',
                     '{$_POST['invoice_id']}','Owner Share','{$thir_month_plus}','Rental Share from property','{$thirt_amount}','{$_POST['user_id']}',0,'{$upscale}')") or die(mysqli_error($conn));
                      if($query){$data['result']=true;}else{$data['result']=false;}
	            }
	        break;
	        
	        case 'check_account_activation':
	            $query = mysqli_query($conn,"select * from e_users where user_id='{$_POST['user_id']}' and (admin_active='1' OR admin_active=1)");
	            if(mysqli_num_rows($query)>0){
	                $data['result']=true;
	            }else{
	               $data['result']=false; 
	            }
	        break;
	        
	        case 'update_account_type':
	            $curr_date = date('Y-m-d H:i:s');
	            mysqli_query($conn,"update e_users set itype='{$_POST['acc_type']}' where user_id='{$_POST['user_id']}'");
	            $query = mysqli_query($conn,"insert into e_history (history_comment,history_date,user_id) values ('User updated account type to {$_POST['acc_type']}','{$curr_date}','{$_POST['user_id']}')") or die(mysqli_error($conn));
	            if($query){
	                $data['result'] = true;
	            }else{
	                $data['result'] = false;
	            }
	         break;
	         
	         case 'update_password':
	             $curr_pass = hash('sha256',$_POST['curr_pass']);
	             $new_pass = hash('sha256',$_POST['new_pass']);
	             $chk = mysqli_query($conn,"select * from e_users where user_id='{$_POST['user_id']}' and user_password='{$curr_pass}'");
	             if(mysqli_num_rows($chk)>0){
	                 $data['result'] = true;
	                 mysqli_query($conn,"update e_users set user_password='{$new_pass}' where user_id='{$_POST['user_id']}'");
	             }else{
	              $data['result'] = false;
	              $data['message'] = 'Your current password is wrong';   
	             }
	         break;
	         
	         case 'update_phone':
	             mysqli_query($conn,"update e_users set user_mobile='{$_POST['phone']}' where user_id='{$_POST['user_id']}'");
	         break;
	         
	         case 'set_security':
	            $query = mysqli_query($conn,"select * from e_security where user_id='{$_POST['user_id']}'");
	            $data['column'] = $_POST['column'];
	            if(mysqli_num_rows($query)>0){
	                $query = mysqli_query($conn,"update e_security set {$_POST['column']} = '{$_POST['value']}' where user_id='{$_POST['user_id']}'") or die(mysqli_error($conn));
	                if($query) {$data['result'] = true;} else { $data['result'] = false; }     
	            }else{
	               $query = mysqli_query($conn,"insert into e_security({$_POST['column']},user_id) values ('{$_POST['value']}','{$_POST['user_id']}')") or die(mysqli_error($conn));
	               if($query) {$data['result'] = true;} else { $data['result'] = false; }
	            }
	         break;
	         
	         case 'get_security':
	            $query = mysqli_query($conn,"select * from e_security where user_id='{$_POST['user_id']}'");
	            if(mysqli_num_rows($query)>0){
	                $data['result'] = true;
	                $data['security'] = mysqli_fetch_assoc($query);
	            }else{
	              $data['result'] = false;  
	            }
	         break;
	         
	         case 'gen_qr_code':
                $ga = new PHPGangsta_GoogleAuthenticator();
                $get_email = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_users where user_id='{$_POST['user_id']}'"));
                $secret = $ga->createSecret();
                $data['secret'] = $secret;
               // $qrCodeUrl = "http://chart.apis.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/{$get_email['user_email']} (Vairt)%3Fsecret%3D{$secret}";
                $qrCodeUrl = $ga->getQRCodeGoogleUrl('Vairt ('.$get_email['user_email'].')', $secret);
                $data['chart'] =$qrCodeUrl;
	         break;
	         
	         case 'authenticate':
	             $ga = new PHPGangsta_GoogleAuthenticator();
	             $secret = $_POST['secret'];
	             $oneCode = $_POST['code'];
                $checkResult = $ga->verifyCode($secret, $oneCode, 2);    // 2 = 2*30sec clock tolerance
                if ($checkResult) {
                 $data['code'] =  'OK';
                 mysqli_query($conn,"update e_users set secrets='{$secret}' where user_id='{$_POST['user_id']}'");
                } else {
                $data['code'] =  'FAILED';
                }
             break;
             
             case 'google_auth_on':
                 $secret = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_users where user_id='{$_POST['user_id']}'"));
                 $data['secret'] = $secret['secrets'];
                 if(!empty($secret['secrets'])){
                 $ga = new PHPGangsta_GoogleAuthenticator();
	             $secret = $secret['secrets'];
	             $oneCode = $_POST['code'];
                $checkResult = $ga->verifyCode($secret, $oneCode, 2);    // 2 = 2*30sec clock tolerance
                if ($checkResult) {
                 $data['code'] =  'OK';
                } else {
                $data['code'] =  'FAILED';
                }
                }else{
                  $data['code'] =  'No';  
                }
             break;
             
             case 'add_ticket':
                 $dateadded = date('Y-m-d H:i:s');
                 $query = mysqli_query($conn,"insert into support (help_type,title,priority,descriptions,status,dateadded,user_id) values 
                 ('{$_POST['help_with']}','{$_POST['title']}','{$_POST['priority']}','{$_POST['description']}','0',
                 '{$dateadded}','{$_POST['user_id']}')") or die(mysqli_error($conn));
                 if($query){
                     $data['result'] = true;
                     $support_id = mysqli_insert_id($conn);
                     if($_POST['image']!='assets/images/not-found.png'){
                      $front_img = image_resize_str($_POST['image'], 320, 'support_img', $_POST['user_id']);
                      mysqli_query($conn,"insert into support_images(support_id,image) values ('{$support_id}','{$front_img}')");
                     }
                 }else{
                     $data['result'] = false;
                 }
             break;
             
             case 'get_tickets':
                 $query = mysqli_query($conn,"select * from support where user_id='{$_POST['user_id']}'");
                 $tickets_unres = mysqli_query($conn,"select * from support where user_id='{$_POST['user_id']}' and status='0'"); 
                 $tickets_new = mysqli_query($conn,"SELECT * FROM `support` where user_id='{$_POST['user_id']}' and seen=0 order by id desc limit 10 ");
                 $i = 0;
                 while($row = mysqli_fetch_assoc($query)){
                     $data['support'][$i]['id'] = $row['id'];
                     $data['support'][$i]['title'] = $row['title'];
                     $data['support'][$i]['des'] = $row['descriptions'];
                     $data['support'][$i]['priority'] = $row['priority'];
                     $data['support'][$i]['dateadded'] = $row['dateadded'];
                     if($row['status'] == 0){
                      $data['support'][$i]['status'] = 'Pending';   
                     }if($row['status'] == 1){
                      $data['support'][$i]['status'] = 'Resolved';   
                     }
                     $data['unresolved'] = mysqli_num_rows($tickets_unres);
                     $data['tickets'] = mysqli_num_rows($tickets_new);
                     $img = mysqli_fetch_assoc(mysqli_query($conn,"select * from support_images where support_id='{$row['id']}'"));
                     $data['support'][$i]['image'] = $root.$img['image'];
                     $i++;
                 }
             break;
             
             case 'support_comment':
                 $date = date('Y-m-d H:i:s');
                 $query = mysqli_query($conn,"insert into support_comments (support_id,sender,dateadded,comments) values ('{$_POST['support_id']}',
                 '{$_POST['user_id']}','{$date}','{$_POST['comment']}')");
                 if($query){
                     $data['result'] = true;
                 }else{
                   $data['result'] = false;  
                 }
             break;
             
             case 'get_support_comment':
                $query = mysqli_query($conn,"select * from support_comments where support_id='{$_POST['support_id']}'");
                 $i=0;
                 while($row=mysqli_fetch_assoc($query)){
                      $user = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_users where user_id='{$row['sender']}'"));
                        $data['comment'][$i]['comments'] = $row['comments'];
                        $data['comment'][$i]['datetime'] = $row['dateadded'];
                        $data['comment'][$i]['username'] = $user['user_fname'].' '.$user['user_lname'];
                        $i++;
                 }
              break;
              
              case 'get_bank_detail':
                 $data_bank = mysqli_fetch_assoc(mysqli_query($conn,"select * from banks where user_id='{$_POST['user_id']}'"));
                 $data['bank'] = $data_bank;
              break;
              
                case 'update_bank_detail':
	             $check = mysqli_query($conn,"select * from banks where user_id='{$_POST['user_id']}'");
	             if(mysqli_num_rows($check)>0){
	               mysqli_query($conn,"update banks set bank_name='{$_POST['bank_name']}',iban='{$_POST['iban']}', account='{$_POST['bank_account']}',
	               branch='{$_POST['branch_name']}',bank_address='{$_POST['address']}',title='{$_POST['holder_name']}' where 
	               user_id='{$_POST['user_id']}'");
	             }else{
	             mysqli_query($conn,"insert into banks(bank_name,iban,account,branch,bank_address,title,user_id) 
	            values ('{$_POST['bank_name']}','{$_POST['iban']}','{$_POST['bank_account']}','{$_POST['branch_name']}'
	            ,'{$_POST['address']}','{$_POST['holder_name']}','{$_POST['user_id']}')");
	           }
	         break;
	         
	         case 'get_active_inves':
	            $query = mysqli_query($conn,"select * from invoice where admin_approval='1' and status='1' and user_id='{$_POST['user_id']}'");
	            $total = 0;
	            $i=0;
	            while($row=mysqli_fetch_assoc($query)){
	                $total = $total+$row['amount'];
	                $data['amount'] = $total;
	                $property = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_property where id='{$row['property_id']}'"));
	             $photo = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_photos where temp_id='{$row['property_id']}'"));
	             $additional_row_all = mysqli_fetch_assoc(mysqli_query($conn,"select * from additional_info where property_id='{$row['property_id']}'"));
	             $data['property'][$i]['title'] = $property['property_title'];
	             $data['property'][$i]['shares'] = $row['share_amount'];
	             $data['property'][$i]['amount'] = $row['amount'];
	             $data['property'][$i]['stages'] = $row['stages'];
	             $data['property'][$i]['address'] = $property['address'];
	             $data['property'][$i]['date_added'] = $row['dateadded'];
	             $data['property'][$i]['invoice_id'] = $row['id'];
	             $data['property'][$i]['property_id'] = $row['property_id'];
	               $query_photos = mysqli_query($conn,"select * from e_photos where temp_id='{$row['property_id']}'");
	               $j=0;
	               while($row_photos = mysqli_fetch_assoc($query_photos)){
	                  $data['property'][$i]['property_images'][$j] = $property_photos.$row_photos['name'];
	                  $j++;
	               }
	             $no_of_inv = mysqli_query($conn,"select * from purchaser where property_id='{$row['id']}' and status=1 and stages=10");
	             $purchaser_data = mysqli_fetch_assoc($no_of_inv);
	             $remaining_share = $additional_row_all['number_of_shares'] - $purchaser_data['amount_reserved'];
                 $data['property'][$i]['remaining_share'] = $remaining_share;
	             $expected_row = mysqli_query($conn,"select sum(charges) AS charge from other_charges where property_id='{$row['property_id']}'");
	             $expected_charge = mysqli_fetch_assoc($expected_row);
	              if($additional_row_all['number_of_shares']){
                    $property_price_per_share = ($additional_row_all['initial_investment']/$additional_row_all['number_of_shares']);
                    $purchase_cost_per_share = (($expected_charge['charge'])/$additional_row_all['number_of_shares']);
                    $transaction_cost_per_share = (($additional_row_all['vairt_fee']+$additional_row_all['vat'])/$additional_row_all['number_of_shares']);
                  }else{
                    $property_price_per_share=0;
                    $purchase_cost_per_share=0;
                    $transaction_cost_per_share=0;
                 }
                 $purchase_price = $property_price_per_share + $transaction_cost_per_share;
                  $data['property'][$i]['purchase_price'] = $property_price_per_share + $transaction_cost_per_share;
                    $total_cost=0;
                    $other_charges =  mysqli_query($conn,"select * from other_charges where property_id='{$row['property_id']}'");
                    while($charges_row=mysqli_fetch_assoc($other_charges)){
                    $total_cost = $total_cost+$charges_row['charges'];
                    }
                  $init_inv = $additional_row_all['initial_investment'];
                  $trans_cost = $additional_row_all['vairt_fee']+$additional_row_all['vat'];
                  $data['property'][$i]['property_value'] = number_format($total_cost+$init_inv+$trans_cost,2,".", "");
                  $data['property'][$i]['price'] =  $row['share_amount'] * $property_price_per_share;

	            $i++;
	            }
	         break;
	         
	          case 'get_pending_inves':
	            $query = mysqli_query($conn,"select * from invoice where admin_approval='0' and status='1' and user_id='{$_POST['user_id']}'");
	            $total = 0;
	            $i=0;
	            while($row=mysqli_fetch_assoc($query)){
	                   $total = $total+$row['amount'];
	                   $data['amount'] = $total;
	               
	             $property = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_property where id='{$row['property_id']}'"));
	             $photo = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_photos where temp_id='{$row['property_id']}'"));
	             $additional_row_all = mysqli_fetch_assoc(mysqli_query($conn,"select * from additional_info where property_id='{$row['property_id']}'"));
	             $data['property'][$i]['title'] = $property['property_title'];
	             $data['property'][$i]['shares'] = $row['share_amount'];
	             $data['property'][$i]['amount'] = $row['amount'];
	             $data['property'][$i]['stages'] = $row['stages'];
	             $data['property'][$i]['address'] = $property['address'];
	             $data['property'][$i]['date_added'] = $row['dateadded'];
	             $data['property'][$i]['invoice_id'] = $row['id'];
	             $data['property'][$i]['property_id'] = $row['property_id'];
	               $query_photos = mysqli_query($conn,"select * from e_photos where temp_id='{$row['property_id']}'");
	               $j=0;
	               while($row_photos = mysqli_fetch_assoc($query_photos)){
	                  $data['property'][$i]['property_images'][$j] = $property_photos.$row_photos['name'];
	                  $j++;
	               }
	             $no_of_inv = mysqli_query($conn,"select * from purchaser where property_id='{$row['id']}' and status=1 and stages=10");
	             $purchaser_data = mysqli_fetch_assoc($no_of_inv);
	             $remaining_share = $additional_row_all['number_of_shares'] - $purchaser_data['amount_reserved'];
                 $data['property'][$i]['remaining_share'] = $remaining_share;
	             $expected_row = mysqli_query($conn,"select sum(charges) AS charge from other_charges where property_id='{$row['property_id']}'");
	             $expected_charge = mysqli_fetch_assoc($expected_row);
	              if($additional_row_all['number_of_shares']){
                    $property_price_per_share = ($additional_row_all['initial_investment']/$additional_row_all['number_of_shares']);
                    $purchase_cost_per_share = (($expected_charge['charge'])/$additional_row_all['number_of_shares']);
                    $transaction_cost_per_share = (($additional_row_all['vairt_fee']+$additional_row_all['vat'])/$additional_row_all['number_of_shares']);
                  }else{
                    $property_price_per_share=0;
                    $purchase_cost_per_share=0;
                    $transaction_cost_per_share=0;
                 }
                 $purchase_price = $property_price_per_share + $transaction_cost_per_share;
                  $data['property'][$i]['purchase_price'] = $property_price_per_share + $transaction_cost_per_share;
                    $total_cost=0;
                    $other_charges =  mysqli_query($conn,"select * from other_charges where property_id='{$row['property_id']}'");
                    while($charges_row=mysqli_fetch_assoc($other_charges)){
                    $total_cost = $total_cost+$charges_row['charges'];
                    }
                  $init_inv = $additional_row_all['initial_investment'];
                  $trans_cost = $additional_row_all['vairt_fee']+$additional_row_all['vat'];
                  $data['property'][$i]['property_value'] = number_format($total_cost+$init_inv+$trans_cost,2,".", "");
                  $data['property'][$i]['price'] =  $row['share_amount'] * $property_price_per_share;

	            $i++;
	            }
	         break;
	         
	         
	         case 'my_properties':
	            $query = mysqli_query($conn,"select * from invoice where user_id='{$_POST['user_id']}'");
	            $total = 0;
	            $i=0;
	            while($row=mysqli_fetch_assoc($query)){
	                   $total = $total+$row['amount'];
	                   $data['amount'] = $total;
	               
	             $property = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_property where id='{$row['property_id']}'"));
	             $photo = mysqli_fetch_assoc(mysqli_query($conn,"select * from e_photos where temp_id='{$row['property_id']}'"));
	             $additional_row_all = mysqli_fetch_assoc(mysqli_query($conn,"select * from additional_info where property_id='{$row['property_id']}'"));
	             $data['property'][$i]['title'] = $property['property_title'];
	             $data['property'][$i]['shares'] = $row['share_amount'];
	             $data['property'][$i]['amount'] = $row['amount'];
	             $data['property'][$i]['stages'] = $row['stages'];
	             $data['property'][$i]['address'] = $property['address'];
	             $data['property'][$i]['date_added'] = $row['dateadded'];
	             $data['property'][$i]['invoice_id'] = $row['id'];
	             $data['property'][$i]['property_id'] = $row['property_id'];
	               $query_photos = mysqli_query($conn,"select * from e_photos where temp_id='{$row['property_id']}'");
	               $j=0;
	               while($row_photos = mysqli_fetch_assoc($query_photos)){
	                  $data['property'][$i]['property_images'][$j] = $property_photos.$row_photos['name'];
	                  $j++;
	               }
	             $no_of_inv = mysqli_query($conn,"select * from purchaser where property_id='{$row['id']}' and status=1 and stages=10");
	             $purchaser_data = mysqli_fetch_assoc($no_of_inv);
	             $remaining_share = $additional_row_all['number_of_shares'] - $purchaser_data['amount_reserved'];
                 $data['property'][$i]['remaining_share'] = $remaining_share;
	             $expected_row = mysqli_query($conn,"select sum(charges) AS charge from other_charges where property_id='{$row['property_id']}'");
	             $expected_charge = mysqli_fetch_assoc($expected_row);
	              if($additional_row_all['number_of_shares']){
                    $property_price_per_share = ($additional_row_all['initial_investment']/$additional_row_all['number_of_shares']);
                    $purchase_cost_per_share = (($expected_charge['charge'])/$additional_row_all['number_of_shares']);
                    $transaction_cost_per_share = (($additional_row_all['vairt_fee']+$additional_row_all['vat'])/$additional_row_all['number_of_shares']);
                  }else{
                    $property_price_per_share=0;
                    $purchase_cost_per_share=0;
                    $transaction_cost_per_share=0;
                 }
                 $purchase_price = $property_price_per_share + $transaction_cost_per_share;
                  $data['property'][$i]['purchase_price'] = $property_price_per_share + $transaction_cost_per_share;
                    $total_cost=0;
                    $other_charges =  mysqli_query($conn,"select * from other_charges where property_id='{$row['property_id']}'");
                    while($charges_row=mysqli_fetch_assoc($other_charges)){
                    $total_cost = $total_cost+$charges_row['charges'];
                    }
                  $init_inv = $additional_row_all['initial_investment'];
                  $trans_cost = $additional_row_all['vairt_fee']+$additional_row_all['vat'];
                  $data['property'][$i]['property_value'] = number_format($total_cost+$init_inv+$trans_cost,2,".", "");
                  $data['property'][$i]['price'] =  $row['share_amount'] * $property_price_per_share;

	            $i++;
	            }
	         break;
	         
	         case 'get_transaction':
	             $query = mysqli_query($conn,"SELECT * FROM `deposit_request` WHERE oru_id='{$_POST['user_id']}' order by id desc limit 10");
	             $i=0;
	             $upscale= hash('sha256','Credit');
	             while($row = mysqli_fetch_assoc($query)){
	                 if($row['amount_type'] == 'Owner Share' and ($row['status'] == 1 or $row['status'] == 2) and $row['listing_id'] > 0){
	                 $data['transaction'][$i]['date'] = $row['datetime'];
	                 $data['transaction'][$i]['trx_id'] = $row['trx_id'];
	                 $data['transaction'][$i]['description'] = $row['description'];
	                 $data['transaction'][$i]['amount'] = $row['amount'];
	                 if($row['scale']==$upscale){
	                  $data['transaction'][$i]['c_type'] = 'Credit';   
	                 }else{
	                   $data['transaction'][$i]['c_type'] = 'Debit';   
	                 }if($row['status']=='1'){
	                   $data['transaction'][$i]['status'] = 'Approved';  
	                 }else{
	                     $data['transaction'][$i]['status'] = 'Rejected';
	                 }
	                 $i++;
	                 }
	             }
	         break;
	         
	           case 'all_transaction':
	             $query = mysqli_query($conn,"SELECT * FROM `deposit_request` WHERE oru_id='{$_POST['user_id']}'");
	             $i=0;
	             $upscale= hash('sha256','Credit');
	             while($row = mysqli_fetch_assoc($query)){
	                 if($row['amount_type'] == 'Owner Share' and ($row['status'] == 1 or $row['status'] == 2) and $row['listing_id'] > 0){
	                 $data['transaction'][$i]['date'] = $row['datetime'];
	                 $data['transaction'][$i]['trx_id'] = $row['trx_id'];
	                 $data['transaction'][$i]['description'] = $row['description'];
	                 $data['transaction'][$i]['amount'] = $row['amount'];
	                 if($row['scale']==$upscale){
	                  $data['transaction'][$i]['c_type'] = 'Credit';   
	                 }else{
	                   $data['transaction'][$i]['c_type'] = 'Debit';   
	                 }if($row['status']=='1'){
	                   $data['transaction'][$i]['status'] = 'Approved';  
	                 }else{
	                     $data['transaction'][$i]['status'] = 'Rejected';
	                 }
	                 $i++;
	                 }
	             }
	         break;
	         
	         case 'total_gains':
	            $query =  mysqli_query($conn,"select * from `deposit_request` WHERE amount_type='Owner Share' and status = '1' and oru_id='{$_POST['user_id']}'");
	            $sum = 0;
	            while($row=mysqli_fetch_assoc($query)){
	                $sum = $sum+$row['amount'];
	                $data['gains'] = $sum;
	            }
	         break;
	         
	          case 'update_refferal_name':
	            $query =  mysqli_query($conn,"select * from e_users where referral='{$_POST['refferal']}'");
	            if(mysqli_num_rows($query)>0){
	                $data['result']=false;
	            }else{
	               $query1 = mysqli_query($conn,"update e_users set referral='{$_POST['refferal']}' where user_id='{$_POST['user_id']}'");
	               if($query1){
	                $data['result']=true;     
	               }else{
	                $data['result']=false;   
	               }
	            }
	         break;
       }
     }
echo json_encode($data,JSON_UNESCAPED_UNICODE);
file_put_contents("test.txt", "********************************\n",FILE_APPEND);
file_put_contents("test.txt", print_r($_POST, true),FILE_APPEND);
file_put_contents("test.txt", print_r($data, true),FILE_APPEND);
?>
