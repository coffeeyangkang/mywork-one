<?php
	define('HOST','localhost');
	define('USERNAME','root');
	define('PASSWORD','rootyk');
	define('DB','user');
	$sql = @new mysqli(HOST,USERNAME,PASSWORD,DB);
	$sql->query('set names utf8');
//此页面不可直接预览.通过表单action进行跳转。
	header('content-type:text/html;charset=utf-8');
// $_GET['前端表单的name值']：前端通过get方式提交
// $_POST['前端表单的name值']：前端通过post方式提交
// $_REQUEST['前端表单的name值']：前端通过post或get方式提交
//isset():检测括号里面的值是否存在。返回值是布尔值。
if(!isset($_POST['submit'])&&!isset($_POST['username'])) exit('非法操作！');
if($_POST['number']=='1'){
    $user   = $_POST['username'];
	$result = $sql->query("select * from logininfo where username='$user'");
	if($result->num_rows!==0) echo 'false';
	else echo 'true';
}
if($_POST['username']=='2'){
    $user   = $_POST['number'];
	$result = $sql->query("select * from logininfo where number='$user'");
	if($result->num_rows!==0) echo 'false';
	else echo 'true';
}
if($_POST['username']!=='2'&&$_POST['number']!=='1'){
	$user=$_POST['username'];
	$word=$_POST['password'];
	$number=$_POST['number'];
	$sql->query("insert logininfo(username,password,regtime,number) values('$user','$word',NOW(),'$number')");
	echo 'true';
}


?>