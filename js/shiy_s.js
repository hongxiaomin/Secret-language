function dateDifs(time, id){
	var day_elem 		= $(id).find('.day');
	var hour_elem 		= $(id).find('.hour');
	var minute_elem 	= $(id).find('.minute');
	var second_elem 	= $(id).find('.second');
	var end_time 		= new Date(time).getTime(),					//月份是实际月份-1
	sys_second 			= (end_time - new Date().getTime())/1000;
	var timer 			= setInterval(function(){
		if (sys_second > 1) {
			sys_second -= 1;
			var day 	= Math.floor((sys_second / 3600) / 24);
			var hour 	= Math.floor((sys_second / 3600) % 24);
			var minute 	= Math.floor((sys_second / 60) % 60);
			var second 	= Math.floor(sys_second % 60);
			day_elem && $(day_elem).text(day);						//计算天
			$(hour_elem).text(hour<10?"0"+hour:hour);				//计算小时
			$(minute_elem).text(minute<10?"0" + minute:minute);		//计算分钟
			$(second_elem).text(second<10?"0" + second:second);		//计算秒杀
		} else { 
			clearInterval(timer);
		}
	}, 1000);
}

function ssd_xsf(data){
	var countdown 	= data.countdown;
	var nowtime 	= data.nowtime;
	var openStatus 	= data.openStatus;
    this.uiy_s		= data.userInfo.wxHeadImg;					// 头像
    this.nickName	= data.userInfo.nickName;					// 用户昵称
    this.uid		= data.userInfo.uid;						// 用户id
    var sd_ii 		= "";										// 标签
    $(data.tags).map(function(){
        sd_ii 		+= this+" / ";
    });
    var km_xd		= sd_ii.substring(0,sd_ii.length-1); 
    this.tags 		= km_xd;									// 标签
    this.openTime 	= data.openTime;							// 开启时间，头像下方致：XXX
    this.data 		= data.data;								// 数据体
    this.id 		= data.id;									// id
    var enddate 	= parseInt(countdown) - parseInt(nowtime);	// 时间差
    // this.tie_x 		= dateDif(openStatus, countdown, nowtime, enddate);// 开启时间

    if(countdown == 0 && openStatus == 0) {
		this.tie_x 	=  '秘语等待开启';					// 时间到,未开启
	} else if(countdown != 0 && openStatus == 0) {
		this.tie_x 	=  '';
	    dateDifs("2017/10/01 10:00:00","#dateDifs_"+data.id);
	    console.log(data.id)
    }else{
		this.tie_x 	=  '已开启';		// 如果返回空字符串，说明已经开启
	}
	dateDifs("2017/10/01 10:00:00","#dateDifs_21");
    
    this.physical 	= data.physical;							// 1 = 开启；0 = 未开启
    this.type 		= data.type;								// 类型
    this.recommend 	= data.recommend;							// 推荐度
    this.isFocusOn 	= data.isFocusOn;							// 关注状态，1已关注,0未关注
}

// function dateRun(enddate){
//     //如果enddate为后台传入的Date类型，这里直接转化为毫秒数
//     enddate 	= new Date(eddate.replace("T"," ").getTime());
//     //以500毫秒的速度执行（可以避免方法执行速度慢会影响展示效果的情况）0
//     var time 	= 500;
//     setInterval("dateDif('"+enddate+"')",time);
// }

// //计算时间相差
function dateDif(openStatus, countdown, nowtime, enddate){
	// var nowTime = Math.round( new Date().getTime() / 1000 );
	if(countdown == 0 && openStatus == 0) {
		// 时间到,未开启
		return '秘语等待开启';
	} else if(countdown != 0 && openStatus == 0) {
	    // var date 			= enddate - nowtime; 
	    var days    		= enddate /  60 / 60 / 24;
	    var daysRound   	= Math.floor(days);
	    var hours    		= enddate/  60 / 60 - (24 * daysRound);
	    var hoursRound   	= Math.floor(hours);
	    var minutes   		= enddate / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
	    var minutesRound  	= Math.floor(minutes);
	    var seconds   		= enddate / (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
	    console.log((24 * 60 * 60 * daysRound))

	    var secondsRound  	= Math.floor(seconds);
	    var time 			= (daysRound+"天"+hoursRound +"时"+minutesRound+"分"+secondsRound+"秒");
	    return time;
	    if(daysRound > 0)
	    {
	    	// 大于1天, 显示  XX天XX小时XX分
	    	return daysRound+"天"+hoursRound +"时"+minutesRound+"分";
	    }else{
	    	// 小于1天, 显示  XX小时XX分XX秒 并倒计时
	    	return hoursRound +"时"+minutesRound+"分"+parseInt(secondsRound)+"秒";
	    }
    }else{
		return '';		// 如果返回空字符串，说明已经开启
	}
} 


// function getDateNow(openStatus, countdown, nowtime)
// {
// 	// var nowTime = Math.round( new Date().getTime() / 1000 );
// 	if(countdown == 0 && openStatus == 0) {
// 		// 时间到,未开启
// 		return '秘语等待开启';
// 	} else if(countdown != 0 && openStatus == 0) {
// 		// 时间未到,未开启
// 		var residue 		= parseInt(countdown) - parseInt(nowtime);		// 计算时间差,秒数
// 		var days    		= parseInt(residue) / parseInt(86400);			// 计算天数
// 	    var daysRound   	= Math.floor(days);
// 	    var hours    		= parseInt(residue)/ parseInt(3600) - (parseInt(24) * parseInt(daysRound));
// 	    var hoursRound   	= Math.floor(hours);
// 	    var minutes   		= parseInt(residue) / parseInt(60) - (parseInt(1440) * parseInt(daysRound)) - (parseInt(60) * parseInt(hoursRound));
// 	    var minutesRound  	= Math.floor(minutes);
// 	    var seconds   		= parseInt(residue) / (parseInt(86400) * parseInt(daysRound)) - (parseInt(3600) * parseInt(hoursRound)) - (parseInt(60) * parseInt(minutesRound));
// 	    console.log(seconds);
// 	    var secondsRound  	= Math.floor(seconds);
// 	    if(daysRound > 0)
// 	    {
// 	    	// 大于1天, 显示  XX天XX小时XX分
// 	    	return daysRound+"天"+hoursRound +"小时"+minutesRound+"分";
// 	    }else{
// 	    	// 小于1天, 显示  XX小时XX分XX秒 并倒计时
// 	    	return hoursRound +"小时"+minutesRound+"分"+parseInt(secondsRound)+"秒";
// 	    }
// 	}else{
// 		return '';		// 如果返回空字符串，说明已经开启
// 	}
// }


// function getDateDiff(dateTimeStamp){ 

//     var sd_iu=new Date()
//     sd_iu.setTime(dateTimeStamp)

//     console.log(sd_iu)
// 	var minute = 1000 * 60;
// 	var hour = minute * 60;
// 	var day = hour * 24;
// 	var halfamonth = day * 15;
// 	var month = day * 30;
// 	var now = new Date().getTime();
// 	var diffValue = now - dateTimeStamp;
// 	if(diffValue < 0){return;}
// 	var monthC =diffValue/month;
// 	var weekC =diffValue/(7*day);
// 	var dayC =diffValue/day;
// 	var hourC =diffValue/hour;
// 	var minC =diffValue/minute;
// 	if(monthC>=1){
// 		result="" + parseInt(monthC) + "月前";
// 	}
// 	else if(weekC>=1){
// 		result="" + parseInt(weekC) + "周前";
// 	}
// 	else if(dayC>=1){
// 		result=""+ parseInt(dayC) +"天前";
// 	}
// 	else if(hourC>=1){
// 		result=""+ parseInt(hourC) +"小时前";
// 	}
// 	else if(minC>=1){
// 		result=""+ parseInt(minC) +"分钟前";
// 	}else
// 	result="刚刚";
// 	return result;
// }