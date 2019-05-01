<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("../lib/config.php");

try {
  $pdoconn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
   // set the PDO error mode to exception
  $pdoconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   // echo "Connected successfully"; 
	$result = array();
	$queryCorpContacts = $pdoconn->query("SELECT name, position, phone, cell, sms, email, other, area FROM corp_contacts ORDER BY number");
	$result['corpContacts'] = $queryCorpContacts->fetchAll(PDO::FETCH_ASSOC);

	$queryFieldContacts = $pdoconn->query("SELECT name, position, phone, cell, sms, email, other, area FROM field_contacts ORDER BY number");
	$result['fieldContacts'] = $queryFieldContacts->fetchAll(PDO::FETCH_ASSOC);	

	$queryGovernmentContacts = $pdoconn->query("SELECT resource, contact, phone, cell, area FROM government ORDER BY number");
	$result['governmentContacts'] = $queryGovernmentContacts->fetchAll(PDO::FETCH_ASSOC);

	$queryEmergencyServices = $pdoconn->query("SELECT contact, area, phone, cell FROM emergency_services ORDER BY number");
	$result['emergencyServices'] = $queryEmergencyServices->fetchAll(PDO::FETCH_ASSOC);

	$queryIndustrySupport = $pdoconn->query("SELECT contact, area, phone, cell FROM industry_support_services ORDER BY number");
	$result['industrySupport'] = $queryIndustrySupport->fetchAll(PDO::FETCH_ASSOC);

	$queryStarsSite = $pdoconn->query("SELECT * FROM stars");
	$result['starsSite'] = $queryStarsSite->fetchAll(PDO::FETCH_ASSOC);
	
	$queryMedia = $pdoconn->query("SELECT title, media_statement FROM media");
	$result['media'] = $queryMedia->fetchAll(PDO::FETCH_ASSOC);		
	
	$queryEmergencySteps = $pdoconn->query("SELECT step_name, instructions, cell, phone FROM emergency_steps");
	$result['emergencySteps'] = $queryEmergencySteps->fetchAll(PDO::FETCH_ASSOC);
	
	$querynavLocations = $pdoconn->query("SELECT latlngloc, locname FROM poi_navigate");
	$result['nav'] = $querynavLocations->fetchAll(PDO::FETCH_ASSOC);

	//echo json_encode($result);
	echo str_replace('-', '', json_encode($result));
    }

catch(PDOException $e)
    {
    echo "Connection failed: " . $e->getMessage();
    }

?>
