<?php
	
	// message alert
	function alert($str){
		echo "<script>alert('{$str}')</script>";
	}

	// page move
	function move($str = false){
		echo "<script>";
		echo $str ? "location.replace('{$str}')" : "history.back();";
		echo "</script>";
		exit;
	}

	// access
	function access($bool, $msg, $url = false){
		if(!$bool){
			alert($msg);
			move($url);
		}
	}

	// autoload
	function __autoload($className){
		$className2 = strtolower($className);
		switch ($className2) {
			case 'controller':
			case 'model':
			case 'diff':
			case 'param':
				$path = _CORE."/{$className}.php";
				break;
			default:
				if(strpos($className2,"controller")){
					$path = _CONTROLLER;
				} else if(strpos($className2,"model")){
					$path = _MODEL;
				}
				$path .= "/{$className}.php";
				break;
		}
		include_once($path);
	}

	// print_r2
	function print_pre($str , $bool){
		alert($str);
		if($bool) exit;
	}

