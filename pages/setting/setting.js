// pages/setting/setting.js
const API_PREFIX = 'https://mp.guzzu.cn/mpapi/2/';
// const API_PREFIX = 'https://mp-dev.guzzu.cn/mpapi/2/';
// const API_PREFIX = 'http://192.168.31.253:4020/mpapi/2/';
const app = getApp();
const translate = require('../../utils/translate.js');
var util = require('../../utils/util.js');
var api=require('../../utils/api.js');


Page({
  data: {
    email: '',
    password: '',
    selected: "1"
  },
  onLoad: function (options) {
    var that=this;
    
    console.log(app.globalData);
    if (!this.data.locale || this.data.locale !== app.globalData.locale) {
      translate.langData(this);
    }
    that.setData({
      locale: wx.getStorageSync('locale')
    })
    // util.callApi('Auth.getCurrentSession', {}).then(function (res) {
    //   console.log(res);
    //   that.setData({
    //     accessRights: res.accessRights
    //   });
    // });
  },
  btnNavLink: app.btnNavLink,
  onShow() {
    this.setData({
      email: wx.getStorageSync('email') || ''
    });
  },
  logout:function(){
    let param={};
    api.signout(param).then(function(res){
      wx.removeStorageSync('gsid');
      wx.reLaunch({
        url: '../login/login',
      });
    }).catch(function(res){
      console.log(res);
      wx.showToast({
        title: res.data.detail.message,
        icon: 'loading',
        duration: 2000
      })
    })
  },
  chooseLang: function (e) {
    console.log(e.detail.value);
    var locale = e.detail.value;
    translate.setLocale(locale);
    translate.langData(this);
    // toScan();
  }
});


