<?php
	header('content-type:text/html;charset=utf-8');
	define('HOST','localhost');
	define('USERNAME','root');
	define('PASSWORD','rootyk');
	define('DB','goods');
	$sql = @new mysqli(HOST,USERNAME,PASSWORD,DB);
	$sql->query('set names utf8');
	
	
	if($_POST['small']=='yes'){
		$result = $sql->query("select * from smallpics where goodid=$_POST[id]");
		$newarr=array();
	if($result->num_rows){
		for($i=0;$i<$result->num_rows;$i++){
			$newarr[$i] = $result->fetch_assoc();
		}
	}
	echo json_encode($newarr);
	}
?>