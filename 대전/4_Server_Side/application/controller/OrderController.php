<?php
	class OrderController extends Controller{
		/**
		 * Order Page
		 */
		function order(){
			access($this->param->isMember && $this->param->member->level == "N","일반회원만 접근 가능합니다.",HOME."/main");
			$this->franList = $this->model->getFranList();
		}

		function menu(){
			$this->menuList = $this->model->getMenuList();
		}
	}