/*endlesspage.js*/  
var gPageSize = 10;  
var i = 1; //设置当前页数，全局变量

var t = new Date(1473863800000);
$(function () {  
    //根据页数读取数据  
    function getData(){  
        i++; //页码自动增加，保证下次调用时为新的一页。
        $.ajax({
            type: "get",
            url: "/ajax/Handler.ashx",
            data: { pagesize: gPageSize, pagenumber: i },
            dataType: "json",
            success: function (data) {
                if( data.length>0 ){
                    var jsonObj = JSON.parse(data);
                    insertDiv(jsonObj);
                }
            }
        });
    };
    //初始化加载第一页数据
    //getData();
  
    //生成数据html,append到div中
    function insertDiv(json) {
        var $mainDiv = $(".wrap_mall_get");
        var html = '';
        for (var i=0; i<json.length; i++){
			html += "<div class='row mall_get_time'>";
			html += "<div class='mall_add_list'>";
			html += "<h2><i></i><strong>"+json[i].a+"</strong></h2>";
			html += "</div>";
			html += "<div class='mall_add_way'>";
			html += "<p>"+json[i].b+"</p>";
			html += "<span>"+json[i].c+"</span>";
			html += "</div>";
			html += "</div>";
        }
        $mainDiv.append(html);  
    };
	
    //==============核心代码=============  
    var winH = $(window).height();	//页面可视区域高度
    //定义鼠标滚动事件 
    $(window).scroll(function(){
		var pageH = $(document).find('body').height();
        var scrollT = $(window).scrollTop();
		$(document).find('title').html(pageH);
        if( winH+scrollT+40>pageH ){
			getData();
        }
	});
    //==============核心代码=============
});