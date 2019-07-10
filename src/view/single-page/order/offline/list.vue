<template>
  <div class="table">
    <div class="form_box">
        <div class="search-con search-con-top">
          订单编号: <Input clearable placeholder="所属用户名称" class="search-input" v-model="orderNo"/>&nbsp;
          买家手机号: <Input clearable placeholder="手机号" class="search-input" v-model="buyUserPhone"/>
          下单时间: <DatePicker type="date" :options="startTimeOptions" @on-change="startTimeChange" placeholder="开始时间" v-model="startTime"></DatePicker> -
          <DatePicker type="date" :options="endTimeOptions" @on-change="endTimeChange" placeholder="结束时间" v-model="endTime"></DatePicker>
          券码: <Input clearable placeholder="券码" class="search-input" v-model="voucher"/>&nbsp;
          <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
        </div>
    </div>
    <Table stripe :loading="loading" :columns="columns" :data="dataList"></Table>
    <br/>
    <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
          placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>

  </div>
</template>
<script>
import './index.less'
import { getOfflineCourseOrderPage, verification } from '@/api/courseOrder'
import { dateTimeFilter } from '@/libs/filters'
export default {
  name: 'offlineCourseOrder',
  components: {

  },
  data () {
    return {
      loading: true,
      orderNo: null,
      buyUserPhone: null,
      voucher: null,
      startTimeOptions: {}, // 开始日期设置
      endTimeOptions: {}, // 结束日期设置
      startTime: '', // 开始日期model
      endTime: '', // 结束日期model
      dataList: [],
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      pageNum: 1,
      columns: [
        {
          title: '编号',
          key: 'courseOrderId'
        },
        {
          title: '订单编号',
          key: 'orderNo'
        },
        {
          title: '课程名称',
          key: 'courseName'
        },
        {
          title: '买家手机号',
          key: 'buyUserPhone'
        },
        {
          title: '下单时间',
          key: 'createTime'
        },
        {
          title: '订单总额',
          key: 'totalFee'
        },
        {
          title: '支付凭证',
          key: 'payment'
        },
        {
          title: '券码',
          key: 'voucher'
        },
        {
          title: '订单状态',
          key: 'state'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            const row = this.dataList[params.index]
            let createElement = [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    const id = row.courseOrderId
                    const route = {
                      name: 'offlineCourseOrderDetail',
                      query: {
                        id
                      },
                      meta: {
                        title: '线下课程订单详情'
                      }
                    }
                    this.$router.push(route)
                  }
                }
              }, '查看')
            ]
            if (row.verificationTime === null) {
              const content = `券码：${row.voucher}`
              createElement.push(h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '核销券码',
                      content: content,
                      okText: '确定',
                      cancelText: '取消',
                      onOk: () => {
                        this.loading = true
                        verification(row.courseOrderId).then((res) => {
                          this.loading = false
                          this.$Message.success(res.data.message)
                          row.verificationTime = ''
                        }).catch((e) => {
                          this.loading = false
                          this.$Message.error(e.message)
                        })
                      },
                      onCancel: () => {}
                    })
                  }
                }
              }, '核销券码'))
            }
            return h('div', createElement)
          }
        }
      ]
    }
  },
  created () {
    this.handleDataList()
  },
  methods: {
    handleDataList () {
      // 保存取到的所有数据
      this.loading = true
      const param = {
        type: 2,
        orderNo: this.orderNo === '' ? null : this.orderNo,
        buyUserPhone: this.buyUserPhone === '' ? null : this.buyUserPhone,
        voucher: this.voucher === '' ? null : this.voucher,
        startCreateTime: this.startTime === '' ? null : `${this.startTime} 00:00:00`,
        endCreateTime: this.endTime === '' ? null : `${this.endTime} 00:00:00`,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getOfflineCourseOrderPage(param).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.createTime = dateTimeFilter(data.createTime)
          data.totalFee = `￥${data.totalFee}`
          switch (data.state) {
            case 1:
              data.state = '未支付'
              break
            case 2:
              data.state = '已支付'
              break
            case 3:
              data.state = '已取消'
              break
            default:
              data.state = '异常'
          }
        }
        this.loading = false
      }).catch((e) => {
        this.loading = false
        this.$Message.error(e.message)
      })
    },
    handlePage (value) {
      this.pageNum = value
      this.handleDataList()
    },
    handlePageSize (value) {
      this.pageSize = value
      this.handleDataList()
    },
    handleSearch (e) {
      this.handleDataList()
    },
    // 时间组件
    startTimeChange: function (e) { // 设置开始时间
      this.startTime = e
      this.endTimeOptions = {
        disabledDate: date => {
          let startTime = this.startTime ? new Date(this.startTime).valueOf() : ''
          return date && (date.valueOf() < startTime)
        }
      }
    },
    endTimeChange: function (e) { // 设置结束时间
      this.endTime = e
      let endTime = this.endTime ? new Date(this.endTime).valueOf() - 1 * 24 * 60 * 60 * 1000 : ''
      this.startTimeOptions = {
        disabledDate (date) {
          return date && date.valueOf() > endTime
        }
      }
    }
  },
  mounted () {
    //
  }

}
</script>
<style scoped>
  .ivu-table-wrapper{clear: both;}
  .ivu-table th{text-align:center !important; }
  .ivu-table td{text-align:center !important;}
  .table{height:100%;background: #fff;padding: 0px 20px;}
  .table .form_right button{padding: 8px 15px;border-radius: 4px;background: #2d8cf0;border:none;color: #fff;}
  .table .form_footer{width: 100%;height: 40px;line-height: 40px;text-align:center;background: #fff;}
</style>
