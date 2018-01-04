<?php

	// site owner
	$site_name = "Abraham's CV";
	$sender_domain = 'server@abaracus.com';
	$to = 'abraham@abaracus.com';
	
	
	// contact form fields and recaptcha
	$name = trim( $_POST['name'] );
	$email = trim( $_POST['email'] );
	$subject = trim( $_POST['subject'] );
	$message = trim( $_POST['message'] );
	//$response = $_POST["g-recaptcha-response"];
	
	//$url = 'https://www.google.com/recaptcha/api/siteverify';
	//$data = array(
	//	'secret' => '6LeKhR8UAAAAABiLSLd7BleRPAf2CW-B2qfwJYCn',
	//	'response' => $_POST["g-recaptcha-response"]
	//);
	
	//$options = array(
	//'http' => array (
	//	'method' => 'POST',
	//	'content' => http_build_query($data)
	//	)
	//);
	//$context  = stream_context_create($options);
	//$verify = file_get_contents($url, false, $context);
	//$captcha_success=json_decode($verify);
	
	//&& $captcha_success->success==true 
	
	// check for error
	$error = false;
	
	if ( $name === "" ) { $error = true; }
	
	if ( $email === "" ) { $error = true; }
	
	if ( $subject === "" ) { $error = true; }
	
	if ( $message === "" ) { $error = true; }
	
	
	// if no error, then send mail
	if ( $error == false )
	{
		$body = "Name: $name \n\nEmail: $email \n\nMessage: $message";
		
		$headers = "From: " . $site_name . ' <' . $sender_domain . '> ' . "\r\n";
		$headers .= "Reply-To: " . $name . ' <' . $email . '> ' . "\r\n";
		
		$mail_result = mail( $to, $subject, $body, $headers );
		
		if ( $mail_result == true)
		{
			echo 'success';
		}
		else
		{
			echo 'unsuccess';
		}
		// end if
	}
	else
	{
		echo 'error';
	}
	// end if

?>