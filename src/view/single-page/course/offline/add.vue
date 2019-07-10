<template>
  <div class="transfer_shop">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div>
      <Row class="step-top">
        <Col span="18">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
            <div class="ivu-form-item ivu-form-item-required">
              <label class="ivu-form-item-label" style="width: 160px;">运营分类</label>
              <div class="ivu-form-item-content" style="margin-left: 160px;">
                <Cascader :data="categoryList" v-model="categoryNo"></Cascader>
              </div>
            </div>

            <FormItem label="课程名称" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入课程名称"></Input>
            </FormItem>

            <FormItem label="课程副标题" prop="subhead">
              <Input v-model="formValidate.subhead" placeholder="请输入课程副标题"></Input>
            </FormItem>

            <FormItem label="付费类型" prop="price">
              <RadioGroup v-model="formValidate.price">
                <Radio label="0">免费视频</Radio>
                <Radio :label="formValidate.price">付费视频</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="课程总价格(￥)" prop="price">
              <Input v-model="formValidate.price" placeholder="请输入课程总价格"></Input>
            </FormItem>

            <FormItem label="课程期数" prop="term">
              <Input v-model="formValidate.term" placeholder="请输入课程期数"></Input>
            </FormItem>

            <FormItem label="课程封面图" prop="firstPicture">
              <div class="demo-upload-list" v-for="item in detailsPathList" :key="item.index">
                <template v-if="item.status === 'finished'">
                  <img :src="item.url" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="detailsPathView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="detailsPathRemove(item)"></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="detailsPathList"
                :on-success="detailsPathSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="20480"
                :on-format-error="detailsPathFormatError"
                :on-exceeded-size="detailsPathMaxSize"
                :before-upload="detailsPathBeforeUpload"
                multiple
                type="drag"
                :action="uploadImgUrl"
                style="display: inline-block;width:58px;"
              >
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
              <Modal title="View Image" v-model="detailsPathVisible">
                <img :src="detailsPathImgName" v-if="detailsPathVisible" style="width: 100%" />
              </Modal>
            </FormItem>

            <FormItem label="开课校区">
              <Row>
                <Col span="4" >
                  <Button type="primary" long @click="termAdd" icon="md-add">添加新校区</Button>
                </Col>
              </Row>
            </FormItem>

            <div
              class="ivu-form-item ivu-form-item-required"
              v-for="(item,index) in termList"
              v-if="item.status"
              :key="index"
            >
              <div class="item-content" style="margin-left: 160px;">
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <span class="ivu-form-item ivu-form-item-required">
                      <span class="ivu-form-item-content" style="margin-left: 160px;">
                        <Cascader :data="areaList" v-model="areaCode" placeholder="请选择地区"></Cascader>
                      </span>
                    </span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <Input type="text" v-model="item.address" placeholder="请输入上课地址"></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <DatePicker
                      type="datetime"
                      style="width:375px"
                      placeholder="课程开始时间"
                      v-model="item.courseDate"
                    ></DatePicker>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <Input type="text" v-model="item.limitNum" placeholder="报名名额"></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <Input type="text" v-model="item.termPrice" placeholder="请输入价格"></Input>
                  </Col>
                </Row>
                <br />

                <Row v-if="!isOk">
                  <Col span="8" offset="12">
                    <Button type="dashed" long  @click="isEnd=true"  icon="md-add">确认添加</Button>
                  </Col>
                </Row>

                 <Row v-if="isEnd">
                  <Col span="2" offset="14">
                    <Button @click="termRemove(index)">编辑</Button>
                  </Col>
                  <Col span="2" offset="1">
                    <Button @click="termRemove(index)">删除</Button>
                  </Col>
                </Row>
              </div>
            </div>
 
            <!-- 添加校区 -->
            <!-- <div  v-for="(item,index) in termList"v-if="item.status":key="index">
              <div class="item-content" style="margin-left: 160px;">
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <span class="ivu-form-item ivu-form-item-required">
                      <span class="ivu-form-item-content" style="margin-left: 160px;">
                        <Cascader :data="areaList" v-model="areaCode" placeholder="请选择地区"></Cascader>
                      </span>
                    </span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <Input type="text" v-model="item.address" placeholder="请输入上课地址"></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <DatePicker
                      type="datetime"
                      style="width:375px"
                      placeholder="课程开始时间"
                      v-model="item.courseDate"
                    ></DatePicker>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <Input type="text" v-model="item.address" placeholder="报名名额"></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span="18" offset="2">
                    <Input type="text" v-model="item.address" placeholder="请输入价格"></Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span="2" offset="14">
                    <Button @click="termRemove(index)">编辑</Button>
                  </Col>
                  <Col span="2" offset="1">
                    <Button @click="termRemove(index)">删除</Button>
                  </Col>
                </Row>
              </div>
            </div>-->

            <FormItem label="内容">
              <Row>
                <Col span="24">
                  <div class="editor">
                    <editor :catchData="catchData" :content="content"></editor>
                  </div>
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Button type="primary" @click="save('formValidate')">完成</Button>
            </FormItem>
          </Form>
        </Col>
        <Col span="6"></Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import config from "@/config";
import Editor from "./editor";
import { getCategoryList } from "@/api/educationCategory";
import { getAllArea } from "@/api/area";
import { addOfflineCourse } from "@/api/course";
export default {
  components: {
    Editor
  },
  data() {
    return {
      isOk:false,
      isEnd:false,
      spinShow: true,
      uploadImgUrl: config.uploadImgUrl,
      // 地区组合
      area_1: [],
      area_2: [],
      area_3: [],
      areaList: [],
      areaCode: [],
      // 分类组合
      category_1: [],
      category_2: [],
      category_3: [],
      categoryList: [],
      categoryNo: [],
      // 动态添加
      termListIndex: 1,
      termList: [
        {
          index: 1,
          status: 1,
          termPrice: "", //报名价格
          areaCode: "", //开课地区
          address: "", // 详细地址
          courseDate: "", //开课时间
          limitNum: "" //报名名额
        }
      ],
      detailsPathVisible: false,
      detailsPathImgName: "",
      // 详情图片暂存列表
      detailsPathList: [],
      content: "",
      picturesImgName: "",
      formValidate: {
        catNo: "", // 运营分类
        name: "", // 课程名称
        subhead: "", // 课程副标题
        price: "", // 价格
        educationOfflineCourseTermList: [],
        introduction: "",
        firstPicture: "",
        province: "",
        city: "",
        area: ""
      },
      ruleValidate: {
        name: [
          { required: true, message: "课程名称不能为空", trigger: "blur" }
        ],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        limitNum: [{ required: true, message: "名额不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getCategoryList();
    this.getAreaList();
  },
  methods: {
    getCategoryList() {
      this.spinShow = true;
      getCategoryList()
        .then(res => {
          // {
          //   value: 'beijing',
          //     label: '北京',
          //   children: [
          //   {
          //     value: 'gugong',
          //     label: '故宫'

          //   }
          // ]
          // }
          const list = res.data.data;
          this.groupLevelAll(list);
          // 组合3级到2级下面
          let category2 = [];
          for (let item of this.category_2) {
            const category3 = this.getLevel(this.category_3, item.catNo);
            item = {
              value: item.catNo,
              label: item.name,
              children: category3
            };
            category2.push(item);
          }
          // 组合2级到1级下面
          let categorys = [];
          for (let item of this.category_1) {
            let category1 = [];
            for (let data of category2) {
              if (data.value.indexOf(item.catNo) !== -1) {
                category1.push(data);
              }
            }
            item = {
              value: item.catNo,
              label: item.name,
              children: category1
            };
            categorys.push(item);
          }
          this.categoryList = categorys;
          this.spinShow = false;
        })
        .catch(e => {
          this.spinShow = true;
          this.$Message.error(e.message);
        });
    },
    groupLevelAll(all) {
      for (let data of all) {
        if (data.level === 1) {
          this.category_1.push(data);
        }
        if (data.level === 2) {
          this.category_2.push(data);
        }
        if (data.level === 3) {
          this.category_3.push(data);
        }
      }
    },
    getLevel(categorys, catNo) {
      let array = [];
      for (let data of categorys) {
        if (data.catNo && data.catNo.indexOf(catNo) !== -1) {
          data = {
            value: data.catNo,
            label: data.name
          };
          array.push(data);
        }
      }
      return array;
    },
    getAreaList() {
      this.spinShow = true;
      getAllArea()
        .then(res => {
          // {
          //   value: 'beijing',
          //     label: '北京',
          //   children: [
          //   {
          //     value: 'gugong',
          //     label: '故宫'

          //   }
          // ]
          // }
          const list = res.data.data;
          this.groupAreaLevelAll(list);
          // 组合3级到2级下面
          let area2 = [];
          for (let item of this.area_2) {
            const arr3 = this.getAreaLevel(this.area_3, item.areaCode);
            item = {
              value: item.name,
              label: item.name,
              code: item.areaCode,
              children: arr3
            };
            // console.log(item.areaCode)
            area2.push(item);
          }
          // 组合2级到1级下面
          let areas = [];
          for (let item of this.area_1) {
            let area1 = [];
            for (let data of area2) {
              if (data.code.indexOf(item.areaCode) !== -1) {
                area1.push(data);
              }
            }
            item = {
              value: item.name,
              label: item.name,
              code: item.areaCode,
              children: area1
            };
            areas.push(item);
          }
          this.areaList = areas;
          this.spinShow = false;
        })
        .catch(e => {
          this.spinShow = true;
          this.$Message.error(e.message);
        });
    },
    groupAreaLevelAll(all) {
      for (let data of all) {
        if (data.level === 1) {
          this.area_1.push(data);
        }
        if (data.level === 2) {
          this.area_2.push(data);
        }
        if (data.level === 3) {
          this.area_3.push(data);
        }
      }
    },
    getAreaLevel(areas, areaCode) {
      let array = [];
      for (let data of areas) {
        if (data.areaCode.indexOf(areaCode) !== -1) {
          data = {
            value: data.name,
            label: data.name,
            code: data.areaCode
          };
          array.push(data);
        }
      }
      return array;
    },
    // 动态添加属性
    termAdd() {
      this.termListIndex++;
      this.termList.push({
        index: this.termListIndex,
        status: 1,
        termPrice: "", //报名价格
        areaCode: "", //开课地区
        address: "", // 详细地址
        courseDate: "", //开课时间
        limitNum: "" //报名名额
      });
    },
    termRemove(index) {
      this.termList[index].status = 0;
    },
    // 上传详情图片
    detailsPathView(name) {
      this.detailsPathImgName = name;
      this.detailsPathVisible = true;
    },
    detailsPathRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.detailsPathList = this.$refs.upload.fileList;
    },
    detailsPathSuccess(res, file) {
      if (res.result === "FAILURE") {
        this.$Message.error(res.message);
      }
      file.url = `${res.data.url}`;
      file.name = res.data.fileName;
      this.detailsPathList = this.$refs.upload.fileList;
    },
    detailsPathFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: `文件格式${File.name}不正确，请选择jpg或png.`
      });
    },
    detailsPathMaxSize(file) {
      this.$Notice.warning({
        title: "超过文件大小限制",
        desc: `File ${File.name}太大，不超过2M`
      });
    },
    detailsPathBeforeUpload() {
      const check = this.detailsPathList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "只能上传1张图片"
        });
      }
      return check;
    },

    assembleTermList() {
      // 组合期数
      let termArray = [];
      for (let term of this.termList) {
        const data = {
          termPrice: term.termPrice, //报名价格
          areaCode: term.areaCode, //开课地区
          address: term.address, // 详细地址
          courseDate: term.courseDate, //开课时间
          limitNum: term.limitNum //报名名额
        };
        termArray.push(data);
      }
      this.formValidate.educationOfflineCourseTermList = termArray;
    },

    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.spinShow = true;
          if (this.categoryNo.length === 0) {
            this.$Message.error("请先选择分类");
            this.spinShow = false;
            return;
          }
          this.formValidate.catNo = this.categoryNo[this.categoryNo.length - 1];
          if (this.termList && this.termList[0].path === "") {
            this.$Message.error("请添加课程期数");
            this.spinShow = false;
            return;
          }
          this.assembleTermList();
          // 组合详情图片
          if (this.detailsPathList.length > 0) {
            let detailsPathArray = [];
            for (let item of this.detailsPathList) {
              detailsPathArray.push(item.url);
            }
            this.formValidate.firstPicture = detailsPathArray.join(",");
          }

          if (this.areaCode.length === 0) {
            this.spinShow = false;
            this.$Message.error("请先选择地区");
            return;
          }
          // 补全省市县
          this.formValidate.province = this.areaCode[0];
          if (this.areaCode[1]) {
            this.formValidate.city = this.areaCode[1];
            if (this.areaCode[2]) {
              this.formValidate.area = this.areaCode[2];
            }
          }
          addOfflineCourse(this.formValidate)
            .then(res => {
              this.spinShow = false;
              this.$Message.success("新增课程成功!");
            })
            .catch(e => {
              this.spinShow = false;
              this.$Message.error(e.message);
            });
        } else {
          this.$Message.error("请先确认所有必填项都已填写");
        }
      });
    },
    //富文本
    catchData(value) {
      this.content = value; // 在这里接受子组件传过来的参数，赋值给data里的参数
      this.formValidate.introduction = value;
    }
  },
  mounted() {
    this.detailsPathList = this.$refs.upload.fileList;
  }
};
</script>

<style scoped>
.transfer_shop {
  background: #fff;
  padding: 20px;
}
.categoryList,
.step-top {
  margin-top: 20px;
}
.ck_back {
  padding-top: 50px;
  text-align: center;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.firstPic {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.item-content {
  width: 500px;
  height: 320px;
  border: 1px solid #666;
}
</style>
