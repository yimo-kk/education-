<template>
  <div class="cjxq">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="looks">
      <Tabs active-key="key1" @on-click="handleAuthorizedData">
        <TabPane label="基本资料" key="key1">
          <ul class="datas">
            <li>
              <div class="txt">店铺logo</div>
              <div id="tx"><img :src="store.merchantLogo"/></div>
            </li>
            <li>
              <div>店铺名称</div>
              <div>{{store.merchantName}}</div>
            </li>
            <li>
              <div>地址</div>
              <div>{{store.address}}</div>
            </li>
            <li>
              <div>店铺所属用户名称</div>
              <div>{{store.userName}}</div>
            </li>
            <li>
              <div>手机号</div>
              <div>{{store.userPhone}}</div>
            </li>
            <li>
              <div>余额</div>
              <div>￥{{store.balance}}</div>
            </li>
            <li>
              <div>店铺等级</div>
              <div>
                <span v-if="store.merchantGrade === 1">普通店铺</span>
                <span v-if="store.merchantGrade === 2">黄金店铺</span>
                <span v-if="store.merchantGrade === 3">钻石店铺</span>
                <span v-if="store.merchantGrade === 4">皇冠店铺</span>
              </div>
            </li>
            <li>
              <div>店铺商品数量</div>
              <div>{{store.goodsCount}}</div>
            </li>
            <li>
              <div>注册时间</div>
              <div>{{store.createTime | dateTimeFilter}}</div>
            </li>
            <li>
              <div>推广年费到期时间</div>
              <div>{{store.endTime | dateTimeFilter}}</div>
            </li>
            <li>
              <div>店铺经营范围</div>
              <Input v-model="store.merchantScope" type="textarea" :rows="4" placeholder="店铺经营范围" />
            </li>
            <li>
              <div>店铺描述</div>
              <Input v-model="store.merchantDescribe" type="textarea" :rows="4" placeholder="店铺描述" />
            </li>
          </ul>
          <div class="ck_back">
            <Button type="primary" class="sd" @click="handleSave" >修改/保存</Button>
          </div>
        </TabPane>
        <TabPane label="认证资料" key="key2">
          <ul class="datas">
            <li>
              <div>法人姓名</div>
              <div>{{storeAuthData.legalPerson}}</div>
            </li>
            <!--<li> todo 缺少字段
              <div>公司名称</div>
              <div>{{storeAuthData.legalPerson}}</div>
            </li>-->
            <li>
              <div>营业执照编号</div>
              <div>{{storeAuthData.businessLicenseNo}}</div>
            </li>
            <li class="top">
              <div>营业执照</div>
              <div class="photos"><img :src="storeAuthData.businessLicensePhoto"/></div>
            </li>
            <li class="top">
              <div class="sf">身份证正反面</div>
              <div class="photos zheng"><img :src="storeAuthData.identityCardFront"/></div>
              <div class="photos fan"><img :src="storeAuthData.identityCardReverse"/></div>
            </li>
            <li class="top">
              <div>产品相关证书</div>
              <div class="photos zheng"><img :src="storeAuthData.goodesAptitudes"/></div>
            </li>
          </ul>
        </TabPane>
      </Tabs>

    </div>
  </div>
</template>
<script>
import { getBasicData, getAuthorizedData, updateStoreDate } from '@/api/store'
export default {
  name: 'dealerDetail',
  data () {
    return {
      // 全局loading
      spinShow: false,
      store: {},
      storeAuthData: {}
    }
  },
  created () {
    this.handleStore()
  },
  methods: {
    handleStore () {
      this.spinShow = true
      getBasicData().then((res) => {
        this.store = res.data.data
        this.spinShow = false
      }).catch((e) => {
        this.$Message.error(e.message)
      })
    },
    handleAuthorizedData (name) {
      if (name === 1 && Object.keys(this.storeAuthData).length === 0) {
        this.spinShow = true
        getAuthorizedData(this.$route.query.userBusinessId).then((res) => {
          this.storeAuthData = res.data.data
          this.spinShow = false
        }).catch((e) => {
          this.$Message.error(e.message)
        })
      }
    },
    handleSave () {
      const param = {
        merchantScope: this.store.merchantScope,
        merchantDescribe: this.store.merchantDescribe
      }
      updateStoreDate(param).then(res => {
        this.$Message.success('保存成功!')
      }).catch((e) => {
        this.$Message.error(e.message)
      })
    }

  }
}
</script>
<style type="text/css">
  .ivu-icon-ios-help-circle:before{
    content: '';
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    padding: 20px 16px;
  }
  .ivu-table td{text-align: center;}
  .ivu-table th{text-align: center;}
  .cjxq {
    background: #fff;
    padding: 0px 20px;
  }
  .cjxq .datas{padding-left: 30%;}
  .cjxq .looks li label {
    padding: 20px 0px;
    text-align: left;
  }
  .cjxq .cz_title{padding: 30px 0px;text-align: right;}
  .cjxq .looks .info {
    padding-top: 20px;
    padding-bottom: 8px;
  }

  .cjxq .looks li {
    color: #333;
    padding: 15px 0px;
    font-size: 14px;
    position: relative;
  }

  .cjxq .looks li div:first-of-type {
    display: inline-block;
    width: 20%;
  }

  .cjxq .looks li div:last-of-type {
    display: inline-block;
  }

  .cjxq .looks li #tx {
    width: 50px;
    height: 50px;
    border: 1px solid;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .looks li #tx img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .cjxq .looks li .txt {
    vertical-align: middle
  }
  .cjxq .looks .ivu-page li {
    padding: 0;
  }
  .cjxq .looks .widths {
    width: 50%;
  }

  .cjxq .looks .ck_back {
    padding-top: 50px;
    text-align: center;
  }

  .cjxq .looks .ivu-btn {
    padding: 7px 60px;
  }

  .cjxq .looks .sd {
    margin-right: 40px;
  }

  .cjxq .photos {
    width: 200px;
    height: 150px;
    border: 1px solid;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .cjxq .photos img{
    height: 100%;
  }
  .cjxq .looks .top {
    height: 170px;
    line-height: 170px;
    padding: 0px;
  }

  .cjxq .sf {
  }

  .cjxq .p_l {
    float: left;
  }
  .cjxq .zheng{
    left:20%;
  }
  .cjxq .fan{
    left:40%;
  }
  .inp{
    padding: 10px 0px;
  }
  .inp input{
    margin-right: 10px;
    border-radius: 5px;
    padding: 5px 0px;
    border: 1px solid #eee;
    padding-left: 10px;
  }
  .lab{
    width: 80px;
    display: inline-block;
  }
</style>
