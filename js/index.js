// JavaScript Document

//倒计时
function countDown(obj, oTime, callback){
	function doubleNum(n){ return n<10 ? '0'+n : n }
	function count_down(oTime){
		var closeTime=oTime/1000;
		var hour = doubleNum(Math.floor(closeTime / (60 * 60)));
		var minute = doubleNum(Math.floor(closeTime / (60)) - (hour * 60));
		var second = doubleNum(Math.floor(closeTime) - (hour * 60 * 60) - (minute * 60));
		var timeArray=[hour,minute,second];
		return timeArray;
	};
	if( oTime>0 ){
		var t=count_down(oTime);
		obj.each(function(){
			$(this).html('<span>'+t[0]+'</span><b>:</b><span>'+t[1]+'</span><b>:</b><span>'+t[2]+'</span>');
		});
		obj.timer = setInterval(function(){
			oTime -= 1000;
			t=count_down(oTime);
			obj.each(function(i,e){
				$(this).html('<span>'+t[0]+'</span><b>:</b><span>'+t[1]+'</span><b>:</b><span>'+t[2]+'</span>');
			});
			if( oTime<=0 ){
				clearInterval(obj.timer);
				obj.html("<span>00</span><b>:</b><span>00</span><b>:</b><span>00</span>");
				callback&&callback();
			}
		},1000);
	} else {
		obj.html("<span>00</span><b>:</b><span>00</span><b>:</b><span>00</span>");
	}
};

//签到
var dataArr = [ ];
;(function($) {
	var Checkin = function(ele, options) {
		this.ele = ele;
		this.opt = options;
		this.defaults = {
			width: 'auto',
			height: 'auto',
			radius: 8,
			color: '#000',
			padding: 10,
			dateArray: dataArr		//假设已签到的天数+1
		};
		this.obj = $.extend({}, this.defaults, this.opt);
	};
	Checkin.prototype.init = function() {
		var _self = this.ele,
			html = '',
			myDate = new Date(),
			year = myDate.getFullYear(),
			month = myDate.getMonth(),
			day = myDate.getDate(),
			weekText = ['日', '一', '二', '三', '四', '五', '六'];
		_self.html('');
		_self.css({
			width: this.obj.width + 'px',
			height: this.obj.height + 'px',
			background: this.obj.background,
			borderRadius: this.obj.radius,
			color: this.obj.color,
			padding: this.obj.padding
		}).append("<div class='top_bg'></div><div class='title'><p>连续签到<span>0</span>天,今日获得惠币<span>"+2+"</span>枚哦！");
		
		$("<ul class='week clearfix'></ul><ul class='calendarList clearfix'></ul>").appendTo(_self);
		for(var i = 0; i < 7; i++){
			_self.find(".week").append("<li>" + weekText[i] + "</li>")
		};
		for(var i = 0; i < 42; i++){
			html += "<li></li>"
		};
		_self.find(".calendarList").append(html);
		var $li = _self.find(".calendarList").find("li");
		_self.find(".week li").css({
			width: (_self.width() / 7)-1 + 'px',
			height: 20 + 'px',
			lineHeight: 20 + 'px',
			boxSizing: 'border-box',
			background: '#FDC7C7',
			color : '#F66061'
		});
		$li.css({
			width: (_self.width() / 7)-1 + 'px',
			height: 30 + 'px',
			lineHeight: 30 + 'px',
			boxSizing: 'border-box',
			color: "#838383"
		});
		var monthFirst = new Date(year, month, 1).getDay();
		var d = new Date(year, (month + 1), 0)
		var totalDay = d.getDate(); //获取当前月的天数
		for (var i = 0; i < totalDay; i++) {
			$li.eq(i + monthFirst).html(i + 1);
			$li.eq(i + monthFirst).addClass('data' + (i + 1))
			if (isArray(this.obj.dateArray)) {
				for (var j = 0; j < this.obj.dateArray.length; j++) {
					if (i == this.obj.dateArray[j]) {
						// 假设已经签到的
						$li.eq(i + monthFirst).addClass('checked');
					}
				}
			}
		}
		_self.find($(".data" + day)).addClass('able-qiandao');
		_self.append("<div class='last_con'><p>累计签到<span>惠币："+109+"枚</span></p><h2>赶紧<a href='#'>去换购</a>商品吧~！</h2></div>");
		
		var today = parseFloat( _self.find($(".data" + day)).html()-1);
		var arr = this.obj.dateArray;
		for( var i=0; i<arr.length; i++ ){
			if( today == arr[i] ){
				$('.sign_in').find('span').html('已签到');
			}
		}
	};
	
	Checkin.prototype.events = function() {
		var _self = this.ele;
		var $li = _self.find(".calendarList").find("li");
		var allday = _self.find(".title").find("span").eq(0);
		var arr = this.obj.dateArray;
		$li.each(function(i, e){
			if ( $(this).hasClass('able-qiandao') ) {
				var today = parseFloat($(this).html()-1);
				for( var j=0; j<arr.length; j++ ){
					if( today == arr[j] ){
						return false;
					}
				}	
				arr.push(today);
				$(this).addClass('checked');
				$('.sign_in').find('span').html('已签到');
				console.log(arr);
			}
			allday.html(arr.length);
		});
	};
	$.fn.Checkin1 = function(options) {
		var checkin = new Checkin(this, options);
		var obj = [checkin.init()/*, checkin.events()*/]
		return obj;
	};
	$.fn.Checkin = function(options) {
		var checkin = new Checkin(this, options);
		var obj = [checkin.init(), checkin.events()]
		return obj;
	};
	var isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
})(jQuery);