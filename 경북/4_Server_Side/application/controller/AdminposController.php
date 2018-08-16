<?php
	class AdminposController extends Controller{
		/**
		 * 관리자POS 페이지
		 */
		function adminpos(){
			$this->list = $this->model->getDistance();
		}
	}