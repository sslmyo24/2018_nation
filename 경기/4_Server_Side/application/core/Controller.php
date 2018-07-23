<?php
	class Controller {

		var $param;
		var $model;

		static public function run(){
			$param = Param::getInstance();
			$type = ucfirst($param->type);
			$ctrName = $type."Controller";
			$modelName = $type."Model";
			$ctr = new $ctrName();
			$ctr->model = new $modelName();
			$ctr->param = $param;
			$ctr->index();
		}

		protected function index(){
			if(isset($_POST['action'])){
				$this->model->action();
			}
			if(method_exists($this,$this->param->include_file)){
				$method = $this->param->include_file;
				$this->$method();
			}
			$this->header();
			$this->content();
			$this->footer();
		}

		protected function header(){
			return include_once(_VIEW."/template/header.php");
		}

		protected function footer(){
			return include_once(_VIEW."/template/footer.php");
		}
		
		protected function content(){
			$thisArr = (Array)$this;
			extract($thisArr);
			return include_once(_VIEW."/{$this->param->type}/{$this->param->include_file}.php");
		}

	}