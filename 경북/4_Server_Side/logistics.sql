-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 18-08-16 04:59
-- 서버 버전: 10.1.21-MariaDB
-- PHP 버전: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `logistics`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `delivery`
--

CREATE TABLE `delivery` (
  `idx` int(11) NOT NULL,
  `midx` int(11) NOT NULL,
  `ariv_date` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'waiting'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `delivery`
--

INSERT INTO `delivery` (`idx`, `midx`, `ariv_date`, `path`, `state`) VALUES
(2, 0, '2018년 08월 15일', '강원-경남-경기-충북', 'waiting');

-- --------------------------------------------------------

--
-- 테이블 구조 `distance`
--

CREATE TABLE `distance` (
  `idx` int(11) NOT NULL,
  `기준` varchar(255) NOT NULL,
  `서울` int(11) NOT NULL,
  `경기` int(11) NOT NULL,
  `강원` int(11) NOT NULL,
  `충북` int(11) NOT NULL,
  `충남` int(11) NOT NULL,
  `대전` int(11) NOT NULL,
  `경남` int(11) NOT NULL,
  `경북` int(11) NOT NULL,
  `전남` int(11) NOT NULL,
  `전북` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `distance`
--

INSERT INTO `distance` (`idx`, `기준`, `서울`, `경기`, `강원`, `충북`, `충남`, `대전`, `경남`, `경북`, `전남`, `전북`) VALUES
(1, '서울', 0, 20, 100, 110, 120, 200, 250, 310, 240, 220),
(2, '경기', 25, 0, 110, 130, 140, 220, 270, 330, 260, 240),
(3, '강원', 110, 130, 0, 150, 160, 230, 290, 300, 250, 270),
(4, '충북', 120, 140, 130, 0, 50, 40, 110, 60, 120, 100),
(5, '충남', 130, 150, 170, 60, 0, 70, 140, 90, 130, 110),
(6, '대전', 210, 230, 240, 50, 80, 0, 100, 70, 110, 90),
(7, '경남', 240, 280, 270, 120, 150, 110, 0, 50, 80, 100),
(8, '경북', 300, 320, 310, 70, 80, 60, 70, 0, 90, 110),
(9, '전남', 250, 270, 260, 130, 140, 120, 90, 100, 0, 60),
(10, '전북', 210, 250, 260, 110, 100, 90, 110, 100, 50, 0);

-- --------------------------------------------------------

--
-- 테이블 구조 `logistic`
--

CREATE TABLE `logistic` (
  `idx` int(11) NOT NULL,
  `midx` int(11) NOT NULL,
  `uni_idx` varchar(255) NOT NULL,
  `weight` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `apply_date` varchar(255) NOT NULL,
  `ariv_date` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'waiting'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 테이블의 덤프 데이터 `logistic`
--

INSERT INTO `logistic` (`idx`, `midx`, `uni_idx`, `weight`, `location`, `apply_date`, `ariv_date`, `state`) VALUES
(2, 1, '2018081442817-0001', 4, '경북', '2018념 08월 14일', '2018년 08월 16일', 'waiting'),
(3, 1, '2018081450337-002', 1, '경남', '2018념 08월 14일', '2018년 08월 15일', 'waiting'),
(4, 1, '2018081450349-003', 8, '경기', '2018념 08월 14일', '2018년 08월 15일', 'waiting'),
(5, 1, '2018081450359-004', 24, '충북', '2018념 08월 14일', '2018년 08월 15일', 'waiting'),
(6, 1, '2018081450408-005', 1, '전북', '2018념 08월 14일', '2018년 08월 16일', 'waiting'),
(7, 1, '2018081450432-006', 4, '충남', '2018념 08월 14일', '2018년 08월 16일', 'waiting'),
(8, 1, '2018081451321-007', 15, '강원', '2018념 08월 14일', '2018년 08월 15일', 'waiting'),
(9, 1, '2018081624247-008', 4, '경남', '2018년 08월 16일', '2018년 08월 17일', 'waiting'),
(10, 1, '2018081624447-009', 15, '전남', '2018년 08월 16일', '2018년 08월 17일', 'waiting');

-- --------------------------------------------------------

--
-- 테이블 구조 `member`
--

CREATE TABLE `member` (
  `idx` int(11) NOT NULL,
  `id` varchar(255) NOT NULL,
  `pw` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `weight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 테이블의 덤프 데이터 `member`
--

INSERT INTO `member` (`idx`, `id`, `pw`, `name`, `tel`, `level`, `weight`) VALUES
(1, 'sslmyo24@gmail.com', 'lss836060', '회사1', '02-123-1234', 'B', 0),
(4, 'sslmyo16@gmail.com', 'lss836060', '차량주1', '02-123-1234', 'A2', 4);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `distance`
--
ALTER TABLE `distance`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `logistic`
--
ALTER TABLE `logistic`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `delivery`
--
ALTER TABLE `delivery`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 테이블의 AUTO_INCREMENT `distance`
--
ALTER TABLE `distance`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- 테이블의 AUTO_INCREMENT `logistic`
--
ALTER TABLE `logistic`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- 테이블의 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
