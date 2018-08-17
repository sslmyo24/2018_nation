<?php
	class OrderModel extends Model{
		/**
		 * get franchisee list
		 * @return object list
		 */
		function getFranList(){
			$list = $this->fetchAll("SELECT * FROM franchiseeinfo");
			foreach ($list as $data) {
				$x2 = pow(($this->param->member->x_location - $data->x_location),2);
				$y2 = pow(($this->param->member->y_location - $data->y_location),2);
				$distance = sqrt($x2+$y2);
				$this->query("UPDATE franchisee SET distance = '{$distance}' where name = '{$data->name}'");
			}
			if(isset($_GET['type'])) $list = $this->fetchAll("SELECT * FROM franchiseeinfo where type = '{$_GET['type']}'");
			else if(isset($_GET['order'])){
				switch ($_GET['order']) {
					case 'grade':
						$list = $this->fetchAll("SELECT * FROM franchiseeinfo order by avg_grade desc");
						break;
					case 'review':
						$list = $this->fetchAll("SELECT * FROM franchiseeinfo order by cnt desc");
						break;
					case 'distance' :
						$list = $this->fetchAll("SELECT * FROM franchiseeinfo order by fr.distance");
						break;
				}
			}
			else $list = $this->fetchAll("SELECT * FROM franchiseeinfo");
			return $list;
		}

		function getMenuList(){
			$list = $this->fetchAll("SELECT * FROM menu where fidx = '{$_GET['idx']}'");
			return $list;
		}
	}