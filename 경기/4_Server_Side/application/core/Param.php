<?php
	class Param{

		var $type;
		var $action;
		var $include_file;
		var $idx;
		var $version;
		var $file;
		var $is_member;
		var $member;
		static public $instance;

		function __construct(){
			if(isset($_GET['param'])) $param = explode("/",$_GET['param']);
			$this->type = isset($param[0]) && strlen($param[0]) ? $param[0] : "main";
			$this->action = isset($param[1]) && strlen($param[1]) ? $param[1] : NULL;
			$this->idx = isset($param[2]) && strlen($param[2]) ? $param[2] : NULL;
			$this->version = isset($param[3]) && strlen($param[3]) ? $param[3] : NULL;
			$this->file = isset($param[4]) && strlen($param[4]) ? $param[4] : 0;
			$this->include_file = isset($this->action) ? $this->action : $this->type;
			$this->is_member = isset($_SESSION['member']);
			$this->member = $this->is_member ? $_SESSION['member'] : NULL;
		}

		static public function getInstance(){
			return self::$instance;
		}

		static public function init(){
			self::$instance = new Param();
		}
	}