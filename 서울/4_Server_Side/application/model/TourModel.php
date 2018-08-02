<?php
	class TourModel extends Model{
		function getData(){
			return $this->fetch("SELECT * FROM tour where idx = '{$this->param->idx}'");
		}

		function getList(){
			$page = isset($_GET['page']) ? ($_GET['page'] - 1)*8 : 1;
			return $this->fetchAll("SELECT * FROM tour order by idx desc limit $page, 8");
		}

		function getSize(){
			$list = $this->fetchAll("SELECT * FROM tour order by idx desc");
			$size = count($list);
			return $size;
		}

	}