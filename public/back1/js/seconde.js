$(function () {
    //发送ajx渲染页面
     //声明要的页面和每页的条数
    var page=1
    var pageSize=3

    render()
    function render() {
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            dataType:'json',
            data:{
                page:page,
                pageSize:pageSize
            },
            type:'get',
            success:function (info) {
                console.log(info);
                var htmlStr=template('tmp',info)
                $('tbody').html(htmlStr)

            //    设置分页
           /*$("#paginator").bootstrapPaginator({
  bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
  currentPage:1,//当前页
  totalPages:10,//总页数
  size:"small",//设置控件的大小，mini, small, normal,large
  onPageClicked:function(event, originalEvent, type,page){
    //为按钮绑定点击事件 page:当前点击的按钮值
  }
});
           * */
           $('#paginator').bootstrapPaginator({
               bootstrapMajorVersion:3,
               currentPage:info.page,
               totalPages:Math.ceil(info.total/info.size),
               onPageClicked:function (a,b,c,pages) {
                   console.log(pages);
                   page=pages
                   render()
               }

                })


            //


            }
        })
    }

    // 设置模态框
                $('#secondeBut').on('click',function () {
                    // alert(11)
                    $('#myModal').modal('show')
                //    发送ajax获得数据
                    $.ajax({
                        url:'/category/queryTopCategoryPaging',
                        type:'get',
                        dataType: 'json',
                        data:{
                            page:1,
                            pageSize:1000,
                        },
                        success:function (info) {
                            // console.log(info);
                            var htmlStr=template('tmp2',info)
                            // console.log(htmlStr);
                            $('#str1').html(htmlStr)

                        }
                    })





                })
    //设置添加事件
    $('#form').bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    //    设置校验字段
        fields:{
            categoryId:{
                validators:{
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }

            },
            brandName:{
                validators:{
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }

            },
            brandLogo:{
                validators:{
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }

            },





        }



    })
//    设置一级分类点击事件
    $('.dropdown-menu ').on('click','a',function () {
       var id=$(this).data('id')
        // console.log(id);
        $('#categoryId').attr('value',id)
        var t=$(this).text()
       $('#dropdownText').text(t)

        $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID')
    })

//设置文件上传事件并更新状态
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            // console.log(data);
            var a=data.result
            ul=a.picAddr
            console.log(ul);

            $('.form-group img').attr('src',ul)
            $('#logo').attr('value',ul)
            $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID')

        }

    });

//    最后发送ajax重新渲染

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url:'/category/addSecondCategory',
            data:$("#form").serialize(),
            dataType:'json',
            type:'post',
            success:function (info) {
                console.log(info);

                if(info.success){
                    // $('#myModal').modal('hied')
                    $('#myModal').modal("hide");
                    $("#form").data('bootstrapValidator').resetForm(true)
                    $('.form-group img').attr('src','./images/none.png')
                    page=1
                    render()
                    $('#dropdownText').text('选择一级分类')



                }


            }


        })
        // console.log($("#form").serialize());
    });


})