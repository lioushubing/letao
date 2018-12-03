$(function () {
    //设置sjax函数

    var page=1;
    var pageSize=3;
    render()
    function render() {
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function (info) {
                console.log(info);
                var htmlStr=template('tmp',info)
                $('tbody').html(htmlStr)
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function (a,b,c,pages) {
                        console.log(pages);
                        page=pages
                        render()

                    }

                    // bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    // currentPage:1,//当前页
                    // totalPages:10,//总页数
                    // size:"small",//设置控件的大小，mini, small, normal,large
                    // onPageClicked:function(event, originalEvent, type,page){
                    //     //为按钮绑定点击事件 page:当前点击的按钮值
                })




            }

        })
    }
   //设置
    $('.btn').on('click',function () {
        $('#fistModal').modal('show')


    })
     // 验证表单
    $('#form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh',
        },
        fields:{
            categoryName:{
                validators:{
                   notEmpty:{
                       message:'请输入一级分类名称'
                   }

                }

            }
        }




    })
    //注册表单成功事件
    $('#form').on('success.form.bv',function (e) {
        e.preventDefault();
        $.ajax({
            url: '/category/addTopCategory',
            type: "post",
            dataType: 'json',
            data: $('#form').serialize()
            ,
            success:function (info) {
                console.log(info);

                if(info.success){
                    page=1
                    render()

                    $("#form").data('bootstrapValidator').resetForm(true)
                    $('#fistModal').modal('hide')
                }
            }

        })

    })



})