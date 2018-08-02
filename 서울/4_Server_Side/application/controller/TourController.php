<?php
	class TourController extends Controller{
		// tour view page
		function view(){
			$this->data = $this->model->getData();
		}

		// 관광지 정보
		function tourList(){
			$this->page = isset($_GET['page']) ? $_GET['page'] : 1;
			$this->list = $this->model->getList();
			$size = $this->model->getSize();
			$this->size = ceil($size/8);
		}

		function write(){
			access($this->param->isMember,"로그인 후 가능합니다.");
		}
	}