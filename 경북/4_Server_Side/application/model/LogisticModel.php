<?php
	class LogisticModel extends Model{
		function action(){
			$add_sql = $msg = $url = "";
			$table = "logistic";
			extract($_POST);
			switch ($action) {
				case 'contract':
					access(!empty($weight),"배송중량이 누락되었습니다.");
					access(!empty($location),"배송지역이 누락되었습니다.");
					access(!empty($ariv_date),"배송일이 누락되었습니다.");
					$hour = date("G")+1;
					if($hour <= 12){
						$noon = "A";
					} else {
						$noon = "B";
						$hour -= 12;
					}
					$cnt = $this->rowCount("SELECT * FROM logistic")+1;
					if(strlen($cnt) < 4){
						for ($i=0; $i < 4 - strlen($cnt) ; $i++) { 
							$cnt = "0".$cnt;
						}
					}
					$uni_idx = date("Ymd")."-".$noon.$hour.date("is")."-".$cnt;
					$apply_date = date("Ymd");
					$_POST['ariv_date'] = date("Ymd",strtotime($_POST['ariv_date']))
					$add_sql = ", uni_idx = '{$uni_idx}', midx = '{$this->param->member->idx}', apply_date = '{$apply_date}'";
					$action = "insert";
					$msg = "신청되었습니다.";
					$url = HOME."/logistic/delivery";
					break;
			}
			$cancel = "action/";
			$column = $this->getColumn($_POST,$cancel).$add_sql;
			$this->querySet($action,$table,$column);
			alert($msg);
			move($url);
		}
	}