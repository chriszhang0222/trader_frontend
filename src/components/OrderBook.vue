<template>
    <el-form label-width="100px">
        <el-form-item>
            <h4 style="color:#909399;">HQ Time: {{hqtime}}</h4>
        </el-form-item>
        <el-form-item>
            <div class="orderBook">
                <el-row v-for="item in sell" :key="item.name">
                    <el-col :span="6">{{item.name}}</el-col>
                    <el-col :span="6">{{item.price | filterEmpty}}</el-col>
                    <el-col :span="6">
                        <div class="volumeratio">
                            <div class="sell" v-bind:style="{width: item.width+'%'}"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">{{item.volume | filterEmpty}}</el-col>
                </el-row>
            </div>

            <div class="orderBook" style="border-top: none;">
                <el-row v-for="item in buy" :key="item.name">
                    <el-col :span="6">{{item.name}}</el-col>
                    <el-col :span="6">{{item.price | filterEmpty}}</el-col>
                    <el-col :span="6">
                        <div class="volumeratio">
                            <div class="buy" v-bind:style="{width: item.width+'%'}"/>
                        </div>
                    </el-col>
                    <el-col :span="6">{{item.volume | filterEmpty}}</el-col>
                </el-row>
            </div>
        </el-form-item>
    </el-form>

</template>

<script>
    import {constants} from "../api/constants";

    export default {
        name: "OrderBook",
        data() {
            return {
                hqtime: '--:--:--',
                hqtimestamp: 0,

                sell: [
                    {
                        name: "卖五",
                        price: -1,
                        volume: -1,
                        width: 10,
                    },
                    {
                        name: "卖四",
                        price: -1,
                        volume: -1,
                        width: 25,
                    },
                    {
                        name: "卖三",
                        price: -1,
                        volume: -1,
                        width: 40,
                    },
                    {
                        name: "卖二",
                        price: -1,
                        volume: -1,
                        width: 30,
                    },
                    {
                        name: "卖一",
                        price: -1,
                        volume: -1,
                        width: 70,
                    }
                ],
                buy: [
                    {
                        name: "买一",
                        price: -1,
                        volume: -1,
                        width: 75,
                    },
                    {
                        name: "买二",
                        price: -1,
                        volume: -1,
                        width: 27,
                    },
                    {
                        name: "买三",
                        price: -1,
                        volume: -1,
                        width: 1,
                    },
                    {
                        name: "买四",
                        price: -1,
                        volume: -1,
                        width: 41,
                    },
                    {
                        name: "买五",
                        price: -1,
                        volume: -1,
                        width: 10,
                    },
                ],
                intervalId: 0

            }
        },
        created() {
            this.$bus.on("codeinput-selected", this.startL1Sub);
        },
        beforeDestroy() {
            this.$bus.off("codeinput-selected", this.startL1Sub);
        },
        filters: {
            filterEmpty(value){
                if(value === -1){
                    return '-';
                }else{
                    return value;
                }
            }
        },
        methods: {
            startL1Sub(item){
                let code = item.code;
                let vm = this;
                this.resetData(true);
                this.intervalId = setInterval(() => {
                    vm.$eventBus.send("l1-market-data", {},
                        {
                         code: code
                        }, (err, reply) => {
                        if(err){
                            console.error("subscribe" + item.code + "l1 market data fail", err);
                        }else{
                            let l1MarketData = JSON.parse(reply.body);
                            if(l1MarketData == null){
                                return;
                            }
                            if(code != l1MarketData.code){
                                console.error("wrong code! code= " + code + ",recv code= " + l1MarketData.code);
                                return;
                            }
                            if(l1MarketData.timestamp < vm.hqtimestamp){
                                return;
                            }

                            //display hq
                            this.resetData(false);

                            vm.hqtimestamp = l1MarketData.timestamp;
                            vm.hqtime = moment(vm.hqtimestamp).format("HH:mm:ss");
                            let buyPrices = l1MarketData.buyPrices;
                            let buyVolumes = l1MarketData.buyVolumes;
                            let maxBuyVolume = -1;

                            for(let i=0; i< buyPrices.length; i++){
                                vm.buy[i].price = (buyPrices[i] / constants.MULTI_FACTOR).toFixed(2);
                                vm.buy[i].volume = buyVolumes[i];
                                if(buyVolumes[i] > maxBuyVolume){
                                    maxBuyVolume = buyVolumes[i];
                                }
                            }
                            for(let i = 0; i < buyVolumes.length; i++){
                                if(maxBuyVolume != 0){
                                    vm.buy[i].width = Math.floor(buyVolumes[i] / maxBuyVolume * 100);
                                }else{
                                    vm.buy[i].width = 1;
                                }
                            }

                            let sellPrices = l1MarketData.sellPrices;
                            let sellVolumes = l1MarketData.sellVolumes;
                            let maxSellVolume = -1;

                            for(let i=0; i< sellPrices.length; i++){
                                vm.sell[4-i].price = (sellPrices[i] / constants.MULTI_FACTOR).toFixed(2);
                                vm.sell[4-i].volume = sellVolumes[i];
                                if(sellVolumes[i] > maxSellVolume){
                                    maxSellVolume = sellVolumes[i];
                                }
                            }
                            for(let i = 0; i < sellVolumes.length; i++){
                                if(maxSellVolume != 0){
                                    vm.sell[4-i].width = Math.floor(sellVolumes[i] / maxSellVolume * 100);
                                }else{
                                    vm.sell[4-i].width = 1;
                                }
                            }


                        }
                        })
                }, 1000)
            },
            resetData(isClearInterval){
                this.hqtime = "--:--:--";
                this.hqtimestamp = 0;
                this.buy.forEach(t => {
                   t.price = -1;
                   t.volume = -1;
                   t.width = 1;
                });

                this.sell.forEach(t => {
                    t.price = -1;
                    t.volume = -1;
                    t.width = 1;
                });

                if(this.intervalId != -1 && isClearInterval){
                    clearInterval(this.intervalId);
                    this.intervalId = -1;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .orderBook {
        border: 1px solid #909399;;
        margin-left: 5%;
        margin-right: 5%;

        .el-row {
            .el-col {
                height: 35px;
                line-height: 35px;
            }
        }

        .volumeratio {
            margin: 10px auto;
            border: none;

            .sell {
                height: 10px;
                background: #67C23A;
            }

            .buy {
                height: 10px;
                background: #F56C6C;
            }
        }
    }
</style>
