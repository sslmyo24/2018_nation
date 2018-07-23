// slide animation
function slide () {
	return function () {
		const flow = $(event.target).hasClass('right')
		const target = $('.slide-wrap>div')
		const prev = () => {
			if(flow) return
			target.find('article:last-child').prependTo(target)
			target.css('marginLeft','-20%')
		}
		const next = () => {
			if(!flow) return
			target.find('article:first-child').appendTo(target)
			target.css('marginLeft','0')
		}
		prev()
		target.stop().animate({
			marginLeft: flow ? "-20%" : "0"
		},500,next)
	}
}

// tab menu
function tabView () {
	const styleText = `
		<style>
			@keyframes tabView{
				from {opacity:0;transform:translateY(50px);}
				to {opacity:1;transform:inherit;}
			}
			.tab-content>article.active{animation:0.5s tabView}
		</style>`
	$(styleText).appendTo('head')

	return function () {
		const _this = $(this)
		const idx = _this.index()
		_this.parent().find('li a.active').removeClass('active')
		_this.find('a').addClass('active')
		$('.tab-content>article.active').removeClass('active')
		$('.tab-content>article').eq(idx).addClass('active')
	}
}

// application init
function init () {
	Animation.init()
	Navigation.init()
	Layer.init()
	Path.init()
}

// event register
$(init)
	.on('click', 'a[href="#"]',function(e){ e.preventDefault() })
	.on('click', '.toMain', Navigation.goToMain)
	.on('click', '.site-menu li', Navigation.goToPage)
	.on('click', '.arrow a', Navigation.goToArrow)
	.on('click', '.sub02 article, .sub03 article',Layer.open)
	.on('click', '.layer .close',Layer.close)
	.on('keyup' ,Layer.keyClose)
	.on('click', '.slide-arrow',slide())
	.on('click', '.tab li',tabView())
	.on('submit', '.short-path',Path.Shortest)
	.on('click', '.time-table',Path.timeTableView)
