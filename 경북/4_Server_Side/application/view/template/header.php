<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>SKILLS LOGISTICS</title>
  <link href="<?php echo CSS_URL ?>/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <link href="<?php echo CSS_URL ?>/bootstrap/bootstrap.css" rel="stylesheet">
  <link href="<?php echo CSS_URL ?>/sb-admin.css" rel="stylesheet">
  <link href="<?php echo JS_URL ?>/jquery/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet">
  <script type="text/javascript" src="<?php echo JS_URL ?>/jquery/jquery-3.3.1/jquery-3.3.1.js"></script>
  <script type="text/javascript" src="<?php echo JS_URL ?>/jquery/jquery-ui-1.12.1/jquery-ui.js"></script>
  <script type="text/javascript" src="<?php echo JS_URL ?>/bootstrap/bootstrap.js"></script>
</head>

<body class="fixed-nav sticky-footer bg-dark" id="page-top">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a class="navbar-brand" href="<?php echo HOME ?>/main">
      <img src="<?php echo IMG_URL ?>/logo.png" alt="logo">
    </a>
    <!-- header-menu -->
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <div class="col-12 text-right" style="color: #fff">
    <?php if($this->param->isMember): ?>
        [아이디 : <?php echo $this->param->member->id ?>]
         / 
         [회원구분 :
         <?php
         switch ($this->param->member->level) {
           case 'A1':
             echo "관리자";
             break;
           case 'A2':
             echo "지입차량주";
             break;
           case 'B':
             echo "고객사";
             break;
         }
         ?>]
    <?php endif ?>
      </div>
    </div>
  </nav>

  <!-- navigation -->
  <div class="navigation">
    <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
  <?php if($this->param->isMember): ?>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="로그인">
          <a class="nav-link" href="<?php echo HOME ?>/member/logout">
            <i class="fa fa-fw fa-sign-out"></i>
            <span class="nav-link-text">로그아웃</span>
          </a>
        </li>
  <?php else: ?>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="로그인">
          <a class="nav-link" href="<?php echo HOME ?>/member/login">
            <i class="fa fa-fw fa-user"></i>
            <span class="nav-link-text">로그인</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="회원가입">
          <a class="nav-link" href="<?php echo HOME ?>/member/join">
            <i class="fa fa-fw fa-sign-in"></i>
            <span class="nav-link-text">회원가입</span>
          </a>
        </li>
  <?php endif ?>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="물류배송신청">
          <a class="nav-link" href="<?php echo HOME ?>/logistic/contract">
            <i class="fa fa-fw fa-pencil-square-o"></i>
            <span class="nav-link-text">물류배송신청</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="물류배송추적">
          <a class="nav-link" href="<?php echo HOME ?>/logistic/delivery">
            <i class="fa fa-fw fa-truck"></i>
            <span class="nav-link-text">물류배송추적</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="지입차량주POS">
          <a class="nav-link" href="<?php echo HOME ?>/manager">
            <i class="fa fa-fw fa-th-large"></i>
            <span class="nav-link-text">지입차량주POS</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="관리자POS">
          <a class="nav-link" href="<?php echo HOME ?>/adminpos">
            <i class="fa fa-fw fa-dashboard"></i>
            <span class="nav-link-text">관리자POS</span>
          </a>
        </li>
      </ul>
  </div>

  <div class="content-wrapper">
    <div class="container-fluid p-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="<?php echo HOME ?>/main">홈</a>
        </li>
