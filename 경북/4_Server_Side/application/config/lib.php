<?php
	/**
	 * 경고창 띄우기
	 * @param  string $str message
	 */
	function alert($str){
		echo "<script>alert('{$str}')</script>";
	}

	/**
	 * 페이지 이동
	 * @param  string $str url
	 */
	function move($str = false){
		echo "<script>";
		echo $str ? "location.replace('{$str}')" : "history.back();";
		echo "</script>";
		exit;
	}

	/**
	 * access
	 * @param  boolean  $bool access condition
	 * @param  string  $msg  message
	 * @param  string $url  url
	 */
	function access($bool,$msg,$url = false){
		if(!$bool){
			alert($msg);
			move($url);
		}
	}

	/**
	 * auto class load
	 * @param  string $className class name
	 */
	function __autoload($className){
		switch ($className) {
			case 'Controller':
			case 'Model':
			case 'Param':
			case 'Path':
				$path = _CORE;
				break;
			default:
				if(strpos($className,"Controller")){
					$path = _CONTROLLER;
				} else {
					$path = _MODEL;
				}
				break;
		}
		$path .= "/{$className}.php";
		include_once($path);
	}

	function print_pre($str,$bool = true){
		echo "<pre>";
		print_r($str);
		echo "</pre>";
		if($bool) exit;
	}