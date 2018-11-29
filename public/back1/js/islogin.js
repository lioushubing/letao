//一进该网页,就验证是否登录
$.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    dataType:'json',
    success:function (info) {
        if(info.error==400){
            location.href='login.html'

        }
    }
})