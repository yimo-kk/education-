<template>
  <div class="xsdingdan">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="cj">
      <div class="tables">
        <ul>
          <li><div id="titles">订单概况</div></li>
          <li>
            <div>订单编号：<span>{{order.orderNo}}</span></div>
            <div>下单时间：<span>{{order.createTime | dateTimeFilter}}</span></div>
          </li>
          <li>
            <div>优惠券：<span>{{couponName}}</span></div>
            <div>订单原始金额：<span>￥{{order.totalFee}}</span></div>
          </li>
          <li>
            <div>订单优惠金额：<span>￥{{order.preferentialAmount}}</span></div>
            <div>订单付款金额：<span>￥{{order.payAmount}}</span></div>
          </li>
          <li>
            <div>支付方式：<span><!-- todo 缺少支付方式--></span></div>
            <div>支付凭证：<span>{{order.payment}}</span></div>
          </li>
          <li id="sjname">
            <div>商家名称：<span></span></div>
          </li>
        </ul>
      </div>
      <div class="tables">
        <ul>
          <li><div id="infos">用户信息</div></li>
          <li>
            <div>用户名：<span>{{nickName}}</span></div>
            <div>电话号：<span>{{order.buyUserPhone}}</span></div>
          </li>
          <li id="liuyan">
            <div>留言：<span>{{order.remark}}</span></div>
          </li>
        </ul>
      </div>
      <div class="tab">
        <div class="gaikuang">课程列表</div>
        <Table stripe :columns="courseColumns" :data="courseList"></Table>
      </div>
      <div class="tab">
        <div class="gaikuang">订单操作日志</div>
        <Table stripe :columns="logColumns" :data="logList"></Table>
      </div>
    </div>
    <div class="btn"> <Button @click="handleCloseTag">返回</Button></div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { getOnlineCourseOrderById } from '@/api/courseOrder'
import { dateTimeFilter } from '@/libs/filters'
export default {
  name: 'onlineCourseOrderDetail',
  data () {
    return {
      // 全局loading
      spinShow: false,
      order: {},
      nickName: '',
      couponName: '',
      courseColumns: [
        {
          title: '课程货品编号',
          key: 'videoNo'
        },
        {
          title: '课程名称',
          key: 'videoName'
        }
      ],
      courseList: [],
      logColumns: [
        {
          title: '操作类型',
          key: 'type'
        },
        {
          title: '操作人',
          key: 'opearter'
        },
        {
          title: '操作时间',
          key: 'createTime'
        },
        {
          title: '备注',
          key: 'logDetall'
        }
      ],
      logList: [],
      model1: 1
    }
  },
  created () {
    this.handleOrder()
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'onlineCourseOrderDetail',
        query: {
          id: this.$route.query.id
        }
      })
    },
    handleOrder () {
      this.spinShow = true
      getOnlineCourseOrderById(this.$route.query.id).then((res) => {
        const data = res.data.data
        this.order = data.courseOrder
        this.nickName = data.nickName
        this.couponName = data.couponName
        this.courseList = data.educationCourseVideo
        this.logList = data.orderLog
        for (let item of this.logList) {
          item.type = item.type === 1 ? '改价' : item.type === 2 ? '发货' : ''
          item.createTime = dateTimeFilter(item.createTime)
        }
        this.spinShow = false
      }).catch((e) => {
        this.spinShow = false
        this.$Message.error(e.message)
      })
    }
  }
}
</script>
<style type="text/css">
  .xsdingdan .ivu-table-cell{background: #fff;}
  .xsdingdan .ivu-table-wrapper {
    clear: both;
  }

  .xsdingdan .ivu-icon-ios-help-circle:before {
    content: '';
  }

  .xsdingdan {
    background: #fff;
    padding: 20px 20px;
  }

  .xsdingdan .cj {
  }

  .xsdingdan .cj p {
    padding-top: 20px;
    padding-bottom: 8px;
  }
  .tables{
    width: 100%;
  }
  .tables ul{
    border: 1px solid #ccc;
  }
  .tables ul li div{
    padding: 10px 0px;
    padding-left: 20px;
  }
  .tables ul li>div:first-of-type{
    width: 50%;
    float: left;
  }
  .tables ul li>div:nth-child(2){
    display: inline-block;
  }
  .tables ul li{
    color: #333;
    border-bottom: 1px solid #ccc;
    list-style-type: none;
  }
  #titles,#infos{
    width: 100%;
    background: #f8f8f9;
    font-weight: 700;
    display: inline-block;
    padding-left: 10px;
  }
  #sjname,#liuyan{
    display: inline-block;
    width: 50%;
    border: none;
  }
  .tab{margin-top: 50px;}
  .gaikuang{
    padding: 10px 0px;
    border: 1px solid #ccc;
    border-bottom: none;
    padding-left: 10px;
  }
  .btn{text-align: center;margin-top: 50px;}
</style>
