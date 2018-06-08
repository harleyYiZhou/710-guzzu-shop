// pages/select-store/select-store.js
const app = getApp();
const translate = require('../../utils/translate.js');
var util = require('../../utils/util.js');
var api =require('../../utils/api.js');

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
    let param={};
    api.getCurrentSession(param).then(function (res) {
      var arr=[];
      console.log(res);
      that.setData({
        accessRights: res.accessRights
      });
      var locale = wx.getStorageSync('locale');
      console.log(locale);
      
      for(var i=0;i<res.accessRights.length;i++){
        if (locale === 'en') {
          var storeName = res.accessRights[i].store.name.en;
        } else {
          var storeName = res.accessRights[i].store.name.zh;
        }
        arr.push({
          storeId:res.accessRights[i].store._id,
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
    var that=this;
    wx.setStorageSync('storeId', e.detail.value);
    for(let i=0;i<that.data.stores.length;i++){
      if(that.data.stores[i].storeId==e.detail.value){
        wx.setStorageSync('storeName', that.data.stores[i].storeName);
      }
    }
    wx.navigateBack({ })
  }
})