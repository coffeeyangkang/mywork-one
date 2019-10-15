<?php	
	header('content-type:text/html;charset=utf-8');
	define('HOST','localhost');
	define('USERNAME','root');
	define('PASSWORD','rootyk');
	define('DB','goods');
	$sql = @new mysqli(HOST,USERNAME,PASSWORD,DB);
	$sql->query('set names utf8');
	
	$result = $sql->query("select * from activitycla");
	$newarr=array();
	if($_POST['theme']=='autumn'){
	if($result->num_rows){
		for($i=0;$i<$result->num_rows;$i++){
			$newarr[$i] = $result->fetch_assoc();
		}
	}
	echo json_encode($newarr);
	}
	
	if($_POST['pics']=='five'){
	$result = $sql->query("select * from seasonalact");
	$newarr2=array();
	if($result->num_rows){
		for($i=0;$i<$result->num_rows;$i++){
			$newarr2[$i] = $result->fetch_assoc();
		}
	}
	echo json_encode($newarr2);
	}
	if($_POST['daogou']=='yes'){
	$result = $sql->query("select * from catfirimg");
	$newarr3=array();
	if($result->num_rows){
		for($i=0;$i<$result->num_rows;$i++){
			$newarr3[$i] = $result->fetch_assoc();
		}
	}
	echo json_encode($newarr3);
	}
?>