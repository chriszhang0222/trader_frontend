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
                                 :min="0.01"/>
            </el-form-item>
            <el-form-item :label="(direction === 0 ? 'Buy In' : 'Sell Out')">
                <el-input-number v-model="volume" controls-position="right"
                                 :min="0" :max="affordCount"/>
            </el-form-item>
            <el-form-item>
                <el-button :type="direction === 0 ? 'danger' : 'success'"
                           :size="'large'"
                           style="float: right;width:100%;">
                    {{ direction === 0 ? 'Buy In' : 'Sell Out'}}

                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import CodeInput from "./CodeInput";
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
