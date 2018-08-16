<?php
	// session
	session_start();

	// path
	define("_ROOT",__DIR__);
	define("_APP",_ROOT."/application");
	define("_CONFIG",_APP."/config");
	define("_CORE",_APP."/core");
	define("_CONTROLLER",_APP."/controller");
	define("_MODEL",_APP."/model");
	define("_VIEW",_APP."/view");
	define("_PUBLIC",_ROOT."/public");

	// url
	define("HOME",str_replace("/index.php","",$_SERVER['PHP_SELF']));
	define("SRC_URL",HOME."/public");
	define("CSS_URL",SRC_URL."/css");
	define("JS_URL",SRC_URL."/js");
	define("IMG_URL",SRC_URL."/images");

	// include
	include_once(_CONFIG."/lib.php");

	// run
	Param::init();
	Controller::run();