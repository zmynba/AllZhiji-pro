
var phonturl="";
//Vue开始
var editinfo = new Vue({
	el: '#editinfo',
	data: {
		interLang: interLang,	//国际化
		loginFont: interLang.loginFont,
		editinfofont: interLang.editinfofont,
		mobfont2: interLang.mobfont2,
		countryCode: '86',
		mobile: '',
		gendertxt: '',
		gender: '',
		age: '',
		nameUser: '',
		nameNumber: 0,
		birthday: '',
		inputMob: 100,
		profileImage: 'http://img.priormatch.com/9093cc74559ed4e59d314b7901989d7d_w750_h750.png',
		loginBotton: interLang.loginBotton,
		loginVerification: interLang.loginVerification,
		loginforget: interLang.loginforget,
		birthdayfont: interLang.birthdayfont,
	},
	mounted() {
		var that = this;
		that.inputMob = app.clientW-110;
		var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));			
		that.mobile = loginCon.mobile;
		that.countryCode = loginCon.countryCode;	
		//头部函数
		app.publicHead({
			left: true,
			leftIcon: 'page/img/public/icon_back.png',
			content: that.loginFont,
			mOpacity: 1,
			right: false,
			backgroundColor: 'transparent',
			isNeedHeight: true
		});
		$.dateSelector({
			title: that.interLang.dpAdd5,
			defBg: '#b1b1b1',
			evEle: '#birth',
			startYear: '1900',
			endYear: '2019',
			afterAction(res){
				var birthday = res.date;
				$("#birth").val(birthday);
				that.age = birthday;
				that.birthday = birthday;
			}
		})
	  
	},
	methods: {
		tapMobile(){
			this.nameNumber = this.min;
			if(this.min > 0){
				$('.login-font').css('background-image',"url(../image/login/rightbotton@2x.png)");	
				$('.login-font').css('color',"#121212");	
			}else{
				$('.login-font').css('background-image',"url(../image/login/botton@2x.png)");	
				$('.login-font').css('color',"#B89E61");	
			}
		},
		tapgender(){
			var that = this;
			console.log(that.birthday);
			app.showAction({
				title: that.interLang.dpAdd6,
				list: [that.interLang.boy, that.interLang.girl],
				color: '#0062D9',
				success: function(res){
					that.gendertxt = res.tapText;
					that.gender = res.tapIndex;
				}
			})
		},
		//输入框置空
		tapEmpty(){
			this.nameUser = '';
			this.tapMobile();
			$('.login_mobile').focus();
		},
		//测试
		checkPass(){
			var that = this;
			that.getNowFormatDate();
			var datarr = {
				avatar: phonturl,
				nick: that.nameUser,
				gender: that.gender,
				birthday: that.birthday,
			}
			$.ajax({
				url:"http://u.api.priormatch.com/profile/infofill/"+app.urlc,  
				type : 'POST',				
				data: datarr,  
				xhrFields: {
					withCredentials: true
				},	
				success:function(infofill) { 
					console.log(infofill);
					if(infofill.errno == 0){
						$.ajax({  
								url:"http://u.api.priormatch.com/common/token/"+app.urlc,  
								type : 'get',
								data: '', 
								xhrFields: {
									withCredentials: true
								},	
								success:function(token) {  			
									//console.log(token);
									if(token.errno == 0){
										var tokens = 'bl_time='+ token.data.bl_time +'&bl_token='+ token.data.bl_token+'&uid='+ token.data.uid;
										localStorage.setItem('token', tokens);
										localStorage.setItem('rYToken', token.data.bl_token);
										location.replace('page/index.html');
										
									}else{
										app.showToast({
											title: token.errmsg,
											duraiton: 1500
										})
										
									}
								},  
								timeout:3000  
							});
					}else{
						app.showToast({
							title: infofill.errmsg,
							duraiton: 1500
						})
						 that.getNowFormatDate();
					}
				},  
			});			
				
		},
		getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear()-18;
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			console.log(currentdate);
			$("#birth").val(currentdate);
			this.birthday = currentdate;
		},

		
	},
	computed: {
		min(){
			if(this.nameUser){
				return this.nameUser.length;
			}
			
		}
	}
})
var canvasDataURL = function(path, obj){
	var img = new Image();
	img.src = path;
	img.onload = function(){
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = obj.width || w;
		h = obj.height || (w / scale);
		var quality = 0.5;  // 默认图片质量为0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		// 图像质量
		if(obj.quality && obj.quality <= 1 && obj.quality > 0){
			quality = obj.quality;
		}
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		//console.log("图片base64:" + base64);
		// 回调函数返回base64的值
		var imgFile = dataURLtoFile(base64);
		var fd = new FormData();
		fd.append("file",  imgFile, "image.jpg"); 
		submit(fd);
	}
}
//获取图片方向
var getPhotoOrientation = function(img) { 
	var orient;
	var image = new Image();
	image.src = img;
	image.onload = function(){
		var expectWidth = this.naturalWidth;
		var expectHeight = this.naturalHeight;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = expectWidth;
		canvas.height = expectHeight;
		ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
		var base64 = null;
		EXIF.getData(image, function() {
			EXIF.getAllTags(this); 
			orient = EXIF.getTag(this, 'Orientation');
			if(orient != "" && orient != 1){
				switch(orient){
					case 6://需要顺时针（向左）90度旋转		
						rotateImg(this,'left',canvas);
						break;
					case 8://需要逆时针（向右）90度旋转
						rotateImg(this,'right',canvas);
						break;
					case 3://需要180度旋转
						rotateImg(this,'right',canvas);//转两次
						rotateImg(this,'right',canvas);
						break;
				}		
			}
			
		});
		base64 = canvas.toDataURL("image/jpeg", 0.8);
		$(".js-image").attr('src', base64);
		$("#container_div").css('display','block');
		//这里初始化cropper
		iniCropper()
	}
}
var cropper
$("#PhotoF").on("change",function(){
	var fr = new FileReader();
	var file = this.files[0]; 
	//console.log('图片信息:',file);
	if(!/image\/\w+/.test(file.type)){
		return false;
	}else{
		fr.readAsDataURL(file);		
		fr.onload = function(e){
			getPhotoOrientation(e.target.result);			
		};
	}


});
function iniCropper(){
	 var $image = $('.js-image'),
	 image = $image[0];
	 var croppable = false; 
	 $image.cropper({
		dragMode: 'move',
		dragCrop: false,
		rotatable:false,
		aspectRatio: 1/1, 
		autoCropArea: 0.75,
		restore: false,
		movable:true,
		movable:false,
		zoomable: false,
		viewMode: 1,
		guides: false,
		center: false,
		highlight: false,
		ready: function () {
			croppable = true;
		},
	 });
	 var croHeight = app.clientH -50;
	 $(".cropper-container").css('height',croHeight+'px');
}
$('.js-no').on('click', function () {
	 $('.js-image').cropper('destroy');
	$(".container-botton").css('display','none');
});
$('.js-ok').on('click', function () {
	app.showLoading({
		title: interLang.loading
	}) 
	var dataURL = $('.js-image').cropper("getCroppedCanvas", {
		width: 1000,
		height: 1000
	});

	var base64Img = dataURL.toDataURL('image/png')	
	var w = 1000;
	canvasDataURL(base64Img,w);
});
 function submit(fd) {
	
	$.ajax({
		url:"http://m.api.priormatch.com/common/uploadimg/"+app.urlc,
		type : 'POST',				
		data: fd, 
		processData: false,
		contentType: false,
		dataType:"json",
		xhrFields: {
			withCredentials: true
		},
		success:function(res) {
			app.hideLoading();
			//console.log('设置已读', res);
			if(res.errno == 0){
				phonturl = "http://"+res.data.url;
				$("#phone_ok").attr("src", phonturl);
			}
		}
	});
	$('.js-image').cropper('destroy');
	$(".container-botton").css('display','none');
}
function dataURLtoFile(dataurl, filename = 'file') {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}
