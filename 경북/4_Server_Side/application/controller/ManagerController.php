<?php
	class ManagerController extends Controller{
		/**
		 * 지입차량주POS 페이지
		 */
		function manager(){
			access($this->param->isMember && $this->param->member->level == "A2","지입차량주만 접근가능합니다.",HOME."/main");
			$this->dateList = $this->model->getDateList();
			$i = 1;
			foreach ($this->dateList as $date) {
				$idxs = false;
				$logisticList = "logisticList".$i;
				$total_weight = "weight".$i;
				$total_distance = "distance".$i;
				$total_path = "path".$i;
				$this->$logisticList = $this->model->getLogisticList($date->ariv_date,true);
				$weight = 0;
				foreach ($this->$logisticList as $logistic) {
					$weight += $logistic->weight;
					if(!$idxs){
						$path = $logistic->location;
						$idxs = $this->model->getLocation($logistic->idx);
						continue;
					} else {
						$idxs .= "/".$this->model->getLocation($logistic->idx);
					}
				}
				$this->$total_weight = $weight;
				if(strpos($idxs,"/")){
					Path::init();
					$path = Path::getInstance();
					$path->Shortest($idxs);
					$this->$total_distance = $path->ShortestDistance();
					$this->$total_path = $path->ShortestPath();
				} else {
					$this->$total_distance = 0;
					$this->$total_path = $path;
				}
				$i++;
			}
			$this->deliveryList = $this->model->getDeliveryList();
			$i = 1;
			foreach ($this->deliveryList as $delivery) {
				$toLogisticList = "toLogisticList".$i;
				$this->$toLogisticList = $this->model->getLogisticList($delivery->ariv_date);
				$now = date("Y-m-d");
				if($delivery->ariv_date <= $now){
					if($delivery->ariv_date == $now) $state = 'shipping';
					else if($delivery->ariv_date < $now) $state = 'completed';
					$this->model->stateChange($state,$delivery,'delivery');
					foreach ($this->$toLogisticList as $logistic) {
						$this->model->stateChange($state,$logistic,'logistic');
					}
				}
				$i++;
			}
		}

		function stateChange(){
			$data = $this->model->fetch("SELECT * FROM logistic where idx = '{$_GET['idx']}'");
			$this->model->stateChange('completed',$data,'logistic');
			move(HOME."/manager");
		}
	}