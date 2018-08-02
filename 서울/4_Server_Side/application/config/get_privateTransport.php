<?php
	$json_data = file_get_contents(_DATA."/private_transport.json");
	$json_arr = gettype($json_data);
	print_r($json_arr);

	$column = "";
	for ($i=0; $i < count($json_arr); $i++) {
		$column .= ", ".$i." int";
	}
	echo $column;
	$column = substr($column,2);
	// $this->sql = "CREATE TABLE private_transport ({})";