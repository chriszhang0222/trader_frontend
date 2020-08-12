<template>
    <el-autocomplete
    v-model="state"
    style="width: 100%"
    size="small"
    placeholder="Code"
    :trigger-on-focus="false"
    :debounce=100
    :fetch-suggestions="querySearchAsync"
    @select="updateInput"
    >

    </el-autocomplete>
</template>

<script>
    export default {
        name: "CodeInput",
        data: function(){
            return {
                state: '',
            }
        },
        methods: {
            querySearchAsync(queryString, callback){
                let list = [
                    {
                        code: 1,
                        name: 'Bank of America',
                        value: '000001-BOA'
                    },
                    {
                        code: 600000,
                        name: 'CITI Bank',
                        value: '600000-CITI'
                    }
                ];
                callback(list);
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
