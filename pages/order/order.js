var app = getApp();
var mockData = require('../mock/order.js')
Page({
  data: {
    goodsList: [],
    good:[]
  },
  onLoad (id) {
    let that = this;
    const obj = {};
    var arr = [];
    for (var i in mockData) {
        let key = i.slice(4);
      obj[key] = mockData[i];

      arr.push(mockData[i]);
    }
    console.log(arr);
    that.setData({
      goodsList:obj,
      good: arr
    })
    //var shopId = options.id;
    // wx.request({
    //   url: 'http://m.w-share.cn/menu.php/id=6',
    //   //url:'http://http://server.w-share.cn/WebsiteServlet?action=getShopPageByParam_ajax&page=0&wherestr=&city=5YyX5Lqs&orderby=s.amount+desc&longitude=200&latitude=200&nearby=&keyword=',
    //   //url:'../mock/news.json',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success (res) {
    //     that.setData({
    //       goodsList:mockData
    //     })
    //   },
    //   fail (err) {
    //     console.log(err);
    //   }
    // })
  },
  onShow: function () {
    this.setData({
      classifySeleted: this.data.good[0][0].category.slice(4)
    });
    console.log(this.data.good[0]);
  },
//   tapAddCart: function (e) {
//     this.addCart(e.target.dataset.id);
//   },
//   tapReduceCart: function (e) {
//     this.reduceCart(e.target.dataset.id);
//   },
//   addCart: function (id) {
//     var num = this.data.cart.list[id] || 0;
//     this.data.cart.list[id] = num + 1;
//     this.countCart();
//   },
//   reduceCart: function (id) {
//     var num = this.data.cart.list[id] || 0;
//     if (num <= 1) {
//       delete this.data.cart.list[id];
//     } else {
//       this.data.cart.list[id] = num - 1;
//     }
//     this.countCart();
//   },
//   countCart: function () {
//     var count = 0,
//       total = 0;
//     for (var id in this.data.cart.list) {
//       var goods = this.data.goods[id];
//       count += this.data.cart.list[id];
//       total += goods.price * this.data.cart.list[id];
//     }
//     this.data.cart.count = count;
//     this.data.cart.total = total;
//     this.setData({
//       cart: this.data.cart
//     });
//   },
//   follow: function () {
//     this.setData({
//       followed: !this.data.followed
//     });
//   },
//   onGoodsScroll: function (e) {
//     if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
//       this.setData({
//         scrollDown: true
//       });
//     } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
//       this.setData({
//         scrollDown: false
//       });
//     }
//
//     var scale = e.detail.scrollWidth / 570,
//       scrollTop = e.detail.scrollTop / scale,
//       h = 0,
//       classifySeleted,
//       len = this.data.goodsList.length;
//     this.data.goodsList.forEach(function (classify, i) {
//       var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
//       if (scrollTop >= h - 100 / scale) {
//         classifySeleted = classify.id;
//       }
//       h += _h;
//     });
//     this.setData({
//       classifySeleted: classifySeleted
//     });
//   },
//   tapClassify: function (e) {
//     var id = e.target.dataset.id;
//     this.setData({
//       classifyViewed: id
//     });
//     var self = this;
//     setTimeout(function () {
//       self.setData({
//         classifySeleted: id
//       });
//     }, 100);
//   },
//   showCartDetail: function () {
//     this.setData({
//       showCartDetail: !this.data.showCartDetail
//     });
//   },
//   hideCartDetail: function () {
//     this.setData({
//       showCartDetail: false
//     });
//   },
//   submit: function (e) {
//     server.sendTemplate(e.detail.formId, null, function (res) {
//       if (res.data.errorcode == 0) {
//         wx.showModal({
//           showCancel: false,
//           title: '恭喜',
//           content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
//           success: function(res) {
//             if (res.confirm) {
//               wx.navigateBack();
//             }
//           }
//         })
//       }
//     }, function (res) {
//       console.log(res)
//     });
//   }
 });

