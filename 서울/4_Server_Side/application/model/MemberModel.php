<?php
	class MemberModel extends Model{
		// member action
		function action(){
			$add_sql = $msg = $url = "";
			$table = "member";
			extract($_POST);
			switch ($action) {
				// 회원 가입
				case 'join':
					access($pw == $pw_re,"비밀번호와 비밀번호 확인이 일치하지 않습니다.");
					access($this->rowCount("SELECT * FROM member where id = '{$id}'") == 0,"중복된 아이디입니다. 다른 아이디로 가입해주세요");
					$_POST['pw'] = hash("sha256",$pw.$id);
					$action = "insert";
					$msg = "회원가입이 완료되었습니다.";
					$url = HOME."/main";
					break;
				// 로그인
				case 'login':
					$pw = hash("sha256",$pw.$id);
					access($member = $this->fetch("SELECT * FROM member where id = '{$id}' and pw = '{$pw}'"),"아이디 또는 비밀번호가 일치하지 않습니다.");
					$_SESSION['member'] = $member;
					alert("로그인이 완료되었습니다.");
					move(HOME."/main");
					exit;
					break;
			}
			$cancel = "action/page/pw_re/";
			$column = $this->getColumn($_POST,$cancel).$add_sql;
			$this->querySet($action,$table,$column);
			alert($msg);
			move($url);
		}
	}