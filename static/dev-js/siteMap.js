	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";

$(document).ready(function() {
	
	initNotice();

	initSiteMap();

	showRecent();

	//$("#leftContent").smartFloat();
});

function initSiteMap() {
	
	var data = {
			success:true,
			data:[{
				parentId:"-1",
				title:"仓储开放平台",
				siteMapId:"1"
			},{
				parentId:"-1",
				title:"运输配送平台",
				siteMapId:"2"
			},{
				parentId:"1",
				title:"WMS大仓",
				siteMapId:"3"				
			},{
				parentId:"1",
				title:"WMS通用仓",
				siteMapId:"8"				
			},{
				parentId:"3",
				title:"百度百度百度百度百度百度百度百度百度百度",
				//注意:url前必须加协议,如https://
				url:"https://www.baidu.com",
				siteMapId:"4"				
			},{
				parentId:"3",
				title:"腾讯",
				url:"http://www.qq.com",
				siteMapId:"5"				
			},{
				parentId:"3",
				title:"腾讯",
				url:"http://www.qq.com",
				siteMapId:"16"				
			},{
				parentId:"3",
				title:"腾讯",
				url:"http://www.qq.com",
				siteMapId:"17"				
			},{
				parentId:"3",
				title:"腾讯",
				url:"http://www.qq.com",
				siteMapId:"18"				
			},{
				parentId:"2",
				title:"TMS",
				siteMapId:"6"				
			},{
				parentId:"1",
				title:"WMS通用仓2",
				siteMapId:"9"				
			},{
				parentId:"1",
				title:"WMS通用仓2",
				siteMapId:"10"				
			},{
				parentId:"1",
				title:"WMS通用仓2",
				siteMapId:"11"				
			},{
				parentId:"1",
				title:"WMS通用仓2",
				siteMapId:"12"				
			},{
				parentId:"1",
				title:"WMS通用仓2",
				siteMapId:"13"				
			},{
				parentId:"1",
				title:"WMS通用仓2",
				siteMapId:"14"				
			},{
				parentId:"1",
				title:"WMS通用仓2",
				siteMapId:"15"				
			},{
				parentId:"6",
				title:"新浪",
				url:"http://www.sina.com.cn",
				siteMapId:"7"
			}]			
	};

	if (!data.success) return;

	//动态生成左边栏内容begin
	for (var l = 0; l < data.data.length; l++) {

		if(data.data[l].parentId !="-1" ) continue;

		$("#leftContent").append('<div class="left_content_text" onclick="scrollToArea(\''+data.data[l].siteMapId+'\')">'+data.data[l].title+'</div>');
	}
	//动态生成左边栏内容end

	//动态生成中间栏内容begin
	//创建level1
	for (var l = 0; l < data.data.length; l++) {

		if(data.data[l].parentId != "-1" ) continue;

		$("#middleContent").append('<div class="middle_content_level_1" siteMapId="'+data.data[l].siteMapId+'">'+data.data[l].title+'</div>');

		//创建level2
		for (var m = 0; m < data.data.length; m++) {

			if (data.data[m].parentId != data.data[l].siteMapId) continue;

			$("#middleContent").append('<div class="middle_content_level_2">'+data.data[m].title+'</div>');

			//创建level3
			var rowLevel3 = '';
			rowLevel3 = rowLevel3 + '<div class="row">';

			for (var n = 0; n < data.data.length; n++) {

				if (data.data[n].parentId != data.data[m].siteMapId) continue;

				rowLevel3 = rowLevel3 + '<div class="col-md-3 middle_content_level_3" onclick="linkTo(\''+data.data[m].title+'\',\''+data.data[n].title+'\',\''+data.data[n].url+'\',\''+data.data[n].siteMapId+'\')">'+data.data[n].title+'</div>'
			}

			rowLevel3 = rowLevel3 + '</div>';

			$("#middleContent").append(rowLevel3);
		}
		
	}
	//动态生成中间栏内容end

}

function linkTo(parentTitle,title,url,id){

	if(url==undefined||url==null||url=='') return;

	var packJson=JSON.parse(window.localStorage.getItem("recently"));

	if (null==packJson) packJson=[];

	var bb = false;
	for(var i=0;i<packJson.length;i++){

		if(packJson[i].id==id){
			
			packJson[i].count=packJson[i].count+1;
			bb = true;
		}
	}	

	if (!bb) {

		packJson.push({parentTitle:parentTitle,title:title,url:url,id:id,count:1});
	}

	window.localStorage.setItem("recently",JSON.stringify(packJson));

	showRecent();

	window.open(url);
}

function scrollToArea(id) {
	$('html, body').animate({
		//scrollTop:$('#title_'+id).offset().top+'px'
		scrollTop:$('.middle_content_level_1[siteMapId="'+id+'"]').offset().top+'px'		
	},300);
}

function initNotice(){
	
	var data = [{
			content:"导航通知1，中华人民共和国，中华人民共和国，中华人民共和国，中华人民共和国，你好！",
	},{
		content:"导航通知2，中华人民共和国，中华人民共和国，中华人民共和国，中华人民共和国，你好2！",
	}];	

	//设置跑马灯文字begin
	var noticeStr="";
	for(var i=0;i<data.length;i++){

		noticeStr = noticeStr + data[i].content + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	$("#marquee").html(noticeStr);
	//设置跑马灯文字end

	//设置跑马灯动画的100%参数begin
	var horseWidth=document.getElementById('marquee').offsetWidth;

	var styleSheetList = document.styleSheets;//style代码块列表
	for (var i = 0; i < styleSheetList.length; i++) {

		var cssRuleList = styleSheetList[i].cssRules;//cssRule列表

		if (null == cssRuleList) continue;

		for (var j = 0; j < cssRuleList.length; j++){

		    if (cssRuleList[j].type == CSSRule.KEYFRAMES_RULE && cssRuleList[j].name == "kfMarquee" ) {
		      //CSSRule.KEYFRAMES_RULE:7

		      var cssRule = cssRuleList[j];

		      var ifHasPer100 = false;
		      for (var k = 0; k < cssRule.cssRules.length; k++) {

		          if(cssRule.cssRules[k].keyText == "100%"){
		            ifHasPer100 = true;
		          }
		      }
		      
		      if(!ifHasPer100){
		        cssRule.appendRule("100% { left:-"+horseWidth+"px; }");
		      }
		    }
		}
	}
	//设置跑马灯动画的100%参数end	    
}

function showRecent(){

	//动态生成右边栏内容begin
	var recentlyArr=JSON.parse(window.localStorage.getItem("recently"));

	if (null==recentlyArr) return;

	var compare = function (x, y) {//比较函数
	    if (x.count < y.count) {
	        return 1;
	    } else if (x.count > y.count) {
	        return -1;
	    } else {
	        return 0;
	    }
	};

	recentlyArr.sort(compare);
	var recentlyArr2 = recentlyArr.slice(0,10);

	var aa = '';
	for(var i=0;i < recentlyArr2.length;i++){

		aa = aa + '<div class="right_content_text" onclick="linkTo(\''+recentlyArr2[i].parentTitle+'\',\''+recentlyArr2[i].title+'\',\''+recentlyArr2[i].url+'\',\''+recentlyArr2[i].id+'\')">'+recentlyArr2[i].parentTitle+'&nbsp;&nbsp;&nbsp;'+recentlyArr2[i].title+'</div>';

	}
	$("#rightContent").html(aa);
	//动态生成右边栏内容end
}

$.fn.smartFloat = function() {
 var position = function(element) {
  var top = element.position().top, pos = element.css("position");
  $(window).scroll(function() {
   var scrolls = $(this).scrollTop();
   if (scrolls > top) {
    if (window.XMLHttpRequest) {
     element.css({
      position: "fixed",
      top: 0
     }); 
    } else {
     element.css({
      top: scrolls
     }); 
    }
   }else {
    element.css({
     position: pos,
     top: top
    }); 
   }
  });
 };
 return $(this).each(function() {
  position($(this));      
 });
};

