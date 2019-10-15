<?php
	header('content-type:text/html;charset=utf-8');
	define('HOST','localhost');
	define('USERNAME','root');
	define('PASSWORD','rootyk');
	define('DB','goods');
	$sql = @new mysqli(HOST,USERNAME,PASSWORD,DB);
	$sql->query('set names utf8');
	
	
	if($_POST['wall']=='wall'){
		$result = $sql->query("select * from wall");
		$newarr=array();
	if($result->num_rows){
		for($i=0;$i<$result->num_rows;$i++){
			$newarr[$i] = $result->fetch_assoc();
		}
	}
	echo json_encode($newarr);
	}
	if($_POST['market']=='tm'){
		$result = $sql->query("select * from tmmarket ");
		$newarr2=array();
	if($result->num_rows){
		for($i=0;$i<$result->num_rows;$i++){
			$newarr2[$i] = $result->fetch_assoc();
		}
	}
	echo json_encode($newarr2);
	}
?>