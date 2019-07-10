<template>
  <div class="table">
    <Table stripe :loading="loading" :columns="columns" :data="dataList"></Table>
    <br/>
    <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
          placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
  </div>
</template>
<script>
import './index.less'
import { getCommentPage } from '@/api/onlineComment'
export default {
  name: 'onlineCommentList',
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
          key: 'goodsId'
        },
        {
          title: '课程名称',
          key: 'name'
        },
        {
          title: '课程图片',
          key: 'firstPicture',
          render: (h, params) => {
            return h('div', {
              attrs: {
                style: 'width: 100px;height: 100px;'
              }
            }, [
              h('img', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                attrs: {
                  src: params.row.firstPicture, style: 'width: 100%;height: 100%;'
                },
                style: {
                }
              })
            ])
          }
        },
        {
          title: '课程编号',
          key: 'productNo'
        },
        {
          title: '评价数量',
          key: 'commentNum'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
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
                    const goodsId = row.goodsId
                    const route = {
                      name: 'onlineCommentDetail',
                      query: {
                        goodsId
                      },
                      meta: {
                        title: '线上课程评论详情'
                      }
                    }
                    this.$router.push(route)
                  }
                }
              }, '查看详情')
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
      const param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getCommentPage(param).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
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
