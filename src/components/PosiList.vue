<template>
    <div>
        <el-row>
            <el-col :span="5">
                Available Balance: {{balance}}
            </el-col>
        </el-row>
        <el-table
        :data="tableData.slice((query.currentPage-1)*query.pageSize, query.currentPage * query.pageSize)"
        border
        :cell-style="cellStyle"
        @sort-change="changeTableSort">
            <el-table-column prop="code" label="Code" align="center"
                             sortable :sort-orders="['ascending', 'descending']"
                             :formatter="codeFormatter"
            />
            <el-table-column prop="name" label="Name" align="center"/>
            <el-table-column prop="count" label="Amount" align="center"/>
            <el-table-column prop="cost" label="Total Investment" align="center" :formatter="moneyFormatter"/>
            <el-table-column label="Cost" align="center" :formatter="costFormatter"/>

        </el-table>
        <div class="pagination">
            <el-button round type="primary" size="mini"
            style="margin-top: 2px; float: right"
            icon="el-icon-fresh"
            @click="queryFresh">Refresh</el-button>
            <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.currentPage"
                    :page-size="query.pageSize"
                    :total="dataTotalCount"
                    @current-change="handlePageChange">

            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {constants} from "../api/constants";
    import {codeFormat, moneyFormat} from "../api/formatter";
    import {queryBanalce, queryPosiData} from "../api/orderApi";

    export default {
        name: "PosiList",
        data: function(){
            return {
                balance: 10,
                query: {
                    currentPage: 1,
                    pageSize: 2
                },
                tableData: [],
                dataTotalCount: 0,
            }
        },
        created() {
            this.tableData = this.posiData;
            this.dataTotalCount = this.posiData.length;
            this.balance = this.balanceData;
        },
        computed: {
          posiData(){
              return this.$store.state.posiData;
          },
          balanceData(){
              return moneyFormat(this.$store.state.balance);
          }
        },
        watch: {
          posiData: function(val){
              this.tableData = val;
              this.dataTotalCount = val.length;
          },
          balanceData: function (val) {
                this.balance = val;
          }
        },
        methods: {
            // 分页导航
            queryFresh(){
              queryPosiData();
              queryBanalce();
            },
            costFormatter(row, column){
              return (row.cost / constants.MULTI_FACTOR/row.count).toFixed(2);
            },
            moneyFormatter(row, column){
              return moneyFormat(row.cost);
            },
            codeFormatter(row, column){
              return codeFormat(row.code);
            },
            handlePageChange(val) {
                this.$set(this.query, 'currentPage', val);
            },

            //处理排序
            changeTableSort(column) {
                let fieldName = column.prop;
                if (column.order == "descending") {
                    this.tableData = this.tableData.sort((a, b) => b[fieldName] - a[fieldName]);
                } else {
                    this.tableData = this.tableData.sort((a, b) => a[fieldName] - b[fieldName]);
                }
            },

            cellStyle({row, column, rowIndex, columnIndex}) {
                return "padding:2px";
            },
        },
    }
</script>

<style scoped>

</style>
