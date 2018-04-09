const API_PREFIX = 'https://mp-dev.guzzu.cn/mpapi/2/';
// const API_PREFIX = 'http://192.168.31.253:4020/mpapi/2/';

Page({
	data: {
		email: '',
		password: ''
	},
	onShow() {
		this.setData({
			email: wx.getStorageSync('email') || ''
		})
	},
	// 获取输入账号 
	emailInput: function (e) {
		this.setData({
			email: e.detail.value.replace(/\s/g, '')
		})
	},
	// 获取输入密码 
	passwordInput: function (e) {
		this.setData({
			password: e.detail.value.replace(/\s/g, '')
		})
	},

	// 登录 
	login: function () {
		var that = this;
		if (this.data.email.length == 0 || this.data.password.length == 0) {
			wx.showToast({
				title: '邮箱和密码不能为空',
				icon: 'loading',
				duration: 2000
			})
		} else {
			// 这里修改成跳转的页面 
			wx.request({
				url: `${API_PREFIX}Auth.signinWithEmail`,
				data: {
					email: that.data.email,
					password: that.data.password,
					clientType: 'mp.guzzu.cn'
				},
				method: 'POST',
				header: {
					withCredentials: true
				},
				success: function (res) {
					console.log(res.data)
					if (res.data.user) {
						wx.setStorageSync('gsid', res.data._id);
						wx.setStorageSync('email', res.data.user.email);
						toScan();
					} else {
						wx.showToast({
							title: '账号密码不正确',
							icon: 'none',
							duration: 2000
						})
					}
				}
			})
		}
	}
})

function toScan() {
	wx.showToast({
		title: '登录成功',
		duration: 1500
	})
	setTimeout(() => {
		wx.navigateTo({
			url: '../scan/scan'
		})
	}, 1000)
}