// pages/checkout/checkout.js
var util =require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userTicket: null,
    email: null,
    buyerName: '',
    buyerPhone: '',
    status: '',
    beginTime: '',
    endTime: '',
    createTime: '',
    useTime: '',
    isClick: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
 
    that.setData({
      storeId: options.storeId,
      ticketNo: options.ticketNo
    })

    let params={
      storeId: options.storeId,
      ticketNo: options.ticketNo
    }
    util.callApi('UserTicket.get', params).then(
      res => {
        console.log(res);
        this.setData({
          userTicket: res,
        });
        wx.hideLoading();
        if (res.status == 'consumed') {
          that.setData({
            status: '已核销',
            isClick: true
          })
        }else{
          that.setData({
            status: '未核销',
             isClick: false
          })
        }
        //转化时间格式
        if(res){
          that.setData({
            beginTime: util.formatTime(new Date(res.product.eventStartTime),'Y-M-D'),
            endTime: util.formatTime(new Date(res.product.eventEndTime), 'Y-M-D'),
            createTime: util.formatTime(new Date(res.createdAt), 'Y-M-D h:m:s'),
            useTime: util.formatTime(new Date(res.updatedAt), 'Y-M-D h:m:s')
          })
        }
      },
      err => {
        console.log(err);
        wx.hideLoading();
      }
    ).then(function(){
        let params = {
          storeId: that.data.userTicket.store._id,
          userId: that.data.userTicket.user
        }
        util.callApi("Customer.getByUserId", params).then(res => {
          console.log(res);
          that.setData({
            buyerName: res.user.name,
            buyerPhone: res.user.mobilePhone,
          })
          if (res.user.email) {
            that.setData({
              email: res.user.email,
            })
          }
        })
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  consume: function(){
    let ticketNo = this.data.ticketNo || this.data.userTicket.ticketNo;
    if (!ticketNo) {
      wx.showToast({
        title: 'Invalid ticketNo',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    wx.showLoading();
    let params = {
      storeId: this.data.storeId,
      ticketNo: this.data.ticketNo
    };
    util.callApi('UserTicket.consume', params).then(res => {
      this.setData({
        userTicket: res
      });
      console.log(res);
      wx.hideLoading();
      wx.showToast({
        title: 'consume success',
        icon: 'success',
        duration: 1500
      })
      wx.navigateTo({
        url: '../checked/checked'
      })
    },
      err => {
        wx.showToast({
          title: 'consume fail',
          duration: 1000
        })
        console.log(err);
        wx.navigateTo({
          url: '../scan/scan'
        })
      });
  }
 
})