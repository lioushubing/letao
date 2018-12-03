/**
 * Created by 54721 on 2018/12/2.
 */
$(function() {


  // 一进入页面, 发送 ajax, 动态渲染左侧一级列表
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function( info ) {
      console.log( info )
      var htmlStr = template( "leftTpl", info );
      $('.lt_category_left ul').html( htmlStr );

      // 取得第一个一级分类的 id, 完成所对应二级分类的数据渲染
      renderById( info.rows[0].id );
    }
  });

  // 给左侧的所有的 a 添加点击事件 (事件委托)
  $('.lt_category_left ul').on("click", "a", function() {

    // 让自己高亮, 同时排他
    $('.lt_category_left ul a').removeClass("current");
    $(this).addClass("current");

    // 获取 id, 渲染二级分类数据
    var id = $(this).data("id");
    renderById( id );
  })



  // 根据一级分类的id 渲染二级分类数据
  function renderById( id ) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("rightTpl", info);
        $('.lt_category_right ul').html( htmlStr );
      }
    })
  }

})
