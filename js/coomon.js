var ip = 'http://miyu.liebaba.com';
var list = '/v1/talk/list-more';
var indexurl=list+'?form=index&moreId=0&form-uid=0&tag=0&ua=micromessenger';
function getindexdata(){
	ajax(indexurl,function(data){
		console.log(data);
		if(data.errorCode==0){
			data=data.body;
			var txt='';
			for(var i=0;i<data.length;i++){
				var tag='';
				var recommend='';
				var comments='';
				//开启时间
				var time=data[i].countdown-data[i].nowtime;
				console.log(time);
				console.log(date(time));
				//判断密语类型及开启状态//开启状态：1 = 开启；0 = 未开启
				var type=data[i].type;				
				var status=data[i].openStatus;
				var media='';
				var praise='';
				if(data[i].praise=='1'){
					var praise='act'
				}
				var collect='';
				if(data[i].collect=='1'){
					var collect='act'
				}
				if(data[i].physical==1){
					shiwu='<img class="swpz" src="./img/sw.png" >'
				}else{
					shiwu=''
				}
				if(type==1&&status==1){//文字状态
					media='';
				}else if(type==1&&status==0){
					media+='<div class="pos"><img src="./img/text.png" data-preview-src=""> <p time="'+time+'"class="mytime">'+date(time)+'</p></div>';
					
				}else if(type==2&&status==1){
					var media='';
					var aimg=data[i].data.srcList.img;
					console.log(aimg);
					for(var g=0;g<data[i].data.srcList.img.length;g++){
							media+='<img src="'+aimg[g]+'" data-preview-src="">';	
					}
				}else if(type==2&&status==0){
					media+='<div class="pos"><img src="./img/tp.png" data-preview-src=""><p time="'+time+'" class="mytime">'+date(time)+'</p></div>';
				}else if(type==3&&status==1){
					media='<audio controls src="'+data[i].data.srcList.audio+'"></audio>';
				}else if(type==3&&status==0){
					media+='<div class="pos"><img src="./img/ly.png" data-preview-src=""><p time="'+time+'" class="mytime">'+date(time)+'</p></div>';
				}else if(type==4&&status==1){
					media='<video width=100% controls src="'+data[i].data.srcList.video+'" poster="'+data[i].data.srcList.video+'?vframe/jpg/offset/7/w/480/h/360'+'"></video>';
				}else if(type==4&&status==0){
					media+='<div class="pos"><img src="./img/sp.png" data-preview-src=""><p time="'+time+'" class="mytime">'+date(time)+'</p></div>';
				}
				
				for(var j=0;j<data[i].tags.length;j++){
					var tag=data[i].tags;
					recommend+='<i class="f_i sd_xsd_xdsx"></i>';
				}
				for(var j=0;j<data[i].recommend;j++){
					
					tag+=tag[j]+'/';
				}
				for(var k=0;k<data[i].comments.length;k++){
					comments+='<p class="z14 zfz12"><span uid="'+data[i].comments[k].release.uid+'" class="ls"> '+data[i].comments[k].release.nickName+'：</span> '+data[i].comments[k].release.context+' </p>'
				}
				//待开启时间
				if(data[i].openStatus==0){
					time=data[i].countdown;
				}
				
				txt+='<section openStatus='+data[i].openStatus+' miyuid='+data[i].id+' class="mt10 bgff pd pt20 pm10 pos miyulist">'+
				//用户信息
						shiwu+
						'<section class="sd_iuu_xs">'+
							'<img src='+data[i].userInfo.wxHeadImg+' class="yj uyuty_Xssde_x fl">'+
							'<section class="ov pl10 pr">'+
								'<p class="fz12 z14">'+
									data[i].userInfo.nickName+
								'</p>'+
								'<p class="fz12 zc">'+
									tag+
								'</p>'+
								'<button type="button"  miyuid='+data[i].id+' class="mui-btn mui-btn-danger xsd_xsd_xsdx fenxiangbtn">'+
								'<i class="f_i sd_xsd_xddfx "></i>分享'+
							'</button>'+
							'</section>'+
							'<p class="qc"></p>'+
						'</section>'+
						//主体内容
						'<section class="sd_xsd_xesw mt10">'+
							'<p class="sd_iuy_xs red tr fl fz12">'+
								'致：'+
							'</p>'+
							'<section class="ov pl10">'+
								'<p class="fz12 red pr">'+
									data[i].openTime+
									'<span class="sd_xsd_xdx">'+
										recommend+
									'</span>'+
								'</p>'+
		
								'<p class="fz12 z14 mt5">'+
									data[i].data.text+
								'</p>'+
								//媒体内容
								'<p class="mt10 sd_iu_sd1">'+
									media+
								'</p>'+
								//回复
								'<section class="mt10 bghs pt10 pm10 pl10 pr10 ">'+
									comments+
								'</section>'+
		
							'</section>'+
		
							'<p class="qc"></p>'+
		
							'<section  uid='+data[i].userInfo.uid+' class="mt15 box cen qsd_xsd_xdx toolbox">'+
								'<a miyuid='+data[i].id+' praise="'+data[i].praise+'" class="'+praise+' box_a z14 fz12 dianzan">'+
									'<i class="f_i sd_uyt_a dza"></i> 点赞'+  
								'</a>'+
								'<a miyuid='+data[i].id+' collect="'+data[i].collect+'" class="'+collect+' box_a z14 fz12 shoucang">'+
									'<i class="f_i sd_uyt_a a_b sca"></i> 收藏'+
								'</a>'+
								'<a class="box_a z14 fz12 pinglun">'+
									'<i class="f_i sd_uyt_a a_c "></i> 评论<span>'+data[i].comment_num+'</span>'+
								'</a>'+
		
							'</section>'+
		
						'</section>'+
					'</section>';
					
			}
		$('.centerbox').html(txt);
		//分享功能  预留
		$('.fenxiangbtn').click(function(e){
			var id=$(this).attr('miyuid');
			console.log(id);
			
			
			e.stopPropagation();
		})
		//点赞
		$('.toolbox').on('click','.dianzan',function(e){
			if($(this).attr('praise')=='0'){
				var id=$(this).attr('miyuid');
				$(this).addClass('act')
				zanadd(id);
				$(this).attr('praise','1');
			}else{
				var id=$(this).attr('miyuid');
				$(this).removeClass('act')
				zancancel(id);
				$(this).attr('praise','0');
			}
			e.stopPropagation();
		})
		//收藏
		$('.toolbox').on('click','.shoucang',function(e){
			
			if($(this).attr('collect')=='0'){
				zanadd($(this).parents('.toolbox').attr('miyuid'));
				$(this).addClass('act')
				$(this).attr('collect','1');
			}else{
				zancancel($(this).parents('.toolbox').attr('miyuid'));
				$(this).removeClass('act')
				$(this).attr('collect','0');
			}
			e.stopPropagation();
		})
		//跳转
		$('.miyulist').click(function(e){
			window.location.href=('./detail.html?id='+$(this).attr('miyuid'));
			e.stopPropagation();
		})
		}
	}, function(data){
		console.log('列表数据请求失败！')
	})
}

//登陆
function login (user,pass){
	
}
//注册
function reg () {
	
}

//##########tools########
//存储
function putStorage(key,value){
    window.sessionStorage.setItem(key,value);
}
//读取
function getStorage(key) {
    return window.sessionStorage.getItem(key);
}
//清除
function stroageClear(){
	window.sessionStorage.clear() ;
}
//打赏
function ds(userid){
	
}
//关注
function followadd (userid,obj){
	ajaxp('/v1/focuson/add',function(data){
		console.log(data.message);

	})
}
//取消关注
function followcancel (userid,obj){
	ajaxp('/v1/focuson/cancel',function(data){
		console.log(data.message);

	})
}
//收藏
function shoucadd(id){
	ajaxp('/v1/collect/add','{id:"'+id+'"}',function(data){
		console.log(data);
	})
}
function shouccancel (id){
	ajaxp('/v1/collect/add','{id:"'+id+'"}',function(data){
		console.log(data);
	})
}
//点赞
function zanadd(id){
	ajaxp('/v1/collect/add','{id:"'+id+'"}',function(data){
		console.log(data);
	})
}
function zancancel (id){
	ajaxp('/v1/collect/add','{id:"'+id+'"}',function(data){
		console.log(data);
	})
}

//评论
function comment (id,text){
	 
}

//请求
function ajax(requestUrl,successfn, errorfn){
	$.ajax({
        type: 'get',
        url: ip+requestUrl,
        async:true,
        cache:false,
        success: function(d){
            successfn(d);
        },
        error: function(e){
            if(errorfn){
                errorfn(e);
           }
        }
    });
}
function ajaxp(requestUrl,data,successfn, errorfn){
	$.ajax({
        type: 'post',
        url: ip+requestUrl,
        data:data||'',
        async:true,
        cache:false,
        success: function(d){
            successfn(d);
        },
        error: function(e){
            if(errorfn){
                errorfn(e);
           }
        }
    });
}
//判断是否是微信浏览器
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
//判断手机号是否合法
function checkMobile( strMobile )
{
    var regu = /^[1][3][0-9]{9}$/;
    var re = new RegExp(regu);
    if (re.test(strMobile)) {
        return true;
    }
    else {
        return false;
    }
};
//判断是否是数字
function isNumber(s){
    var re = /^[0-9]*[1-9][0-9]*$/ ;  
    return re.test(s)  
}
//格式化时间(s)
function date(num){
		if(num<=0){
			
		}
	    var leftsecond=num;//总秒数
        var day=Math.floor(leftsecond/(60*60*24));//剩余天数
        var hour=Math.floor((leftsecond-day*24*60*60)/3600);//剩余小时
        var minute=Math.floor((leftsecond-day*24*60*60-hour*60*60)/60);//剩余分钟
        var second=Math.floor(leftsecond-day*24*3600-hour*3600-minute*60);
        if(day<=0){
        	return hour+'小时'+minute+'分钟'+second+'秒';
        }else if(num<=0){
        	return '<span class="willopen">等待开启</span>';
        }else{
        	return day+'天'+hour+'小时'+minute+'分钟';
        }
}
//get data form href
function GetRequest() { 
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	} 
	return theRequest; 
} 
function getbanner(){
	
}
