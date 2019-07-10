<template>
  <div class="add_c">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Row>
      <Col span="12">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
        <FormItem label="优惠券名称" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入优惠券名称"></Input>
        </FormItem>
        <FormItem label="模式">
          <RadioGroup v-model="selectPattern"  @on-change="patternShow">
            <Radio label="时间段"></Radio>
            <Radio label="天数"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="开始时间" prop="startDate" v-show="isShow">
          <DatePicker type="date" :options="startTimeOptions" @on-change="startTimeChange" placeholder="开始时间" v-model="formValidate.startDate"></DatePicker>
        </FormItem>
        <FormItem label="结束时间" prop="endDate" v-show="isShow">
          <DatePicker type="date" :options="endTimeOptions" @on-change="endTimeChange" placeholder="结束时间" v-model="formValidate.endDate"></DatePicker>
        </FormItem>
        <FormItem label="有效天数" prop="days" v-show="!isShow">
          <Input v-model="formValidate.days" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="满" prop="fullMoney">
          <Input v-model="formValidate.fullMoney" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="减" prop="subtractMoney">
          <Input v-model="formValidate.subtractMoney" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="领取数量" prop="quantity">
          <Input v-model="formValidate.quantity" placeholder="请输入领取数量"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="save('formValidate')">保存</Button>
        </FormItem>
      </Form>
      </Col>
      <Col span="6">
      </Col>
    </Row>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { addStoreCoupon } from '@/api/coupon'
export default {
  name: 'couponAdd',
  data () {
    return {
      selectPattern: '时间段',
      spinShow: false,
      isShow: true,
      startTimeOptions: {}, // 开始日期设置
      endTimeOptions: {}, // 结束日期设置
      formValidate: {
        title: '',
        fullMoney: '',
        subtractMoney: '',
        quantity: '',
        startDate: '',
        endDate: '',
        days: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '优惠券名称不能为空', trigger: 'blur' }
        ],
        fullMoney: [
          { required: true, message: '满减金额不能为空', trigger: 'blur' }
        ],
        subtractMoney: [
          { required: true, message: '满减金额不能为空', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '领取数量不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'couponAdd'
      })
    },
    save (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.selectPattern === '时间段' && (this.formValidate.startDate === '' || this.formValidate.endDate === '')) {
            this.$Message.error('请先填写优惠券设置时间段')
            return
          }
          if (this.selectPattern !== '时间段' && this.formValidate.days === '') {
            this.$Message.error('请先填写优惠券设置天数')
            return
          }
          if (this.formValidate.startDate === '' && this.formValidate.endDate === '' && this.formValidate.days === '') {
            this.$Message.error('请先填写优惠券设置时间')
            return
          }
          this.spinShow = true
          addStoreCoupon(this.formValidate).then((res) => {
            this.spinShow = false
            this.$Message.success('新增优惠券成功!')
            this.handleCloseTag()
          }).catch((e) => {
            this.spinShow = true
            this.$Message.error(e.message)
          })
        } else {
          this.$Message.error('请先确认所有必填项都已填写')
        }
      })
    },
    // 时间组件
    startTimeChange: function (e) { // 设置开始时间
      this.formValidate.startDate = e
      this.endTimeOptions = {
        disabledDate: date => {
          let startTime = this.formValidate.startDate ? new Date(this.formValidate.startDate).valueOf() : ''
          return date && (date.valueOf() < startTime)
        }
      }
    },
    endTimeChange: function (e) { // 设置结束时间
      this.formValidate.endDate = e
      let endTime = this.formValidate.endDate ? new Date(this.formValidate.endDate).valueOf() - 1 * 24 * 60 * 60 * 1000 : ''
      this.startTimeOptions = {
        disabledDate (date) {
          return date && date.valueOf() > endTime
        }
      }
    },
    patternShow () {
      this.isShow = this.selectPattern === '时间段'
    }
  }
}
</script>
<style type="text/css" scoped>
  .add_c {
    background: #fff;
    padding: 20px;
    font-size: 14px;
  }
</style>
