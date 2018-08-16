<?php
	class ManagerModel extends Model{
		/**
		 * get date list
		 * @return object date list
		 */
		function getDateList(){
			$list = $this->fetchAll("SELECT ariv_date FROM logistic group by ariv_date");
			return $list;
		}
		
		/**
		 * get waiting list
		 * @param  string $date ariv date
		 * @return object logistic list
		 */
		function getLogisticList($date,$waiting = false){
			$this->sql = "SELECT l.*, m.id, m.name, m.tel FROM logistic l JOIN member m ON m.idx = l.midx where ariv_date = '{$date}'";
			if($waiting) $this->sql." and state = 'waiting'";
			$list = $this->fetchAll();
			return $list;
		}

		function getLocation($idx){
			$data = $this->fetch("SELECT * FROM logistic where idx = '{$idx}'");
			$distance = $this->fetch("SELECT * FROM distance where 기준 = '{$data->location}'");
			return $distance->idx - 1;
		}

		function getDeliveryList(){
			$list = $this->fetchAll("SELECT * FROM delivery");
			return $list;
		}

		function stateChange($state,$data,$table){
			$this->sql = "UPDATE `{$table}` SET state = '{$state}' where idx = '{$data->idx}'";
			$this->query();
		}

		function action(){
			$add_sql = $msg = "";
			$url = HOME."/manager";
			extract($_POST);
			switch ($action) {
				case 'takeOver':
					access(!empty($path),"경로가 누락되었습니다.");
					access(!$this->rowCount("SELECT * FROM delivery where ariv_date = '{$ariv_date}'"),"이미 인수되었습니다.");
					$add_sql = ", midx = '{$this->param->member->idx}'";
					$action = "insert";
					$table = "delivery";
					$msg = "인수되었습니다.";
					break;
			}
			$cancel = "action/";
			$column = $this->getColumn($_POST,$cancel);
			$this->querySet($action,$table,$column);
			alert($msg);
			move($url);
		}
	}