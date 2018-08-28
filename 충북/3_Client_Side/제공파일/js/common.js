// common.js
var memberStorage = sessionStorage.getItem("member")
	searchKeyStorage = sessionStorage.getItem("searchKey")
	profileStorage = sessionStorage.getItem("profile")
	startStorage = sessionStorage.getItem("start")
var member = memberStorage ? JSON.parse(memberStorage) : null
	searchKey = searchKeyStorage ? JSON.parse(searchKeyStorage) : false
	profileText = profileStorage ? JSON.parse(profileStorage) : false
	start = startStorage ? startStorage : false
var file = null;

function loadOn () {
	var membership = $(".membership")
	$("div, div > *",membership).hide()
	$(".box > div").remove()

	$(".categories > ul:nth-child(2)").addClass('order')
	$(".categories > ul:nth-child(4)").addClass('type')
	$(".order > li:first-child").data("order","date")
	$(".order > li:last-child").data("order","likes")
	$(".type > li:nth-child(1)").data("type","풍경")
	$(".type > li:nth-child(2)").data("type","인물")
	$(".type > li:nth-child(3)").data("type","기타")

	if(memberStorage && member.id == "admin"){
		$(".newsfeed > div:first-child").hide()
		var target = $("div:first-child",membership)
		target.show()
		$("button:nth-child(4) , button:nth-child(5), button:last-child",target).show()
		setAdmin()
	} else {
		var sql = setSql()
		sql += ` limit 5`
		if(memberStorage){
			var target = $("div:first-child",membership)
			target.show()
			$("button:last-child",target).show()
			$("img",target).attr("src",member.profile)
			$(".member_name",target).html(member.nickname)
			$("img, span, button:nth-child(3)",target).show()
			$("button:nth-child(3)",target).data("midx",member.idx)
		} else {
			$("div:last-child, div:last-child > *",membership).show()
		}
		model.query(sql)
		.then(setGallery)
	}

	// login
	$(".login_btn").click(function(e){
		$(".bg").css({'z-index':'1','opacity':'1'})
		$(".login").show()

		$(".bg span").click(function(e){
			$(".bg").css({'z-index':'-1','opacity':'0'})
			$(".login").hide()
		})
	})

	// join
	$(".join_btn").click(function(e){
		$(".bg").css({'z-index':'1','opacity':'1'})
		$(".join").show()

		$(".bg span").click(function(e){
			$(".bg").css({'z-index':'-1','opacity':'0'})
			$(".join").hide()
		})
	})

	// upload
	$(".upload_btn").click(function(e){
		$(".bg").css({'z-index':'1','opacity':'1'})
		$(".upload").show()

		$(".bg span").click(function(e){
			$(".bg").css({'z-index':'-1','opacity':'0'})
			$(".upload").hide()
		})
	})
}

const model = new class {

	init () {
		this.db = openDatabase('Jstargram','1.0','chungbuk4',2*1024*1024)
	}

	query (sql,arr = [], await = true) {
		return new Promise (resolve => {
			this.db.transaction(tx => { tx.executeSql(sql,arr,(tx,res) => { resolve(res) }, (tx,error) => {console.log(error)})})
		})
	}

	querySet (action,table,column,arr) {
		let sql = ""
		switch(action){
			case 'insert' :
				let value = ""
				for (let i = arr.length - 1; i >= 0; i--) {
					if(i == 0) value += "?"
					else value += "?, "
				}
				sql += `INSERT INTO ${table} (${column}) values(${value})`
				break
			case 'update' :
				sql += `UPDATE ${table} SET ${column} where idx = ?`
				break
			case 'delete' :
				let condition = ``
				for (var i = arr.length - 1; i >= 0; i--) {
					if(i == 0) condition += `${column[i]} = ?`
					else condition += `${column[i]} = ? and `
				}
				sql += `DELETE FROM ${table} where ${condition}`
				break
		}
		this.query(sql,arr)
	}
}

function setSql () {
	var sql = `SELECT b.*, m.nickname as nickname, m.profile, m.open FROM board b JOIN member m ON m.idx = b.midx`
	if(searchKeyStorage && searchKey.midx) sql += ` where b.midx = ${searchKey.midx}`
	if(searchKeyStorage && searchKey.type) sql += ` where b.type = '${searchKey.type}'`
	if(searchKeyStorage && searchKey.order) sql += ` order by b.${searchKey.order} desc`
	else sql += ` order by b.date asc`
	return sql
}

async function setGallery (list,scroll = false) {
	if(scroll){
		var startidx = start - 5
	} else {
		let len = list.rows.length
		var startidx = len - 6
	}
	sessionStorage.setItem("start",startidx)
	for (const data of list.rows){
		let text = `
			<div class="gallery">
				<img src="{{profile}}" alt="img" class="gallery_img" data-midx="{{midx}}">
				<span class="gallery_name" data-midx="{{midx}}">{{nickname}}</span>
				<span class="gallery_like" data-idx="{{idx}}" {{style}}><i class="fa fa-star" data-idx="{{idx}}"></i>{{likes}}</span>
				<hr>
				<p class="gallery_text">{{content}}</p>
				<img src="{{img}}" alt="img" class="gallery_main">
				<hr>
			</div>
			<div>
				<!-- 게시물 삭제 -->
				<button class="gallery_delete" data-idx="{{idx}}" data-midx="{[midx]}">게시물 삭제</button>
				<span class="comment">댓글</span>
				<span class="comment_name">{{nowNickname}}</span>
				<input type="text" placeholder="댓글을 입력하세요." class="comment_input">
				<button class="comment_button" data-idx="{{idx}}">댓글 등록</button>
				<ul class="comment_ul">`
		let commentList = await model.query(`SELECT c.*, m.nickname FROM comment c JOIN member m ON m.idx = c.midx where bidx = '${data.idx}'`)
		let commentText = ''
		for (const comment of commentList.rows){
			commentText	+= `
					<li>
						<span class="comment_name">${comment.nickname}</span>
						<span class="comment_text">${comment.content}</span>
					</li>`
		}
		text += commentText+`</ul></div>`
		text = text
				.replace(/{{idx}}/gi,data.idx)
				.replace(/{{midx}}/gi,data.midx)
				.replace(/{{profile}}/gi,data.open == "공개" ? data.profile : "images/basic.jpg")
				.replace(/{{nowNickname}}/gi,memberStorage ? member.nickname : "")
				.replace(/{{nickname}}/gi,data.nickname)
				.replace(/{{likes}}/gi,data.likes ? numberFormat(data.likes) : 0)
				.replace(/{{content}}/gi,data.content)
				.replace(/{{img}}/gi,data.img)
		if(memberStorage){
			let likes = await model.query(`SELECT * FROM likeList where bidx = ${data.idx} and midx = ${member.idx}`)
			if(likes.rows.length){
				text = text.replace(/{{style}}/gi,"style='color:#308bd8'")
			}
		}
		$(".box").append(text)
	}
	if(searchKeyStorage && searchKey.midx) $(".box").append(profileText)
}

function search (type,option) {
	switch (type) {
		case "order" :
			var key = {
				type:searchKey.type ? searchKey.type : false,
				order:option
			}
			break
		case "type" :
			var key = {
				type:option,
				order:searchKey.order ? searchKey.order : false
			}
			break
		case "midx" :
			var key = {
				midx:option
			}
			break
	}
	sessionStorage.setItem("searchKey",JSON.stringify(key))
	location.reload()
}

function searchOrder () {
	let order = $(this).data("order")
	search("order",order)
}

function searchType () {
	let type = $(this).data("type")
	search("type",type)
}

function upload () {
	let content = $(".upload input[type='text']").val()
	let type = $(".upload select").val()
	let midx = member.idx
	let date = new Date()

	if(!file){
		alert("이미지가 누락되었습니다.")
		return false
	}

	let action = "insert"
	let table = "board"
	let column = [`midx`,`content`,`date`,`img`,`type`,`likes`]
	let arr = [midx,content,date,file,type,0]
	model.querySet(action,table,column,arr)
	alert("업로드 되었습니다.")
	location.reload()
}

function galleryDelete () {
	if(member.idx == $(this).data("midx")){
		alert("게시자만 삭제가능합니다.")
		return false
	}
	var idx = $(this).data("idx")
	model.querySet("delete","board",null,[idx])
	alert("삭제되었습니다")
	location.reload()
}

async function clickLike () {
	if(!memberStorage){
		alert("로그인 후 이용 가능합니다.")
		history.back()
	}
	let idx = $(this).data("idx")
	const like = await model.query(`SELECT * FROM likeList where midx = ${member.idx} and bidx = ${idx}`)
	if(like.rows.length){
		await model.query(`DELETE FROM likeList where midx = ? and bidx = ?`,[member.idx,idx])
		await model.query(`UPDATE board SET likes = likes - 1 where idx = ? `,[idx])
	} else {
		await model.query(`INSERT INTO likeList (midx, bidx) values(?, ?)`,[member.idx,idx])
		await model.query(`UPDATE board SET likes = likes + 1 where idx = ? `,[idx])
	}
	location.reload()
}

function commentInsert () {
	if(!memberStorage){
		alert("로그인 후 이용 가능합니다.")
		history.back()
	}
	let content = $(this).parent().find('input[type="text"]').val()
	let idx = $(this).data('idx')

	let action = "insert"
	let table = "comment"
	let column = [`midx`,`bidx`,`content`]
	let arr = [member.idx,idx,content]
	model.querySet(action,table,column,arr)
	alert("등록 되었습니다.")
	location.reload()
}

async function join () {
	let id = $(".join input.id").val()
	let pw = $(".join input.pw").val()
	let pw_chk = $(".join input#pw_chk").val()
	let nickname = $(".join input#nickname").val()
	let phone = $(".join input#phone").val()
	let open = $(".join select#open").val()
	let date = new Date()

	if(!id.length){
		alert("아이디가 누락되었습니다.")
		return false
	}
	const list = await model.query("SELECT * FROM member where id = '"+id+"'")
	if(list.rows.length){
		alert("중복된 아이디 입니다.")
		return false
	}

	if(!pw.length){
		alert("비밀번호가 누락되었습니다.")
		return false
	}
	var reg = /[!|@|#|$|%|^|&|*|?]{1,}/
	if(!reg.test(pw)){
		alert("비밀번호가 형식에 맞지 않습니다.")
		return false
	}
	if(pw !== pw_chk){
		alert("비밀번호와 비밀번호 확인이 같지 않습니다.")
		return false
	}

	if(!nickname.length){
		alert("닉네임이 누락되었습니다.")
		return false
	}

	let action = "insert"
	let table = "member"
	let column = [`id`,`pw`,`nickname`,`phone`,`open`,`profile`,`date`]
	let arr = [id,pw,nickname,phone,open,file,date]
	model.querySet(action,table,column,arr)
	alert("회원가입 되었습니다")
	$(".join input").val("")
	$(".bg").css({'z-index':'-1','opacity':'0'})
	$(".join").hide()
}


async function login () {
	let id = $(".login input.id").val()
	let pw = $(".login input.pw").val()

	if(!id.length){
		alert("아이디가 누락되었습니다.")
		return false
	}
	if(!pw.length){
		alert("비밀번호가 누락되었습니다.")
		return false
	}

	const memberList = await model.query("SELECT * FROM member where id = '"+id+"' and pw = '"+pw+"'")
	if(!memberList.rows.length){
		alert("아아디 또는 비밀번호가 잘못 되었습니다.")
		return false
	}

	for (const data of memberList.rows){
		var memberInfo = {
			idx:data.idx,
			id:data.id,
			pw:data.pw,
			nickname:data.nickname,
			phone:data.phone,
			profile:data.profile,
			open:data.open
		}
	}

	sessionStorage.setItem("member",JSON.stringify(memberInfo))
	alert("로그인 되었습니다")
	location.reload()
}

function logout () {
	sessionStorage.clear()
	alert("로그아웃 되었습니다")
	location.reload()
}

function fileSelect (evt) {
    let files = evt.target.files

    for (let i = 0, f; f = files[i]; i++) {

      if (!f.type.match('image.*')) {
        continue;
      }

      let reader = new FileReader()
      reader.onload = (function(theFile) {
        return function(e) {
        	file = e.target.result
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f)
    }
}

function numberFormat (number) {
	if (number >= 100000000) {
		formatNumber = Math.floor(number/10000000)/10+"억"
	}
	else if (number >= 10000){
		formatNumber = Math.floor(number/1000)/10+"만"
	} else if (number >= 1000) {
		formatNumber = Math.floor(number/100)/10+"천"
	} else {
		formatNumber = number
	}
	return formatNumber
}

async function setAdmin() {
	let text = `
		<div class="admin">
			<h1>사이트 정보</h1>
			<h1>회원 관리</h1>
			<table>`
	const member = await model.query(`SELECT * FROM member where id != 'admin' order by date desc`)
	for (const data of member.rows){
		text += `
			<tr>
				<th>{{id}}</th>
				<th>{{pw}}</th>
				<th>{{nickname}}</th>
				<th>{{phone}}</th>
				<th class="memberDelete" data-idx="{{idx}}">회원 삭제</th>
			</tr>`
		text = text
				.replace(/{{id}}/gi,data.id)
				.replace(/{{pw}}/gi,data.pw)
				.replace(/{{nickname}}/gi,data.nickname)
				.replace(/{{phone}}/gi,data.phone)
				.replace(/{{idx}}/gi,data.idx)
	}
	text += `</table></div>`
	$(".box").prepend(text)
}

async function openProfile () {
	let midx = $(this).data("midx")
	let memberInfo = await model.query(`SELECT * FROM member where idx = '${midx}'`)
	for(const data of memberInfo.rows){
		if(memberStorage){
			if(member.idx == midx){
				var text = `
					<div class="profile on">
						<ul>
							<li>
								<img src="${data.profile}" alt="img" class="profile_img">
								<span class="profile_name">${data.nickname}</span>
								<button class="modify_btn" data-idx="${midx}">프로필 수정</button>
							</li>
							<li>
								<div class="profile_left">
									아이디
								</div>
								<div class="profile_right">
									<input type="text" value="${data.id}">
								</div>
							</li>
							<li>
								<div class="profile_left">
									닉네임
								</div>
								<div class="profile_right">
			                        <input type="text" value="${data.nickname}">
								</div>
							</li>
							<li>
								<div class="profile_left">
									전화번호
								</div>
								<div class="profile_right">
			                    	<input type="text" value="${data.phone}">
								</div>
							</li>
							<li>
								<div class="profile_left">
									프로필 공개 여부
								</div>
								<div class="profile_right">
			                    	<select name="" id="">
			                        	<option value="공개">공개</option>
			                            <option value="비공개">비공개</option>
			                        </select>
								</div>
							</li>
			                <li>
			                	<div class="profile_left">
			                    	<img src="${data.profile}" alt="img" class="profile_img" style="margin:0">
			                    </div>
			                    <div class="profile_right"><input type="file"></div>
			                </li>
						</ul>
					</div>`
			} else {
				var text = `
					<div class="profile on">
						<ul>
							<li>
								<img src="{{profile}}" alt="img" class="profile_img">
								<span class="profile_name">${data.nickname}</span>
							</li>
							<li>
								<div class="profile_left">
									닉네임
								</div>
								<div class="profile_right">
			                        <input type="text" value="${data.nickname}">
								</div>
							</li>`
				if(data.open == "공개"){
					text += `<li>
								<div class="profile_left">
									전화번호
								</div>
								<div class="profile_right">
			                    	<input type="text" value="${data.phone}">
								</div>
							</li>`
				}
				text += `</ul></div>`
				text = text.replace(/{{profile}}/gi,data.open == "공개" ? data.profile : "images/basic.jpg")
			}
		} else {
				var text = `
					<div class="profile on">
						<ul>
							<li>
								<img src="{{profile}}" alt="img" class="profile_img">
								<span class="profile_name">${data.nickname}</span>
							</li>
							<li>
								<div class="profile_left">
									닉네임
								</div>
								<div class="profile_right">
			                        <input type="text" value="${data.nickname}">
								</div>
							</li>`
				if(data.open == "공개"){
					text += `<li>
								<div class="profile_left">
									전화번호
								</div>
								<div class="profile_right">
			                    	<input type="text" value="${data.phone}">
								</div>
							</li>`
				}
				text += `</ul></div>`
				text = text.replace(/{{profile}}/gi,data.open == "공개" ? data.profile : "images/basic.jpg")
		}
	}
	sessionStorage.setItem("profile",JSON.stringify(text))
	search("midx",midx)
}

function memberUpdate () {
	let idx = $(this).data("idx")
	let id = $(".profile li:nth-child(2) input").val()
	let nickname = $(".profile li:nth-child(3) input").val()
	let phone = $(".profile li:nth-child(4) input").val()
	let open = $(".profile li:nth-child(5) select").val()
	let profile = file

	let action = "update"
	let table = "member"
	let column = [`id`,`nickname`,`phone`,`open`,`profile`]
	let arr = [id,nickname,phone,open,profile,idx]
	model.querySet(action,table,column,arr)
	alert("수정되었습니다.")
	loaction.reload()
}

function scrollAction () {
	var sb = $(window).scrollTop() + $(window).height()
	var ob = $(".box").offset().top + $(".box").outerHeight()
	if(sb >= ob){
		var sql = setSql()
		sql += ` limit ${start},  5`
		model.query(sql)
		.then(setGallery,true)
	}
}

model.init()
model.query(`CREATE TABLE IF NOT EXISTS board (idx integer primary key, midx, content, date date, img, type, likes integer)`)
model.query(`CREATE TABLE IF NOT EXISTS member (idx integer primary key, id, pw, nickname, phone, profile, open, date date)`)
model.query(`CREATE TABLE IF NOT EXISTS comment (idx integer primary key, bidx integer, midx integer, content)`)
model.query(`CREATE TABLE IF NOT EXISTS likeList (idx integer primary key, bidx integer, midx integer)`)

$(loadOn)
.on("click",".login button",login)
.on("click",".join button",join)
.on("click",".membership > div:first-child > button:last-child",logout)
.on("click",".membership > div:first-child > button:nth-child(3), .gallery > img:first-child, .gallery_name",openProfile)
.on("click",".modify_btn",memberUpdate)
.on("change","input[type='file']",fileSelect)
.on("click",".upload button",upload)
.on("click",".gallery_delete",galleryDelete)
.on("click",".gallery_like, .gallery_like > i",clickLike)
.on("click",".comment_button",commentInsert)
.on("click",".order > li",searchOrder)
.on("click",".type > li",searchType)

// $(window)
// .on("scroll",scrollAction)