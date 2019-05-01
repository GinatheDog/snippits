<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Notifications</title>
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <style>
	#code_area{
		display:none;			
	}
	#message{
		opacity: 0.5;			
	}
	body { 
	  background: url(../assets/photo/background.jpg) no-repeat center center fixed;
	  -webkit-background-size: cover;
	  -moz-background-size: cover;
	  -o-background-size: cover;
	  background-size: cover;
	}
    </style>
</head>

<body>
	<div class="container">
		<div class="row">
			<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
				</div>
						<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
							<br><br>
							<form id="myForm" action="AppActivateERP.php" method="post">
									<textarea class="form-control" id="message" name="message" rows="18" placeholder ="Please insert your message here..."></textarea>
									<br>
									<button type="button" onclick="postTimeEvent();" class="btn btn-success btn-lg btn-block">Send ERP Activation</button>
							</form>
						</div>
					<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
				</div>
			</div>
		</div>

	<div id = 'code_area'>
		<?php								
			function sendMessage($message){													 		
			    $content = array(
			        "en" => $message
			    );

			    $headings = array(
			        "en" => 'Internal test'
			    );

			    $fields = array(
			        'app_id' => "XXXXXXXXXXXXXXXXX",
					'ios_badgeType' => 'SetTo',
					'ios_badgeCount' => '1',
					'ios_sound' => 'messagealert.wav',
			        'included_segments' => array('All'),
			        'headings' => $headings,
			        'contents' => $content
			    );
			
			    $fields = json_encode($fields);
			
			    print("\nJSON sent:\n");
			    print($fields);
			
			    $ch = curl_init();
			    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
			    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			            'Content-Type: application/json; charset=utf-8',
			            'Authorization: Basic XXXXXXXXXXXXXXXXX'
			        )
			    );
			    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
			    curl_setopt($ch, CURLOPT_HEADER, FALSE);
			    curl_setopt($ch, CURLOPT_POST, TRUE);
			    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
			    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
			
			    $response = curl_exec($ch);
			    curl_close($ch);
			
			    return $response; 			   	    
			}
			
			$response = sendMessage($_POST['message']);
			
			$return["allresponses"] = $response;
			$return = json_encode( $return);
			
			print("\n\nJSON received:\n");
			print($return);
			print("\n");
		?>		
	</div>
	<script>
	    function postTimeEvent() {
	        var event_log = document.getElementById("message").value;
	        var dataString = 'event_log=' + event_log;
	        if (event_log == '')
	        {
	            alert("Please Fill All Fields");
	        }
	        else
	        {
	            $.ajax({
	                type: "POST",
	                url: "ajax.php",
	                data: dataString,
	                cache: false,
	                success: function(html) {
	                    alert(html);
	                    $('#myForm').submit();
	                }
	            });
	        }
	        //return false;
	    }       
	</script>
 </body>
</html>
