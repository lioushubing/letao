/**
 * Created by 54721 on 2018/11/30.
 */
$(function() {
  var currentPage = 1;  // 当前页
  var pageSize = 5;   // 每页条数

  var picArr = []; // 专门用于存储所有用于提交的图片对象

  // 1. 一进入页面, 发送ajax请求, 渲染商品列表
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "productTpl", info );
        $('tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, // 版本号
          currentPage: info.page, // 当前页
          totalPages: Math.ceil( info.total / info.size ), // 总页数
          // 页码点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }



  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");

    // 发送ajax请求, 请求所有的二级分类列表
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("dropdownTpl", info);
        $('.dropdown-menu').html( htmlStr );
      }
    })
  });


  // 3. 给下拉列表的 a 添加点击事件 (事件委托注册)
  $('.dropdown-menu').on("click", "a", function() {
    // 获取文本, 赋值给按钮
    var txt = $(this).text();
    $('#dropdownText').text( txt );

    // 获取id, 赋值给隐藏域
    var id = $(this).data("id");
    $('[name="brandId"]').val( id );

    // 将隐藏域的校验状态, 更新成 VALID
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });


  // 4. 配置文件上传插件
  $('#fileupload').fileupload({
    // 返回回来的数据类型
    dataType: "json",
    // 文件上传完成的回调函数
    done: function( e, data ) {
      console.log( data.result ); // 后台返回的结果
      var picObj = data.result;

      // 将上传的图片对象(图片地址和名称) 添加到数组最前面
      picArr.unshift( picObj );

      var picUrl = picObj.picAddr; // 图片地址
      // 将每次上传完成的图片, 显示在结构最前面

      $('#imgBox').prepend( '<img src="'+ picUrl +'" style="width: 100px;">' );


      // 如果长度超过 3, 需要将最后一个移除
      if ( picArr.length > 3 ) {
        picArr.pop();  // 删除数组最后一项
        // 从结构上, 删除最后一张图片
        // $('#imgBox img:last-of-type')   找最后一个图片类型的子元素  (只关注类型)
        $('#imgBox img:last-of-type').remove();   // 让他自杀
      }

      // 如果文件上传满了 3张, 当前picStatus的校验状态, 更新成 VALID
      if ( picArr.length === 3 ) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });



  // 5. 添加表单校验
  $('#form').bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          // \d  0-9
          // ?   0次或1次
          // +   1次或多次
          // *   0次或多次
          // {n,m}  出现n次到m次
          // {n}  出现n次
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });


  // 6. 注册一个表单校验成功事件, 阻止默认的提交, 通过ajax提交
  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();

    var paramsStr = $('#form').serialize();  // 表单元素中的所有数据

    // 还需要拼接上图片数据
    // key=value&key1=value1&key2=value2;

    // 多个参数之间, 通过 & 分隔, 每个键值对, 通过 = 分开
    // paramsStr += "&picName1=xx&picAddr1=xx";
    paramsStr += "&picName1="+ picArr[0].picName +"&picAddr1=" + picArr[0].picAddr;
    paramsStr += "&picName2="+ picArr[1].picName +"&picAddr2=" + picArr[1].picAddr;
    paramsStr += "&picName3="+ picArr[2].picName +"&picAddr3=" + picArr[2].picAddr;

    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: paramsStr,
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 关闭模态框
          $('#addModal').modal("hide");
          // 重新渲染第一页
          currentPage = 1;
          render();
          // 重置内容和状态
          $('#form').data("bootstrapValidator").resetForm(true);

          // 按钮文本和图片需要手动重置
          $('#dropdownText').text("请选择二级分类");
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })
  })


})
