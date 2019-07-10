<template>
  <div>
    <div>
      <h3>课程审核列表</h3>
    </div>
    <br />
    <div>
      所属商家名称&nbsp;&nbsp;
      <Input v-model="value1" placeholder="请输入所属商家名称" style="width: 200px" />&nbsp;&nbsp;&nbsp;&nbsp;
      课程名称&nbsp;&nbsp;
      <Input v-model="value2" placeholder="请输入所属商家名称" style="width: 200px" />&nbsp;&nbsp;&nbsp;&nbsp;
      课程类型&nbsp;&nbsp;
      <Select v-model="model1" clearable style="width:150px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>&nbsp;&nbsp;&nbsp;&nbsp;
      首页推荐&nbsp;&nbsp;
      <Select v-model="model1" clearable style="width:150px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>&nbsp;&nbsp;&nbsp;&nbsp;
      APP推荐&nbsp;&nbsp;
      <Select v-model="model1" clearable style="width:150px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>&nbsp;&nbsp;&nbsp;&nbsp;
      <Button type="primary" icon="ios-search">搜索</Button>
    </div>
    <br />
    <div>
      <Table border ref="selection" :columns="columns" :data="dataList"></Table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      cityList: [
        {
          value: "1",
          label: "线上"
        },
        {
          value: "2",
          label: "线下"
        }
      ],
      model1: "",
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
          title: "课程主图",
          key: "name"
        },
        {
          title: "课程名称",
          key: "age"
        },
        {
          title: "课程编号",
          key: "address"
        },
        {
          title: "销售价",
          key: "address"
        },
        {
          title: "课程类型",
          key: "address"
        },
        {
          title: "分类",
          key: "address"
        },
        {
          title: "所属商家",
          key: "address"
        },
        {
          title: "发布时间",
          key: "address"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                "查看详情"
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>

<style>
</style>
