<template>
    <div class="orderForm">
        <el-form label-width="100px">
            <el-form-item>
                <h3 :style="direction === 0 ? 'color: #F56C6C' : 'color: #67C23A'">
                    {{direction === 0 ? 'Buy In' : 'Sell Out'}} Stock
                </h3>
            </el-form-item>
            <el-form-item label="Stock Code">
                <code-input/>
            </el-form-item>
            <el-form-item label="Stock Name">
                <el-input readonly v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="Affordable Count">
                <el-input readonly v-model="affordCount"/>
            </el-form-item>
            <el-form-item label="price">
                <el-input-number v-model="price"
                                 controls-position="right"
                                 :step="0.01"
                                 :min="0.01"
                                 @change="handlePrice"
                />
            </el-form-item>
            <el-form-item :label="(direction === 0 ? 'Buy In' : 'Sell Out')">
                <el-input-number v-model="volume" controls-position="right"
                                 :min="0" :max="affordCount"/>
            </el-form-item>
            <el-form-item>
                <el-button :type="direction === 0 ? 'danger' : 'success'"
                           :size="'large'"
                           style="float: right;width:100%;"
                @click="onOrder">
                    {{ direction === 0 ? 'Buy In' : 'Sell Out'}}

                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import CodeInput from "./CodeInput";
    import {sendOrder} from "../api/orderApi";
    import {constants} from "../api/constants";
    import moment from 'moment';

    export default {
        name: "OrderWidget",
        components: {CodeInput},
        data(){
            return {
                code: '',
                name: '',
                price: undefined,
                affordCount: undefined,
                volume: undefined
            }
        },
        props: {
            direction: {
                type: Number,
                required: true
            }
        },
        created() {
            console.log('orderwidget');
            this.$bus.on("codeinput-selected", this.updateSelectCode);
        },
        beforeDestroy() {
            this.$bus.off("codeinput-selected",  this.updateSelectCode);
        },
        methods: {
            handlePrice(){
                if(this.direction === constants.SELL){
                    let posiArr = this.$store.state.posiData;
                    for(let i=0; i< posiArr.length; i++){
                        if(posiArr[i].code === this.code){
                            this.affordCount = posiArr[i].count;
                        }
                    }
                }else{
                    this.affordCount = parseInt(
                        (this.$store.state.balance/constants.MULTI_FACTOR/this.price)
                    );
                }
            },
            onOrder(){
              sendOrder({
                  uid: sessionStorage.getItem("uid"),
                  type: constants.NEW_ORDER,
                  timestamp: moment.now(),
                  code: this.code,
                  direction: this.direction,
                  ordertype: constants.LIMIT,
                  price: this.price * constants.MULTI_FACTOR,
                  volume: this.volume
              }, (res)=> {
                    if(res.success){
                        this.$message.success('Order saved succsfully')
                    }else{
                        this.$message.error(res.message);
                    }
              })
            },
            updateSelectCode(item) {
                this.code = item.code;
                this.name = item.name;
                this.price = undefined;
                this.volume = undefined;
                // if (this.direction === constants.SELL) {
                //     let posiArr = this.$store.state.posiData;
                //     for (let i = 0, len = posiArr.length; i < len; i++) {
                //         if (posiArr[i].code == item.code) {
                //             this.affordCount = posiArr[i].count;
                //             break;
                //         }
                //     }
                // }
            },
        }
    }
</script>

<style lang="scss">
    .orderForm {
        input {
            text-align: center;
        }

        .el-input-number {
            width: 100%;
        }
    }

</style>
