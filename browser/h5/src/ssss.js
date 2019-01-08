/*! Project: lol_2016_league
 *  Version: 1.0.0
 *  Date: 2016-01-13 05:35:29 PM
 *  Author: MrF
 */ !(function() {
	seajs.use(
		[
			'$',
			'arale/switchable/1.0.2/carousel',
			'arale/switchable/1.0.2/slide',
			'gallery/jquery-plugin/jquery.nicescroll',
			'arale/switchable/1.0.2/tabs'
		],
		function(a, b, c, d, e) {
			var f = {
				s4Carousel: function() {
					var c = a('.result-slider__content').find('li'),
						d = a('[data-role="active-index"]'),
						e = c.index(d) - 1
					e = 0 > e ? 0 : e
					var f = [
						[
							"[data-role='result-slider']",
							[330],
							1,
							'easeOutStrong',
							'scrollx',
							!1,
							300,
							!1,
							e
						],
						[
							"[data-role='game-top-kdi']",
							[152],
							1,
							'easeOutStrong',
							'scrollx',
							!1,
							300,
							!0,
							0
						],
						[
							"[data-role='game-top-ban']",
							[152],
							1,
							'easeOutStrong',
							'scrollx',
							!1,
							300,
							!0,
							0
						],
						[
							"[data-role='duowan-img-scroll']",
							[270],
							1,
							'easeOutStrong',
							'scrollx',
							!1,
							300,
							!1,
							0
						]
					]
					a.each(f, function(c, d) {
						if (a(f[c][0]).length) {
							var e = new b({
								element: f[c][0],
								viewSize: f[c][1],
								step: f[c][2],
								easing: f[c][3],
								effect: f[c][4],
								autoplay: f[c][5],
								duration: f[c][6],
								circular: f[c][7],
								activeIndex: f[c][8]
							}).render()
							;("[data-role='game-top-kdi']" === f[c][0] ||
								"[data-role='game-top-ban']" === f[c][0]) &&
								e.on('change:activeIndex', function(a, b) {
									var c = this.element.find('.s4-game-top__tit')
									switch (a) {
										case 0:
											c.text(c.data('tit-one'))
											break
										case 1:
											c.text(c.data('tit-two'))
											break
										case 2:
											c.text(c.data('tit-three'))
											break
										case 3:
											c.text(c.data('tit-four'))
											break
										default:
											c.text(c.data('tit-one'))
									}
								})
						}
					})
				},
				sliders: function() {
					var b = [
						[
							"[data-role='s4-slider']",
							600,
							'scrollx',
							'easeOutStrong',
							!0,
							's4-slider__trigger--active'
						]
					]
					a.each(b, function(d, e) {
						a(b[d][0]).length &&
							new c({
								element: b[d][0],
								duration: b[d][1],
								effect: b[d][2],
								easing: b[d][3],
								autoplay: b[d][4],
								activeTriggerClass: b[d][5]
							}).render()
					})
				},
				tabSwitch: function() {
					var b = [
						[
							"[data-role='against-tab']",
							's4-tab__trigger--active',
							'',
							100,
							's4-tab__panel',
							'click'
						],
						[
							"[data-role='news-tab']",
							's4-tab__trigger--active',
							'',
							100,
							's4-tab__panel',
							'click'
						]
					]
					a.each(b, function(c, d) {
						if (a(b[c][0]).length) {
							var f = 0,
								g = Number(a(b[c][0]).data('active-index'))
							g &&
								g > 0 &&
								g <
									a(b[c][0]).find('[data-switchable-role="trigger"]').length +
										1 &&
								(f = g - 1)
							new e({
								element: b[c][0],
								activeTriggerClass: b[c][1],
								classPrefix: b[c][2],
								delay: b[c][3],
								panels: b[c][4],
								triggerType: b[c][5],
								activeIndex: f
							})
						}
					})
				},
				loadTeamNew: function() {
					var b = a('[data-role="teamNews"]')
					a(document).on('click', '[data-role="scrollTeam"] li', function() {
						var c = a(this),
							d = c.attr('data-url')
						d &&
							b.load(d, function() {
								c.addClass('is-active')
									.siblings()
									.removeClass('is-active')
							})
					})
				},
				loadBetSupport: function() {
					var b = '',
						c = [],
						d = 'http://api.bbs.duowan.com/bet/list'
					a('[data-role="result-slider"]')
						.find('.result-slider__item')
						.each(function() {
							var b = a(this).data('betid')
							c.push(b)
						}),
						(b = c.toString()),
						a
							.ajax({
								type: 'GET',
								dataType: 'jsonp',
								url: d,
								data: { bet_id: b },
								timeout: 5e3
							})
							.done(function(b) {
								'success' === b.rs &&
									a.each(c, function(c, d) {
										var e = a('[data-betid=' + d + ']')
										e.find('[data-role="support-rate"]').each(function(c, e) {
											var f = b.msg[d][c].support_rate
												? b.msg[d][c].support_rate
												: '--'
											a(this).html(f)
										}),
											e.find('.score-vote-bar').each(function(c, e) {
												var f = b.msg[d][c].support_rate
													? b.msg[d][c].support_rate
													: '0'
												a(this)
													.find('.score-vote-per')
													.css('height', f)
											}),
											e.find('[data-role="bet-option"]').each(function(c, e) {
												var f = b.msg[d][c].bet_option
													? b.msg[d][c].bet_option
													: '--'
												a(this).html(f)
											})
									})
							})
				},
				init: function() {
					var b = this
					b.s4Carousel(),
						b.sliders(),
						b.tabSwitch(),
						b.loadTeamNew(),
						b.loadBetSupport(),
						a('[data-role="scrollTeam"]').niceScroll({
							cursoropacitymin: '1',
							cursorborderradius: '0',
							cursorwidth: '16px',
							cursorcolor: '#1ea7b0',
							cursorborder: '#1ea7b0'
						})
					var c = a('.forum-banner-list')
					a('#forum-banner-more').on('click', function() {
						c.hasClass('forum-banner-list-show')
							? c.removeClass('forum-banner-list-show')
							: c.addClass('forum-banner-list-show')
					})
				}
			}
			f.init(), 'undefined' == typeof window.main && (window.main = f)
		}
	)
})()
