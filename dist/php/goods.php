<?php
	header('content-type:text/html;charset=utf-8');
	define('HOST','localhost');
	define('USERNAME','root');
	define('PASSWORD','rootyk');
	define('DB','goods');
	$sql = @new mysqli(HOST,USERNAME,PASSWORD,DB);
	$sql->query('set names utf8');
	
	if($_POST['tmgj']=='yes'){
		$result = $sql->query("select * from tminternational");
		$newarr=array();
	if($result->num_rows){
		for($i=0;$i<$result->num_rows;$i++){
			$newarr[$i] = $result->fetch_assoc();
		}
	}
	echo json_encode($newarr);
	}
	
	//从beauty数据表中获取数据
	if($_POST['beauty']=='yes'){
		$result = $sql->query("select * from beauty");
		$newarr=array();
	if($result->num_rows){
		for($i=0;$i<$result->num_rows;$i++){
			$newarr[$i] = $result->fetch_assoc();
		}
	}
	echo json_encode($newarr);
	}

	//从品牌潮店表中获取数据
	if($_POST['ppcd']=='yes'){
		$result = $sql->query("select * from electronics");
			$newarr=array();
		if($result->num_rows){
			for($i=0;$i<$result->num_rows;$i++){
				$newarr[$i] = $result->fetch_assoc();
			}
		}	
		echo json_encode($newarr);
		}
	
	//从居家生活表中获取数据
	if($_POST['grocery']=='yes'){
		$result = $sql->query("select * from grocery");
			$newarr=array();
		if($result->num_rows){
			for($i=0;$i<$result->num_rows;$i++){
				$newarr[$i] = $result->fetch_assoc();
			}
		}	
		echo json_encode($newarr);
		}
		
	//从打造爱巢表中获取数据
	if($_POST['home']=='yes'){
		$result = $sql->query("select * from home");
			$newarr=array();
		if($result->num_rows){
			for($i=0;$i<$result->num_rows;$i++){
				$newarr[$i] = $result->fetch_assoc();
			}
		}	
		echo json_encode($newarr);
		}
	//从打造爱巢表中获取数据
	if($_POST['outdoors']=='yes'){
		$result = $sql->query("select * from outdoors");
			$newarr=array();
		if($result->num_rows){
			for($i=0;$i<$result->num_rows;$i++){
				$newarr[$i] = $result->fetch_assoc();
			}
		}	
		echo json_encode($newarr);
		}
		
	if($_POST['like']=='yes'){
		$result = $sql->query("select * from guesslike");
			$newarr=array();
		if($result->num_rows){
			for($i=0;$i<$result->num_rows;$i++){
				$newarr[$i] = $result->fetch_assoc();
			}
		}	
		echo json_encode($newarr);
		
		}
?>