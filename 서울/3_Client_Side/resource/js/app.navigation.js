// page class
class Navigation {

	// instance Constructor
	constructor () { }

	// set static variable
	static init () {

		// jQuery selector minimization
		const url = new URL(location.href) || null
		Navigation.main    = $('.main')
		Navigation.sub     = $('.sub')
		Navigation.page    = $('.page')
		Navigation.gnb     = $('.gnb')
		Navigation.len     = Navigation.gnb.find('li').length
		Navigation.section = Navigation.page.children('section')
		Navigation.current = url && url.searchParams.get('page') ? url.searchParams.get('page')*1 : -1

		if(Navigation.current == -1){
			Navigation.main.addClass('active')
			new Animation({obj:$('.main, .arrow')})
		} else {
			Navigation.sub.addClass('active')
			Navigation.section.eq(Navigation.nowPage).addClass('active')
			new Animation({obj:$('.sub-default, .page>section.active, .arrow')})
		}
	}

	static set nowPage (val) {
		if(location.href.indexOf('file://') == -1){
			history.pushState(null, "여수시 전자카탈로그", "/?page="+val)
		}
		Navigation.current = val
	}

	static get nowPage () {
		return Navigation.current
	}

	// go to main page
	static goToMain () {
		const main = Navigation.main,
		      sub = Navigation.sub
		const target = $('.sub-default, .page>section') 
		const closeSub = () => {
				sub.fadeOut(500,() => {
					sub.removeClass('active').removeAttr('style')
					target.removeClass('active').removeAttr('style')
					main.fadeIn(300,() => {
					main.addClass('active')
					new Animation({obj:main})
				})
			})
		}
		Navigation.nowPage = -1
		new Animation({obj:target, reverse:true, callback:closeSub})
	}

	// go to selected sub page
	static goToPage () {
		Navigation.goToPageReal($(this).index())
	}

	// go to page
	static goToPageReal (num) {
		// variable set
		const main = Navigation.main,
			  sub  = Navigation.sub,
			  page = Navigation.page,
			  gnb  = Navigation.gnb,
			  section  = Navigation.section,
			  now  = Navigation.nowPage

		const prePage = section.eq(now),
			  nextPage = section.eq(num)

		const pageSet = (before, after, target) => {
			before.fadeOut(500,() => {
				Navigation.nowPage = num
				section.removeClass('active')	
				section.eq(num).addClass('active')	
				gnb.find('li').removeClass('active')
				gnb.find('li').eq(num).addClass('active')
				before.removeClass('active')
				after.fadeIn(300, () => {
					after.addClass('active')
					new Animation({obj:target})
				})
			})
		}

		const option = now == -1
						? {
							obj:main,
							reverse:true,
							callback:() => {
								pageSet(main,sub,sub.find(`.sub-default, .page>section:eq(${num})`))
							}
						}
						: {
							obj:prePage,
							reverse:true,
							callback:() => {
								pageSet(prePage,nextPage,nextPage)
							}
						}
		new Animation(option)

	}

	// go to selected sub page
	static goToArrow () {
		// variable set 
		const _this = $(this),
		      len   = Navigation.len
		let   num   = Navigation.nowPage
		num = _this.hasClass('left') ? num - 1 : num + 1
		if (num == -1 || num >= len) {
			Navigation.goToMain()
			return
		} else if (num < -1) {
			num = len - 1
		}
		Navigation.goToPageReal(num)
	}
}