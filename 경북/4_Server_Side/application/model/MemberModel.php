<?php
	class MemberModel extends Model{
		function action(){
			$add_sql = $msg = "";
			$url = HOME."/main";
			$table = "member";
			extract($_POST);
			switch ($action) {
				case 'join_company':
					access(!empty($id),"아이디가 누락되었습니다.");
					access(!empty($pw),"비밀번호가 누락되었습니다.");
					access(!empty($name),"회사명이 누락되었습니다.");
					access(!empty($tel),"전화번호가 누락되었습니다.");
					access(preg_match("/(.*)@(.*)\.(.*)/",$id),"아이디가 형식에 맞지 않습니다.");
					access(preg_match("/[a-zA-Z0-9]{8,}/",$pw),"비밀번호가 형식에 맞지 않습니다.");
					access(!preg_match("/(\w)\1\1\1/",$pw),"비밀번호가 형식에 맞지 않습니다.");
					access(preg_match("/[가-힣|A-Z]/",$name),"회사명이 형식에 맞지 않습니다.");
					access(preg_match("/[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/",$tel),"전화번호가 형식에 맞지 않습니다.");
					$add_sql = ", level = 'B'";
					$action = "insert";
					$msg = "회원가입 되었습니다.";
					break;
				case 'join_carOwner':
					access(!empty($id),"아이디가 누락되었습니다.");
					access(!empty($pw),"비밀번호가 누락되었습니다.");
					access(!empty($name),"차량주명이 누락되었습니다.");
					access(!empty($tel),"전화번호가 누락되었습니다.");
					access(!empty($weight),"차량적재량이 누락되었습니다.");
					access(preg_match("/(.*)@(.*)/",$id),"아이디가 형식에 맞지 않습니다.");
					access(preg_match("/[a-zA-Z0-9]{8,}/",$pw),"비밀번호가 형식에 맞지 않습니다.");
					access(!preg_match("/(\w)\1\1\1/",$pw),"비밀번호가 형식에 맞지 않습니다.");
					access(preg_match("/[가-힣|A-Z]/",$name),"차량주명이 형식에 맞지 않습니다.");
					access(preg_match("/[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/",$tel),"전화번호가 형식에 맞지 않습니다.");
					$add_sql = ", level = 'A2'";
					$action = "insert";
					$msg = "회원가입 되었습니다.";
					break;
				case 'login':
					access(!empty($id),"아이디가 누락되었습니다.");
					access(!empty($pw),"비밀번호가 누락되었습니다.");
					access($member = $this->fetch("SELECT * FROM member where id = '{$id}' and pw = '{$pw}'"),"아이디 또는 비밀번호가 잘못되었습니다.");
					$_SESSION['member'] = $member;
					alert("로그인 되었습니다.");
					move($url);
					exit;
					break;
			}
			$cancel = "action/";
			$column = $this->getColumn($_POST,$cancel).$add_sql;
			$this->querySet($action,$table,$column);
			alert($msg);
			move($url);
		}
	}