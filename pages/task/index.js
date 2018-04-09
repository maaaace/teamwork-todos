Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.params){
      this.setData({
        form : JSON.parse(options.params)
      })
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  submitForm(e) {
    const params = e.detail.value;
    let tmp = wx.getStorageSync('todo_list');
    if(this.data.form && !tmp){
      wx.showModal({
        title: '有问题',
        content: '这是写死的数据不能改啊',
        success : function(){
          wx.navigateBack({
          })
        }
      });
    }else if(tmp && tmp.length){
      tmp = tmp.filter(t => (t.id !== params.id));
      tmp = [...tmp, params];
      wx.setStorageSync('todo_list', tmp);
      wx.switchTab({
        url: '../index/index',
      })
    }else{
      params.id = parseInt(Math.random() * 100000000) + '';
      tmp = [...tmp, params];
      wx.setStorageSync('todo_list', tmp);
      wx.switchTab({
        url: '../index/index',
      })
    }
    
  },
})