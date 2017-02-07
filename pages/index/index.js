//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
var mockData = require('../mock/index.js')
Page({
  data: {
    imgUrls1: [
      'http://img.w-share.cn/picture/sliderpicture1.jpg',
      'http://img.w-share.cn/picture/sliderpicture2.jpg',
      'http://img.w-share.cn/picture/sliderpicture3.jpg'
    ],
    list: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loading: false,
    plain: false,
    allDishes: "全部美食",
    priseHigh: "晒资最高",
    allArea: "所有区域",
    dish : [],
    price: [],
    area: [],
    dishOpen : false,
    priceOpen: false,
    areaOpen: false,
    chose:0,
    dishIndex : 0,
    priceIndex: 0,
    areaIndex: 0,
    navs:false,
    isfull:false
  },
   //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore (e) {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
         that.setData({
           loading: false,
           list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
         })
      }
    })
  },
  getNextDate (){
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad () {
    let that = this
    wx.request({
      url: 'http://server.w-share.cn/WebsiteServlet?action=getShopPageByParam_ajax&page=0&wherestr=&city=5YyX5Lqs&orderby=s.amount+desc&longitude=200&latitude=200&nearby=&keyword=',
      //url:'http://http://server.w-share.cn/WebsiteServlet?action=getShopPageByParam_ajax&page=0&wherestr=&city=5YyX5Lqs&orderby=s.amount+desc&longitude=200&latitude=200&nearby=&keyword=',
      //url:'../mock/news.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        if(res.data) {
          for (let i =0;i < res.data.length;i++) {
            res.data[i].recommend = utils.sliceStr(res.data[i].recommend);
          }
        }
         that.setData({
           //banner: res.data.top_stories,
           list:res.data,
           dish : ["全部美食", "火锅", "咖啡", "烧烤"],
           price: ["人气最高", "费用最低", "费用最高", "距离最近"],
           area: ["全部区域", "热门商区", "朝阳门"]
         })
      },
      fail (err) {
        console.log(err);
      }

    });

    this.index = 1;
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    
  },
  dish_action(e) {
    var s;
    if(this.data.dishOpen) {
      s = false;
    } else {
      s = true;
    }
    this.setData({
      chose: 1,
      navs:s,
      isfull:s,
      dishOpen:!this.data.dishOpen,
      priceOpen:false
    });
  },
  price_action(e) {
    var s;
    if(this.data.priceOpen) {
      s = false;
    } else {
      s = true;
    }
    this.setData({
      chose: 2,
      navs:s,
      isfull:s,
      priceOpen:!this.data.priceOpen,
      dishOpen:false
    });
  },
  type_action(e) {
    this.setData({
      chose: 3
    });
  },
  //全部美食
  dish_type:function (e) {
    var dataset = e.currentTarget.dataset;
    var s;
    if(this.data.dishOpen) {
      s = false;
    } else {
      s = true;
    }
    this.setData({
      dishIndex:dataset.choseindex,
      dishOpen:!this.data.dishOpen,
      navs:s,
      isfull:s,
      allDishes:this.data.dish[dataset.choseindex]
    });
    //点击请求数据
  },
  //价格
  price_type: function (e) {
    var dataset = e.currentTarget.dataset;
    console.log(dataset.choseindex);
    var s;
    if(this.data.propen) {
      s = false;
    } else {
      s = true;
    }
    this.setData({
      priceIndex:dataset.choseindex,
      priceOpen:!this.data.priceOpen,
      navs:s,
      isfull:s,
      priseHigh:this.data.pr[dataset.choseindex]
    });
    // var self = this;
    // self.requestData(self);
    // console.log(this.data.price_choseIndex);
  },
  hidebg () {
    this.setData({
      isfull:false,
      dishOpen:false,
      priceOpen:false,
      navs:false
    });
  },
})
