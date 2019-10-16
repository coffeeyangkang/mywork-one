<?php
	header('content-type:text/html;charset=utf-8');
	define('HOST','localhost');
	define('USERNAME','root');
	define('PASSWORD','rootyk');
	define('DB','goods');
	$sql = @new mysqli(HOST,USERNAME,PASSWORD,DB);
	$sql->query('set names utf8');
	
	if($_POST['handle']=='yes'){
		$id = $_POST['id'];
		$id = explode(',',$id);
		$newarr = array();
		
		for($i=0;$i<sizeof($id);$i++){
			$result     = $sql->query("select * from smallpics where goodid=$id[$i] ");
			$newarr[$i] = $result->fetch_assoc();
		}
		
		echo json_encode($newarr);
	}
	
	if($_POST['handle']=='insert'){
		$name=$_POST['name'];
		$id  =$_POST['id'];
		$num =$_POST['num'];
		$url =$_POST['url'];
		$price=$_POST['price'];
		$des =$_POST['description'];
		$result = $sql->query("select * from collection where goodid='$id'");
		if($result->num_rows) $sql->query("update collection set username='$name',goodnum='$num',price='$price'");
		else $sql->query("insert collection(username,goodid,goodnum,smaurl,price,description) values('$name','$id','$num','$url','$price','$des')");
		
	}
	
	if($_POST['handle']=='open'){
		$newarr = array();
		$result = $sql->query("select * from collection");
		if($result->num_rows){
			for($i=0;$i<$result->num_rows;$i++){
				$newarr[$i] = $result->fetch_assoc();
			} 
		}
		echo json_encode($newarr);
	}
	
?>