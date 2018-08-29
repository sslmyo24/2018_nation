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
	model.query(`CREATE TABLE IF NOT EXISTS comment (idx integer primary key,midx integer,vidx integer,content)`)
	model.query(`CREATE TABLE IF NOT EXISTS follow (idx integer primary key,fridx integer,fgidx integer)`)

	$(".upload_wrap > .upload_contents, .unfollow, .follow, .user_image > .upload").hide()

	if (memberStorage) {
		$("#user > a.page").hide()
		$("#user > .user").data('user',member.idx)
		if (member.idx == midx) $(".user_image > .upload").show()
	} else {
		$("#user > .logout, #user > a.user").hide()
	}

	if ($(location).attr('href').indexOf("/user.html") != -1) {
		userPage(midx)
	}

	if($(location).attr('href').indexOf("/video.html") != -1){
		videoPage(vidx)
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

	model.query(`INSERT INTO member (last_name,first_name,id,pw,follower) values(?, ?, ?, ?)`,[last_name,first_name,id,pw,0])
	alert("회원가입 되었습니다.")
	login(member)
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
	sessionStorage.clear()
	alert("로그아웃 되었습니다")
	location.reload()
}

function numberFormat (num) {
	let reg = /(^[+-]?\d+)(\d{3})/
	num += ''
	while (reg.test(num)) {
		num = num.replace(reg,'$1'+','+'$2')
	}
	return num
}

async function userPage (idx) {
	const list = await model.query(`SELECT * FROM member where idx = ${idx}`)
	let target = $(".user_wrap")
	if(memberStorage && member.idx != idx){
		const follow = await model.query(`SELECT * FROM follow where fgidx = ${midx} and fridx = ${member.idx}`)
		if(follow.rows.length){
			$(".unfollow").show()
		} else {
			$(".follow").show()
		}
	}
	for (const data of list.rows) {
		$(".user_image > .name",target).html(data.first_name+" "+data.last_name)
		$(".user_image > span",target).html("팔로워 "+numberFormat(data.follower)+" 명")
		const videos = await model.query(`SELECT * FROM videos where midx = ${data.idx} order by date desc`)
		for (const video of videos.rows) {
			var text = `
				<a href="./video.html" data-video="{{idx}}" class="video_box">
					<div class="video">
						<img src="{{thumbnail}}" alt="img">
					</div>
					<div class="video_contents">
						<p class="title">{{title}}</p>
						<p class="sub">{{uploader}}</p>
						<p class="sub">조회수 {{views}}회</p>
					</div>
				</a>`
			text = text
					.replace(/{{idx}}/gi,video.idx)
					.replace(/{{thumbnail}}/gi,video.thumbnail)
					.replace(/{{title}}/gi,video.title)
					.replace(/{{uploader}}/gi,data.first_name+" "+data.last_name)
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

function dragSelect(evt) {
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

function dragOver(evt) {
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

async function upload () {
	let title = $(".upload_contents > div:first-child > input").val()
	let description = $(".upload_contents > div:first-child > textarea").val()
	let date = new Date()
	let category = ""
	$(".upload_contents > div:last-child > input[type='checkbox']:checked").each((index, el) => {
		category += $(this).val()+"/"
	})

	await model.query(`INSERT INTO videos (midx,title,date,description,thumbnail,video,category,views,likes,hates) values(?,?,?,?,?,?,?,?,?,?)`,[member.idx,title,date,description,thumbnail,video,category,0,0,0])
	alert("업로드 되었습니다.")
	location.replace('./index.html')
}

async function moveVideoPage () {
	let idx = $(this).data('video')
	sessionStorage.setItem("vidx",idx)
	await videoPage(idx)
}

async function videoPage (idx) {
	const list = await model.query(`SELECT v.*, m.last_name, m.first_name, m.follower FROM videos v JOIN member m ON m.idx = v.midx where v.idx = ${idx}`)
	for (const data of list.rows) {
		if (memberStorage && member.idx != data.midx) {
			const follow = await model.query(`SELECT * FROM follow where fgidx = ${midx} and fridx = ${member.idx}`)
			if (follow.rows.length) {
				$(".unfollow").show()
			} else {
				$(".follow").show()
			}
		}
		$(".video_user a").data("user",data.midx)
		$(".video_user .name").text(data.first_name+" "+data.last_name)
		$(".video_user .follow_count").text(numberFormat(data.follower))
		let text = `
			<div class="video">
				<div>
					<video src="{{video}}" id="main_video"></video>
					<div class="video_btn">
						<img src="./images/play.png" alt="" class="play play_" style="display:none">
						<img src="./images/pause.png" alt="" class="pause play_">
						<img src="./images/volume.png" alt="" class="volume volume_">
						<img src="./images/volume_off.png" alt="" class="volume_off volume_">
						<div type="range" class="volume_change"></div>
						<div type="range" id="progress" value="0"></div>
						<span><span class="now_time">0:0</span>&nbsp;/&nbsp;<span class="full_time">0:0</span></span>
					</div>
				</div>
				<div class="video_contents">
					<p class="title">{{title}}</p>
					<p></p>
					<p class="view">조회수 <span>{{views}}</span>회</p>
					<p class="good">
						<span class="good_btn"><img src="./images/good.png" alt="good"><span>{{likes}}</span></span>
						<span class="bad_btn"><img src="./images/bad.png" alt="bad"><span>{{hates}}</span></span>
					</p>
				</div>
				<div class="video_contents__">
					<p class="update">게시일 : <span>{{date}}</span></p>
					<p class="contents">{{description}}</p>
				</div>
				<div class="comments">
					<p>댓글 <span>{{cnt}}</span>개</p>
					<textarea></textarea>
					<span class="comment_btn">작성</span>
					<hr>
					<div class="comment">`
		let commentText = ""
		const commentList = await model.query(`SELECT * FROM comment where vidx = ${idx}`)
		for (const comment of commentList.rows ){
				commmentText += `
					<div>
						<img src="./images/image.jpg" alt="user_profile">
					</div>
					<div>
						<p>낭만</p>
						<p>와 정말 이쁘게 나왔네요.</p>
					</div>`
		}
		text += commentText+`</div></div></div>`
		text = text
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

	let video = $("#main_video")
	let play = $(".video_btn > .play")
	let pause = $(".video_btn > .pause")
	if($("#main_video").paused == true){
		play.show()
	} else {
		pause.show()
	}

	play.click(() => {
		video.play()
	})
	pause.click(() => {
		video.pause()
	})
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