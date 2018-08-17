<?php
	class AdminModel extends Model{
		/**
		 * 가맹점 or 메뉴 목록
		 * @return object list
		 */
		function getList($table){
			$list = $this->fetchAll("SELECT * FROM {$table} where midx = '{$this->param->member->idx}'");
			return $list;
		}

		/**
		 * 주문 목록
		 */
		function getOrderList(){
			$list = $this->fetchAll("SELECT * FROM member m JOIN deliveryorder d ON m.idx = d.midx");
			return $list;
		}

		function action(){
			$add_sql = $msg = $url = "";
			extract($_POST);
			switch ($action) {
				case 'franchisee':
					$file = $_FILES['file'];
					access(is_uploaded_file($file['tmp_name']),"로고를 선택하세요.");
					$_POST['logo'] = file_upload($file);
					if($this->rowCount("SELECT * FROM franchisee where midx = '{$this->param->member->idx}'")) $action = "update";
					else $action = "insert";
					$table = "franchisee";
					$add_sql = ", midx = '{$this->param->member->idx}'";
					$msg = "등록 되었습니다.";
					$url = HOME."/admin/affiliation";
					break;
				case 'menuInsert':
					access($this->rowCount("SELECT * FROM franchisee where midx = '{$this->param->member->idx}'"),"등록된 가맹점이 없습니다.");
					$action = "insert";
					$table = "menu";
					$add_sql = ", midx = '{$this->param->member->idx}', date = now()";
					$msg = "등록 되었습니다.";
					$url = HOME."/admin/affiliation";
					break;
			}
			$cancel = "action/";
			$column = $this->getColumn($_POST,$cancel).$add_sql;
			$this->querySet($action,$table,$column);
			alert($msg);
			move($url);
		}
	}