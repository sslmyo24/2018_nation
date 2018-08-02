<?php
	class MainModel extends Model{
		/**
		 * get list
		 * @return object 최근 추가된 관광지 목록
		 */
		function getList(){
			return $this->fetchAll("SELECT * FROM tour order by idx desc limit 8");
		}
	}