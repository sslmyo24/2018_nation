<?php
	class ReviewController extends Controller{

		function reviewList(){
			$this->page = isset($_GET['page']) ? $_GET['page'] : 1;
			$this->list = $this->model->getList();
			$size = $this->model->getSize();
			$this->size = ceil($size/8);
		}

		function write(){
			$this->tour = $this->model->getTourData();
		}

		function view(){
			$this->data = $this->model->getData();
		}

		function update(){
			$this->data = $this->model->getData();
			$this->tour = $this->model->getTourData();
		}

		function delete(){
			$this->model->reviewDelete();
		}
	}