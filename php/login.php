<?php
	header('content-type:text/html;charset=utf-8');
	define('HOST','localhost');
	define('USERNAME','root');
	define('PASSWORD','rootyk');
	define('DB','user');
	$sql = @new mysqli(HOST,USERNAME,PASSWORD,DB);
	$sql->query('set names utf8');
	
	
	if($_POST['username']&&$_POST['password']){
		$name=$_POST['username'];
		$word=$_POST['password'];
		$result = $sql->query("select * from logininfo where username='$name' and password='$word'");
		$newarr = array();
		if($result->num_rows){
			for($i=0;$i<$result->num_rows;$i++){
				$newarr[$i] = $result->fetch_assoc();
			}
			echo 'true';
		}else echo 'false';
		
	}
?>