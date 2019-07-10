<template>
  <div class="table">
    <div class="form_box">
        <div class="search-con search-con-top">
          课程名称: <Input clearable placeholder="商品名称" class="search-input" v-model="name"/>
          状态: <Select v-model="state" class="search-col">
          <Option value="0" key="state0">选择</Option>
          <Option value="4" key="state1">上架</Option>
          <Option value="5" key="state2">下架</Option>
        </Select>
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
import { getOfflinePage, courseUp, courseDown } from '@/api/course'
import { dateTimeFilter } from '@/libs/filters'
export default {
  name: 'offlineCourseList',
  components: {

  },
  data () {
    return {
      loading: true,
      name: null,
      recommend: 0,
      state: 0,
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
          title: '课程主图',
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
          title: '课程名称',
          key: 'name'
        },
        {
          title: '课程编号',
          key: 'courseNo'
        },
        {
          title: '销售价',
          key: 'price'
        },
        {
          title: '是否上架',
          key: 'up'
        },
        {
          title: '发布时间',
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 280,
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
                    const id = row.courseId
                    const route = {
                      name: 'offlineCourseDetail',
                      query: {
                        id
                      },
                      meta: {
                        title: '课程详情'
                      }
                    }
                    this.$router.push(route)
                  }
                }
              }, '查看详情'),
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
                    const courseId = row.courseId
                    const route = {
                      name: 'subOfflineCourse',
                      query: {
                        courseId
                      },
                      meta: {
                        title: '期数列表'
                      }
                    }
                    this.$router.push(route)
                  }
                }
              }, '查看期数')
            ]
            if (row.state === 4) {
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
                        const param = [row.courseId]
                        courseDown(param).then((res) => {
                          this.loading = false
                          this.$Message.success(res.data.message)
                          row.state = 5
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
            if (row.state === 5) {
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
                        const param = [row.courseId]
                        courseUp(param).then((res) => {
                          this.loading = false
                          this.$Message.success(res.data.message)
                          row.state = 4
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
    add () {
      const route = {
        name: 'offlineAdd',
        meta: {
          title: '添加线下课程'
        }
      }
      this.$router.push(route)
    },
    handleDataList () {
      // 保存取到的所有数据
      this.loading = true
      const state = Number.parseInt(this.state) !== 0 ? this.state : null
      const param = {
        name: this.name === '' ? null : this.name,
        state,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getOfflinePage(param).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.up = '否'
          if (data.state === 4) {
            data.up = '是'
          }
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
  .btn_pl {
    padding-bottom: 30px;
    text-align: right;
  }
</style>
