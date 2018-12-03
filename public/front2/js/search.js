/**
 * Created by 54721 on 2018/12/2.
 */

$(function() {
  // 由于所有的功能都是对于本地存储的操作, 可以约定一个键名: search_list

  /*
    下面三句话, 用于在控制台执行, 添加假数据
    var arr = ["张三", "李四", "王五", "赵六" ];
    var jsonStr = JSON.stringify( arr );
    localStorage.setItem( 'search_list', jsonStr );
  */


  // 功能分析
  // 1. 获取所有搜索历史, 完成渲染
  // 2. 删除单个搜索历史
  // 3. 清空所有搜索历史
  // 4. 添加单个搜索历史


  /*
  * 功能1: 渲染功能
  * (1) 获取本地历史, 得到jsonStr
  * (2) 将jsonStr转成数组
  * (3) 根据模板引擎渲染  template( id, 对象 )
  * */
  render();


  // 获取本地历史的数组
  function getHistory() {
    var jsonStr = localStorage.getItem("search_list") || '[]';  // 得到 jsonStr
    var arr = JSON.parse( jsonStr ); // 转成数组
    return arr;
  }

  // 获取本地历史的数组, 并且根据数组进行渲染
  function render() {
    var arr = getHistory();
    // 利用模板引擎渲染
    var htmlStr = template( 'historyTpl', { list: arr } );
    $('.lt_history').html( htmlStr );
  }



  /*
  * 功能2: 清空所有
  * (1) 给清空所有添加点击事件 (事件委托)
  * (2) 利用removeItem 清除 search_list
  * (3) 重新渲染
  * */
  $('.lt_history').on("click", '.btn_empty', function() {


    // 添加确认框
    // 参数1: 确认框的内容
    // 参数2: 确认框的标题
    // 参数3: 按钮的文本数组
    // 参数4: 关闭模态框的回调函数
    mui.confirm("你确定要清空历史记录吗?", "文星提示", ["取消", "确认"], function( e ) {
      //  e.index 就是点击的按钮的下标
      if ( e.index === 1 ) {
        // 点击确认
        // 清空历史记录
        localStorage.removeItem( "search_list" );
        // 重新渲染
        render();
      }
    })

  });


  /*
  * 功能3: 删除单个记录
  * (1) 给所有的删除按钮添加点击事件 (事件委托)
  * (2) 获取数组, 根据下标, 将数组对应项删除
  * (3) 将数组转成 jsonStr, 存储到本地
  * (4) 重新渲染
  * */
  $('.lt_history').on("click", ".btn_delete", function() {

    // 得到数组
    var arr = getHistory();

    // 获取下标
    var index = $(this).data("index");

    // 根据下标, 删除数组对应项
    // arr.splice( 从哪开始, 删几个, 替换项1, 替换项2, ... );
    // 在任意位置,  删除   替换   添加  任意项
    arr.splice( index, 1 );

    // 转成 jsonStr, 存储到本地
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

    // 重新渲染
    render();
  });



  /*
  * 功能4: 添加单个历史记录
  * (1) 给搜索按钮, 添加点击事件
  * (2) 获取搜索关键字
  * (3) 获取数组, 往数组最前面追加  unshift
  * (4) 转成 jsonStr, 存储到本地存储中
  * (5) 重新渲染
  * */
  $('.search_btn').click(function() {
    // 获取搜索关键字
    var key = $('.search_input').val().trim();

    if ( key === "" ) {
      // 提示搜索关键字不能为空
      //mui.toast("请输入搜索关键字", {
      //  duration: 4000
      //});
      mui.toast("请输入搜索关键字");
      return;
    }

    // 获取数组
    var arr = getHistory();

    // (1) 如果有重复项, 先将重复项删除
    var index = arr.indexOf( key );
    if ( index !== -1 ) {
      // 有重复项, 根据 index 删除对应项
      arr.splice( index, 1 )
    }

    // (2) 如果长度超过 10个, 保留最前面的, 删除最后一个
    if ( arr.length >= 10 ) {
      arr.pop();
    }

    // 往数组最前面追加
    arr.unshift( key );

    // 转成 jsonStr, 存储到本地
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

    // 重新渲染
    render();

    // 重置搜索框
    $('.search_input').val("");

    // 跳转页面, 跳转到搜索列表页, 且将搜索关键字传递过去
    location.href = "searchList.html?key=" + key;
  })

})
