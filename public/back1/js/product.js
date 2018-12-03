$(function () {
//渲染分页
    var page=1
    var pageSize=3
    render()
    function render() {
        $.ajax({
            url:'/product/queryProductDetailList',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function (info) {
                console.log(info);
            //    渲染数据
                var htmlStr=template('tmp',info)
                    $('tbody').html(htmlStr)
            //    制作分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,pages){
                        //为按钮绑定点击事件 page:当前点击的按钮值


                        page=pages
                        render()
                    }
                });

            }
        })

    }
//设置模态框
    $('#addBtn').on('click',function () {
        // alert(121)
        $("#productModal").modal('show')

    //渲染分类
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            dataType:'json',
            type:'get',
            data:{
                page:1,
                pageSize:10000
            },
            success:function (info) {
                console.log(info);
                var htmlStr=template('tmp2',info)
        $('#str2').html(htmlStr)




            }
        })
    //    表单验证
        $('#form').bootstrapValidator({
            excluded:[],
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields:{
                brandId:{
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请选择二级分类'
                        },

                    }},
                    proName:{
                        validators: {
                            //不能为空
                            notEmpty: {
                                message: '请输入商品名称'
                            },

                        }},
                proDesc:{
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请输入商品描述'
                        },

                    }},
                num:{
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请输入商品库存'
                        },

                    }},
                size:{
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请输入商品尺码'
                        },

                    }},
                oldPrice:{
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请输入商品原价'
                        },

                    }},
                price:{
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请输入商品现价'
                        },

                    }},
                pic1:{
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请上传3张图片'
                        },

                    }},







            }



        })





    })



})