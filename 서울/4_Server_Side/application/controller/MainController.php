<?php
	class MainController extends Controller{
		/**
		 * main 페이지
		 */
		function main(){
			$this->list = $this->model->getList();
		}
	}