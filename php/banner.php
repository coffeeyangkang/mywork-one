<?php	
	header('content-type:text/html;charset=utf-8');
	define('HOST','localhost');
	define('USERNAME','root');
	define('PASSWORD','rootyk');
	define('DB','goods');
	$sql = @new mysqli(HOST,USERNAME,PASSWORD,DB);
	$sql->query('set names utf8');
	
	$result = $sql->query("select * from banners");
	$newarr=array();
	if($result->num_rows){
		for($i=0;$i<$result->num_rows;$i++){
			$newarr[$i] = $result->fetch_assoc();
		}
	}
	echo json_encode($newarr);
?>