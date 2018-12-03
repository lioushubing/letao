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
                        regexp: {
                            regexp: /^[1-9]\d*$/,
                            message: '商品库存格式, 必须是非零开头的数字'
                        }

                    }},
                size:{
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请输入商品尺码'
                        },
                        regexp: {
                            regexp: /^\d{2}-\d{2}$/,
                            message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
                        }
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
                picStatus:{
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请上传3张图片'
                        },

                    }},







            }



        })





    })
//a注册点击事件
    $('#str2').on('click','a',function () {
        // alert('hahaha')
     var  text=$(this).text()
     $('#dropdownText').text(text)
        var id=$(this).data('id')
        console.log(id);
     $('#brandId').val(id)
        $("#form").data('bootstrapValidator').updateStatus('brandId','VALID')


    })


var picArr=[]
//文件上传插件
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data.result);
            var picObj=data.result;
            picArr.unshift(picObj)
            var url=picObj.picAddr

            $('#boxImg').prepend(' <img src="'+url+'" style="width: 100px" >')
        //    判断个数
            if(picArr.length>3){
                picArr.pop()
                $('#boxImg img:last-of-type').remove()
            }

            if (picArr.length===3) {

                $("#form").data('bootstrapValidator').updateStatus('picStatus','VALID')
            }
        }
    });



//表单上传成功事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
     var productStr=$("#form").serialize()
        productStr=decodeURIComponent(productStr)
        // console.log(productStr);
        productStr+='&picName1='+picArr[0].picName+'&picAddr1='+picArr[0].picAddr
        productStr+='&picName2='+picArr[1].picName+'&picAddr2='+picArr[1].picAddr
        productStr+='&picName3='+picArr[2].picName+'&picAddr3='+picArr[2].picAddr
        console.log(productStr);

     $.ajax({
         url:'/product/addProduct',
         type:'post',
         data:productStr,
         dataType:'json',
         success:function (info) {
             // console.log(info);

             if (info.success){

                 $("#form").data('bootstrapValidator').resetForm(true)
                 $("#productModal").modal('hide')
                 $('#dropdownText').text('选择二级分类')
                 $('#boxImg img').remove();
                 page=1
                 render()
                 picArr=[]

             }
         }



     })


    });




})