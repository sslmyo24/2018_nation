<?php
	class ProjectModel extends Model {

		function getData($version = null){
			$version = isset($version) ? $version : $this->param->version;
			$this->sql = "
				SELECT
				p.*,
				m.name as writer,
				v.root as root
				FROM project p
				JOIN project_version v ON v.project = p.idx
				JOIN member m ON m.idx = p.member
				where p.idx = '{$this->param->idx}'
				and v.version = '{$version}'
				order by p.version desc limit 1
			";
			return $this->fetch();
		}


		function action(){
			$sql = $add_sql = $column = $msg = $url = "";
			$cancel = "idx/confirm/action/";
			extract($_POST);
			$table = "project";
			switch ($action) {
				case 'insert':
				
					break;
			}
		}
	}