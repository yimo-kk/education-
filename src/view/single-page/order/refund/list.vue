<template>
  <div>
    <div>
      <h3>课程退单</h3>
    </div>
    <br />
    <div class="search-con search-con-top">
      订单编号&nbsp;&nbsp;
      <Input v-model="orderNo" class="search-input" placeholder="请输入所属商家名称" style="width: 200px" />&nbsp;&nbsp;&nbsp;&nbsp;
      买家手机号&nbsp;&nbsp;
      <Input
        v-model="buyUserPhone"
        class="search-input"
        placeholder="请输入所属商家名称"
        style="width: 200px"
      />&nbsp;&nbsp;&nbsp;&nbsp;
      下单时间:
      <DatePicker
        type="date"
        :options="startTimeOptions"
        @on-change="startTimeChange"
        placeholder="开始时间"
        v-model="startTime"
      ></DatePicker>-
      <DatePicker
        type="date"
        :options="endTimeOptions"
        @on-change="endTimeChange"
        placeholder="结束时间"
        v-model="endTime"
      ></DatePicker>&nbsp;&nbsp;&nbsp;&nbsp;
      <Button @click="handleSearch" type="primary" class="search-btn" icon="ios-search">搜索</Button>
    </div>
    <br />
    <div>
      <Table border ref="selection" :columns="columns" :data="dataList"></Table>
      <br />
      <Page
        :total="dataCount"
        :current="pageNum"
        :page-size="pageSize"
        show-elevator
        show-sizer
        show-total
        placement="top"
        @on-change="handlePage"
        @on-page-size-change="handlePageSize"
      ></Page>
    </div>
  </div>
</template>

<script>
import { educationOrderRefund } from "@/api/order";
import { dateTimeFilter } from "@/libs/filters";
export default {
  name: "refundList",
  comments: {},
  data() {
    return {
      orderNo: null,
      buyUserPhone: null,
      startTimeOptions: {}, // 开始日期设置
      endTimeOptions: {}, // 结束日期设置
      startTime: "", // 开始日期model
      endTime: "", // 结束日期model
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      pageNum: 1,
      value1: "",
      value2: "",
      dataList: [],
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
          title: "订单编号",
          key: "orderNo"
        },
        {
          title: "课程名称",
          key: "courseName"
        },
        {
          title: "买家手机号",
          key: "phone"
        },
        {
          title: "下单时间",
          key: "payTime"
        },
        {
          title: "订单总额(元)",
          key: "payAmount"
        },
        {
          title: "订单状态",
          key: "state"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            const row = this.dataList[params.index];
            let createElement = [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "同意退款"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      const id = row.courseOrderId;
                      const route = {
                        name: "refundDetail",
                        query: {
                          id
                        },
                        meta: {
                          title: "课程退单详情"
                        }
                      };
                      this.$router.push(route);
                    }
                  }
                },
                "查看详情"
              )
            ];
            return h("div", createElement);
          }
        }
      ]
    };
  },
  created() {
    this.handleDataList();
  },
  methods: {
    handleDataList() {
      const params = {
        orderNo: this.orderNo === "" ? null : this.orderNo,
        buyUserPhone: this.buyUserPhone === "" ? null : this.buyUserPhone,
        startCreateTime:
          this.startTime === "" ? null : `${this.startTime} 00:00:00`,
        endCreateTime: this.endTime === "" ? null : `${this.endTime} 00:00:00`,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      educationOrderRefund(params)
        .then(res => {
          console.log(res);
          let data = res.data.data;
          this.dataList = data.list;
          this.dataCount = data.total;
          for (let data of this.dataList) {
            data.payTime = dateTimeFilter(data.payTime);
            switch (data.state) {
              case 1:
                data.state = "待审核";
                break;
              case 2:
                data.state = "已同意";
                break;
              case 3:
                data.state = "已拒绝";
                break;
              case 4:
                data.state = "退款成功";
                break;
              case 5:
                data.state = "已关闭";
                break;
              default:
                data.state = "异常";
            }
          }
        })
        .catch(e => {
          this.loading = false;
          this.$Message.error(e.message);
        });
    },
    handlePage(value) {
      this.pageNum = value;
      this.handleDataList();
    },
    handlePageSize(value) {
      this.pageSize = value;
      this.handleDataList();
    },
    handleSearch(e) {
      this.handleDataList();
    },
    // 时间组件
    startTimeChange: function(e) {
      // 设置开始时间
      this.startTime = e;
      this.endTimeOptions = {
        disabledDate: date => {
          let startTime = this.startTime
            ? new Date(this.startTime).valueOf()
            : "";
          return date && date.valueOf() < startTime;
        }
      };
    },
    endTimeChange: function(e) {
      // 设置结束时间
      this.endTime = e;
      let endTime = this.endTime
        ? new Date(this.endTime).valueOf() - 1 * 24 * 60 * 60 * 1000
        : "";
      this.startTimeOptions = {
        disabledDate(date) {
          return date && date.valueOf() > endTime;
        }
      };
    }
  }
};
</script>

<style>
</style>
