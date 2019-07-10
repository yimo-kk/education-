<template>
    <div class="add-table">
        <h1>添加拼团</h1>
        <Form :model="groupNumber" :label-width="80" >
            <FormItem label="活动名称" class="group-name" >
                <Input v-model="groupNumber.name"></Input>
            </FormItem>
            <FormItem 
                label="活动时间">
                <DatePicker  @on-change="handleChange" type="datetimerange" style="width: 300px"></DatePicker>
                <br>
            </FormItem>
           <FormItem label="选择商品">
                <Button type="primary" @click="Selection" size="large" >选择商品</Button>
            </FormItem>
            <FormItem label="拼团价" style="width: 300px" >
                <Input v-model="groupNumber.money"></Input>
            </FormItem>
             <FormItem label="拼团人数" style="width: 500px" >
                <Input v-model="groupNumber.peopleNumber"></Input>
            </FormItem>
            <FormItem>
                <Button @click="Preservation" type="primary" size="large">保存</Button>
            </FormItem>
        </Form>
        <!-- 选择商品 -->
        <div v-if="SelectionCommodity">
            <Modal
            v-model="SelectionCommodity"
            title="选择商品">
             <Card style="width:200px height:200px">
                <div style="width:200px height:200px">
                    <img src="../../../assets/images/minLogo.png" class="image">
                    <div>
                        <p></p>
                        <span>￥</span>
                    </div>
                </div>
            </Card>
                
            <Page :total="40" size="small" show-elevator show-sizer show-total/>
            </Modal>
        </div>
    </div>
</template>
<script>
    import { getGroupAdd } from "@/api/group";
    export default {
        data () {
            return {
                modal7:"",
                SelectionCommodity:false, //选择商品
                groupNumber: { 
                    activityTitle:"",
                    endTime:null,
                    startTime:null,
                    goodsPrice:null,
                    groupNumber:0
                }
            }
        },
        methods: {
            //保存提交数据并跳转到团购管理页面
        Preservation(){
            
        },
        //选择商品
        Selection(){
            this.SelectionCommodity = !this.SelectionCommodity;
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        handleChange(date){
            // date.forEach(item =>{
            //      let data = new Date(date)
            //      data.getTime();
            //      console.log(data.getTime())
            // })
            console.log(this.times)
            this.startTime = date[0]
            this.endTime = date[1]
        }

    },
    }
    
</script>

<style scoped>
.group-name {
    width: 500px;
}
.add-table h1 {
    margin-bottom: 100px;
}
.image{
    width: 200px;
    height: 200px;
}
</style>
