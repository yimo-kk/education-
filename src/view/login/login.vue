<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="手机验证码登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">教育商家管理后台</p>
        </div>
      </Card>
    </div>
    <div class="bottom-copyright">深圳市聚美通道互联网科技有限公司</div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit ({ phone, code }) {
      this.$Spin.show({
        render: (h) => {
          return h('div', [
            h('Icon', {
              'class': 'demo-spin-icon-load',
              props: {
                type: 'ios-loading',
                size: 18
              }
            }),
            h('div', 'Loading')
          ])
        }
      })
      if (code === null || code === '') {
        this.$Spin.hide()
        this.$Message.error('验证码不能为空')
        return
      }
      if (code.length !== 6) {
        this.$Spin.hide()
        this.$Message.error('验证码不正确')
        return
      }
      this.handleLogin({ phone, code }).then(res => {
        this.$Spin.hide()
        this.$router.push({
          name: this.$config.homeName
        })
      }).catch(err => {
        this.$Spin.hide()
        this.$Message.error(err.message)
      })
    }
  }
}
</script>

<style>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  .login .login-con{
    box-shadow: -2px 10px 20px #151719;
  }
  .login .ivu-btn-primary{
   background-color:#e45089 ;
    border-color: #e45089;
  }
  .login .ivu-input:focus{
    border-color: #e45089;
    box-shadow: 0 0 0 2px rgba(220, 80, 137, 0.2);
  }
  .login .ivu-input:hover{
    border-color: #e45089;
  }
  .login .ivu-input{
    height: 45px;
    font-size: 16px;
  }
  .login .ivu-card-body{
    padding: 30px;
  }
  .login .ivu-btn{
    padding: 11px 15px 9px;
    font-size: 16px;
  }
  .login .ivu-btn:hover{
    border-color: #e45089;
    color: #e45089;
  }
  .login .ivu-btn-primary:hover{
    background-color:#e45089 ;
    border-color: #e45089;
    color: #fff;
  }

  .login .ivu-card-head p span{
    font-size: 16px;
  }
  .login .ivu-form-item-error-tip{
    font-size: 14px;
  }
  .login .ivu-form-item-content{
    line-height: 45px;
  }
  .login .bottom-copyright{
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    bottom: 10px;
    font-size: 24px;
    color:#999
  }
</style>
