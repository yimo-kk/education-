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
import { getSubOnlineCoursePage } from '@/api/course'
export default {
  name: 'onlineSubCourseList',
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
          key: 'courseVideoId'
        },
        {
          title: '子课程名称',
          key: 'videoName'
        },
        {
          title: '子课程编号',
          key: 'videoNo'
        },
        {
          title: '价格',
          key: 'videoPrice'
        },
        {
          title: '状态',
          key: 'state'
        },
        // todo 是否还有编辑的功能?
        {
          title: '操作',
          key: 'action',
          width: 280,
          align: 'center',
          render: (h, params) => {
            // const row = this.dataList[params.index]
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
                  }
                }
              }, '查看')
            ]
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
      getSubOnlineCoursePage(this.$route.query.courseId, this.pageNum, this.pageSize).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.state = '成功'
          if (data.state === 0) {
            data.state = '失败'
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
