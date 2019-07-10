<template>
  <div class="spxq">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="looks">
      <ul class="datas">
        <li>
          <div>课程分类</div>
          <span>{{course.catName1}}</span>&nbsp;&nbsp;
          <span>{{course.catName2}}</span>&nbsp;&nbsp;
          <span>{{course.catName3}}</span>&nbsp;&nbsp;
        </li>
        <li>
          <div class="txt">课程名称</div>
          <div>{{course.name}}</div>
        </li>
        <li>
          <div>课程副标题</div>
          <div>{{course.subhead}}</div>
        </li>
        <!-- <li>
          <div>课程类型</div>
          <div>{{}}</div>
        </li>-->
        <li>
          <div>价格</div>
          <div>{{course.price}}</div>
        </li>
        <li>
          <div>课程封面图</div>
          <div class="tupian">
            <img :src="course.firstPicture" />
          </div>
        </li>
        <li>
          <div>课程视频</div>
          <div>
            <Table highlight-row :columns="columns" :data="dataList"></Table>
          </div>
        </li>
        <li>
          <div>课程详情文字介绍</div>
          <div>{{course.introduction}}</div>
        </li>
        <li>
          <div>课程详情图片介绍</div>
          <div class="tupian">
            <img v-for="item in detailsPaths" :src="item" :key="item.index" />
          </div>
        </li>
      </ul>
      <div class="ck_back">
        <Button @click="handleCloseTag">返回</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { getOnlineCourse } from "@/api/course";
import { mapMutations } from "vuex";
export default {
  name: "onlineCourseDetail",
  components: {},
  data() {
    return {
      spinShow: true,
      loading: true,
      course: {},
      detailsPaths: [],
      columns: [
        {
          type: "index",
          title: "编号",
          width: 60,
          align: "center"
        },
        {
          title: "课程名称",
          width: 350,
          key: "videoName"
        },
        {
          title: "课程视频",
          width: 400,
          key: "localPath"
        }
      ],
      dataList: []
    };
  },
  created() {
    this.handleOnlineCourse();
  },
  methods: {
    ...mapMutations(["closeTag"]),
    handleCloseTag() {
      this.closeTag({
        name: "onlineCourseDetail",
        query: {
          id: this.$route.query.id
        }
      });
    },
    handleOnlineCourse() {
      getOnlineCourse(this.$route.query.id)
        .then(res => {
          console.log(this.course.firstPicture)
          this.course = res.data.data;
          this.dataList = this.course.videos;
          console.log(this.dataList);
          if (this.course.detailsPath) {
            this.detailsPaths = this.course.detailsPath.split(",");
          }
          this.spinShow = false;
        })
        .catch(e => {
          this.$Message.error(e.message);
        });
    }
  },
  mounted() {
    //
  }
};
</script>
<style type="text/css">
.ivu-tabs-nav .ivu-tabs-tab {
  padding: 20px 16px;
}
.ivu-table td {
  text-align: center;
}
.ivu-table th {
  text-align: center;
}
.spxq {
  background: #fff;
  padding: 0px 20px;
}
.spxq .datas {
  padding-left: 30%;
}
.spxq .looks li label {
  padding: 20px 0px;
  text-align: left;
}
.spxq .cz_title {
  padding: 30px 0px;
  text-align: right;
}
.spxq .looks .info {
  padding-top: 20px;
  padding-bottom: 8px;
}

.spxq .looks .datas li {
  color: #333;
  padding: 15px 0px;
  font-size: 14px;
  position: relative;
}

.spxq .looks li > div:first-of-type {
  display: inline-block;
  width: 20%;
}

.spxq .looks li > div:last-of-type {
  display: inline-block;
}

.spxq .looks .widths {
  width: 50%;
}

.spxq .looks .ck_back {
  padding-top: 50px;
  text-align: center;
}

.spxq .looks .ivu-btn {
  padding: 7px 60px;
}

.spxq .looks .sd {
  margin-right: 40px;
}

.spxq .photos {
  width: 200px;
  height: 150px;
  border: 1px solid;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.spxq .looks .top {
  height: 170px;
  line-height: 170px;
  padding: 0px;
}

.spxq .p_l {
  float: left;
}
#jg {
  display: block;
}
.goodsPrices {
  margin-left: 20%;
  padding: 15px 0px;
}
.spxq .shuliang {
  display: inline-block;
  margin-right: 100px;
}
.spxq .yuan {
  display: inline-block;
}
.spxq .s_data {
  margin: 0px 30px;
}
#sx {
  border: 1px solid;
  width: 500px;
  height: 300px;
}
.spxq .tupian,
.shipin {
  width: 200px;
}
.spxq .tupian img {
  width: 100%;
  max-width: 200px;
}
</style>
