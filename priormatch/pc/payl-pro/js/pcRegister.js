 var iframe=document.createElement("iframe");
 	var iframepage='<iframe src="http://wap.priormatch.com/page/loginModal.html" frameborder=0 name="login" id="loginPage" class="loginpage"></iframe>';
 	$("body").append(iframepage);
 var vm=new Vue({
        el:"#pcRegister",
        data:{
			interLang: interLang,				//国际化
			inputindex:0,
			btnindex:0,
			aeskeys:"",
			countryCode:"86",
			list:[],
			mobile:"",
			passwordone: '',
			password:"",
			verificationcode:"",
			circleindex:0,
			sendNumber: 60,
			codetime:false,
			registerShow:0,
			birthday: '',
			nameNumber: 0,
			gender: 1,
			nameUser: '',
        },

		computed:{
			min(){
				if(this.nameUser){
					return this.nameUser.length;
				}
				
			},
		    btnclass:function(){
		        if(this.password.length==0){
		            return "grey-btn"
		        }else if(this.password.length>0&&this.btnindex==0){
		            return "b-select-btn"
		        }else if(this.password.length>0&&this.btnindex==1){
		            return "b-selected-btn"
		        }
		    }
		},
        created:function(){
			var that = this;
		
			$.ajax({
				url:"http://wap.priormatch.com/page/data/alibaba_country.json?vbfs",
				type : 'get',				
				data: '', 
				dataType: "json",
				xhrFields: {
					withCredentials: true
				},
				success:function(res) {
					console.log('礼物：', res);
					var countryList = res.countryList;
					for(var i = 0; i < countryList.length; i++){
						if(that.code == countryList[i].code){
							countryList[i].show=1;
						}else{
							countryList[i].show=2;
						}
						
					}
					that.list = countryList;
				},  
			});
        },
		mounted(){
			var that = this;
			if(JSON.parse(localStorage.getItem("loginCon"))==null){
			    var loginCon={};
			    loginCon.Country="中国";
			    loginCon.countryCode="86";
			    loginCon.countryCodeEn="CN";
			    loginCon.mobile="";
			    localStorage.setItem("loginCon",JSON.stringify(loginCon));
			}else{
			    this.countryCode=JSON.parse(localStorage.getItem("loginCon")).countryCode;
			}
			$.ajax({
			    url:"http://u.api.priormatch.com/common/aeskey/"+app.urlc,  
			    type : 'get',				
			    data: '', 
			    xhrFields: {
			        withCredentials: true
			    },		
			    success:function(aeskey) {  			
			        console.log(aeskey);
			        if(aeskey.errno == 0){
			            that.aeskeys = aeskey.data;
			        }else{
			            app.showToast({
			                title: aeskey.errmsg,
			                duraiton: 1500
			            })
			        }
			    }, 
			});	
		},
        methods:{
			//切换账号
			SwitchAccount(){
				window.location.href = 'paypage.html';
			},
			clearphone(){
			    this.mobile="";
			},
			//输入框置空
			tapEmpty(){
				this.nameUser = '';
				this.tapMobile();
				$('.login_mobile').focus();
			},
			//测试
			checkMobile(){
				var that = this;
				var data = {
					regionid: that.countryCode,
					phone: that.mobile
				}
				$.ajax({  
					url:"http://u.api.priormatch.com/common/checkphone/?__plat=h5&__version=1.0&channel=h5",  
					type : 'post',				
					data: data,  
					xhrFields: {
						withCredentials: true
					},
					success:function(cmObj) {  
						console.log(cmObj);
						if(cmObj.errno==0){
							var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));			
							loginCon.mobile = that.mobile;
							console.log(loginCon);
							window.localStorage.setItem('loginCon', JSON.stringify(loginCon));
							if(cmObj.data == 1){	
								app.showToast({
									title: interLang.mobfont2,
									duraiton: 1500
								})
								window.location.href = 'paypage.html';
							}else{
								that.sendCode()
							}
					}else{
						app.showToast({
							title: cmObj.errmsg,
							duraiton: 1500
						})
					}
						
					},  
					timeout:3000  
				});			
			},
			sendCode(){  
				//发送验证码
			    var that = this;
			    var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));
			    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
			    if(!myreg.test(this.mobile)){
			        app.showToast({
			            title:interLang.n_right_code
			        })
			        return false;
			    }
			    that.countryCode = loginCon.countryCode;
			    var datarr = {
			        regionid: that.countryCode,
			        phone: that.mobile,
			        type: 'reg'
			    }
			    $.ajax({
			        url:"http://u.api.priormatch.com/common/sendsms/"+app.urlc,  
			        type : 'post',				
			        data: datarr,
			        xhrFields: {
			            withCredentials: true
			        },	
			        success:function(sendsms) {
			            that.codetime=true;
			            if(sendsms.errno==0){
			                app.showToast({
			                    title: that.interLang.dpSendMobile,
			                    duraiton: 1500
			                })
			            }else{
			                app.showToast({
			                    title: sendsms.errmsg,
			                    duraiton: 1500
			                })
			            }
			            that.sendTime();
			            console.log(sendsms);
			        },  
			        timeout:3000  
			    });	
			},
			saveNext(){
				 var that = this;
				that.registerShow = 1;
			},
			sendTime() {
			    var that = this;
			    if (that.sendNumber == 0) {
			        that.sendNumber = 60;
			        that.codetime=false;
			        return;
			    } else {
			        that.sendNumber--;
			    }
			    console.log(that.sendNumber);
			    setTimeout(function() {
			        that.sendTime();
			    },1000);
			},
			savepwd(){  //先验证验证码再保存密码
			    var that = this;
			    var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
			    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
			    
			    if(!reg.test(that.password)){
			        app.showToast({
			            title: interLang.dpAdd2,
			            duraiton: 2000
			        })
			        return false;
			    }
				
			    var datarr = {
			        regionid: that.countryCode,
			        phone: that.mobile,
			        smscode: that.verificationcode
			    }
			    $.ajax({
			        url:"http://u.api.priormatch.com/user/checkregsms"+app.urlc,  
			        type : 'post',				
			        data: datarr,  
			        xhrFields: {
			            withCredentials: true
			        },	
			        success:function(checksms) {  
			            console.log(checksms);
			            if(checksms.errno==0){
			                that.registerFun()
			            }else{
			                app.showToast({
			                    title: checksms.errmsg,
			                    duraiton: 1500
			                })
			            }
			        },  
			        timeout:3000  
			    });			
			
			},
			registerFun(){//保存密码
				var that = this;
				var pwd = that.password;
				var k = that.aeskeys;
				var c = '';
				var code = JSON.parse(window.localStorage.getItem('code'));	
				for(var i=0;i<pwd.length;i++){
					var b = String.fromCharCode(pwd.charCodeAt(i)^k.charCodeAt(i));
					c =c + b;
				}
				console.log(c);
				var keys = Base64.encode(c);
				console.log(keys);
				var datarr = {
					pwd: keys,
					pcode: code,
					aeskey: that.aeskeys
				}
				$.ajax({				
					url:"http://u.api.priormatch.com/user/reg/"+app.urlc,  
					type : 'POST',				
					data: datarr, 
					dataType: "json",
					xhrFields: {
						withCredentials: true
					},
					success:function(regarr) {  
						console.log(regarr);
						if(regarr.errno==0){
							localStorage.setItem('userArr', JSON.stringify(regarr.data));
								if(regarr.data.gender == 0){
									that.registerShow = 2;
									//location.replace('editinformation.html');
								}else{
									$.ajax({  
									url:"http://u.api.priormatch.com/common/token/"+app.urlc,  
									type : 'get',
									data: '', 
									xhrFields: {
										withCredentials: true
									},	
									success:function(token) {  			
										console.log(token);
										if(token.errno == 0){
											var tokens = 'bl_time='+ token.data.bl_time +'&bl_token='+ token.data.bl_token+'&uid='+ token.data.uid;
											localStorage.setItem('token', tokens);
											localStorage.setItem('rYToken', token.data.bl_token);
											location.replace('paypage.html');
										}else{
											app.showToast({
												title: token.errmsg,
												duraiton: 1500
											})
											
										}
									},  
									timeout:3000  
								});
									
							}
							
						}else{
							app.showToast({
								title: regarr.errmsg,
								duraiton: 1500
							})
							that.tapEmpty();
						$.ajax({  
								url:"http://u.api.priormatch.com/common/aeskey/"+app.urlc,  
								type : 'get',				
								data: '', 
								xhrFields: {
									withCredentials: true
								},	
								success:function(aeskey) {  			
									console.log(aeskey);
									if(aeskey.errno == 0){
										that.aeskeys = aeskey.data;
										
									}else{
										app.showToast({
											title: aeskey.errmsg,
											duraiton: 1500
										})
									}
								},  
								timeout:3000  
							});	
						}
					},  
				
				});		 
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
