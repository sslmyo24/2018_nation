<?php
	class MainModel extends Model{
		function getList(){
			$sql = "
				SELECT
				p.*,
				v.root as root,
				f.uri as uri,
				f.name as name,
				m.name as member
				FROM project p
				JOIN project_version v ON p.idx = v.project
				JOIN member m ON p.member = m.idx
				LEFT JOIN file f ON p.icon = f.idx
				where v.version = p.version 
				order by p.`date` desc
					";
			return $this->fetchAll($sql);
		}
	}