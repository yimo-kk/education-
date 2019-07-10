<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="phone">
      <Input v-model="form.phone" placeholder="请输入手机号码" clearable>
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>

    <Row :gutter="10">
      <Col span="15">
      <div>
        <FormItem prop="code">
          <Input v-model="form.code" placeholder="请输入收到的验证码">
          <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
          </Input>
        </FormItem>
      </div>
      </Col>
      <Col span="8">
        <div><Button @click="getValidate">{{validateName}}</Button></div>
      </Col>
    </Row>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { sendValidCode } from '@/api/data'
let countDown = 60
export default {
  name: 'LoginForm',
  props: {
    phoneRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    },
    codeRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      validateName: '获取验证码',
      form: {
        phone: '',
        code: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        phone: this.phoneRules,
        code: this.codeRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            phone: this.form.phone,
            code: this.form.code
          })
        }
      })
    },
    setTimeDown () {
      if (countDown === 0) {
        this.validateDisabled = false
        this.validateName = '重新获取'
        countDown = 60
        return
      } else {
        this.validateDisabled = true
        this.validateName = countDown + 's'
        countDown--
      }
      const _self = this
      this.timer = setTimeout(() => {
        _self.setTimeDown()
      }, 1000)
    },
    getValidate () {
      if (this.validateDisabled) {
        return
      }
      if (this.form.phone === null || this.form.phone === '') {
        const _self = this
        _self.$Message.error('手机号不能为空')
        return
      }
      if (countDown >= 60) {
        const _self = this
        sendValidCode(this.form.phone).then(data => {
          _self.$Message.success('发送验证码成功')
        }).catch(error => {
          _self.$Message.error(error.message)
        })
      }
      this.setTimeDown()
    }
  }
}
</script>
