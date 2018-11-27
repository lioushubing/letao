/**
 * Created by 54721 on 2018/11/27.
 */
// 一进页面, 发送请求, 查询当前用户是否登录, 如果没登陆, 拦截到登录页
$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  dataType: "json",
  success: function( info ) {
    console.log( info );
    if ( info.error === 400 ) {
      // 未登录, 拦截到登录页
      location.href = "login.html";
    }

    if ( info.success ) {
      console.log("当前用户已登录");
    }
  }
})
