
$(function () {
  var   pageSize=3
   var  page=1
   var cp
 render()
    //发送ajax获取数据
    function render() {
        $.ajax({
            url:'/user/queryUser',
            dataType:'json',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (info) {
                console.log(info);
                //拼接模板
                var htmlStr=template('tmp',info)
                $('tbody').html(htmlStr)
//制作分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,pages){
                        console.log(pages);
                        page=pages;
                        render()



                    }
                })

            }

        })

    }
    //模态框
    //给父元素注册事件委托
    $('tbody').on('click','.btn',function () {
        $('#userModal').modal('show')
        var id=$(this).parent().data('id')
        var  isDelete=$(this).data('id')
        // alert(11)
        $('#uerBtn').on('click',function () {


            console.log(isDelete);
            $.ajax({
                url:'/user/updateUser',
                type: "post",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function (info) {
                    if("info.success"){
                        render()
                    }
                    $('#userModal').modal('hide')
                }
            })


        })
        })




})


