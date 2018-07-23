<?php
	class ProjectController extends Controller {

		function view_header(){
			$this->data = $this->model->getData();
		}

		function view(){
			$this->view_header();
		}		
	}