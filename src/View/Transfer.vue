<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-bank-card"></i>Transfer
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="container">
            <el-row style="padding:0 15% ;">
                <el-form label-width="120px">
                    <el-form-item label="Transfer Method">
                        <el-select style="width: 100%" v-model="type">
                            <el-option v-for="item in form.type"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Bank Select">
                        <el-select style="width: 100%" v-model="bank">
                            <el-option v-for="item in form.bank"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.name"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Bank Password">
                        <el-input :type="'password'" v-model="form.password"/>
                    </el-form-item>
                    <el-form-item label="Money Type">
                        <el-select style="width: 100%" v-model="moneytype">
                            <el-option v-for="item in form.moneytype"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Balance">
                        <el-input v-model="form.money"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="float: right" size="small" type="primary" >Transfer</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Transfer",
        data(){
            return {
                form: {
                    bank: [{id: 0, name: 'Bank of America'}, {id:1, name:'CITI BANK'}],
                    type: [{id: 1, name: 'Bank transfer to Bond'}, {id: 0, name: 'Bond transfer to Bank'}],
                    moneytype: [{id:0, name:'US Dollars'}, {id: 1, name:'Chinese Yuan'}],
                    password: '',
                    money: 0
                },
                bank: 'Bank of America',
                type: 0,
                moneytype: 0
            }
        }
    }
</script>

<style scoped>

</style>
