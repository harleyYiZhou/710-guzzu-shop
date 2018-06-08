// pages/scan/scan.js
var util = require('../../utils/util.js');
const translate = require('../../utils/translate.js');
const app=getApp();
var api=require("../../utils/api.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		message: '',
		storeId: '',
		ticketNo: '',
		userTicket: null,
    selected: '0',
    hiddenmodalput: true,//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框 
    enterTicketNo: null
	},
	onLoad: function(options) {
		if (!this.data.locale || this.data.locale !== app.globalData.locale) {
			translate.langData(this);
		}
		var that = this;
    let param={};
    api.getCurrentSession(param).then(function(res) {
			console.log(res);
      var locale=wx.getStorageSync('locale');
      console.log(locale);
      if(locale==='en'){
        var storeName = res.accessRights[0].store.name.en;
      }else{
        var storeName = res.accessRights[0].store.name.zh;
      }
      wx.setStorageSync('storeId', res.accessRights[0].store._id);
			wx.setStorageSync('storeName',storeName);
			that.setData({
				storeId: wx.getStorageSync('storeId'),
        storeName: wx.getStorageSync('storeName')        
			});
		});
	},
	onReady: function() {
	},
  onShow: function(){
    this.setData({
      storeId: wx.getStorageSync('storeId'),
      storeName: wx.getStorageSync('storeName') 
    })
  },
  btnNavLink: app.btnNavLink,
	bindKeyInput (e) {
		this.setData({
			ticketNo: e.detail.value.replace(/\s/g, '')
		});
	},
	scan: function() {
		util.checkLogin();
		wx.scanCode({
			success: (res) => {
				console.log('scan', res);
				this.setData({
					message: res.result
				});
				if (res.result) {
					this.setData({
						ticketNo: res.result
					});
					this.jumpToCheckout();
				}
			},
			fail (err) {
				wx.showToast({
					title: err.errMsg,
					icon: 'loading',
					duration: 1500
				});
				this.setData({
					message: ''
				});
			}
		});
	},
  selectStore:function(){
    wx.navigateTo({
      url: '../select-store/select-store',
    })
  },

	getByTicketNo: function() {
		var that = this;
		util.checkLogin();
		if (!this.data.ticketNo) {
			wx.showToast({
				title: 'Invalid ticketNo',
				icon: 'loading',
				duration: 1000
			});
			return;
		}
		this.jumpToCheckout();
	},
	consume () {
		let ticketNo = this.data.ticketNo || this.data.userTicket.ticketNo;
		if (!ticketNo) {
			wx.showToast({
				title: that.data.trans.invalidTicket,
				icon: 'loading',
				duration: 1000
			});
			return;
		}
		wx.showLoading();
		let params = {
			storeId: this.data.storeId,
			ticketNo
		};
    api.consumeTicket(params).then(res => {
			this.setData({
				userTicket: res
			});
			console.log(res);
			wx.hideLoading();
			wx.showToast({
				title: 'consume success',
				icon: 'success',
				duration: 1500
			});
			wx.navigateTo({
				url: '../complete-check/complete-check'
			});
		},
		err => {
			wx.showToast({
				title: 'consume fail',
				duration: 1000
			});
			console.log(err);
		});
	},
	jumpToCheckout: function() {
		util.checkLogin();
		var str1 = wx.getStorageSync('storeId');
		var str2 = this.data.ticketNo;
    let param={
      storeId: wx.getStorageSync('storeId'),
      ticketNo: this.data.ticketNo
    };
    api.getUserTicket(param).then(res=>{
      wx.showLoading({
        title: 'loading',
      });
      wx.navigateTo({
        url: '../checkout/checkout?storeId=' + str1 + '&ticketNo=' + str2
      });
    },
    err=>{
      wx.showLoading({
        title: 'error',
      });
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    })
		
	},
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      enterTicketNo: null,
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function (e) {
    this.setData({
      hiddenmodalput: true,
      ticketNo:this.data.enterTicketNo
    });
    this.jumpToCheckout()
  },
  bindKeyInput: function (e) {
    this.setData({
      enterTicketNo: e.detail.value
    })
  },  
});

// function callApi(url, params) {
// 	var gsid = wx.getStorageSync('gsid');
// 	return new Promise((resolve, reject) => {
// 		wx.request({
// 			url: `${API_PREFIX + url}`,
// 			data: params,
// 			header: {
// 				'x-guzzu-sessionid': gsid,
// 			},
// 			method: 'POST',
// 			success: function (res) {
// 				if (res.statusCode === 200) {
// 					resolve(res.data);
// 				} else {
// 					reject(res);
// 				}
// 			},
// 			fail(err) {
// 				reject(err);
// 			}
// 		})
// 	})

// }
