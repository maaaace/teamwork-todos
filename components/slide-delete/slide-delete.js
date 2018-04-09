// components/slide-delete/slide-delete.js
// 限制超出长度的滑动
// 优化下拉动作
// 右滑动作
// 
const winW = wx.getSystemInfoSync().screenWidth; // 屏幕宽度
const ratio = 750 / winW //px && rpx 单位转换 (乘于 这个属性是 px 转换成 rpx)

Component({
  // 组件外的样式
  externalClasses: ['del-class', 'edit-class'],

  // 组件的属性列表
  properties: {
    // 是否显示喜欢按钮
    edit: {           // 属性名
      type: Boolean,  // 类型（必填）,String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false  // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  // 组件的初始数据
  data: {
    offset: 0, // 内容区域滑动的位移
    start: 0,  // 手指触屏的开始位置
    move: 0,   // 手指移动的位置
    btnWidth: 140,  // 按钮的宽度 
    lock: false,   // 限制模块右滑
    now: 0         //为标记滑动位置设置的变量
  },

  // 组件的方法列表
  methods: {
    // 手指开始滑动
    handstart(e) {
      console.log('touch start', e.timeStamp);
      let { tapTime } = this.data;
      //判断只有一个触摸点
      if (e.touches.length === 1) {
        if (tapTime && e.timeStamp - tapTime < 300) {
          console.log('dbclick');
          this.edit();
          this.setData({
            tapTime: 0
          })
        } else {
          this.setData({
            start: e.touches[0].clientX,
            tapTime: e.timeStamp
          })
        }
      }
    },
    // 手指滑动过程
    handmove(e) {      
      let { offset, start, btnWidth, lock}  = this.data;
      let move = this.data.move = e.touches[0].clientX;
      //滑动距离太短不予理会
      if (Math.abs(move - start) < 50) return;
      this.setData({
        start: start,
        move: move,
        offset: move - start < 0 ? (move - start) * ratio - btnWidth : 0
      })
      
    },
    // 手指结束滑动，然后抬起
    handend(e) {
      
      let {btnWidth, move, start} = this.data;
      // console.log(that.data.offset)
      if (this.data.offset < 0) {
        if (this.properties.edit) {
          btnWidth = 280
        }
        this.setData({
          btnWidth: btnWidth,
          offset: -btnWidth
        })
      } else {
        //右滑
        if(move-start > 50){
          console.log('右滑');
        }
        this.setData({
          offset: 0
        })
      }
    },
    //双击
    edit(){
      this.triggerEvent('edit');
      this.setData({              //为了让模块内容部分滑动到原点
        offset: 0
      })
    },

    // 删除
    _del() {
      this.triggerEvent('delete') //触发删除回调
      this.setData({              //为了让模块内容部分滑动到原点
        offset: 0
      })
    },

    // 编辑
    _edit() {
      this.triggerEvent('edit') //触发删除回调
      this.setData({              //为了让模块内容部分滑动到原点
        offset: 0
      })
    },
  }
})
