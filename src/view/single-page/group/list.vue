<template>
  <div class="table">
    <div class="groupTitle">
      <h2>团购管理</h2>
      <div class="search-con search-con-top groupName">
        活动名称:
        <Input clearable class="search-input" v-model="groupName" style="width:300px" />
        <span class="groupTime">活动时间:</span>
        <DatePicker
          type="date"
          :options="startTimeOptions"
          @on-change="startTimeChange"
          placeholder="开始时间"
          v-model="startTime"
        ></DatePicker>---
        <DatePicker
          type="date"
          :options="endTimeOptions"
          @on-change="endTimeChange"
          placeholder="结束时间"
          v-model="endTime"
        ></DatePicker>
        <Button @click="handleSearch" class="search-btn search" type="primary">
          <Icon type="search" />&nbsp;&nbsp;搜索
        </Button>
        <Button @click="handleSearch" class="search-btn search" type="primary">
          <Icon type="search" />&nbsp;&nbsp;添加
        </Button>
      </div>
      <Table class="myTable" border ref="selection" :columns="columns" :data="dataList">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { getGroupPage } from "@/api/group";
import { dateTimeFilter } from "@/libs/filters";
export default {
  name: "groupList",
  components: {},
  data() {
    return {
      groupName: "", //拼团名称
      startTimeOptions: {}, // 开始日期设置
      endTimeOptions: {}, // 结束日期设置
      startTime: "", // 开始时间
      endTime: "", // 结束时间
      dataList: [], //列表数据
      columns: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          type: "index",
          title: "编号",
          width: 70,
          align: "center"
        },
        {
          title: "活动名称",
          key: "groupName"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "结束时间",
          key: "endTime"
        },
        {
          title: "拼团人数",
          key: "groupNumber"
        },
        {
          title: "商品名称",
          key: "commodityName"
        },
        {
          title: "操作",
          key: "operation"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            const row = this.dataList[params.index];
            let createElement =  [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      const id = row.courseOrderId;
                      const route = {
                        name: "onlineCourseOrderDetail",
                        query: {
                          id
                        },
                        meta: {
                          title: "线上课程订单详情"
                        }
                      };
                      this.$router.push(route);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]
          }
        }
      ],
      pageNum: 0, //第几页
      pageSize: 10, //一页多少个数据
      type: 1,
      userBusinessId: 0
    };
  },
  created() {
    //的那个页面加载调用获取数据
    this.getPageData();
  },
  methods: {
    // 点击搜索按钮
    handleSearch() {},

    getPageData() {
      //获取需要参数
      let params = {
         type: 1,
        startCreateTime:
          this.startTime === "" ? null : `${this.startTime} 00:00:00`,
        endCreateTime: this.endTime === "" ? null : `${this.endTime} 00:00:00`,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      //发送请求
      getGroupPage(params).then(res => {
        console.log(res);
        this.dataList = res.data.data.list;
      });
    },
    // 开始的时间
    startTimeChange(e) {
      // 设置开始时间
      this.startTime = e;

      // 时间没精确到秒自己添加到秒
      //  console.log(new Date(this.startTime).valueOf())
      // disabledDate: date => {
      //   let startTime = this.startTime
      //     ? new Date(this.startTime).valueOf()
      //     : "";
      //     console.log(data)
      //   return date && date.valueOf() < startTime;
      // }
    },
    // 结束时间
    endTimeChange(e) {
      this.endTime = e;
    }
  }
};
</script>
<style scoped>
.groupTitle h2 {
  margin-left: 20px;
  padding-bottom: 80px;
}
.groupTime {
  margin-left: 10px;
}
.search {
  margin-left: 20px !important;
  /* margin-right: 10px; */
}
.myTable {
  margin-top: 20px;
}
</style>
