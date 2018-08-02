<?php
	$json_data = file_get_contents(_DATA."/tour.json");
	$json_arr = json_decode($json_data);

	foreach ($json_arr as $data) {
		if($this->model->rowCount("SELECT * FROM tour where subject = '{$data->subject}'") != 0) continue;
		$this->model->sql = "
			INSERT INTO tour SET
			subject = '{$data->subject}',
			file = '{$data->file}',
			tag = '{$data->tag}',
			thumbnail = '{$data->thumbnail}'
			";
		$this->model->query();
	}

