<?php
	/**
	 * 경고창 띄우기
	 * @param  string $str 경고 문구
	 */	
	function alert($str){
		echo "<script>alert('{$str}')</script>";
	}

	/**
	 * 페이지 이동
	 * @param  string $str 이동 주소
	 */	
	function move($str = false){
		echo "<script>";
		echo $str ? "location.replace('{$str}')" : "history.back();";
		echo "</script>";
		exit;
	}

	/**
	 * access
	 * @param  boolean  $bool 접근 조건
	 * @param  string  $msg  경고 문구
	 * @param  string $url  이동 주소
	 */
	function access($bool,$msg,$url = false){
		if(!$bool){
			alert($msg);
			move($url);
		}
	}

	/**
	 * auto class include
	 * @param  string $className class name
	 */
	function __autoload($className){
		switch ($className) {
			case 'Controller':
			case 'Model':
			case 'Param':
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

	/**
	 * file upload
	 * @param  object $file $_FILES['file']
	 * @return string       saved_name
	 */
	function file_upload($file){
		if(is_uploaded_file($file['tmp_name'])){
			$ext = preg_replace("/(.*)\.(.*)/","$2",$file['name']);
			access(in_array($ext,['jpg','jpeg','png','gif']),"이미지만 업로드 가능합니다.");
			$saved_name = time()."_".rand(0,99999).".".$ext;
			if(!move_uploaded_file($file['tmp_name'],_UPDIR."/{$saved_name}")){
				print_pre($file);
			} else {
				return $saved_name;
			}
		} else {
			return null;
		}
	}

	function textSizeDown($text){
        $text = strip_tags($text);
        $text = mb_strimwidth($text,0,100,'...[더보기]');
        return $text;
	}


