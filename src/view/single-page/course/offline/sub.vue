<template>
  <div class="table">
    <Table stripe ref="selection" :loading="loading" :columns="columns" :data="dataList"></Table>
    <br/>
    <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
          placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>

  </div>
</template>
<script>
import './index.less'
import { dateTimeFilter } from '@/libs/filters'
import { getSubCoursePage, offlineTermUp, offlineTermDown } from '@/api/course'
export default {
  name: 'offlineSubCourseList',
  components: {

  },
  data () {
    return {
      loading: true,
      dataList: [],
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      pageNum: 1,
      columns: [
        {
          title: '编号',
          key: 'courseTermId'
        },
        {
          title: '期数名称',
          key: 'termName'
        },
        {
          title: '期数编号',
          key: 'termNo'
        },
        {
          title: '期数开始时间',
          key: 'courseDate'
        },
        // {
        //   title: '报名人数',
        //   key: 'number'
        // },
        {
          title: '操作',
          key: 'action',
          width: 280,
          align: 'center',
          render: (h, params) => {
            // const row = this.dataList[params.index]
            let createElement = []
            if (row.state === 1) {
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
                      title: '下架',
                      content: '确认要下架该课程吗?',
                      okText: '确定',
                      cancelText: '取消',
                      onOk: () => {
                        this.loading = true
                        offlineTermDown(row.courseTermId).then((res) => {
                          this.loading = false
                          this.$Message.success(res.data.message)
                          row.state = 2
                        }).catch((e) => {
                          this.loading = false
                          this.$Message.error(e.message)
                        })
                      },
                      onCancel: () => {}
                    })
                  }
                }
              }, '下架'))
            }
            if (row.state === 2) {
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
                      title: '上架',
                      content: '确认要上架该课程吗?',
                      okText: '确定',
                      cancelText: '取消',
                      onOk: () => {
                        this.loading = true
                        offlineTermUp(row.courseTermId).then((res) => {
                          this.loading = false
                          this.$Message.success(res.data.message)
                          row.state = 1
                        }).catch((e) => {
                          this.loading = false
                          this.$Message.error(e.message)
                        })
                      },
                      onCancel: () => {}
                    })
                  }
                }
              }, '上架'))
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
      getSubCoursePage(this.$route.query.courseId, this.pageNum, this.pageSize).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.courseDate = dateTimeFilter(data.courseDate)
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
