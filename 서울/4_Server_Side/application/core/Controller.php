<?php
	class Controller {
		var $model;
		var $param;
		var $ajax;

		static public function run(){
			$param = Param::getInstance();
			if(isset($_POST['page'])){
				$type = ucfirst($_POST['page']);
			} else {
				$type = ucfirst($param->type);
			}
			$ctr_name = $type."Controller";
			$model_name = $type."Model";
			$ctr = new $ctr_name();
			$ctr->model = new $model_name();
			$ctr->param = $param;
			if($ctr->param->type == "main" || strpos($ctr->param->include_file,"List")){
				$ctr->ajax = false;
			} else {
				$ctr->ajax = true;
			}
			$ctr->index();
		}

		function index(){
			if(isset($_POST['action'])){
				$this->model->action();
			}
			if(method_exists($this,$this->param->include_file)){
				$this->{$this->param->include_file}();
			}
			include_once(_CONFIG."/get_tour.php");
			include_once(_CONFIG."/get_privateTransport.php");
			include_once(_CONFIG."/get_publicTransport.php");
			$this->header();
			$this->content();
			$this->footer();
		}

		function header(){
			$this->ajax || include_once(_VIEW."/template/header.php");
		}

		function footer(){
			$this->ajax || include_once(_VIEW."/template/footer.php");
		}

		function content(){
			$thisArr = (Array)$this;
			extract($thisArr);
			include_once(_VIEW."/{$this->param->type}/{$this->param->include_file}.php");
		}
	}