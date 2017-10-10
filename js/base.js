mui.previewImage();
$(function() {
try{
   var mySwiper = new Swiper('.swiper-container', {
		autoplay: 3000, //自动滑动 滚动速度
		pagination: '.swiper-pagination', //分页器的class的名字
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		loop: true, //循环

	}) 
}catch(e){}
	

	/*视频点击*/
	var k_rss = document.getElementById("ssd_vidds_xs")

	$("body").on("click", ".sd_oii_xs",function() {

		var url = $(this).attr("data-url");
		if(mui.os.android) {
			$(".sd_iuu_xsdxds").addClass("show")
		}

		$("#ssd_vidds_xs").attr("src", url)

		k_rss.play()
	})
	$(".sd_xsd_xserxrf").on("click", function() { //点击关闭视频弹出层
		if(mui.os.android) {
			$(this).parent().removeClass("show")
		}
		k_rss.pause()
	})
 
	$("body").on("tap",".sd_xsd_xsx", function() {
		$(this).toggleClass("act")
		var k_s = document.getElementById("J_prismPlayer")
		if($(this).hasClass("act")) {
   
			$("#J_prismPlayer").attr("src", $(this).attr('data-url'))
			k_s.play()
		} else {
			k_s.pause()
		}

	})

	$(".sd_xsd_xsex p").on("click", function() {
		var idx = $(this).index();
		$(".sd_xsd_xsex p").removeClass("act").eq(idx).addClass("act")
		$(".sd_uyt_xsdxdex").removeClass("show").eq(idx).addClass("show")
	})

	
})