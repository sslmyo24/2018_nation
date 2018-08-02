<?php
	class MemberController extends Controller{
		/**
		 * 로그아웃 페이지
		 */
		function logout(){
			session_destroy();
			alert("로그아웃이 완료되었습니다.");
			move(HOME."/main");
		}
	}