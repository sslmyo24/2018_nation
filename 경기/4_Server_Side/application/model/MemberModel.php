<?php
	class MemberModel extends Model{

		function action(){
			extract($_POST);
			switch ($action) {
				case 'join':
					access($this->rowCount("SELECT * FROM member where email = '{$email}'") == 0,"이미 가입된 이메일입니다.");
					access($this->rowCount("SELECT * FROM member where name = '{$name}'") == 0,"이미 가입된 이름입니다.");
					access($password == $confirm,"비밀번호가 같지 않습니다.");
					$this->sql = "INSERT INTO member SET name='{$name}',email='{$email}',password='{$password}'";
					$this->query();
					alert("가입되었습니다.");
					break;
				case 'login':
					access($member = $this->fetch("SELECT * FROM member where name = '{$id}' and password = '{$password}'"),"아이디 또는 비밀번호가 잘못되었습니다.");
					$_SESSION['member'] = $member;
					alert("로그인 되었습니다.");
					break;
			}
			move(URL);
			exit;
		}
	}