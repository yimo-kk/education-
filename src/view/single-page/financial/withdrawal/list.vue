<template>
  <div class="table">
    <div class="form_box">
        <div class="search-con search-con-top">
          申请时间: <DatePicker type="date" :options="startCreateTimeOptions" @on-change="startCreateTimeChange" placeholder="申请时间" v-model="startCreateTime"></DatePicker>-
          <DatePicker type="date" :options="endCreateTimeOptions" @on-change="endCreateTimeChange" placeholder="申请时间" v-model="endCreateTime"></DatePicker>&nbsp;
          审批时间:<DatePicker type="date" :options="startApprovalTimeOptions" @on-change="startApprovalTimeChange" placeholder="审批时间" v-model="startApprovalTime"></DatePicker>-
          <DatePicker type="date" :options="endApprovalTimeOptions" @on-change="endApprovalTimeChange" placeholder="审批时间" v-model="endApprovalTime"></DatePicker>&nbsp;
          备注: <Input clearable placeholder="备注" class="search-input" v-model="remark"/>&nbsp;
          状态: <Select v-model="state" class="search-col">
          <Option value="1" key="state1">审核中</Option>
          <Option value="2" key="state2">审核通过</Option>
          <Option value="3" key="state3">未通过审核</Option>
        </Select>
          <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
        </div>

    </div>
    <Table stripe ref="selection" :loading="loading" :columns="columns" :data="dataList"></Table>
    <br/>
    <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
          placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>

  </div>
</template>
<script>
import './index.less'
import { dateTimeFilter } from '@/libs/filters'
import { getPage } from '@/api/financial'
export default {
  name: 'withdrawalList',
  components: {

  },
  data () {
    return {
      loading: true,
      startCreateTimeOptions: {}, // 开始日期设置
      endCreateTimeOptions: {}, // 结束日期设置
      startCreateTime: '', // 开始日期model
      endCreateTime: '', // 结束日期model
      startApprovalTimeOptions: {}, // 开始日期设置
      endApprovalTimeOptions: {}, // 结束日期设置
      startApprovalTime: '', // 开始日期model
      endApprovalTime: '', // 结束日期model
      state: null,
      remark: null,
      dataList: [],
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      pageNum: 1,
      columns: [
        {
          title: '编号',
          key: 'cashId'
        },
        {
          title: '申请时间',
          key: 'createTime'
        },
        {
          title: '审批时间',
          key: 'approvalTime'
        },
        {
          title: '金额',
          key: 'money'
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '备注',
          key: 'remark'
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
        startCreateTime: this.startCreateTime === '' ? null : `${this.startCreateTime} 00:00:00`,
        endCreateTime: this.endCreateTime === '' ? null : `${this.endCreateTime} 00:00:00`,
        startApprovalTime: this.startApprovalTime === '' ? null : `${this.startApprovalTime} 00:00:00`,
        endApprovalTime: this.endApprovalTime === '' ? null : `${this.endApprovalTime} 00:00:00`,
        state: this.state === '' ? null : this.state,
        remark: this.remark === '' ? null : this.remark,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getPage(param).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.createTime = dateTimeFilter(data.createTime)
          data.approvalTime = dateTimeFilter(data.approvalTime)
          data.money = `￥${data.money}`
          switch (data.state) {
            case 1:
              data.state = '审核中'
              break
            case 2:
              data.state = '审核通过'
              break
            case 3:
              data.state = '未通过审核'
              break
            default:
              data.state = '其他'
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
    startApprovalTimeChange: function (e) { // 设置开始时间
      this.startApprovalTime = e
      this.startApprovalTimeOptions = {
        disabledDate: date => {
          let startTime = this.startApprovalTime ? new Date(this.startApprovalTime).valueOf() : ''
          return date && (date.valueOf() < startTime)
        }
      }
    },
    endApprovalTimeChange: function (e) { // 设置结束时间
      this.endApprovalTime = e
      let endTime = this.endApprovalTime ? new Date(this.endApprovalTime).valueOf() - 1 * 24 * 60 * 60 * 1000 : ''
      this.endApprovalTimeOptions = {
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
