<template>
  <div class="login-container">
    <!--    <div class="login-header">-->
    <!--      <div class="login-header-logo">-->
    <!--&lt;!&ndash;        <img src="@/assets/logo/logo.png" alt=""/>&ndash;&gt;-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="login-content">
      <div class="login-content-mask blur"></div>
      <!--      <div class="login-content-bgcolor"></div>-->
      <div class="login-content-dialog">

        <!--        <div class="login-content-dialog-title">{{title}}</div>-->
        <div class="login-content-dialog-form">
          <el-form class="login-form" :model="loginForm" :rules="loginRules">
            <div class="title-container">
              <p class="title">欢迎登录</p>
            </div>
            <el-form-item prop="account">
<!--            <span class="svg-container">-->
<!--              <svg-icon icon-class="user"/>-->
<!--              <i class="el-icon-user-solid"></i>-->
<!--            </span>-->
              <el-input
                class="login-account"
                ref="account"
                v-model="loginForm.account"
                placeholder="帐号"
                name="account"
                type="text"
                tabindex="1"
                auto-complete="on"
              />

            </el-form-item>

            <el-form-item prop="password">
<!--              <span class="svg-container">-->
<!--                <i class="el-icon-lock"></i>-->
<!--              </span>-->
              <el-input
                ref="password"
                v-model="loginForm.password"
                placeholder="密码"
                name="password"
                type="password"
                tabindex="2"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item class="checked">
              <el-checkbox>记住登录状态</el-checkbox>
            </el-form-item>
            <el-button class="button" type="primary" @click.native.prevent="handleLogin">登&nbsp;录
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                message:[],
                loginForm: {
                    account: '',
                    password: ''
                },
                loginRules: {
                    account: [{ required: true, trigger: 'blur', message: '请输入帐户名称' }],
                    password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
                }
            };
        },
        methods: {
            handleLogin() {
                console.log(this.loginForm.account);
                console.log(this.loginForm.password);

                this.axios({
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    method:'POST',
                    url:'http://localhost:8080/login.do',
                    // url:'http://localhost:8080/login.do?username='+this.loginForm.account+'&password='+this.loginForm.password,
                    data:JSON.stringify({username:this.loginForm.account,password:this.loginForm.password})
                    // data:{username:this.loginForm.account,password:this.loginForm.password}
                }).then(res =>{
                    console.log(res.data)
                    if(res.data[0]){
                        if(res.data.length==0){
                            console.log("空了")
                        }else if(res.data.length==1){
                            console.log("请求成功")
                            this.$store.commit("setUsername",res.data[0].username)
                            this.$router.push('/main')
                        }else{
                            console.log("帐号太多了")
                        }
                    }else{
                        console.log("没了没了")
                    }
                }).catch(()=>{
                    console.log(error)
                    console.log("请求失败了")
                })
            }
        }
    }
</script>

<!--<style lang="scss" scoped>-->
<style scoped>

  .login-container {
    min-height: 100%;
    width: 100%;
    background-size: cover;
    /*overflow: hidden;*/
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .login-content {
    flex: 1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    background: #fff;
    /*linear-gradient(#2F6498, #accee5, #FFFFFF); !* 标准语法 *!*/
    position: relative;
  }

  .login-content-mask {
    width: 100%;
    /*height: 100%;*/
    height: 700px;
    position: absolute;
    background-image: url("../../assets/login_images/bg_image.png");
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
  }

  .login-form {
    width: 520px;
    height: auto;
    margin: 5% 5% 0px  auto;
    /*padding: 35px 30px;*/
    padding: 35px 5%;
    border-radius: 6px;
    background: #fff;
    box-shadow: 1px 1px 4px #767676;
    position: relative;
    z-index: 3;
    box-sizing: border-box;
    overflow: hidden;
  }

  .title-container{
    text-align: center;
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;
    /*background: url("../../icons/svg/user.svg") no-repeat;*/
    /*background-size: 30px 30px;*/
    /*background-position: 38% 13px;*/
  }

  /*.svg-container {*/
  /*  padding: 6px 5px 6px 15px;*/
  /*  !*color: $dark_gray;*!*/
  /*  color: gray;*/
  /*  vertical-align: middle;*/
  /*  width: 30px;*/
  /*  display: inline-block;*/
  /*}*/

  /*.checked {*/
  /*  background: transparent;*/
  /*  border: none;*/
  /*  padding-left: 2px;*/
  /*}*/

  .button {
    width: 100%;
    height: 40px;
    margin: 10px 0;
    /*background: $checked-color;*/
    border: none;
    font-size: 20px;
  }

</style>
