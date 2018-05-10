
const app = getApp();
const translate = require('../../utils/translate.js');
var util = require('../../utils/util.js');
var api = require('../../utils/api.js');

Page({
	data: {
		email: '',
		password: ''
	},
	onLoad: function(options) {
		console.log(app.globalData);
		if (!this.data.locale || this.data.locale !== app.globalData.locale) {
			translate.langData(this);
		}
	},
	onShow () {
		this.setData({
			email: wx.getStorageSync('email') || ''
		});
	},
	// 获取输入账号
	emailInput: function(e) {
		this.setData({
			email: e.detail.detail.value
		});
	},
	// 获取输入密码
	passwordInput: function(e) {
		this.setData({
			password: e.detail.detail.value
		});
	},

	// 登录
	login: function() {
		var that = this;
		this.setData({loading: true});
		// 这里修改成跳转的页面
		var param = {
			email: that.data.email,
			password: that.data.password,
			clientType: 'tickettool'
		};
		api.signinWithEmail(param).then(function(res) {
			that.setData({ loading: false });
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
		}, (error) => {
			console.log(error);
			this.setData({ loading: false });
			wx.showToast({
				title: that.data.trans.login_error,
				icon: 'none',
				duration: 2000
			});
		});
	},
	chooseLang: function(e) {
		console.log(e.target.dataset.lang);
		var locale = e.target.dataset.lang;
		translate.setLocale(locale);
		translate.langData(this);
	}
});

function toScan (that) {
	wx.showToast({
		title: that.data.trans.success,
		duration: 1500
	});
	setTimeout(() => {
		wx.redirectTo({
			url: '../scan/scan'
		});
	}, 1000);
}
