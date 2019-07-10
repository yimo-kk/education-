<template>
  <div class="table">
    <div class="form_box">
        <div class="search-con search-con-top">
          优惠券名称: <Input clearable placeholder="商品名称" class="search-input" v-model="title"/>&nbsp;
          结束时间:<DatePicker type="date" :options="endTimeOptions" @on-change="endTimeChange" placeholder="结束时间" v-model="endTime"></DatePicker>
          <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
        </div>
        <div class="btn_pl">
          <Button type="primary" @click="add">添加</Button>
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
import { getPage, updateCouponStatus } from '@/api/coupon'
import { dateFilter } from '@/libs/filters'
export default {
  name: 'couponList',
  components: {

  },
  data () {
    return {
      loading: true,
      title: null,
      endTimeOptions: {}, // 结束日期设置
      endTime: '', // 结束日期model
      dataList: [],
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      pageNum: 1,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '优惠券名称',
          key: 'title'
        },
        {
          title: '开始时间',
          key: 'startDate'
        },
        {
          title: '结束时间',
          key: 'endDate'
        },
        {
          title: '数量',
          key: 'quantity'
        },
        {
          title: '条件',
          key: 'condition'
        },
        {
          title: '操作',
          key: 'action',
          width: 280,
          align: 'center',
          render: (h, params) => {
            const row = this.dataList[params.index]
            let createElement = []
            if (row.couponStatus === 1) {
              createElement.push(h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: (params) => {
                    this.$Modal.confirm({
                      title: '停用',
                      content: '确认要停用吗?',
                      okText: '确定',
                      cancelText: '取消',
                      onOk: () => {
                        this.loading = true
                        updateCouponStatus(row.couponId, 2).then((res) => {
                          this.loading = false
                          this.$Message.success(res.data.message)
                          row.couponStatus = 2
                        }).catch((e) => {
                          this.loading = false
                          this.$Message.error(e.message)
                        })
                      },
                      onCancel: () => {}
                    })
                  }
                }
              }, '停用'))
            }
            if (row.couponStatus === 2) {
              createElement.push(h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: (params) => {
                    this.$Modal.confirm({
                      title: '启用',
                      content: '确认要启用吗?',
                      okText: '确定',
                      cancelText: '取消',
                      onOk: () => {
                        this.loading = true
                        updateCouponStatus(row.couponId, 1).then((res) => {
                          this.loading = false
                          this.$Message.success(res.data.message)
                          row.couponStatus = 1
                        }).catch((e) => {
                          this.loading = false
                          this.$Message.error(e.message)
                        })
                      },
                      onCancel: () => {}
                    })
                  }
                }
              }, '启用'))
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
    add () {
      const route = {
        name: 'couponAdd',
        meta: {
          title: '添加优惠券'
        }
      }
      this.$router.push(route)
    },
    handleDataList () {
      // 保存取到的所有数据
      this.loading = true
      const param = {
        title: this.title === '' ? null : this.title,
        endDate: this.endTime === '' ? null : `${this.endTime}`,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getPage(param).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.condition = `满${data.fullMoney}减${data.subtractMoney}`
          data.startDate = dateFilter(data.startDate)
          data.endDate = dateFilter(data.endDate)
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
  .ivu-table th{text-align:center !important; }
  .ivu-table td{text-align:center !important;}
  .table{height:100%;background: #fff;padding: 0px 20px;}
  .table .form_right button{padding: 8px 15px;border-radius: 4px;background: #2d8cf0;border:none;color: #fff;}
  .btn_pl {
    padding-bottom: 30px;
    text-align: right;
  }
</style>
