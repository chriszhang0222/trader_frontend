<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-bank-card"></i>Transfer Query
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="container">
            <div class="handle-box" style="float: left">
                <el-date-picker
                        size="small"
                        type="date"
                        placeholder="Start Date"
                        v-model="query.startDate"
                        value-format="yyyyMMdd"/>
                -
                <el-date-picker
                        size="small"
                        type="date"
                        style="margin-right: 5px"
                        placeholder="End Date"
                        v-model="query.endDate"
                        value-format="yyyyMMdd"/>

                <el-button size="small" type="primary" icon="el-icon-search">
                    Search
                </el-button>
            </div>
            <el-table
            :data="tableData.slice((query.currentPage-1)*query.pageSize, query.currentPage*query.pageSize)"
            border
            style="font-size: 15px;"
            :cell-style="cellStyle"
            >
                <el-table-column prop="date" label="Date" align="center"
                                 sortable :sort-orders="['ascending', 'descending']"/>
                <el-table-column prop="time" label="Time" align="center"/>
                <el-table-column prop="type" :formatter="typeFormatter" label="Business Category" width="200" align="center"/>
                <el-table-column prop="moneytype" :formatter="moneytypeFormatter" label="Currency" align="center"/>
                <el-table-column prop="money" label="Amount" align="center"/>

            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.currentPage"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "TransferQuery",
        created() {
            let _today = moment();
            this.query.endDate = _today.format('YYYYMMDD');
            this.query.startDate = _today.subtract(8, 'days').format('YYYYMMDD');
        },
        data(){
            return {
                query:{
                    startDate: '',
                    endDate: '',
                    currentPage: 1, // 当前页码
                    pageSize: 2 // 每页的数据条数
                },
                tableData: [
                    {
                        date: "2020202",
                        time: "13:03:00",
                        type: 0,
                        moneytype: 0,
                        money: '1000',
                    },
                    {
                        date: "2020202",
                        time: "13:04:00",
                        type: 1,
                        moneytype: 1,
                        money: '10000',
                    },
                    {
                        date: "2020201",
                        time: "13:05:00",
                        type: 1,
                        moneytype: 1,
                        money: '10000',
                    },
                ],
                pageTotal: 3
            }
        },
        methods: {
            cellStyle({row, column, rowIndex, columnIndex}){
                return "padding:2px";
            },
            moneytypeFormatter(row, column){
              let moneyType = row.moneytype;
              switch (moneyType) {
                    case 0:
                        return 'Chinese Yuan';
                    case 1:
                        return 'US Dollar';
                    case 2:
                        return 'Canadian Dollar'
                    case 3:
                        return 'Others';

              }
            },
            typeFormatter(row, column){
                let type = row.type;
                switch (type) {
                    case 0:
                        return 'To Bank';
                    case 1:
                        return 'To Bond';
                    default:
                        return 'Unknown';
                }
            },
            handlePageChange(val){
                this.$set(this.query, 'currentPage', val);
            }
        }
    }
</script>

<style scoped>

</style>
