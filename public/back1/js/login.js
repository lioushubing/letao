$(function () {
$('#form').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
        username:{
            validators:{
                notEmpty:{
                    message:'用户名不能为空'

                },
                stringLength:{
                    min:2,
                    max:6,
                    message:'用户名长度必须在2到6之间'
                },
                callback:{
                    message:'用户名不存在',
                }



            }


        },
        password:{
            validators:{
                notEmpty:{
                    message:'用户名不能为空'

                },
                stringLength:{
                    min:6,
                    max:12,
                    message:'密码长度必须在6到12之间'
                },
                callback: {
                    message:'密码错误'
                }




            }

        }

    }

})


    //注册重置事件
    $("[type=reset]").on('click',function () {
        $('#form').data('bootstrapValidator').resetForm()
    })

    //验证表单成功事件
    //阻止input表单的末日行为,发送ajax请求
   $('#form').on('success.form.bv',function (e) {
       e.preventDefault()
      $.ajax({
          url:'/employee/employeeLogin',
          type:'post',
          dataType:'json',
          data:$('#form').serialize(),
           success:function (info) {
               // console.log(info);
               if(info.success){
               location.href='index.html'
               }
              if(info.error==1001){
                  console.log('密码错误');
                  $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')

                  return;
              }
              if(info.error==1000){
                  console.log('用户错误');
                  $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')

                  return;

              }
           }


      })


       // alert(11)
   })

})