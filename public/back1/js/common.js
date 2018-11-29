// //进度条
// NProgress.start()
//
// setTimeout(NProgress.done(),5000)
$(document).ajaxStart(function () {
    NProgress.start()
})
$(document).ajaxStop(function () {
    NProgress.done()
})
//注册分类滑动事件
$('.category').on('click',function () {
    $('.aside .nav div').stop().slideToggle()
})
//鼠标点击添加ac类
$('.icon_left').on('click',function () {
    $('.aside').toggleClass('move')
    $('.main').toggleClass('move')
    $('.main .topbar').toggleClass('move')

})
//设置退出功能
$('.icon_right').on('click',function () {
    // alert(11)
    $('#myModal').modal('show')
})
//
$('#outBtn').on('click',function () {
$.ajax({
    url:'/employee/employeeLogout',
    type:'get',
    dataType:'json',
    success:function (info) {
        console.log(info);
        if(info.success){
            location.href='login.html'
        }

    }
})



})