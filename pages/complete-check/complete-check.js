var util = require('../../utils/util.js');
const translate = require('../../utils/translate.js');

Page({

	/**
   * 页面的初始数据
   */
	data: {

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

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function() {

	},

	backTo: function() {
		util.checkLogin();
		wx.redirectTo({
      url: '../scan/scan',
    });
	}
});
