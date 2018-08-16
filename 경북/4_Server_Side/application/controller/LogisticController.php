<?php
	class LogisticController extends Controller{
		/**
		 * 물류배송신청 페이지
		 */
		function contract(){
			access($this->param->isMember && $this->param->member->level == "B","고객사만 접근 가능합니다.");
		}

		/**
		 * 물류배송신청 페이지
		 */
		function delivery(){
			access(!$this->param->isMember || $this->param->member->level == "B","고객사와 회원만 접근 가능합니다.");
		}

	}