// pages/login-again/login-again.js
const translate = require('../../utils/translate.js');
var util =require('../../utils/util.js');
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
      var param = {
        email: that.data.email,
        password: that.data.password,
        clientType: 'mp.guzzu.cn'
      };
      util.callApi('Auth.signinWithEmail', param).then(function (res) {
        console.log(res.data);
        if (res.user) {
          wx.setStorageSync('gsid', res._id);
          wx.setStorageSync('email', res.user.email);
          toScan(that);
        } else {
          wx.showToast({
            title: that.data.trans.login_error,
            icon: 'none',
            duration: 2000
          });
        }
      })
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
function toScan(that) {
  wx.showToast({
    title: that.data.trans.success,
    duration: 1500
  });
  setTimeout(() => {
    wx.navigateTo({
      url: '../scan/scan'
    });
  }, 1000);
}