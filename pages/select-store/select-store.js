// pages/select-store/select-store.js
const app = getApp();
const translate = require('../../utils/translate.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    console.log(app.globalData);
    if (!this.data.locale || this.data.locale !== app.globalData.locale) {
      translate.langData(this);
    }
    that.setData({
      locale: wx.getStorageSync('locale'),
      storeId:wx.getStorageSync('storeId')
    });
    util.callApi('Auth.getCurrentSession', {}).then(function (res) {
      var arr=[];
      console.log(res);
      that.setData({
        accessRights: res.accessRights
      });
      var locale = wx.getStorageSync('locale');
      console.log(locale);
      if (locale === 'en') {
        var storeName = res.accessRights[0].store.name.en;
      } else {
        var storeName = res.accessRights[0].store.name.zh;
      }
      for(var i=0;i<res.accessRights.length;i++){
        arr.push({
          storeId:res.accessRights[0].store._id,
          storeName: storeName
        })
      }
      that.setData({
        stores: arr
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeStore:function(e){
    wx.setStorageSync('storeId', e.detail.value.storeId);
    wx.setStorageSync('storeName', e.detail.value.storeName);
    console.log(e.detail.value.storeId);
    console.log(e.detail.value.storeName);
    wx.navigateBack({ })
  }
})