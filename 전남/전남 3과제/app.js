var memberStorage = sessionStorage.getItem("member")
	midxStorage = sessionStorage.getItem("midx")
	vidxStorage = sessionStorage.getItem("vidx")
var member = memberStorage ? JSON.parse(memberStorage) : null;
	midx = midxStorage ? midxStorage : false;
	vidx = vidxStorage ? vidxStorage : false;
var memberInfo = false;
var video = false;
var thumbnail = false;

const model = new class {
	init () {
		this.db = openDatabase("YeosuStreaming","1.0","Jeonnam3",2*1024*1024)
	}

	query (sql,arr = [],await = true) {
		return new Promise (resolve => {
			this.db.transaction(tx => {tx.executeSql(sql,arr,(tx,res) => {resolve(res)},(tx,error) => {console.log(error)})})
		})
	}
}

function loadOn () {
	model.init()
	model.query(`CREATE TABLE IF NOT EXISTS member (idx integer primary key,first_name,last_name,id,pw,follower)`)
	model.query(`CREATE TABLE IF NOT EXISTS videos (idx integer primary key,midx integer,title,views integer,likes integer,hates integer,date date,description,thumbnail,video,category)`)
	model.query(`CREATE TABLE IF NOT EXISTS views (idx integer primary key,midx integer,vidx integer)`)
	model.query(`CREATE TABLE IF NOT EXISTS likeHate (idx integer primary key,midx integer,vidx integer,type)`)
	model.query(`CREATE TABLE IF NOT EXISTS comment (idx integer primary key,midx integer,vidx integer,content)`)
	model.query(`CREATE TABLE IF NOT EXISTS follow (idx integer primary key,fridx integer,fgidx integer)`)

	let style = `
		<style>
			input[type="range"] {-webkit-appearance:none;}
			input[type="range"].volume_change:after {display:none;}
			input[type="range"]::-webkit-slider-thumb {-webkit-appearance:none;background:#fff;width:15px;height:15px;border-radius:50%;appearance:none;cursor:pointer;}
			input[type="range"]::-moz-range-thumb {-webkit-appearance:none;background:#fff;width:15px;height:15px;border-radius:50%;}
		</style>`
	$("head").append(style)

	$(".upload_wrap > .upload_contents, .unfollow, .follow, .user_image > .upload").hide()

	if (memberStorage) {
		$("#user > a.page").hide()
		$("#user > .user").data('user',member.idx)
		if (member.idx == midx) $(".user_image > .upload").show()
	} else {
		$("#user > .logout, #user > a.user").hide()
	}

	if ($(location).attr('href').indexOf("/index.html") != -1 || $(location).attr('href').indexOf("html") == -1) {
		mainPage()
	}

	if ($(location).attr('href').indexOf("/user.html") != -1) {
		userPage(midx)
	}

	if($(location).attr('href').indexOf("/video.html") != -1){
		videoPage(vidx)
	}
}

async function mainPage () {
	const popularVideoList = await model.query(`SELECT * FROM videos order by likes desc limit 6`)
	let i = 1
	for (const pvideo of popularVideoList.rows) {
		if (i == 1) {
			let text = `
				<div>
					<img src="./images/gold_crown.png" alt="gold_crown" class="gold_crown">
					<div class="video">
						<video src="{{video}}" id="main_video"></video>
						<div class="video_btn">
							<img src="./images/play.png" alt="video_icon" class="play play_" style="display:none">
							<img src="./images/pause.png" alt="video_icon" class="pause play_">
							<img src="./images/volume.png" alt="video_icon" class="volume volume_" style="display:none">
							<img src="./images/volume_off.png" alt="video_icon" class="volume_off volume_">
							<input type="range" class="volume_change volume_bar"></input>
							<input type="range" id="progress" value="0"></input>
							<span><span class="now_time">0:0</span>&nbsp;/&nbsp;<span class="full_time">0:0</span></span>
						</div>
					</div>
					<div class="video_contents">
						<div>
							<a href="./user.html" data-user="{{midx}}">
								<div class="user_icon">
									
								</div>
								<div class="user_name">
									<p class="user_name_">{{name}}</p>
									<p>팔로워 <span class="follow_count">{{follower}}</span>명</p>
								</div>
							</a>
						</div>	
						<div>
							<div class="video_title">
								<a href="./video.html" data-video="{{idx}}">{{title}} - {{name}}</a>
							</div>
							<div class="lookup">조회수 <span>{{views}}</span>회</div>
							<div class="video_contents_">{{description}}</div>
						</div>			
					</div>
				</div>`
			const member = await model.query(`SELECT * FROM member where idx = ${pvideo.midx}`)
			for (const data of member.rows){
				text = text
						.replace(/{{video}}/gi,pvideo.video)
						.replace(/{{midx}}/gi,pvideo.midx)
						.replace(/{{name}}/gi,data.first_name+" "+data.last_name)
						.replace(/{{follower}}/gi,numberFormat(data.follower))
						.replace(/{{idx}}/gi,pvideo.idx)
						.replace(/{{title}}/gi,pvideo.title)
						.replace(/{{views}}/gi,numberFormat(pvideo.views))
						.replace(/{{description}}/gi,pvideo.description)
			}
			$("#main > div").append(text)
			i++
		} else {
			if (i == 2) $("#main > div").append('<div><div></div></div>')
			let text = `
				<div class="video_rank">
					{{crown}}
					<a href="./video.html" data-video="{{idx}}"">
						<img src="{{thumbnail}}" alt="image">
					</a>
				</div>`
			text = text
					.replace(/{{idx}}/gi,pvideo.idx)
					.replace(/{{thumbnail}}/gi,pvideo.thumbnail)
			switch (i) {
				case 2 :
					text = text.replace(/{{crown}}/gi,`<img src="./images/silver_crown.png" alt="icon">`)
					break
				case 3 :
					text = text.replace(/{{crown}}/gi,`<img src="./images/bronze_crown.png" alt="icon">`)
					break
				default:
					text = text.replace(/{{crown}}/gi,``)
					break
			}
			$("#main > div > div:last-child").append(text)
			if(i == popularVideoList.rows.length) $("#main > div > div:last-child").append(`<div></div>`)
			i++
		}
	}

	randomVideoList("main")
	videoControl()
}

async function randomVideoList (page) {
	const fitVideoList = await model.query(`SELECT idx FROM videos`)
	let max = 10
	let len = fitVideoList.rows.length
	while (true) {
		if (max >= len) break
		max *= 10
	}
	let idxs = ""
	for (let i = 1; i <= 8 && i <= len; i++) {
		if (page == "video" && i >= len) break
		let idx = 0
		while (true) {
			idx = Math.floor(Math.random() * max) + 1
			if (idxs.indexOf(idx) != -1) continue
			if (page == "video" && vidx == idx) continue
			if (idx >= 1 && idx <= len) break
		}
		idxs += idx
		const fitVideo = await model.query(`SELECT v.idx, v.title, v.views, v.thumbnail, m.last_name, m.first_name FROM videos v JOIN member m ON v.midx = m.idx where v.idx = ${idx}`)
		for (const fvideo of fitVideo.rows){
			let text = ''
			if (page == "main") {
				text = `
					<a href="./video.html" data-video="{{idx}}">
						<div>
							<img src="{{thumbnail}}" alt="img">
						</div>
						<div>
							<p>{{title}} - {{name}}</p>
							<p>{{name}}</p>
							<p>조회수 {{views}}회</p>
						</div>
					</a>`
			} else if (page == "video") {
				text = `
					<a href="./video.html" data-video="{{idx}}">
						<div>
							<img src="{{thumbnail}}" alt="img">
						</div>
						<div>
							<p class="title">{{title}}</p>
							<p>{{name}}</p>
							<p>조회수 {{views}}회</p>
						</div>
					</a>`
			}
			text = text
					.replace(/{{idx}}/gi,fvideo.idx)
					.replace(/{{thumbnail}}/gi,fvideo.thumbnail)
					.replace(/{{title}}/gi,fvideo.title)
					.replace(/{{name}}/gi,fvideo.first_name+" "+fvideo.last_name)
					.replace(/{{views}}/gi,numberFormat(fvideo.views))
			if (page == "main") $("#cus_vi > div > div").prepend(text)
			else if (page == "video") $(".next_video").prepend(text)
		}
	}
}

async function join () {
	let last_name = $("#join_last_name").val()
	let first_name = $("#join_first_name").val()
	let id = $("#join_id").val()
	let pw = $("#join_pw").val()
	let pw_chk = $("#join_pw_chk").val()

	if (!first_name.length) {
		alert("이름은 필수 항목입니다.")
		return false
	}

	if (!id.length) {
		alert("아이디는 필수 항목입니다.")
		return false
	}

	const list = await model.query(`SELECT * FROM member where id = '${id}'`)
	if (list.rows.length) {
		alert("중복된 아이디 입니다.")
		return false
	}

	if (!pw.length) {
		alert("비밀번호는 필수 항목입니다.")
		return false
	}

	if (!pw_chk.length) {
		alert("비밀번호 확인은 필수 항목입니다.")
		return false
	}

	if (pw != pw_chk) {
		alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
		return false
	}

	const memberList = await model.query(`SELECT * FROM member`)
	const len = memberList.rows.length + 1

	let member = {
		idx:len,
		last_name:last_name,
		first_name:first_name,
		id:id,
		pw:pw,
		follower:0
	}

	await model.query(`INSERT INTO member (last_name,first_name,id,pw,follower) values(?, ?, ?, ?, ?)`,[last_name,first_name,id,pw,0])
	alert("회원가입 되었습니다.")
	memberInfo = member
	login()
}

async function login (){
	let member
	if (memberInfo) {
		member = memberInfo
	} else {
		let id = $("#login_id").val()
		let pw = $("#login_pw").val()

		if (!id.length) {
			alert("아이디는 필수 항목입니다.")
			return false
		}

		if (!pw.length) {
			alert("비밀번호는 필수 항목입니다.")
			return false
		}

		const list = await model.query(`SELECT * FROM member where id = '${id}' and pw = '${pw}'`)
		if (!list.rows.length) {
			alert("아이디 또는 비밀번호가 잘못 되었습니다.")
			return false
		}

		for (const data of list.rows) {
			member = {
				idx:data.idx,
				last_name:data.last_name,
				first_name:data.first_name,
				id:data.id,
				pw:data.pw,
				follower:data.follower
			}
		}
	}

	sessionStorage.setItem("member",JSON.stringify(member))
	if (!memberInfo) alert("로그인 되었습니다" )
	location.replace('./index.html')
}

function logout () {
	sessionStorage.removeItem("member")
	alert("로그아웃 되었습니다")
	location.reload()
}

async function userPage (idx) {
	const list = await model.query(`SELECT * FROM member where idx = ${idx}`)
	let target = $(".user_wrap")
	if(memberStorage && member.idx != idx){
		const follow = await model.query(`SELECT * FROM follow where fgidx = ${midx} and fridx = ${member.idx}`)
		if(follow.rows.length){
			$(".unfollow").show()
			$(".unfollow").data("user",idx)
		} else {
			$(".follow").show()
			$(".follow").data("user",idx)
		}
	}
	for (const data of list.rows) {
		$(".user_image > .name",target).html(data.first_name+" "+data.last_name)
		$(".user_image > span",target).html("팔로워 "+numberFormat(data.follower)+" 명")
		const videos = await model.query(`SELECT * FROM videos where midx = ${data.idx} order by date desc`)
		for (const video of videos.rows) {
			let text = `
				<a href="./video.html" data-video="{{idx}}" class="video_box">
					<div class="video">
						<img src="{{thumbnail}}" alt="img">
					</div>
					<div class="video_contents">
						<p class="title">{{title}}</p>
						<p class="sub">{{name}}</p>
						<p class="sub">조회수 {{views}}회</p>
					</div>
				</a>`
			text = text
					.replace(/{{idx}}/gi,video.idx)
					.replace(/{{thumbnail}}/gi,video.thumbnail)
					.replace(/{{title}}/gi,video.title)
					.replace(/{{name}}/gi,data.first_name+" "+data.last_name)
					.replace(/{{views}}/gi,numberFormat(video.views))
			$(".video_list",target).append(text)
		}
	}
}

async function moveUserPage () {
	let idx = $(this).data('user')
	sessionStorage.setItem("midx",idx)
	await userPage(idx)
}

async function upload () {
	let title = $(".upload_contents > div:first-child > input").val()
	let description = $(".upload_contents > div:first-child > textarea").val()
	let date = new Date()
	let category = ""
	$(".upload_contents > div:last-child > input[type='checkbox']:checked").each((index, el) => {
		category += $(this).val()+"/"
	})

	if(!title.length){
		alert("제목은 필수 항목입니다")
		return false
	}

	if(!description.length){
		alert("영상 설명은 필수 항목입니다")
		return false
	}

	if(!thumbnail){
		alert("영상 표지는 필수 항목입니다")
		return false
	}

	if(!category.length){
		alert("카테고리는 필수 항목입니다")
		return false
	}

	await model.query(`INSERT INTO videos (midx,title,date,description,thumbnail,video,category,views,likes,hates) values(?,?,?,?,?,?,?,?,?,?)`,[member.idx,title,date,description,thumbnail,video,category,0,0,0])
	alert("업로드 되었습니다.")
	location.replace('./user.html')
}

async function moveVideoPage () {
	let idx = $(this).data('video')
	sessionStorage.setItem("vidx",idx)
	await videoPage(idx)
}

async function videoPage (idx) {
	if (memberStorage) {
		const views = await model.query(`SELECT * FROM views where midx = ${member.idx} and vidx = ${idx}`)
		if(!views.rows.length){
			await model.query(`UPDATE videos SET views = views + 1 where idx = ${idx}`)
			await model.query(`INSERT INTO views (midx,vidx) values(?, ?)`,[member.idx,idx])
		}
	}
	const list = await model.query(`SELECT v.*, m.last_name, m.first_name, m.follower FROM videos v JOIN member m ON m.idx = v.midx where v.idx = ${idx}`)
	for (const data of list.rows) {
		if (memberStorage && member.idx != data.midx) {
			const follow = await model.query(`SELECT * FROM follow where fgidx = ${data.midx} and fridx = ${member.idx}`)
			if (follow.rows.length) {
				$(".unfollow").css({"display":"inline-block"})
			} else {
				$(".follow").css({"display":"inline-block"})
			}
		}
		$(".video_user a, .follow , .unfollow").data("user",data.midx)
		$(".video_user .name").text(data.first_name+" "+data.last_name)
		$(".video_user .follow_count").text(numberFormat(data.follower))
		let text = `
			<div class="video">
				<div>
					<video src="{{video}}" id="main_video"></video>
					<div class="video_btn">
						<img src="./images/play.png" alt="" class="play play_" style="display:none">
						<img src="./images/pause.png" alt="" class="pause play_">
						<img src="./images/volume.png" alt="" class="volume volume_" style="display:none">
						<img src="./images/volume_off.png" alt="" class="volume_off volume_">
						<input type="range" class="volume_change volume_bar"></input>
						<input type="range" id="progress" value="0"></input>
						<span><span class="now_time">0:0</span>&nbsp;/&nbsp;<span class="full_time">0:0</span></span>
					</div>
				</div>
				<div class="video_contents">
					<p class="title">{{title}}</p>
					<p></p>
					<p class="view">조회수 <span>{{views}}</span>회</p>
					<p class="good">
						<span class="good_btn" data-idx="{{idx}}"><img src="./images/good.png" alt="good"><span>{{likes}}</span></span>
						<span class="bad_btn" data-idx="{{idx}}"><img src="./images/bad.png" alt="bad"><span>{{hates}}</span></span>
					</p>
				</div>
				<div class="video_contents__">
					<p class="update">게시일 : <span>{{date}}</span></p>
					<p class="contents">{{description}}</p>
				</div>
				<div class="comments">
					<p>댓글 <span>{{cnt}}</span>개</p>
					<textarea></textarea>
					<span class="comment_btn" data-video="{{idx}}">작성</span>
					<hr>
					<div class="comment">`
		let commentText = ""
		const commentList = await model.query(`SELECT c.content, m.last_name, m.first_name FROM comment c JOIN member m ON c.midx = m.idx where vidx = ${idx}`)
		for (const comment of commentList.rows ){
			commentText += `
				<div>
					<img src="./images/image.jpg" alt="user_profile">
				</div>
				<div>
					<p>{{name}}</p>
					<p>{{content}}</p>
				</div>`
			commentText = commentText
							.replace(/{{name}}/gi,comment.first_name+" "+comment.last_name)
							.replace(/{{content}}/gi,comment.content)
		}
		text += commentText+`</div></div></div>`
		text = text
				.replace(/{{idx}}/gi,data.idx)
				.replace(/{{video}}/gi,data.video)
				.replace(/{{title}}/gi,data.title)
				.replace(/{{views}}/gi,numberFormat(data.views))
				.replace(/{{likes}}/gi,numberFormat(data.likes))
				.replace(/{{hates}}/gi,numberFormat(data.hates))
				.replace(/{{date}}/gi,dateFormat(data.date))
				.replace(/{{description}}/gi,data.description)
				.replace(/{{cnt}}/gi,commentList.rows.length)
		$(".video_wrap").prepend(text)
	}

	randomVideoList("video")
	videoControl()
}

async function likeClick () {
	if (!memberStorage) {
		alert("로그인 후 가능합니다")
		return false
	}
	let idx = $(this).data("idx")
	const likeHate = await model.query(`SELECT idx, type FROM likeHate where midx = ${member.idx} and vidx = ${idx}`)
	if(likeHate.rows.length){
		for (const data of likeHate.rows){
			if(data.type == "hate"){
				await model.query(`UPDATE likeHate SET type = "like" where idx = ${data.idx}`)
				await model.query(`UPDATE videos SET likes = likes + 1, hates = hates - 1 where idx = ${idx}`)
			} else {
				await model.query(`DELETE FROM likeHate where idx = ${data.idx}`)
				await model.query(`UPDATE videos SET likes = likes - 1 where idx = ${idx}`)
			}
		}
	} else {
		await model.query(`INSERT INTO likeHate (midx,vidx,type) values(?, ?, ?)`,[member.idx,idx,"like"])
		await model.query(`UPDATE videos SET likes = likes + 1 where idx = ${idx}`)
	}

	location.reload()
}

async function hateClick () {
	if (!memberStorage) {
		alert("로그인 후 가능합니다")
		return false
	}
	let idx = $(this).data("idx")
	const likeHate = await model.query(`SELECT idx, type FROM likeHate where midx = ${member.idx} and vidx = ${idx}`)
	if(likeHate.rows.length){
		for (const data of likeHate.rows){
			if(data.type == "like"){
				await model.query(`UPDATE likeHate SET type = "hate" where idx = ${data.idx}`)
				await model.query(`UPDATE videos SET likes = likes - 1, hates = hates + 1 where idx = ${idx}`)
			} else {
				await model.query(`DELETE FROM likeHate where idx = ${data.idx}`)
				await model.query(`UPDATE videos SET hates = hates - 1 where idx = ${idx}`)
			}
		}
	} else {
		await model.query(`INSERT INTO likeHate (midx,vidx,type) values(?, ?, ?)`,[member.idx,idx,"hate"])
		await model.query(`UPDATE videos SET hates = hates + 1 where idx = ${idx}`)
	}

	location.reload()
}

async function follow () {
	if(!memberStorage){
		alert("로그인 후 가능합니다")
		return false
	}
	let idx = $(this).data("user")
	await model.query(`UPDATE member SET follower = follower + 1 where idx = ${idx}`)
	await model.query(`INSERT INTO follow (fridx,fgidx) values(?, ?)`,[member.idx,idx])
	location.reload()
}

async function unfollow () {
	let idx = $(this).data("user")
	await model.query(`UPDATE member SET follower = follower - 1 where idx = ${idx}`)
	await model.query(`DELETE FROM follow where fridx = ${member.idx} and fgidx = ${idx}`)
	location.reload()
}

async function commentInsert () {
	if (!memberStorage) {
		alert("로그인 후 가능합니다")
		return false
	}
	let idx = $(this).data("video")
	let content = $(".comments > textarea").val()
	await model.query(`INSERT INTO comment (midx,vidx,content) values(?, ?, ?)`,[member.idx,idx,content])
	location.reload()
}

function dragSelect (evt) {
	evt.stopPropagation()
	evt.preventDefault()

	let files = evt.originalEvent.dataTransfer.files
	let reader = new FileReader()

	for (let i = 0, f; f = files[i]; i++) {
		if(f.type.indexOf("video") == -1){
			alert("동영상만 가능합니다.")
			return false
		}
		let reader = new FileReader()
		reader.onload = (theFile => {
			return e => {
				video = e.target.result
			}
		})(f)

		reader.readAsDataURL(f)
	}
	$(".upload_wrap > .upload").hide()
	$(".upload_wrap > .upload_contents").show()
}

function dragOver (evt) {
	evt.stopPropagation()
	evt.preventDefault()
	evt.originalEvent.dataTransfer.dropEffect = "copy"
}

function fileSelect (evt,type) {
	let files = evt.target.files

	for (let i = 0, f; f = files[i]; i++) {

		let reader = new FileReader()
		reader.onload = (theFile => {
			return e => {
				if (type == "video" && e.target.result.indexOf("video") == -1) {
					alert("동영상만 가능합니다.")
					return false
				}
				else if (type == "image" && e.target.result.indexOf("image") == -1) {
					alert("이미지만 가능합니다.")
					return false
				}
				if(type == "video"){
					video = e.target.result
					$(".upload_wrap > .upload").hide()
					$(".upload_wrap > .upload_contents").show()
				} else if (type == "image") {
					thumbnail = e.target.result
					$(".image_upload > img").attr("src",e.target.result)
				}
			}
		})(f)

		reader.readAsDataURL(f)
	}
}

function videoFileSelect (evt) {
	fileSelect(evt,"video")
}

function imageFileSelect (evt) {
	fileSelect(evt,"image")
}

function videoControl () {
	let video = document.getElementById("main_video")
	let play = $(".video_btn > .play")
	let pause = $(".video_btn > .pause")
	let volume = $(".video_btn > .volume")
	let volume_off = $(".video_btn > .volume_off")
	let progress = $("#progress")
	let volume_bar = $(".volume_bar")
	let now_time = $(".now_time")
	let full_time = $(".full_time")

	if (video.paused == true) {
		play.show()
	} else {
		pause.show()
	}

	if (video.muted == true) {
		volume_off.show()
	} else {
		volume.show()
	}

	play.click(() => {
		video.play()
		full_time.text(timeFormat(video.duration))
		play.hide()
		pause.show()
	})
	pause.click(() => {
		video.pause()
		pause.hide()
		play.show()
	})

	volume.click(() => {
		video.muted = true
		volume.hide()
		volume_off.show()
	})
	volume_off.click(() => {
		video.muted = false
		volume_off.hide()
		volume.show()
	})

	volume_bar.change(() => {
		video.volume = volume_bar.val()
	})

	progress.change(() => {
		let value = (progress.val() / 100) * video.duration

		video.currentTime = value
		now_time.text(timeFormat(video.currentTime))
		if(video.paused == false) video.play()
	})

	video.addEventListener("timeupdate",() => {
		let value = (100 / video.duration) * video.currentTime

		progress.val(value)
		now_time.text(timeFormat(video.currentTime))
	})
}

function numberFormat (num) {
	let reg = /(^[+-]?\d+)(\d{3})/
	num += ''
	while (reg.test(num)) {
		num = num.replace(reg,'$1'+','+'$2')
	}
	return num
}

function dateFormat (time) {
	let date = new Date(time)
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	if (month < 10) {
		month = "0"+month
	}
	if (day < 10) {
		day = "0"+day
	}

	return year+". "+month+". "+day
}

function timeFormat (time) {
	let min = Math.floor(time / 60)
	let sec = Math.floor(time - (min*60))
	return min+":"+sec
}

$(loadOn)
.on("click","#join_btn",join)
.on("click","#login_btn",login)
.on("click",".logout",logout)
.on("click","a[href='./user.html']",moveUserPage)
.on("click","a[href='./video.html']",moveVideoPage)
.on("dragover",".upload_wrap > .upload > input",dragOver)
.on("drop",".upload_wrap > .upload > input",dragSelect)
.on("change",".upload_wrap > .upload > input",videoFileSelect)
.on("change",".upload_contents .image_upload > input",imageFileSelect)
.on("click",".upload_wrap .upload_btn",upload)
.on("click",".good_btn",likeClick)
.on("click",".bad_btn",hateClick)
.on("click",".follow",follow)
.on("click",".unfollow",unfollow)
.on("click",".comment_btn",commentInsert)