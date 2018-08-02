<?php
	class ReviewModel extends Model{

		function getList(){
			$page = isset($_GET['page']) ? ($_GET['page'] - 1)*8 : 1;
			$this->sql = "SELECT 
						  r.*,
						  t.subject as tour_name,
						  m.name as writer
						  FROM review r
						  JOIN tour t ON t.idx = r.destination
						  JOIN member m ON m.idx = r.midx
						  order by r.idx desc";
			$data = $this->fetchAll();
			$size = count($data);
			if($size > 8){
				$this->sql .= " limit $page, 8";
			}
			return $data;
		}

		function getSize(){
			$list = $this->fetchAll("SELECT * FROM review order by idx desc");
			$size = count($list);
			return $size;
		}

		function getData(){
			$this->sql = "SELECT 
						  r.*,
						  t.subject as tour_name,
						  m.name as writer
						  FROM review r
						  JOIN tour t ON t.idx = r.destination
						  JOIN member m ON m.idx = r.midx
						  where r.idx = '{$this->param->idx}'";

			return $this->fetch();
		}

		function getTourData(){
			return $this->fetchAll("SELECT * FROM tour order by idx desc");
		}

		function reviewDelete(){
			$data = $this->fetch("SELECT * FROM review where idx = '{$this->param->idx}'");
			@unlink(_UPDIR."/{$data->file}");
			$this->sql = "DELETE FROM review where idx = '{$this->param->idx}'";
			$this->query();
			alert("삭제되었습니다.");
			move(HOME."/review/reviewList");
		}

		function action(){
			$add_sql = $msg = $url = "";
			$table = "review";
			extract($_POST);
			switch ($action) {
				case 'insert':
					$file = $_FILES['file'];
					access(is_uploaded_file($file['tmp_name']),"파일이 업로드되지 않았습니다.");
					$saved_name = file_upload($file);
					$_POST['content'] = htmlspecialchars($content);
					$add_sql .= ", midx = '{$this->param->member->idx}' , time = now(), file = '{$saved_name}'";
					$msg = "완료되었습니다.";
					$url = HOME."/review/reviewList";
					break;
				case 'update':
					$_POST['content'] = htmlspecialchars($content);
					if(isset($_FILES['file'])){
						$file = $_FILES['file'];
						access(is_uploaded_file($file['tmp_name']),"파일이 업로드되지 않았습니다.");
						$saved_name = file_upload($file);
						$add_sql .= ", file = '{$saved_name}'";
					}
					$add_sql .= ", midx = '{$this->param->member->idx}' , time = now() where idx = '{$this->param->idx}'";
					$msg = "완료되었습니다.";
					$url = HOME."/review/reviewList";
					break;
			}

			$cancel = "action/file/";
			$column = $this->getColumn($_POST,$cancel).$add_sql;
			$this->querySet($action,$table,$column);
			alert($msg);
			move($url);
		}

	}