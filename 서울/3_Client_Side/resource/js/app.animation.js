// animation set
class Animation {

	constructor (option) {
		this.lastTimer = 0
		this.obj = option.obj
		this.reverse = option.reverse || false
		this.callback = option.callback || function () {}

		this.play()
	}

	find (element) { return this.obj.find(element) }

	play () {
		this.clear()
		let timer = 0
		const i = this
		const seq = i.reverse ? i.find('.target-reverse') : i.find('.animation')
		const len = seq.length
		seq.each(function(num) {
			const target = $(this)
			Animation.timeObj.push(setTimeout(() => { 
				if(i.reverse === true){
					const idx = len - num - 1
					seq.eq(idx).addClass('animationBefore').removeClass('target-reverse')
				} else {
					target.removeClass('animationBefore').addClass('target-reverse')
				}
			},timer += 30))
		})
		i.lastTimer = timer
		setTimeout(i.callback,i.lastTimer)
	}

	clear () {
		Animation.timeObj.forEach(element => { clearTimeout(element) })
		Animation.timeObj = []
	}

	static init () {
		$('.childAnimation>*:not(.childAnimation)').each(function() {
			const _this = $(this)
			const parent = _this.parent()
			_this.addClass('animation')
			if(parent.data('type')){
				_this.addClass(parent.data('type'))
			}
		})
		$('.animation').addClass('animationBefore')
		Animation.timeObj = []
		Animation.styleSet()
	}

	static styleSet () {
		const styleText = `
			<style>
				.animation{opacity:1;transform:inherit;transition:1s;}
				.animation.animationBefore{opacity:0;transform:scale(0);transition:1s;}
				.animation.animationBefore.top2btm{transform:translateY(-100px);}
				.animation.animationBefore.btm2top{transform:translateY(100px);}
				.animation.animationBefore.left2right{transform:translateX(-100px);}
				.animation.animationBefore.right2left{transform:translateX(100px);}
			</style>`
		$(styleText).appendTo('head')
	}
}