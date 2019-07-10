<template>
    <div class="table-wrapper">
        <avue-data-box :option="option"></avue-data-box>
    </div>
</template>
<script>
import {fetchCount} from '@/api/statistics'
export default {
    data() {
        return {
            form: {},
            option: {
               data: [
                    {
                        title: '可提现余额（元）',
                        count: 12332,
                        icon: 'icon-cuowu',
                        color: 'rgb(49, 180, 141)',
                        href:'https://avue.top',
                        target:'_blank'
                    },
                    {
                        title: '待结算余额（元）',
                        count: 33,
                        icon: 'icon-shujuzhanshi2',
                        color: 'rgb(56, 161, 242)',
                        href:'https://avue.top',
                        target:'_blank'
                    },
                    {
                        title: '今日线上课程订单总额（元）',
                        count: 2223,
                        icon: 'icon-jiaoseguanli',
                        color: 'rgb(117, 56, 199)',
                        href:'https://avue.top',
                        target:'_blank'
                    },
                     {
                        title: '今日线下课程订单总额（元）',
                        count: 2223,
                        icon: 'icon-jiaoseguanli',
                        color: 'rgb(117, 56, 199)',
                        href:'https://avue.top',
                        target:'_blank'
                    },
                     {
                        title: '店铺总收藏量',
                        count: 2223,
                        icon: 'icon-jiaoseguanli',
                        color: 'rgb(117, 56, 199)',
                        href:'https://avue.top',
                        target:'_blank'
                    },
                ]
            }
        };
    },
    created() {
        this.getCount()
    },
    methods: {
        async getCount() {
            const res = await fetchCount();
            if(res.data.result === 'SUCCESS'){
                let result = res.data.data;
                this.option.data[0].count = result.balance ? result.balance : 0;
                this.option.data[1].count = result.settlementAccount ? result.settlementAccount : 0;
                this.option.data[2].count = result.courseOrderCount ? result.courseOrderCount : 0;
                this.option.data[3].count = result.offlineOrderCount ? result.offlineOrderCount : 0;
                this.option.data[4].count = result.concernCount ? result.concernCount : 0;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.table-wrapper{
    padding: 20px 10px;
    min-height: 100vh;
}
</style>

