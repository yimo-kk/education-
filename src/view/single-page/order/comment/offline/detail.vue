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
import { mapMutations } from 'vuex'
import { getCommentList } from '@/api/offlineComment'
import { dateTimeFilter } from '@/libs/filters'
export default {
  name: 'offlineCommentDetail',
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
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'commentId'
        },
        {
          title: '用户名称',
          key: 'nickName'
        },
        {
          title: '手机号',
          key: 'contactNumber'
        },
        {
          title: '评价时间',
          key: 'createTime'
        },
        {
          title: '商品评分',
          key: 'rating'
        },
        {
          title: '内容',
          key: 'comment'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
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
                    // todo 查看图片
                  }
                }
              }, '查看图片')
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
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'offlineCommentDetail',
        query: {
          goodsId: this.$route.query.goodsId
        }
      })
    },
    handleDataList () {
      // 保存取到的所有数据
      this.loading = true
      getCommentList(this.$route.query.goodsId, this.pageNum, this.pageSize).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.createTime = dateTimeFilter(data.createTime)
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
