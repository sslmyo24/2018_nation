<?php
	class Path{
		var $arr;
		var $min;
		var $lbl;
		var $normal;
		var $pathList;
		var $path;
		var $distance;
		static public $instance;

		function __construct(){
			$this->arr = [];
			$this->min = 100000;
			$json_data = file_get_contents(_PUBLIC."/distance.json");
			$json_arr = json_decode($json_data);
			$lbl = [];
			foreach ($json_arr as $key => $value) {
				$lbl[] = $key;
			}
			$this->lbl = $lbl;
			$this->normal = $json_arr;
			$this->pathList = [];
			$this->path = false;
		}

		function Shortest($idxs){
			$arr = explode("/",$idxs);
			$this->allShortPath($arr);
			$arr = $this->arr;
			$len = count($arr);
			for ($i=0; $i < count($this->pathList) ; $i++) { 
				$pathList = $this->pathList[$i];
				$path = $this->lbl[$arr[$pathList[0]]];
				for ($i=1; $i < $len; $i++) {
					$path .= "-{$this->lbl[$arr[$pathList[$i]]]}";
				}
				if(!$this->path){
					$this->path = $path;
				} else {
					$this->path .= "/".$path;
				}
			}
			$this->distance = $this->min;
		}

		function allShortPath($arr){
			$this->arr = $arr;
			$len = count($arr);
			for ($i=0; $i < $len; $i++) { 
				$this->shortPathTree($i, 1, array($i), 0);
			}
		}

		function shortPathTree($start,$step,$p,$min){
			$len = count($this->arr);
			if($this->min < $min) return;
			else if($this->min == $min){
				$this->pathList[] = $p;
				return;
			}
			if($step == $len){
				if($min < $this->min){
					$this->min = $min;
					$this->pathList = [];
					$this->pathList[] = $p;
				} else if($min == $this->min){
					$this->pathList[] = $p;
				}
				return;
			}
			for ($i=0; $i < $len; $i++) {
				if(in_array($i,$p)) continue;
				$new_p = $p;
				array_push($new_p,$i);
				$s = $this->lbl[$start];
				$idx = $this->lbl[$i];
				$cost = $this->normal->$s->$idx;
				$this->shortPathTree($i, $step + 1, $new_p, $min + $cost);
			}
		}

		function ShortestDistance(){
			return $this->distance;
		}

		function ShortestPath(){
			return $this->path;
		}

		static public function init(){
			self::$instance = new Path();
		}

		static public function getInstance(){
			return self::$instance;
		}
	}