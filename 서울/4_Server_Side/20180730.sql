-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 18-08-02 13:25
-- 서버 버전: 10.1.21-MariaDB
-- PHP 버전: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `20180730`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `member`
--

CREATE TABLE `member` (
  `idx` int(11) NOT NULL,
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pw` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `member`
--

INSERT INTO `member` (`idx`, `id`, `name`, `email`, `pw`) VALUES
(1, 'user1', '사용자1', 'sslmyo24@gmail.com', '2fc577149080578c983f969a6ce84146fb79b5e17c0447d4e0718e039d62da19');

-- --------------------------------------------------------

--
-- 테이블 구조 `review`
--

CREATE TABLE `review` (
  `idx` int(11) NOT NULL,
  `midx` int(11) NOT NULL,
  `destination` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `review`
--

INSERT INTO `review` (`idx`, `midx`, `destination`, `subject`, `file`, `content`, `time`) VALUES
(3, 1, 24, '잘다녀옴', '1533206386_71127.jpg', '&lt;p&gt;&lt;span style=&quot;font-size: 24pt;&quot;&gt;머바가&lt;/span&gt;&lt;span style=&quot;font-size: 8pt;&quot;&gt;ㅏㅏㅏㅏㅏㅏ&lt;/span&gt;&lt;u&gt;ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ가ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㄱ&lt;/u&gt;&lt;/p&gt;', '2018-08-02 19:39:46');

-- --------------------------------------------------------

--
-- 테이블 구조 `tour`
--

CREATE TABLE `tour` (
  `idx` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `tour`
--

INSERT INTO `tour` (`idx`, `subject`, `file`, `tag`, `thumbnail`) VALUES
(1, '오동도', 'content1.html', '여수10경 동백꽃 섬 등대', '1.jpg'),
(2, '거문도/백도', 'content2.html', '여수10경 삼산면 섬 등대 인어', '2.jpg'),
(3, '향일암', 'content3.html', '여수10경 돌산 일출 대웅전 임진왜란', '3.jpg'),
(4, '금오도비렁길', 'content4.html', '여수10경 절벽 안도대교 인어공주', '4.jpg'),
(5, '여수세계박람회장', 'content5.html', '여수10경 빅오 스카이타워 엑스포', '5.jpg'),
(6, '진남관', 'content6.html', '여수10경 충무공 임진왜란 역사코스', '6.jpg'),
(7, '여수밤바다/산단야경', 'content7.html', '여수10경 야경 이순신대교 돌산대교', '7.jpg'),
(8, '영취산진달래', 'content8.html', '여수10경 이순신대교 진달래 진례산', '8.jpg'),
(9, '여수해상케이블카', 'content9.html', '여수10경 케이블카 돌산공원 자산공원', '9.jpg'),
(10, '이순신대교', 'content10.html', '여수10경 야경 전망대 이순신', '10.jpg'),
(11, '백야도', 'content11.html', '여수 가막만 여자만 백호산 백호도', '11.jpg'),
(12, '만성리 검은모래 해변', 'content12.html', '태양열 모래찜질 자연암반터널 해수욕장', '12.jpg'),
(13, '고소대', 'content13.html', '진남관 타루비 통제이공수군대첩비 동령소갈비', '13.jpg'),
(14, '구봉산', 'content14.html', '구봉산 서당산 한산사', '14.jpg'),
(15, '백호산 등산로', 'content15.html', '백야도 백호산 등산로', '15.jpg'),
(16, '여수이순신마리나', 'content16.html', '마리나 요트 여수요트 웅천', '16.jpg'),
(17, '여수 올빼미 야경투어', 'content17.html', '이색체험 야경', '17.jpg'),
(18, '돌산해양낚시공원', 'content18.html', '돌산공원 돌산낚시 낚시', '18.jpg'),
(19, '여수 상백도·하백도 일원', 'content19.html', '백도 삼산면 금단의섬 낙타섬', '19.jpg'),
(20, '방죽포해수욕장', 'content20.html', '방죽포해수욕장 해송 바다낚시 영화촬영', '20.jpg'),
(21, '여자도', 'content21.html', '섬 송여자도 대여자도', '21.jpg'),
(22, '공룡발자국화석', 'content22.html', '공룡 화석지 발자국 사도', '22.jpg'),
(23, '하화도', 'content23.html', '비렁길 걷기 트래킹꽃섬', '23.jpg'),
(24, '낭도', 'content24.html', '낭도 섬 막걸리', '24.jpg');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `tour`
--
ALTER TABLE `tour`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 테이블의 AUTO_INCREMENT `review`
--
ALTER TABLE `review`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 테이블의 AUTO_INCREMENT `tour`
--
ALTER TABLE `tour`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
