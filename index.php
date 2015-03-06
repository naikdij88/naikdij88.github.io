<?
$db = mysql_connect("localhost","root","");
mysql_select_db("tutorial",$db);
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>АЯКС чат своими руками</title>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
	
		var button = $("button");
		button.click(function(){
			var text = $("textarea").val();
			if(text == "") {
				alert("Введите текст");
			} else {
				$.ajax({
					url: "action.php",
					type: "POST",
					data: {text_chat: text},
					success: function(){
						$("textarea").val("");
					}
				});
			}
		});
		
		window.setInterval(function(){
			var id = $("li:first").attr("id");
			$.ajax({
				url: "action_interval.php",
				type: "POST",
				data: {id: id},
				success: function(data){
					if(data==1) {
					
					} else {
						$(".chat_pyst").remove();
						$("ul").prepend(data);
					}
				}
			});
		},1000);
	
	});
</script>
<style type="text/css">
	#wrap_chat_box {
		width: 300px;
		border: 1px solid #ccc;
		border-radius: 10px;
		margin: 0 auto;
		margin-top: 100px;
	}
</style>
</head>
<body>
<div id="wrapper">
	<div id="wrap_chat_box">
		<div style="height: 250px; overflow: auto">
			<ul>
				<!--<li>Первое сообщение</li>-->
				<?
					$result = mysql_query("SELECT id,text FROM ajax_chat ORDER BY id DESC",$db);
					if(mysql_num_rows($result) > 0) {
						
						$arr = mysql_fetch_assoc($result);
						do {
							printf('<li id="%s">%s</li>',$arr['id'],$arr['text']);
						} while($arr = mysql_fetch_assoc($result));
						
					} else {
						echo "<span class='chat_pyst'>Чат пуст</span>";
					}
				?>
			</ul>
		</div>
		<div id="wrap_textarea">
			<textarea style="width: 290px"></textarea><br />
			<button>Отправить</button>
		</div>
	</div>
</div>
</body>
</html>