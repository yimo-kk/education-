<template>
  <div class="table">
    <div class="form_box">
        <div class="search-con search-con-top">
          订单编号: <Input clearable placeholder="备注" class="search-input" v-model="orderNo"/>&nbsp;
          付款时间: <DatePicker type="date" :options="startCreateTimeOptions" @on-change="startCreateTimeChange" placeholder="申请时间" v-model="startCreateTime"></DatePicker>-
          <DatePicker type="date" :options="endCreateTimeOptions" @on-change="endCreateTimeChange" placeholder="申请时间" v-model="endCreateTime"></DatePicker>&nbsp;
          结算时间:<DatePicker type="date" :options="startSettlementTimeOptions" @on-change="startSettlementTimeChange" placeholder="审批时间" v-model="startSettlementTime"></DatePicker>-
          <DatePicker type="date" :options="endSettlementTimeOptions" @on-change="endSettlementTimeChange" placeholder="审批时间" v-model="endSettlementTime"></DatePicker>&nbsp;
          状态: <Select v-model="settlementState" class="search-col">
          <Option value="1" key="state1">待结算</Option>
          <Option value="2" key="state2">已结算</Option>
        </Select>
          <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
        </div>
      <Card title="导出EXCEL">
        <Row>
          <Button icon="md-download" :loading="exportLoading" @click="exportExcel">导出文件</Button>
        </Row>
      </Card>

    </div>
    <Table stripe ref="selection" :loading="loading" :columns="columns" :data="dataList"></Table>
    <br/>
    <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
          placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>

  </div>
</template>
<script>
import excel from '@/libs/excel'
import './index.less'
import { dateTimeFilter } from '@/libs/filters'
import { getAccountPage } from '@/api/financial'
export default {
  name: 'accountCheck',
  components: {

  },
  data () {
    return {
      loading: true,
      exportLoading: false,
      startCreateTimeOptions: {}, // 开始日期设置
      endCreateTimeOptions: {}, // 结束日期设置
      startCreateTime: '', // 开始日期model
      endCreateTime: '', // 结束日期model
      startSettlementTimeOptions: {}, // 开始日期设置
      endSettlementTimeOptions: {}, // 结束日期设置
      startSettlementTime: '', // 开始日期model
      endSettlementTime: '', // 结束日期model
      settlementState: null,
      orderNo: null,
      dataList: [],
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      pageNum: 1,
      columns: [
        {
          title: '编号',
          key: 'orderId'
        },
        {
          title: '订单编号',
          key: 'orderNo'
        },
        {
          title: '订单金额',
          key: 'payAmount'
        },
        {
          title: '付款时间',
          key: 'timeEnd'
        },
        {
          title: '结算时间',
          key: 'settlementTime'
        },
        {
          title: '状态',
          key: 'settlementState'
        }
      ]
    }
  },
  created () {
    this.handleDataList()
  },
  methods: {
    exportExcel () {
      if (this.dataList.length) {
        this.exportLoading = true
        const params = {
          title: ['编号', '订单编号', '订单金额', '付款时间', '结算时间', '状态'],
          key: ['orderId', 'orderNo', 'payAmount', 'timeEnd', 'settlementTime', 'settlementState'],
          data: this.dataList,
          autoWidth: true,
          filename: '商家对账列表'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    },
    handleDataList () {
      // 保存取到的所有数据
      this.loading = true
      const param = {
        startCreateTime: this.startCreateTime === '' ? null : `${this.startCreateTime} 00:00:00`,
        endCreateTime: this.endCreateTime === '' ? null : `${this.endCreateTime} 00:00:00`,
        startSettlementTime: this.startSettlementTime === '' ? null : `${this.startSettlementTime} 00:00:00`,
        endSettlementTime: this.endSettlementTime === '' ? null : `${this.endSettlementTime} 00:00:00`,
        settlementState: this.settlementState === '' ? null : this.settlementState,
        orderNo: this.orderNo === '' ? null : this.orderNo,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getAccountPage(param).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.timeEnd = dateTimeFilter(data.timeEnd)
          data.settlementTime = dateTimeFilter(data.settlementTime)
          data.payAmount = `￥${data.payAmount}`
          switch (data.settlementState) {
            case 1:
              data.settlementState = '待结算'
              break
            case 2:
              data.settlementState = '已结算'
              break
            default:
              data.settlementState = '其他'
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
    startCreateTimeChange: function (e) { // 设置开始时间
      this.startCreateTime = e
      this.startCreateTimeOptions = {
        disabledDate: date => {
          let startTime = this.startCreateTime ? new Date(this.startCreateTime).valueOf() : ''
          return date && (date.valueOf() < startTime)
        }
      }
    },
    endCreateTimeChange: function (e) { // 设置结束时间
      this.endCreateTime = e
      let endTime = this.endCreateTime ? new Date(this.endCreateTime).valueOf() - 1 * 24 * 60 * 60 * 1000 : ''
      this.endCreateTimeOptions = {
        disabledDate (date) {
          return date && date.valueOf() > endTime
        }
      }
    },
    startSettlementTimeChange: function (e) { // 设置开始时间
      this.startSettlementTime = e
      this.startSettlementTimeOptions = {
        disabledDate: date => {
          let startTime = this.startSettlementTime ? new Date(this.startSettlementTime).valueOf() : ''
          return date && (date.valueOf() < startTime)
        }
      }
    },
    endSettlementTimeChange: function (e) { // 设置结束时间
      this.endSettlementTime = e
      let endTime = this.endSettlementTime ? new Date(this.endSettlementTime).valueOf() - 1 * 24 * 60 * 60 * 1000 : ''
      this.endSettlementTimeOptions = {
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
  .ivu-table th{text-align:center !important; }
  .ivu-table td{text-align:center !important;}
  .table{height:100%;background: #fff;padding: 0px 20px;}
  .table .form_right button{padding: 8px 15px;border-radius: 4px;background: #2d8cf0;border:none;color: #fff;}
</style>
