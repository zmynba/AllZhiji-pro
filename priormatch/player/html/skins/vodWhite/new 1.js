(function(a) {
	a.SewisePlayerSkin = {
		version: "1.0.0"
	};
	a.SewisePlayer = a.SewisePlayer || {}
})(window);
(function(a) {
	a.SewisePlayer.IVodPlayer = a.SewisePlayer.IVodPlayer || {
		play: function() {},
		pause: function() {},
		stop: function() {},
		seek: function() {},
		changeClarity: function() {},
		setVolume: function() {},
		toPlay: function() {},
		duration: function() {},
		playTime: function() {},
		type: function() {},
		showTextTip: function() {},
		hideTextTip: function() {},
		muted: function() {},
		bufferProgress: function() {}
	}
})(window);
(function(a) {
	a.SewisePlayerSkin.IVodSkin = a.SewisePlayerSkin.IVodSkin || {
		player: function() {},
		started: function() {},
		paused: function() {},
		stopped: function() {},
		seeking: function() {},
		buffering: function() {},
		bufferProgress: function() {},
		loadedProgress: function() {},
		loadedOpen: function() {},
		loadedComplete: function() {},
		programTitle: function() {},
		duration: function() {},
		playTime: function() {},
		startTime: function() {},
		loadSpeed: function() {},
		initialClarity: function() {},
		lang: function() {},
		logo: function() {},
		timeUpdate: function() {},
		volume: function() {},
		clarityButton: function() {},
		timeDisplay: function() {},
		controlBarDisplay: function() {},
		topBarDisplay: function() {},
		customStrings: function() {},
		customDatas: function() {},
		
		initialAds: function() {},
		initialStatistics: function() {}
	}
})(window);
(function() {
	SewisePlayerSkin.Utils = {
		stringer: {
			time2FigFill: function(a) {
				var b, a = Math.floor(a);
				10 > a ? b = "0" + a : b = "" + a;
				return b
			},
			secondsToHMS: function(a) {
				if (!(0 > a)) {
					var b = this.time2FigFill(Math.floor(a / 3600)),
						c = this.time2FigFill(a / 60 % 60),
						a = this.time2FigFill(a % 60);
					return b + ":" + c + ":" + a
				}
			},
			secondsToMS: function(a) {
				if (!(0 > a)) {
					var b = this.time2FigFill(a / 60),
						a = this.time2FigFill(a % 60);
					return b + ":" + a
				}
			},
			dateToTimeString: function(a) {
				var b;
				b = a ? a : new Date;
				var a = b.getFullYear(),
					c = b.getMonth() + 1,
					j = b.getDate(),
					f = this.time2FigFill(b.getHours()),
					h = this.time2FigFill(b.getMinutes());
				b = this.time2FigFill(b.getSeconds());
				return a + "-" + c + "-" + j + " " + f + ":" + h + ":" + b
			},
			dateToTimeStr14: function(a) {
				var b = a.getFullYear(),
					c = this.time2FigFill(a.getMonth() + 1),
					j = this.time2FigFill(a.getDate()),
					f = this.time2FigFill(a.getHours()),
					h = this.time2FigFill(a.getMinutes()),
					a = this.time2FigFill(a.getSeconds());
				return b + c + j + f + h + a
			},
			dateToStrHMS: function(a) {
				var b = this.time2FigFill(a.getHours()),
					c = this.time2FigFill(a.getMinutes()),
					a = this.time2FigFill(a.getSeconds());
				return b + ":" + c + ":" + a
			},
			dateToYMD: function(a) {
				var b = a.getFullYear(),
					c = this.time2FigFill(a.getMonth() + 1),
					a = this.time2FigFill(a.getUTCDate());
				return b + "-" + c + "-" + a
			},
			hmsToDate: function(a) {
				var a = a.split(":"),
					b = new Date;
				b.setHours(a[0] ? a[0] : 0, a[1] ? a[1] : 0, a[2] ? a[2] : 0);
				return b
			},
			hmsToSeconds: function(a) {
				var b = a.split(":"),
					a = b[0] ? parseInt(b[0]) : 0,
					c = b[1] ? parseInt(b[1]) : 0,
					b = b[2] ? parseInt(b[2]) : 0;
				return 3600 * a + 60 * c + b
			}
		},
		language: {
			zh_cn: {
				stop: "停止播放",
				pause: "暂停",
				play: "播放",
				
				soundOn: "打开声音",
				soundOff: "关闭声音",
				clarity: "清晰度",
				titleTip: "正在播放：",
				claritySetting: "清晰度设置",
				clarityOk: "确定",
				clarityCancel: "取消",
				backToLive: "回到直播",
				loading: "缓冲",
				subtitles: "字幕",
				"default": "默认"
			},
			en_us: {
				stop: "Stop",
				pause: "Pause",
				play: "Play",
				
				soundOn: "Sound On",
				soundOff: "Sound Off",
				clarity: "Clarity",
				titleTip: "Playing: ",
				claritySetting: "Definition Setting",
				clarityOk: "OK",
				clarityCancel: "Cancel",
				backToLive: "Back To Live",
				loading: "Loading",
				subtitles: "Subtitles",
				"default": "Default"
			},
			lang: {},
			init: function(a) {
				switch (a) {
				case "en_US":
					this.lang = this.en_us;
					break;
				case "zh_CN":
					this.lang = this.zh_cn;
					break;
				default:
					this.lang = this.zh_cn
				}
			},
			getString: function(a) {
				return this.lang[a]
			}
		}
	}
})();
(function(a) {
	SewisePlayerSkin.BannersAds = function(b, c) {
		function j() {
			w = SewisePlayerSkin.Utils.stringer.dateToYMD(new Date);
			i = c[w] || c["0000-00-00"];
			k = 0;
			if (void 0 != i) p = i.length
		}
		function f() {
			for (var a = (new Date).getTime(), b = 0; b < p; b++) {
				var c = SewisePlayerSkin.Utils.stringer.hmsToDate(i[b].time).getTime();
				if (b < p - 1) {
					var u = SewisePlayerSkin.Utils.stringer.hmsToDate(i[b + 1].time).getTime();
					if (a > c && a < u) {
						k = b;
						g(k);
						break
					}
				} else if (a > c) {
					k = b;
					g(k);
					break
				}
			}
		}
		function h() {
			var a = (new Date).getTime();
			if (k < p - 1) {
				var b = SewisePlayerSkin.Utils.stringer.hmsToDate(i[k + 1].time).getTime();
				a > b && (k++, g(k))
			} else SewisePlayerSkin.Utils.stringer.dateToYMD(new Date) != w && (j(), f())
		}
		function g(a) {
			n = i[a].ads[0].picurl;
			q = i[a].ads[1].picurl;
			"" == n && "" == q || ("" == n && "" != q ? n = q : "" != n && "" == q && (q = n), l.attr("src", n), u.attr("src", q))
		}
		var d = a(' <div style="position:absolute; display:table; width:100%; height:100%;"><div style="display:table-cell; text-align:left; vertical-align:middle;"><img style="pointer-events:auto; cursor:pointer; width: auto; height: auto;"></div></div> ');
		d.appendTo(b);
		var l = d.find("img"),
			d = a(' <div style="position:absolute; display:table; width:100%; height:100%;"><div style="display:table-cell; text-align:right; vertical-align:middle;"><img style="pointer-events:auto; cursor:pointer; width: auto; height: auto;"></div></div> ');
		d.appendTo(b);
		var u = d.find("img"),
			n, q, w, i, k, p;
		j();
		void 0 != i && (1 == p && "" == i[0].time ? g(0) : (f(), setInterval(h, 1E4)), l.click(function(a) {
			a.originalEvent.stopPropagation();
			a = i[k].ads[0].link_url;
			window.openAdsLink && "function" == typeof window.openAdsLink ? window.openAdsLink(a) : window.open(a, "_blank")
		}), u.click(function(a) {
			a.originalEvent.stopPropagation();
			a = i[k].ads[1].link_url;
			window.openAdsLink && "function" == typeof window.openAdsLink ? window.openAdsLink(a) : window.open(a, "_blank")
		}))
	}
})(window.jQuery);
(function(a) {
	SewisePlayerSkin.AdsContainer = function(b, c) {
		var j = b.$container,
			f = b.$sewisePlayerUi,
			h = c.banners;
		if (h) {
			var g = a("<div class='sewise-player-ads-banner'></div>");
			g.css({
				position: "absolute",
				width: "100%",
				height: "100%",
				left: "0px",
				top: "0px",
				overflow: "hidden",
				"pointer-events": "none"
			});
			g.appendTo(j);
			f.css("z-index", 1);
			SewisePlayerSkin.BannersAds(g, h)
		}
	}
})(window.jQuery);
(function(a) {
	SewisePlayerSkin.Statistics = function(b) {
		function c(b) {
			var c = b["request-url"],
				h = b["request-data"];
			setInterval(function() {
				a.ajax({
					type: "post",
					async: !1,
					dataType: "json",
					url: c,
					data: h,
					success: function() {},
					error: function() {
						console.log("play count ajax request fail!")
					}
				})
			}, b["request-data"].intervallen ? b["request-data"].intervallen : 1E4)
		}(b = b.playCount) && c(b)
	}
})(window.jQuery);
(function(a) {
	SewisePlayerSkin.ElementObject = function() {
		this.$sewisePlayerUi = a(".sewise-player-ui");
		this.$container = this.$sewisePlayerUi.parent();
		this.$controlbar = this.$sewisePlayerUi.find(".controlbar");
		this.$playBtn = this.$sewisePlayerUi.find(".controlbar-btns-play");
		this.$pauseBtn = this.$sewisePlayerUi.find(".controlbar-btns-pause");
		this.$stopBtn = this.$sewisePlayerUi.find(".controlbar-btns-stop");
		this.$fullscreenBtn = this.$sewisePlayerUi.find(".controlbar-btns-fullscreen");
		this.$normalscreenBtn = this.$sewisePlayerUi.find(".controlbar-btns-normalscreen");
		this.$soundopenBtn = this.$sewisePlayerUi.find(".controlbar-btns-soundopen");
		this.$soundcloseBtn = this.$sewisePlayerUi.find(".controlbar-btns-soundclose");
		this.$shareBtn = this.$sewisePlayerUi.find(".controlbar-btns-share");
		this.$playtime = this.$sewisePlayerUi.find(".controlbar-playtime");
		this.$controlBarProgress = this.$sewisePlayerUi.find(".controlbar-progress");
		this.$progressPlayedLine = this.$sewisePlayerUi.find(".controlbar-progress-playedline");
		this.$progressPlayedPoint = this.$sewisePlayerUi.find(".controlbar-progress-playpoint");
		this.$progressLoadedLine = this.$sewisePlayerUi.find(".controlbar-progress-loadedline");
		this.$progressSeekLine = this.$sewisePlayerUi.find(".controlbar-progress-seekline");
		this.$logo = this.$sewisePlayerUi.find(".logo");
		this.$logoIcon = this.$sewisePlayerUi.find(".logo-icon");
		this.$topbar = this.$sewisePlayerUi.find(".topbar");
		this.$programTip = this.$sewisePlayerUi.find(".topbar-program-tip");
		this.$programTitle = this.$sewisePlayerUi.find(".topbar-program-title");
		this.$topbarClock = this.$sewisePlayerUi.find(".topbar-clock");
		this.$buffer = this.$sewisePlayerUi.find(".buffer");
		this.$bufferTip = this.$sewisePlayerUi.find(".buffer-text-tip");
		this.$bigPlayBtn = this.$sewisePlayerUi.find(".big-play-btn");
		if (!SewisePlayerSkin.defStageWidth) SewisePlayerSkin.defStageWidth = this.defStageWidth = this.$container.width(), SewisePlayerSkin.defStageHeight = this.defStageHeight = this.$container.height()
	}
})(window.jQuery);
(function(a) {
	SewisePlayerSkin.ElementLayout = function(b) {
		var c = b.$container,
			j = b.$controlBarProgress,
			f = b.$playtime,
			h = this,
			g = b.defStageWidth,
			d = b.defStageHeight,
			l = parseInt(g) - 222;
		this.screenRotate = !1;
		0 > l && (l += f.width(), f.hide());
		j.css("width", l)
	}
})(window.jQuery);
(function() {
	SewisePlayerSkin.LogoBox = function(a) {
		var b = a.$logoIcon;
		b.click(function(a) {
			a.originalEvent.stopPropagation()
		});
		var c = "http://www.sewise.com/";
		this.setLogo = function(a) {
			b.css("background", "url(" + a + ") 0px 0px no-repeat");
			b.attr("href", c)
		};
		this.setLink = function(a) {
			c = a;
			b.attr("href", c)
		}
	}
})(window.jQuery);
(function() {
	SewisePlayerSkin.TopBar = function(a) {
		var b = a.$topbar,
			c = a.$programTip,
			j = a.$programTitle,
			f = a.$topbarClock;
		setInterval(function() {
			var a = SewisePlayerSkin.Utils.stringer.dateToTimeString();
			f.text(a)
		}, 1E3);
		c.hide();
		this.setTitle = function(a) {
			j.text(a)
		};
		this.show = function() {
			b.css("visibility", "visible")
		};
		this.hide = function() {
			b.css("visibility", "hidden")
		};
		this.hide2 = function() {
			b.hide()
		};
		this.initLanguage = function() {}
	}
})(window.jQuery);
(function(a) {
	SewisePlayerSkin.ControlBar = function(b, c) {
		function j(a) {
			a = m + (a[r] - y);
			0 < a && a < v && (t.css("width", a), o.css("left", a - A / 2))
		}
		function f(b) {
			d.unbind("mousemove", j);
			a(document).unbind("mouseup", f);
			E = b[r];
			y != E && (m = t.width(), z = m / v, s.seek(z * x));
			B = !1
		}
		function h(a) {
			e = a.originalEvent;
			1 == e.targetTouches.length && (e.preventDefault(), a = m + (e.targetTouches[0][r] - y), 0 < a && a < v && (t.css("width", a), o.css("left", a - A / 2)))
		}
		function g(a) {
			e = a.originalEvent;
			o.unbind("touchmove", h);
			o.unbind("touchend", g);
			1 == e.changedTouches.length && (E = e.changedTouches[0][r], y != E && (m = t.width(), z = m / v, s.seek(z * x)));
			B = !1
		}
		var d = b.$container,
			l = b.$controlbar,
			u = b.$playBtn,
			n = b.$pauseBtn,
			q = b.$stopBtn,
			w = b.$fullscreenBtn,
			i = b.$normalscreenBtn,
			k = b.$soundopenBtn,
			p = b.$soundcloseBtn,
			M = b.$shareBtn,
			L = b.$playtime,
			t = b.$progressPlayedLine,
			o = b.$progressPlayedPoint,
			N = b.$progressLoadedLine,
			C = b.$progressSeekLine,
			G = b.$buffer,
			O = b.$bufferTip,
			F = b.$bigPlayBtn,
			D = this,
			s, x = 1,
			H = 0,
			I = "00:00",
			J = "00:00",
			A = 0,
			B = !1,
			y = 0,
			E = 0,
			m = 0,
			v = 0,
			z = 0,
			K = !1,
			r = "pageX",
			A = o.width(),
			v = C.width();
		k.hide();
		p.hide();
		q.hide();
		n.hide();
		i.hide();
		p.hide();
		G.hide();
		L.text(I + "/" + J);
		u.click(function() {
			s.play()
		});
		n.click(function() {
			s.pause()
		});
		q.click(function() {
			s.stop()
		});
		F.click(function(a) {
			a.originalEvent.stopPropagation();
			s.play()
		});
		w.click(function() {
			if (SewisePlayerSkin.mobileExtEvent.block) return !1;
			
		});
		i.click(function() {
			if (SewisePlayerSkin.mobileExtEvent.block) return !1;
			
		});
		
		
		l.on("tap", function(a) {
			a.originalEvent.stopPropagation()
		});
		k.click(function() {
			s.muted(!0);
			k.hide();
			p.show()
		});
		p.click(function() {
			s.muted(!1);
			k.show();
			p.hide()
		});
		M.click(function() {
			window.shareVideo && "function" == typeof window.shareVideo ? window.shareVideo() : console.log("Not found the shareVideo function of window")
		});
		C.mousedown(function(a) {
			m = K ? a[r] - a.target.getBoundingClientRect().top : a[r] - a.target.getBoundingClientRect().left;
			v = C.width();
			t.css("width", m);
			o.css("left", m - A / 2);
			z = m / v;
			s.seek(z * x)
		});
		o.mousedown(function(b) {
			this.blur();
			B = !0;
			y = b[r];
			m = t.width();
			v = C.width();
			d.bind("mousemove", j);
			a(document).bind("mouseup", f)
		});
		o.bind("touchstart", function(a) {
			e = a.originalEvent;
			o.blur();
			a = e.targetTouches[0];
			B = !0;
			y = a[r];
			m = t.width();
			v = C.width();
			o.bind("touchmove", h);
			o.bind("touchend", g)
		});
		this.setPlayer = function(a) {
			s = a
		};
		this.started = function() {
			u.hide();
			n.show();
			F.hide()
		};
		this.paused = function() {
			u.show();
			n.hide();
			F.show()
		};
		this.stopped = function() {
			u.show();
			n.hide();
			F.show()
		};
		this.setDuration = function(a) {
			x = Infinity != a ? a : 3600;
			1 < a && (J = SewisePlayerSkin.Utils.stringer.secondsToMS(x));
			SewisePlayerSkin.duration = x
		};
		SewisePlayerSkin.duration && this.setDuration(SewisePlayerSkin.duration);
		this.timeUpdate = function(a) {
			if (void 0 == a || Infinity == a) a = Infinity != SewisePlayer.video.currentTime ? SewisePlayer.video.currentTime : 0;
			H = a;
			I = SewisePlayerSkin.Utils.stringer.secondsToMS(H);
			L.text(I + "/" + J);
			B || (m = 100 * (H / x) + "%", t.css("width", m), a = t.width() - A / 2, o.css("left", a))
		};
		this.loadProgress = function(a) {
			N.css("width", 100 * a + "%")
		};
		this.hide2 = function() {
			l.hide()
		};
		this.showBuffer = function() {
			G.show()
		};
		this.hideBuffer = function() {
			G.hide()
		};
		this.initLanguage = function() {
			var a = SewisePlayerSkin.Utils.language.getString("loading");
			O.text(a)
		}
	}
})(window.jQuery);
(function(a, b) {
	b(document).ready(function() {
		var a, b, f, h, g, d;
		SewisePlayerSkin.init = function() {
			d = g = h = f = b = a = null;
			a = SewisePlayer.IVodPlayer;
			b = new SewisePlayerSkin.ElementObject;
			f = new SewisePlayerSkin.ElementLayout(b);
			h = new SewisePlayerSkin.LogoBox(b);
			g = new SewisePlayerSkin.TopBar(b);
			d = new SewisePlayerSkin.ControlBar(b, f, g)
		};
		SewisePlayerSkin.reinit = function() {
			f = b = null;
			b = new SewisePlayerSkin.ElementObject;
			f = new SewisePlayerSkin.ElementLayout(b)
		};
		SewisePlayerSkin.init();
		SewisePlayerSkin.IVodSkin.player = function(b) {
			a = b;
			d.setPlayer(a)
		};
		SewisePlayerSkin.IVodSkin.started = function() {
			d.started()
		};
		SewisePlayerSkin.IVodSkin.paused = function() {
			d.paused()
		};
		SewisePlayerSkin.IVodSkin.stopped = function() {
			d.stopped()
		};
		SewisePlayerSkin.IVodSkin.duration = function(a) {
			d.setDuration(a)
		};
		SewisePlayerSkin.IVodSkin.timeUpdate = function(a) {
			d.timeUpdate(a)
		};
		SewisePlayerSkin.IVodSkin.loadedProgress = function(a) {
			d.loadProgress(a)
		};
		SewisePlayerSkin.IVodSkin.loadedOpen = function() {
			d.showBuffer()
		};
		SewisePlayerSkin.IVodSkin.loadedComplete = function() {
			d.hideBuffer()
		};
		SewisePlayerSkin.IVodSkin.programTitle = function(a) {
			g.setTitle(a)
		};
		SewisePlayerSkin.IVodSkin.logo = function(a) {
			h.setLogo(a)
		};
		SewisePlayerSkin.IVodSkin.volume = function() {};
		SewisePlayerSkin.IVodSkin.initialClarity = function() {};
		SewisePlayerSkin.IVodSkin.clarityButton = function() {};
		SewisePlayerSkin.IVodSkin.timeDisplay = function() {};
		SewisePlayerSkin.IVodSkin.controlBarDisplay = function(a) {
			"enable" != a && d.hide2()
		};
		SewisePlayerSkin.IVodSkin.topBarDisplay = function(a) {
			"enable" != a && g.hide2()
		};
		SewisePlayerSkin.IVodSkin.customStrings = function() {};
		SewisePlayerSkin.IVodSkin.customDatas = function(a) {
			a && a.logoLink && h.setLink(a.logoLink)
		};
		
		SewisePlayerSkin.IVodSkin.initialAds = function(a) {
			a && SewisePlayerSkin.AdsContainer(b, a)
		};
		SewisePlayerSkin.IVodSkin.initialStatistics = function(a) {
			a && SewisePlayerSkin.Statistics(a)
		};
		SewisePlayerSkin.IVodSkin.lang = function(a) {
			SewisePlayerSkin.Utils.language.init(a);
			d.initLanguage();
			g.initLanguage()
		};
		try {
			SewisePlayer.CommandDispatcher.dispatchEvent({
				type: SewisePlayer.Events.PLAYER_SKIN_LOADED,
				playerSkin: SewisePlayerSkin.IVodSkin
			})
		} catch (l) {
			console.log("No Main Player")
		}
	})
})(window, window.jQuery);