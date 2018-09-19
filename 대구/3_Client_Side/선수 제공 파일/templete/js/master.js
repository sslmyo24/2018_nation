var fileURL = []
var fileName = []
var fileSize = []
var select = []
var searchKey = false
var timer

const model = new class {
	init () {
		this.db = openDatabase("Receipt","1.0","Daegu3",2*1024*1024)
		const sql = `CREATE TABLE IF NOT EXISTS receipts (idx integer primary key,
		file_url, file_name, file_size, date date, time, classification, type,
		amount integer, card_info, card_number, approval, company_name, company_number,
		address, call)`
		return new Promise (async resolve => {
			model.query(sql)
			resolve()
		})
	}

	query (sql, arr = []) {
		return new Promise (resolve => {
			this.db.transaction(tx => { tx.executeSql(sql, arr, (tx,res) => { resolve(res) }, (tx,error) => { console.log(error) }) })
		})
	}

	async rowCount(sql) {
		let list = await model.query(sql)
		return list.rows.length
	}
}

function loadOn () {
	const styleText = `
		<style>
			.panel-block.selector {border-color:#3273dc !important;}
		</style>`
	$(styleText).appendTo('head')

	model.init()
	.then(setList)
}

async function setList () {
	const panel = $(".main .panel")
	$("*",panel).remove()
	const dateText = `
        <a class="panel-block panel-date">
            <span class="panel-icon">
              <i class="far fa-calendar-alt" aria-hidden="true"></i>
            </span>
            <small>{{date}} {{day}}</small>
        </a>`
    const receiptText = `
	    <a class="panel-block" data-idx="{{idx}}">
	        <span class="panel-icon">
	          <i class="{{icon}}" aria-hidden="true"></i>
	        </span>
	        <small>{{company_name}} [{{file_name}}]</small>
	        <span class="panel-price is-pulled-right has-text-{{color}}">
	            {{classification}}{{amount}}<small>원</small>
	        </span>
	    </a>`
	let first = true
	let search = searchKey ? `where company_name like '%${searchKey}%'` : ``
	const dateList = await model.query(`SELECT date FROM receipts ${search} group by date order by date desc`)
	for (const date of dateList.rows) {
		let text = dateText
					.replace(/{{date}}/gi,date.date.substring(2,10))
					.replace(/{{day}}/gi,getDay(date.date))
		panel.append(text)
		search = searchKey ? `and company_name like '%${searchKey}%'` : ``
		let receiptList = await model.query(`SELECT idx, file_name, classification, amount, card_info, company_name FROM receipts where date = '${date.date}' ${search}`)
		for (const data of receiptList.rows) {
			text = receiptText
					.replace(/{{idx}}/gi,data.idx)
					.replace(/{{icon}}/gi,data.classification == "Cancellation" ? "fas fa-undo" : data.card_info == "VISA" ? "fab fa-cc-visa" : "fab fa-cc-mastercard")
					.replace(/{{company_name}}/gi,data.company_name)
					.replace(/{{file_name}}/gi,data.file_name)
					.replace(/{{color}}/gi,data.classification == "Cancellation" ? "link" : "danger")
					.replace(/{{classification}}/gi,data.classification == "Cancellation" ? "+" : "-")
					.replace(/{{amount}}/gi,numberFormat(data.amount))
			panel.append(text)
			if (first) {
				first = false
				$(".panel-block:not(.panel-date)").addClass('is-active')
			}
		}
	}

	setDetail()
}

async function setDetail () {
	const detail = $(".detail")
	$("*",detail).remove()
	const idx = $(".is-active").data("idx")
	if (typeof idx == "undefined") return
	const detailText = `
        <div class="detail-content content">
            <h1>{{classification}}
                <a class="button is-pulled-right is-rounded detailBtn">상세보기</a>
                <a class="button is-pulled-right is-rounded undetailBtn" style="display:none;">일반보기</a>
            </h1>
            <p class="datetime">{{date}} {{day}} {{time}}</p>
            <h3><span class="searchTarget">{{company_name}}</span>
                <span class="is-pulled-right card-{{card_info}}">
                    <i class="fab fa-cc-{{card_info}}"></i>&nbsp;{{card_name}}
                </span>
            </h3>
            <hr>
            <h1 class="is-marginless has-text-right">
                <span class="is-pulled-left">거래금액</span>
                <span class="has-text-danger">{{amount}}<small>원</small></span>
            </h1>
        </div>

        <div class="field is-grouped is-pulled-right">
            <p class="control">
                <a class="button is-rounded DetailExport" data-idx="{{idx}}">내보내기</a>
            </p>
            <p class="control">
                <a class="button is-rounded modal-button DetailDownload" data-idx="{{idx}}" data-target="DetailDownload">다운로드</a>
            </p>
            <p class="control">
                <a class="button is-rounded DetailDelete" data-idx="{{idx}}">삭제</a>
            </p>
        </div>`
    const shortInfo = await model.query(`SELECT file_name, file_size, date, time, company_name, card_info, amount, classification FROM receipts where idx = '${idx}'`)
    for (const data of shortInfo.rows) {
    	let text = detailText
    				.replace(/{{idx}}/gi,idx)
    				.replace(/{{date}}/gi,data.date)
    				.replace(/{{day}}/gi,getDay(data.date))
    				.replace(/{{time}}/gi,data.time)
    				.replace(/{{company_name}}/gi,data.company_name)
    				.replace(/{{classification}}/gi,data.classification == "Payment" ? "결제" : "취소")
    				.replace(/{{card_info}}/gi,data.card_info == "VISA" ? "visa" : "mastercard")
    				.replace(/{{card_name}}/gi,data.card_info == "VISA" ? "비자카드" : "마스터카드")
    				.replace(/{{amount}}/gi,numberFormat(data.amount))
    	detail.append(text)
    	$("#DetailDownload tr a").html(`${data.file_name} <span class="tag is-info">${getKb(data.file_size)}Kb</span>`)
    	if (searchKey) {
    		const reg = new RegExp(searchKey,"gi")
    		const target = $(".detail-content .searchTarget")
    		const text = target.text().replace(reg,`<span style="background:#00d1b2;color:#fff;">${searchKey}</span>`)
    		target.html(text)
		}
	}

    $(".DetailExport").click(() => {
    	DetailExport(idx)
    })

    $(".DetailDelete").click(() => {
    	DetailDelete(idx)
    })

    $(".detailBtn").click(() => {
    	$(".detailBtn").hide()
    	$(".undetailBtn").show()
    	viewDetail(idx)
    })
}

async function viewDetail (idx) {
	const detailText = `
		<p class="is-marginless has-text-right">
            <span class="is-pulled-left">거래시각</span>
            <span>{{date}} {{day}} {{time}}</span>
        </p>
        <p class="is-marginless has-text-right">
            <span class="is-pulled-left">거래구분</span>
            <span>{{classification}}</span>
        </p>
        <p class="has-text-right">
            <span class="is-pulled-left">거래형태</span>
            <span>{{type}}</span>
        </p>
        <p class="is-marginless has-text-right">
            <span class="is-pulled-left">카드정보</span>
            <span>{{card_info}}</span>
        </p>
        <p class="is-marginless has-text-right">
            <span class="is-pulled-left">카드번호</span>
            <span>{{card_number}}</span>
        </p>
        <p class="has-text-right">
            <span class="is-pulled-left">승인번호</span>
            <span>{{approval}}</span>
        </p>
        <p class="is-marginless has-text-right">
            <span class="is-pulled-left">사용처</span>
            <span class="searchTarget">{{company_name}}</span>
        </p>
        <p class="is-marginless has-text-right">
            <span class="is-pulled-left">주소</span>
            <span>{{address}}</span>
        </p>
        <p class="is-marginless has-text-right">
            <span class="is-pulled-left">전화번호</span>
            <span>{{call}}</span>
        </p>`
    const longInfo = await model.query(`SELECT * FROM receipts where idx = '${idx}'`)
    for (const data of longInfo.rows) {
    	let text = detailText
    				.replace(/{{date}}/gi,data.date)
    				.replace(/{{day}}/gi,getDay(data.date))
    				.replace(/{{time}}/gi,data.time)
    				.replace(/{{classification}}/gi,data.classification == "Payment" ? "결제" : "취소")
    				.replace(/{{type}}/gi,data.type == "Online" ? "온라인" : "오프라인")
    				.replace(/{{card_info}}/gi,data.card_info == "VISA" ? "비자카드" : "마스터카드")
    				.replace(/{{card_number}}/gi,data.card_number)
    				.replace(/{{approval}}/gi,data.approval)
    				.replace(/{{company_name}}/gi,data.company_name)
    				.replace(/{{address}}/gi,data.address)
    				.replace(/{{call}}/gi,data.call)
    	$(".detail-content").append(text)
    	if (searchKey) {
    		const reg = new RegExp(searchKey,"gi")
    		const target = $(".detail-content p .searchTarget")
    		const text = target.text().replace(reg,`<span style="background:#00d1b2;color:#fff;">${searchKey}</span>`)
    		target.html(text)
		}
	}

    $(".undetailBtn").click(() => {
    	$(".undetailBtn").hide()
    	$(".detailBtn").show()
    	$(".detail-content p:not(.datetime)").remove()
    })
}

function active () {
	$(".is-active:not(.selector)").removeClass('is-active')
	$(this).addClass('is-active')
	setDetail()
}

function search () {
	searchKey = $(".input").val()
	setList()
}

function keySearch (e) {
	if (e.keyCode == 13) {
		search()
	}
}

async function DetailExport (idx) {
	const info = await model.query(`SELECT file_url, file_name FROM receipts where idx = '${idx}'`)
	const evt = new MouseEvent('click',{
		view:window,
		bubbles:false,
		cancelable:true
	})
	const a = document.createElement('a')
	for (const data of info.rows) {
		a.href = data.file_url
		a.download = data.file_name
	}
	a.dispatchEvent(evt)
	a.remove()
}

async function DetailDownload (idx, ext) {
	if (!$('canvas').length) $("body").append('<canvas width="330" height="420" id="canvas" style="display:none;"></canvas>')
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="330" height="420">
			<foreignObject width="100%" height="420">
				<div xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0;background:#fff;height:100%;width:100%">
					<h1 style="margin:0;padding:0;font-size:20px;line-height:75px;text-align:center;">스마트 영수증</h1>
					<div style="margin:0 auto;padding:0 15px 0 0;width:290px;height:75px;;border-bottom:1px dashed #000;">
						<div style="margin:0;padding:0;font-size:11px;">사용처 : {{company_name}}</div>
						<div style="margin:0;padding:0;font-size:11px;">가맹점번호 : {{company_number}}</div>
						<div style="margin:0;padding:0;font-size:11px;">전화번호 : {{call}}</div>
						<div style="margin:0;padding:0;font-size:11px;width:100%;overflow:hidden;height:15px;">주소 : {{address}}</div>
					</div>
					<div style="margin:0 auto;padding:0 15px 0 0;width:290px;height:115px;border-bottom:1px dashed #000;">
						<h2 style="margin:0;padding:0;font-size:17px;line-height:45px;text-align:center;">[ {{type}} {{classification}} ]</h2>
						<div style="margin:0;padding:0;font-size:11px;">카드종류 : {{card_info}}</div>
						<div style="margin:0;padding:0;font-size:11px;">카드번호 : {{card_number}}</div>
						<div style="margin:0;padding:0;font-size:11px;">거래승인 : {{approval}}</div>
						<div style="margin:0;padding:0;font-size:11px;">거래일시 : {{date}} {{time}}</div>
					</div>
					<div style="margin:0 auto;padding:15px 0;width:290px;height:55px;border-bottom:1px dashed #000;">
						<div style="margin:0;padding:0;font-size:11px;">거래금액 : <span style="float:right;">{{amount}}</span></div>
						<div style="margin:0;padding:0;font-size:11px;">부가 : <span style="float:right;">{{vat}}</span></div>
						<div style="margin:0;padding:0;font-size:11px;">합계 : <span style="float:right;">{{total}}</span></div>
					</div>
					<div style="margin:0 auto;width:290px;line-height:35px;font-size:11px;">
						감사합니다!
					</div>
				</div>
			</foreignObject>
		</svg>`
	const info = await model.query(`SELECT * FROM receipts where idx = '${idx}'`)
	for (const data of info.rows) {
		let text = svg
					.replace(/{{company_name}}/gi,data.company_name)
					.replace(/{{company_number}}/gi,data.company_number)
					.replace(/{{call}}/gi,data.call)
					.replace(/{{address}}/gi,data.address)
					.replace(/{{type}}/gi,data.type == "Online" ? "온라인" : "오프라인")
					.replace(/{{classification}}/gi,data.classification == "Payment" ? "결제" : "취소")
					.replace(/{{card_info}}/gi,data.card_info == "VISA" ? "비자카드" : "마스터카드")
					.replace(/{{card_number}}/gi,data.card_number)
					.replace(/{{approval}}/gi,data.approval)
					.replace(/{{date}}/gi,data.date)
					.replace(/{{time}}/gi,data.time)
					.replace(/{{amount}}/gi,numberFormat((data.amount*95/100)))
					.replace(/{{vat}}/gi,numberFormat((data.amount*5/100)))
					.replace(/{{total}}/gi,numberFormat(data.amount))
		const file_name = data.file_name.replace("json",ext)
		text = encodeURIComponent(text)
		const canvas = document.getElementById('canvas')
		const ctx = canvas.getContext('2d')
		const img = new Image()
		img.src = "data:image/svg+xml,"+text
		img.onload = function () {
			ctx.drawImage(img, 0, 0)
			imgURI = canvas.toDataURL("image/"+ext).replace("image/"+ext,"application/octet-stream")
			triggerDownload(imgURI,file_name)
		}
	}
}

function triggerDownload (imgURI, file_name) {
	let evt = new MouseEvent('click',{
		view:window,
		bubbles:false,
		cancelable:true
	})
	const a = document.createElement('a')
	a.href = imgURI
	a.download = file_name
	a.dispatchEvent(evt)
	a.remove()
}

async function DetailDelete (idx) {
	await model.query(`DELETE FROM receipts where idx = '${idx}'`)
}

async function modal () {
	const targetName = $(this).data("target")
	const target = $("#"+targetName)
	target.css({"display":"flex"})

	if (targetName != "Initialization" && targetName != "DetailDownload") {
		$("tr",target).addClass('emptyMsg')
	}

	if (targetName == "Receipt") {
		if (!$("input",target).length) $("footer",target).append('<input type="file" name="files" style="display:none;" />')
		$("footer button:first-child").click((e) => {
			e.preventDefault()
			$("footer input").click()
		})
		$("footer button.is-success").click(() => {
			jsonUpload()
		})
	}

	if (targetName == "Initialization") {
		const cnt = await model.rowCount(`SELECT idx FROM receipts`)
		$("tr:first-child strong",target).text(cnt)
		$("footer button").click(() => {
			TruncateReceipt()
		})
	}

	if (targetName.indexOf("Download") !== -1) {
		$("footer input:first-child",target).val("png")
		$("footer input:nth-child(3)",target).val("jpg")
	}

	if (targetName == "DetailDownload") {
		const idx = $(this).data("idx")
		$("footer button",target).click(() => {
			const ext = $("footer input:checked",target).val()
			DetailDownload(idx,ext)
		})
	}

	if (targetName == "Export" || targetName == "Download" || targetName == "Delete") {
		const trText = `
            <tr>
                <td>
                    <a>{{file_name}} <span class="tag is-info">{{file_size}}Kb</span></a>
                    <button class="delete is-pulled-right" data-idx="{{idx}}" aria-label="close"></button>
                </td>
            </tr>`
		for (let i = 0; i < select.length; i++) {
			if (typeof select[i] == "undefined") continue
			const info = await model.query(`SELECT file_name, file_size FROM receipts where idx = '${select[i]}'`)
			for (const data of info.rows) {
				let text = trText
							.replace(/{{file_name}}/gi,data.file_name)
							.replace(/{{file_size}}/gi,getKb(data.file_size))
							.replace(/{{idx}}/gi,i)
				$("table",target).append(text)
			}
		}
		if ($("tr:not(.emptyMsg)",target).length) {
			$(".emptyMsg",target).hide()
			$("footer button.is-success",target).prop("disabled",false).removeAttr('disabled')
		}

		$("footer button.is-success",target).click(async () => {
			for (let i = 0; i < select.length; i++) {
				if (typeof select[i] == "undefined") continue
				switch (targetName) {
					case 'Export' :
						await DetailExport(select[i])
						break
					case 'Download' :
						const ext = $("footer input:checked").val()
						await DetailDownload(select[i],ext)
						break
					case 'Delete' :
						await DetailDelete(select[i])
						break
				}
			}
			if (targetName == "Delete") {
				alert("삭제되었습니다.")
				location.reload()
			}
		})
	}

	$(".modal-close",target).click(() => {
		fileURL = []
		fileName = []
		fileSize = []
		target.hide()
	})
}

function trDelete () {
	const idx = $(this).data('idx')
	const tr = $(this).parents('tr')
	const modal = $(this).parents(".modal")
	tr.remove()
	if (!modal.find('tr:not(.emptyMsg)').length) {
		$(".emptyMsg",modal).show()
		$("footer button.is-success",modal).prop("disabled",true).attr("disabled","disabled")
	}
	$(".panel-block:not(.panel-date)").each(function(index, el) {
		if ($(this).data("idx") == select[idx]) $(this).removeClass('selector')
	})
	delete fileURL[idx]
	delete fileName[idx]
	delete fileSize[idx]
	delete select[idx]
}

function jsonRead (evt) {
	const files = evt.target.files

	for (let i = 0, f; f = files[i]; i++) {

		if (f.type.indexOf("json") == -1) {
			alert("json파일만 선택 할 수 있습니다.")
			return false
		}

		const reader = new FileReader()

		const trText = `
            <tr>
                <td>
                    <a>{{file_name}} <span class="tag is-info">{{file_size}}Kb</span></a>
                    <button class="delete is-pulled-right" data-idx="{{idx}}" aria-label="close"></button>
                </td>
            </tr>`

		reader.onload = (theFile => {
			const idx = fileURL.length
			fileName.push(theFile.name)
			fileSize.push(f.size)
			let text = trText
						.replace(/{{idx}}/gi,idx)
						.replace(/{{file_name}}/gi,theFile.name)
						.replace(/{{file_size}}/gi,getKb(f.size))
			$("#Receipt .emptyMsg").hide()
			$("#Receipt table").append(text)
			$("#Receipt button.is-success").prop("disabled",false).removeAttr('disabled')
			return e => {
				fileURL.push(e.target.result)
			}
		})(f)

		reader.readAsDataURL(f)
	}
}

async function jsonUpload () {
	for (let i = 0; i <= fileURL.length; i++) {
		if (i == fileURL.length) {
			alert("업로드 되었습니다")
			location.reload()
		}
		if (typeof fileURL[i] == "undefined") continue
		let file_url = fileURL[i]
		let file_name = fileName[i]
		let file_size = fileSize[i]
		let date, time, classification, type, amount, card_info,
		card_number, approval, company_name, company_number, address,
		call
		await $.post(fileURL[i], async data => {
			await $.each(data, (key,val) => {
				switch (key) {
					case 'transaction' :
						date = val.date
						time = val.time
						classification = val.classification
						type = val.type
						amount = val.amount
						break
					case 'card' :
						card_info = val.information
						card_number = val.number
						approval = val.approval
						break
					case 'more' :
						company_name = val.name
						company_number = val.number
						address = val.address
						call = val.call
						break
				}
			})
		})
		let sql = `INSERT INTO receipts (file_url, file_name, file_size, date,
		time, classification, type, amount, card_info, card_number, approval,
		company_name, company_number, address, call) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
		let arr = [file_url, file_name, file_size, date, time, classification, type, amount,
		card_info, card_number, approval, company_name, company_number, address, call]
		await model.query(sql, arr)
	}
}

async function TruncateReceipt () {
	await model.query(`DELETE FROM receipts`)
	.then(() => {alert("초기화 되었습니다");location.reload();})
}

function getKb (size) {
	size = Math.floor(size/1024)
	if (size < 1) {
		size = 1
	}
	return size
}

function numberFormat (num) {
	const reg = /(^[+-]?\d+)(\d{3})/
	num += ''
	while (reg.test(num)) {
		num = num.replace(reg,"$1"+","+"$2")
	}
	return num
}

function getDay (date) {
	let newDate = new Date(date)
	let day = newDate.getDay()
	switch (day) {
		case 0 :
			day = "(일)"
			break
		case 1 :
			day = "(월)"
			break
		case 2 :
			day = "(화)"
			break
		case 3 :
			day = "(수)"
			break
		case 4 :
			day = "(목)"
			break
		case 5 :
			day = "(금)"
			break
		case 6 :
			day = "(토)"
			break
	}
	return day
}

$(loadOn)
.on("click",".panel-block:not(.panel-date):not(.is-active)",active)
.on("click",".search-button",search)
.on("keydown",keySearch)
.on("click",".modal-button",modal)
.on("click",".delete",trDelete)
.on("change","#Receipt input",jsonRead)
.on({
	mousedown () {
		const idx = $(this).data("idx")
		timer = setTimeout(() => {
			if (select.indexOf(idx) == -1) {
				select.push(idx)
			} else {
				const index = select.indexOf(idx)
				delete select[index]
			}
			$(this).toggleClass('selector')
		},2000)
	},
	mouseleave () {
		clearTimeout(timer)
	}
},'.panel-block:not(.panel-date)')
.on('mouseup',() => {
	clearTimeout(timer)
})