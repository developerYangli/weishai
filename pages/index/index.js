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
    navItems:[
      {
        name:'全部美食',
        url:'dishes'
      },
      {
        name:'晒资最高',
        url:'take',
        isSplot:true
      },
      {
        name:'全部区域',
        url:'out'
      }
    ]
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
           list:res.data
         })
      },
      fail (err) {
        console.log(err);
      }

    })
    this.index = 1
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    
  }
})
