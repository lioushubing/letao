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