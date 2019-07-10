<template>
  <div class="transfer_shop">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div>
      <Row class="step-top">
        <Col span="18">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
            <FormItem label="运营分类">
              <Cascader :data="categoryList" v-model="categoryNo"></Cascader>
            </FormItem>
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
              &nbsp;课程总价格需考虑到分成比例以及运营成本，最低{{videoPrice}}元运营商存储以及浏览都需收费
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

            <Row>
              <Col span="8">
                <FormItem label="试看时间" prop="letTime">
                  <Input v-model="formValidate.letTime" placeholder="请输入1-30秒"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="观看有效期" prop="viewValidity">
                  <Input v-model="formValidate.viewValidity" placeholder="请输入可观看天数"></Input>
                </FormItem>
              </Col>
            </Row>

            <div
              class="ivu-form-item ivu-form-item-required"
              v-for="(item, index) in videoList"
              v-if="item.status"
              :key="index"
            >
              <label class="ivu-form-item-label" style="width: 160px;">{{'视频教程 ' + item.index}}</label>
              <div class="ivu-form-item-content" style="margin-left: 160px;">
                <Row>
                  <Col span="5">
                    <Input type="text" v-model="item.videoName" placeholder="输入课程名称"></Input>
                    <Input type="text" v-model="item.videoPrice" placeholder="输入课程价格"></Input>
                  </Col>
                  <Col span="5" offset="1">
                    <div @click="uploadIndex(index)">
                      <Upload :action="uploadVideoUrl" :on-success="uploadVideo" show-upload-list>
                        <Button icon="ios-cloud-upload-outline">上传视频</Button>
                      </Upload>
                    </div>
                  </Col>
                  <Col span="4" offset="1">
                    <Button @click="videoListRemove(index)">删除</Button>
                  </Col>
                </Row>
              </div>
            </div>
            <!--<FormItem
            v-for="(item, index) in videoList"
            v-if="item.status"
            :key="index"
            :label="'视频教程 ' + item.index">
            <Row>
              <Col span="5">
              <Input type="text" v-model="item.videoName" placeholder="输入课程名称"></Input>
              </Col>
              <Col span="5" offset="1">
                <div @click="uploadIndex(index)">
                  <Upload :action="uploadVideoUrl" :on-success="uploadVideo"  show-upload-list>
                    <Button icon="ios-cloud-upload-outline">上传视频</Button>
                  </Upload>
                </div>
              </Col>
              <Col span="4" offset="1">
              <Button @click="videoListRemove(index)">删除</Button>
              </Col>
            </Row>
            </FormItem>-->
            <FormItem>
              <Row>
                <Col span="12">
                  <Button type="dashed" long @click="videoListAdd" icon="md-add">添加视频教程</Button>
                </Col>
              </Row>
            </FormItem>

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
import { addCourse } from "@/api/course";
export default {
  name: "onlineAdd",
  components: {
    Editor
  },
  data() {
    return {
      isOk: true,
      detailsPathList: "",
      uploadImgUrl: config.uploadImgUrl,
      uploadVideoUrl: config.uploadVideoUrl,
      spinShow: true,
      videoPrice: null,
      price: null,
      category_1: [],
      category_2: [],
      category_3: [],
      categoryList: [],
      categoryNo: [],
      content: "", // 富文本
      videoIndex: 0, // 点击了第几个上传视频的按钮
      // 动态添加
      videoListIndex: 1,
      videoList: [
        {
          videoName: "",
          courseVideoTempId: "",
          videoPrice: null,
          localPath: "",
          index: 1,
          status: 1
        }
      ],
      detailsPathVisible: false,
      detailsPathImgName: "",
      formValidate: {
        name: "", // 课程名称
        subhead: "", // 课程副标题
        catNo: "", // 运营分类
        price: null, // 价格
        firstPicture: "", // 首图
        detailsPath: "", // 课程图集
        remark: "", // 备注
        _introduction: "", // 简介
        viewValidity: null, // 购买观看有效期（天数)
        letTime: null, //试看时长（1-30秒）
        get introduction() {
          return this._introduction;
        },
        set introduction(value) {
          this._introduction = value;
        },
        videoList: [] // 子课程信息 [{videoName:'第一节',path:'http://123.com/sassdfsd',}]
      },
      ruleValidate: {
        name: [
          { required: true, message: "课程名称不能为空", trigger: "blur" }
        ],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    ...mapMutations(["closeTag"]),
    handleCloseTag() {
      this.closeTag({
        name: "onlineAdd",
        // query: {
        //   id: this.$route.query.id
        // }
      });
    },

    getCategoryList() {
      this.spinShow = true;
      getCategoryList()
        .then(res => {
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
    // 动态添加属性
    videoListAdd() {
      this.videoListIndex++;
      this.videoList.push({
        videoName: "",
        courseVideoTempId: "",
        videoPrice: null,
        localPath: "",
        index: this.videoListIndex,
        status: 1
      });
    },
    videoListRemove(index) {
      this.videoList[index].status = 0;
    },
    uploadIndex(index) {
      this.videoIndex = index;
    },
    uploadVideo(res, file, fileList) {
      if (res.result === "FAILURE") {
        this.$Message.error(res.message);
      }
      const data = res.data;
      this.videoPrice = parseFloat(data.price);
      this.videoList[this.videoIndex].localPath = data.path;
      this.videoList[this.videoIndex].courseVideoTempId = data.videoTempId;
      console.log(data);
    },
    assembleVideoList() {
      // [{videoName:'第一节',path:'http://123.com/sassdfsd'}]
      // 组合课程视频
      let videoArray = [];
      for (let video of this.videoList) {
        const data = {
          videoName: video.videoName,
          videoPrice: video.videoPrice,
          localPath: video.localPath,
          courseVideoTempId: video.courseVideoTempId
        };
        videoArray.push(data);
      }
      this.formValidate.videoList = videoArray;
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

    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.spinShow = true;
          if (this.categoryNo.length === 0) {
            this.spinShow = false;
            this.$Message.error("请先选择分类");
            return;
          }
          this.formValidate.catNo = this.categoryNo[this.categoryNo.length - 1];
          this.formValidate.price = parseFloat(this.formValidate.price);
          // this.formValidate.videoList.videoPrice = forEach(parseFloat(this.formValidate.videoList.videoPrice))
          // console.log(forEach(this.formValidate.videoList.videoPrice))
          // if (this.videoList && this.videoList[0].localPath === "") {
          //   this.spinShow = false;
          //   this.$Message.error("请添加课程视频");
          //   return;
          // }
          this.assembleVideoList();
          // 组合详情图片
          if (this.detailsPathList.length > 0) {
            let detailsPathArray = [];
            for (let item of this.detailsPathList) {
              detailsPathArray.push(item.url);
            }
            this.formValidate.firstPicture = detailsPathArray.join(",");
            // 放了一张首图
          }
          addCourse(this.formValidate)
            .then(res => {
              this.spinShow = false;
              this.$Message.success("新增课程成功!");
              this.handleCloseTag()
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
</style>
