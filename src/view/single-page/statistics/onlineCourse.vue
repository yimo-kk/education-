<template>
    <div class="table-wrapper">
        <avue-crud
            v-model="record"
            :data="records"
            :option="option"
            :page="page"
            @refresh-change="refreshChange"
            @size-change="sizeChange"
            @current-change="currentChange"
            @search-change="searchChange"
            @search-reset = "searchReset"
            >
            <template slot="search">
                <el-form-item >
                     <el-row>
                        <el-button size="small" @click="selectTime(item)" v-for="item in timeList"  :type="(timeId===item.type) ? 'primary' : ''" :key="item.id">{{item.name}}</el-button>
                    </el-row>
                </el-form-item>
            </template>
      </avue-crud>
    </div>
</template>
<script>

import { fetchOnlineCourse } from '@/api/statistics'
import common from '@/mixins/common'

export default {
    mixins: [common()],
    data() {
        return {
            records: [],
            record: {},
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
            searchParams: {
                endTime: "",
                startTime: "",
            },
            timeId: 0,
            timeList: [
                {
                    type: 1,
                    name: '本周'
                },
                {
                    type: 2,
                    name: '上周'
                },
                {
                    type: 3,
                    name: '本月'
                },
                {
                    type: 4,
                    name: '上月'
                },
            ],
            option: {
                index: true,
                indexLabel: '序号',
                align: 'center',
                menuAlign: 'center',
                addBtn: false,
                editBtn: false,
                delBtn: false,
                stripe: true,
                labelWidth: '150px',
                menu: false,
                border: true,
                column: [
                    {
                        label: '课程名称',
                        prop: 'name',
                    },
                    {
                        label: '购买量',
                        prop: 'payCount'
                    },
                    {
                        label: '收藏量',
                        prop: 'collectionCount'
                    },
                    {
                        label: "开始时间",
                        prop: "startTime",
                        type: "datetime",
                        format: "yyyy-MM-dd hh:mm:ss",
                        search: true,
                        hide: true,
                    },
                     {
                        label: "结束时间",
                        prop: "endTime",
                        type: "datetime",
                        format: "yyyy-MM-dd hh:mm:ss",
                        search: true,
                        hide: true,
                    }
                ]
            }
        }
    },
    created () {
        this.getList();
    },
    methods: {
        async getList() {
            let postData = {
                endTime: this.searchParams.endTime,
                pageNum: this.page.currentPage,
                pageSize: this.page.pageSize,
                sort: "",
                startTime: this.searchParams.startTime,
                time: this.timeId
            }
            const res = await fetchOnlineCourse(postData);
            if(res.data.result === 'SUCCESS'){
                this.records = res.data.data.list
                this.page.total = res.data.data.total;
            }
        },
        selectTime(item){
            this.searchParams.time = item.type;
            this.timeId = item.type;
        },
        searchReset(){ //重置搜索条件
            this.searchParams = {
                endTime: "",
                startTime: ""
            }
            this.searchParams = Object.assign({}, this.searchParams);
            this.timeId = 0;
        }
    }
}
</script>
<style lang="less" scoped>

</style>

