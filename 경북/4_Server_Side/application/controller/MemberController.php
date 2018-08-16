<?php
	class MemberController extends Controller{
		/**
		 * 로그인 페이지
		 */
		function login(){
			access(!$this->param->isMember,"비회원만 접근가능합니다.",HOME."/main");
		}

		/**
		 * 회원가입 페이지
		 */
		function join(){
			access(!$this->param->isMember,"비회원만 접근가능합니다.",HOME."/main");
		}

		function logout(){
			session_destroy();
			alert("로그아웃 되었습니다.");
			move(HOME."/main");
		}

	}