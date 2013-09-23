<?php
if (!isset($_REQUEST['action'])) {die();}
$db = new PDO();
if ($_REQUEST['action'] == "add") {
	$add = $db->prepare('INSERT INTO highscores VALUES (?, ?, ?)');
	$add->execute(array( $db->quote($_POST['id']), $db->quote($_POST['name']), intval($_POST['points']) ));
	$add->closeCursor();
}
if ($_REQUEST['action'] == "get") {
	$highscores = $db->query('SELECT id,name,points FROM highscores ORDER BY points DESC');
	$topTenPlusMine = array();
	foreach ($highscores->fetchAll() as $i=>$row) {
		if ($i<10 || ($row['id']==$_GET['id'] && $row['name']==$_GET['name'])) {
			$topTenPlusMine[] = array(
				'position'=>$i+1,
				'name'=>substr($row['name'],1,-1),
				'points'=>$row['points'],
				'me'=>(substr($row['id'],1,-1)==$_GET['id'] && substr($row['name'],1,-1)==$_GET['name'])
			);
		}
	}
	header('Content-Type: application/json');
	echo json_encode($topTenPlusMine);
	die();
}
?>
