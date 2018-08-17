<?php
	class AdminController extends Controller{
		/**
		 * affiliation page
		 */
		function affiliation(){
			access($this->param->isMember && $this->param->member->level == "AD" || $this->param->member->level == "AF","가맹회원 또는 관리자만 접근가능합니다.");
			$this->franList = $this->model->getList("franchisee");
			$this->menuList = $this->model->getList("menu");
			$this->orderList = $this->model->getOrderList();
		}
	}