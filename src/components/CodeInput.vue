<template>
    <el-autocomplete
            v-model="state"
            style="width: 100%"
            size="small"
            placeholder="Code"
            :fetch-suggestions="querySearchAsync"
            :trigger-on-focus="false"
            :debounce=100
            @select="updateInput"/>
</template>

<script>
    import {queryCode} from "../api/orderApi";

    export default {
        name: "CodeInput",
        data: function(){
            return {
                state: '',
            }
        },
        methods: {
            querySearchAsync(queryString, callback){
                queryCode({
                    key: queryString
                }).then(res => {
                    if(res.data.success === true){
                        let resData = res.data.data;
                        for(let i of resData){
                            i.value = ('000000' + i.code).slice(-6) + '--' + i.name;
                        }
                        let list = resData;
                        callback(list);
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
            },
            updateInput(item){
                this.state = ('000000' + item.code).slice(-6);
                this.$bus.emit("codeinput-selected", item);
            }
        }
    }
</script>

<style lang="scss">
    .wide-dropdown {
        width: 600px !important;
    }
</style>
