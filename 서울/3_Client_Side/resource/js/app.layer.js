// Layer Class
class Layer {

	static init () {
		Layer.layout = `
			<div class="layer">
				<div class="box">
					<a href="#" class="close">X</a>
					{{content}}
				</div>
			</div>`
		const styleText = `
			<style>
				.layer{position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);overflow:auto;display:none;}
				.layer .box{width:80%;margin:40px auto;background:#fff;padding:30px;position:relative;}
				.layer .close{position:absolute;top:0;right:0;background:#aaa;width:30px;height:30px;color:#fff;text-align:center;line-height:30px;}
				.layer .img_wrap{margin-left:30px;max-width:50%;overflow:hidden;float:right;}
				.layer strong, .layer .name{font-size:30px;font-weight:bold;margin-bottom:30px;display:inline-block}
				.layer .real-content{line-height:150%;}
			</style>`
		$(styleText).appendTo('head')
	}

	static open () {
		const html = this.innerHTML
		Layer.realOpen(html)
	}

	static realOpen (content){
		const html = Layer.layout.replace("{{content}}",content)
		$('.layer').remove()
		$(html).appendTo('.wrap')
		$('.layer').stop().fadeIn(300)
	}

	static close () {
		$('.layer').stop().fadeOut(300,() => {
			$('.layer').remove()
		})
	}

	static keyClose (e) {
		if(e.keyCode == 27) Layer.close()
	}


}