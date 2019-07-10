<template>
  <Row>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Col span="8">
      <Card class="category-card">
        <p slot="title">
          <Icon type="ios-barcode-outline" />
          一级分类
        </p>
        <a href="#" slot="extra" @click.prevent="setCatNo(1)">
          <Icon type="ios-loop-strong"></Icon>
          新增
        </a>
        <ul class="list-type">
          <li v-for="item in  level_1" :key="item.index" >
            <Row>
              <Col span="18"><a href="javascript:;" @click.prevent="handleCategory(item)">{{item.name}}</a></Col>
              <Col span="6">
                <Button @click="handleEdit(item,1)">修改</Button>&nbsp;
                <Button type="error" @click="handleDelete(item)">删除</Button>
              </Col>
            </Row>
          </li>
        </ul>
      </Card>
    </Col>
    <Col span="8">
      <Card class="category-card">
        <p slot="title">
          <Icon type="ios-barcode-outline" />
          二级分类
        </p>
        <a href="#" slot="extra" @click.prevent="setCatNo(2)">
          <Icon type="ios-loop-strong"></Icon>
          新增
        </a>
        <ul class="list-type">
          <li v-for="item in  level_2" :key="item.index">
            <Row>
              <Col span="18"><a href="javascript:;" @click.prevent="handleCategory(item)">{{item.name}}</a></Col>
              <Col span="6">
                <Button @click="handleEdit(item,2)">修改</Button>&nbsp;
                <Button type="error" @click="handleDelete(item)">删除</Button>
              </Col>
            </Row>
          </li>
        </ul>
      </Card>
    </Col>
    <Col span="8">
      <Card class="category-card">
        <p slot="title">
          <Icon type="ios-barcode-outline" />
          三级分类
        </p>
        <a href="#" slot="extra" @click.prevent="setCatNo(3)">
          <Icon type="ios-loop-strong"></Icon>
          新增
        </a>
        <ul class="list-type">
          <li v-for="item in  level_3" :key="item.index">
            <Row>
              <Col span="18"><a href="javascript:;" @click.prevent="handleCategory(item)">{{item.name}}</a></Col>
              <Col span="6">
              <Button @click="handleEdit(item,3)">修改</Button>&nbsp;
              <Button type="error" @click="handleDelete(item)">删除</Button>
              </Col>
            </Row>
          </li>
        </ul>
      </Card>
    </Col>
    <Modal
      v-model="modal"
      title="请选择分类"
      :loading="modal_loading"
      @on-ok="handleSubmit('formValidate')">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="分类名称" prop="name">
          <Input v-model="formValidate.name" placeholder="输入分类名称"></Input>
        </FormItem>
        <FormItem label="上级分类">
          <Select v-model="formValidate.catNo" placeholder="选择上级分类" :disabled="formItem_hide">
            <Option v-for="item in parentLevel" :value="item.catNo" :key="item.index" >{{item.text}}</Option>
          </Select>
        </FormItem>
        <FormItem label="分类排序" prop="orderNum">
          <Input v-model="formValidate.orderNum" placeholder="分类排序"></Input>
        </FormItem>
        <FormItem label="上传图片" prop="picture">
          <div class="demo-upload-list" v-for="item in uploadList" :key="item.index">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="pictureList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            :action="uploadImgUrl"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div> 
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img :src="imgName" v-if="visible" style="width: 100%">
          </Modal>
        </FormItem>
      </Form>
    </Modal>
  </Row>
</template>
<script>
import config from '@/config'
import { getCategoryList, create, update, del } from '@/api/educationCategory'
export default {
  data () {
    return {
      uploadImgUrl: config.uploadImgUrl,
      spinShow: true,
      modal: false,
      formItem_hide: true,
      modal_loading: false,
      level_1: [],
      level_2: [],
      level_3: [],
      parentLevel: [],
      formValidate: {
        categoryId: '',
        name: '',
        catNo: '',
        orderNum: '',
        picture: '',
        level: 1
      },
      ruleValidate: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '输入排序', trigger: 'blur' }
        ]
      },
      pictureList: [],
      imgName: '',
      visible: false,
      uploadList: []
    }
  },
  created () {
    this.handleCategory()
  },
  methods: {
    handleCategory (item) {
      let catNo = null
      let level = null
      if (item) {
        catNo = item.catNo
        level = Number.parseInt(item.level) + 1
      }
      this.spinShow = true
      getCategoryList(catNo, level).then((res) => {
        this.spinShow = false
        if (level === null) {
          this.level_1 = res.data.data
          this.level_2 = []
          return
        }
        switch (level) {
          case 2:
            this.level_2 = res.data.data
            this.level_3 = []
            break
          case 3:
            this.level_3 = res.data.data
            break
          default:
        }
      }).catch((e) => {
        this.$Message.error(e.message)
      })
    },
    setCatNo (number) {
      this.parentLevel = []
      this.formValidate.level = number
      if (number === 1) {
        this.parentLevel.push({
          catNo: 'cat',
          text: '所有'
        })
      }
      if (number === 2) {
        this.transformLevel(this.level_1)
      }
      if (number === 3) {
        this.transformLevel(this.level_2)
      }
      this.modal = true
      this.formItem_hide = false
    },
    transformLevel (level) {
      for (let data of level) {
        this.parentLevel.push({
          catNo: data.catNo,
          text: data.name
        })
      }
    },
    handleEdit (item, index) {
      this.setCatNo(index)
      this.formValidate = item
      this.modal = true
      this.formItem_hide = true
    },
    handleDelete (item, index) {
      this.spinShow = true
      del(item.categoryId, item.catNo).then((res) => {
        this.spinShow = false
        if (index === 1) {
          const level = this.level_1
          this.level_1.splice(level.indexOf(item), 1)
        }
        if (index === 2) {
          const level = this.level_2
          this.level_2.splice(level.indexOf(item), 1)
        }
        if (index === 3) {
          const level = this.level_3
          this.level_3.splice(level.indexOf(item), 1)
        }
        this.$Message.success('删除成功')
        this.handleCategory()
      }).catch((e) => {
        this.spinShow = false
        this.$Message.error(e.message)
      })
    },
    handleSubmit (name) {
      this.modal_loading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.categoryId !== '') {
            if (this.uploadList.length > 0) {
              this.formValidate.picture = this.uploadList[0].url
            }
            // 修改
            update(this.formValidate).then((res) => {
              this.modal_loading = false
              this.modal = false
              this.$Message.success('修改成功')
              this.handleCategory()
            }).catch((e) => {
              this.$Message.error(e.message)
            })
          } else {
            // 新增
            if (this.formValidate.catNo === '') {
              this.$Message.error('请先选择分类')
              return
            }
            if (this.uploadList.length > 0) {
              this.formValidate.picture = this.uploadList[0].url
            }
            create(this.formValidate).then((res) => {
              this.modal_loading = false
              this.modal = false
              this.$Message.success('新增成功')
              this.handleCategory()
            }).catch((e) => {
              this.$Message.error(e.message)
            })
          }
        } else {
          this.$Message.error('请验证数据是否填写')
          this.modal_loading = false
        }
      })
    },
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      if (res.result === 'FAILURE') {
        this.$Message.error(res.message)
      }
      file.url = `${res.data.url}`
      file.name = res.data.fileName
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: `文件格式${File.name}不正确，请选择jpg或png.`
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: `File ${File.name}太大，不超过2M`
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 1
      if (!check) {
        this.$Notice.warning({
          title: '只能上传一张图片'
        })
      }
      return check
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style>
 .list-type{list-style-type: none}
 .list-type li{margin-bottom:5px}
  .category-card{height: 500px; overflow-y: scroll }
 .demo-upload-list{
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
   box-shadow: 0 1px 1px rgba(0,0,0,.2);
   margin-right: 4px;
 }
 .demo-upload-list img{
   width: 100%;
   height: 100%;
 }
 .demo-upload-list-cover{
   display: none;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: rgba(0,0,0,.6);
 }
 .demo-upload-list:hover .demo-upload-list-cover{
   display: block;
 }
 .demo-upload-list-cover i{
   color: #fff;
   font-size: 20px;
   cursor: pointer;
   margin: 0 2px;
 }
</style>
