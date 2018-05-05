// pages/login-again/login-again.js
const translate = require('../../utils/translate.js');
Page({

	/**
   * 页面的初始数据
   */
	data: {
		email: wx.getStorageSync('email'),
		password: ''
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		if (!this.data.locale || this.data.locale !== app.globalData.locale) {
			translate.langData(this);
		}
	},

	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function() {

	},

	// 获取邮箱
	emailInput: function(e) {
		this.setData({
			email: e.detail.value
		});
	},

	// 获取输入密码
	passwordInput: function(e) {
		this.setData({
			password: e.detail.value
		});
	},

	login: function() {
		var that = this;
		console.log(that.data.email);
		console.log(that.data.password);
		if (this.data.email.length === 0 || this.data.password.length === 0) {
			wx.showToast({
				title: that.data.trans.login_error1,
				icon: 'loading',
				duration: 2000
			});
		} else {
			// 这里修改成跳转的页面
			wx.request({
				url: 'https://mp-dev.guzzu.cn/mpapi/2/Auth.signinWithEmail',
				data: {
					email: that.data.email,
					password: that.data.password,
					clientType: 'mp.guzzu.cn'
				},
				method: 'POST',
				header: {
					withCredentials: true
				},
				success: function(res) {
					console.log(res.data);
					if (res.data.user) {
						console.log(1);
						wx.setStorageSync('gsid', res.data._id);
						wx.setStorageSync('email', res.data.email);
						wx.navigateBack();
					} else {
						wx.showToast({
							title: that.data.trans.login_error,
							icon: 'none',
							duration: 2000
						});
					}
				}
			});
		}
	},
	loginAnother: function() {
		wx.removeStorageSync('email');
		wx.removeStorageSync('gsid');
		wx.navigateTo({
			url: '../login/login'
		});
	}
});
