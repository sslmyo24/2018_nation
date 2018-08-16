<?php
	class AdminposModel extends Model{
		/**
		 * get distance list
		 * @return object distance list
		 */
		function getDistance(){
			$list = $this->fetchAll("SELECT * FROM distance");
			return $list;
		}
	}