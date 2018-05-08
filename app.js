// app.js
const translate = require('./utils/translate.js');
const util = require('./utils/util.js');

App({
	onLaunch: function() {
		// 中英文显示
		let that = this;
		var value = wx.getStorageSync('locale');
		if (value) {
			that.globalData.locale = value;
		} else {
			wx.setStorage({
				key: 'locale',
				data: 'zh'
			});
		}
		that.globalData.trans = require(`./locales/${that.globalData.locale}`);

		// 展示本地存储能力
		wx.removeStorageSync('gsid');
		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		});
		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo;

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res);
							}
						}
					});
				}
			}
		});
	}, 
  btnNavLink: function (e) {
    this.globalData.selected = e.currentTarget.id;
    console.log(this.globalData);
    wx.showLoading({
      title: 'loading',
    })
    var id = e.currentTarget.id;
    switch (id) {
      case "0":
        wx.redirectTo({
          url: '/pages/scan/scan',
        });
        break;
      case "1":
        wx.redirectTo({
          url: '/pages/setting/setting',
        });
        break;

    }
    wx.hideLoading();
  },
	globalData: {
		userInfo: null,
		locale: 'zh',
    selected: '0'
	}
});
