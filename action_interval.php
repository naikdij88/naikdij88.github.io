<?
$db = mysql_connect("localhost","root","");
mysql_select_db("tutorial",$db);

$id = $_POST['id'];

$result = mysql_query("SELECT * FROM ajax_chat WHERE id>'".$id."'",$db);

if(mysql_num_rows($result) > 0) {

	$arr = mysql_fetch_assoc($result);
	
	do {
	
		printf('<li id="%s">%s</li>',$arr['id'],$arr['text']);
		
	} while($arr = mysql_fetch_assoc($result));
	
} else {

	echo 1;
	
}

?>