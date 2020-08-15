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
            />
            <el-table-column prop="name" label="Name" align="center"/>
            <el-table-column prop="count" label="Amount" align="center"/>
            <el-table-column prop="cost" label="Total Investment" align="center"/>
            <el-table-column label="Cost" align="center"/>

        </el-table>
        <div class="pagination">
            <el-button round type="primary" size="mini"
            style="margin-top: 2px; float: right"
            icon="el-icon-fresh">Refresh</el-button>
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
    export default {
        name: "PosiList",
        data: function(){
            return {
                balance: 10,
                query: {
                    currentPage: 1,
                    pageSize: 2
                },
                tableData: [
                    {code: '600025', name: 'Apple Inc', count: 100, cost: 20},
                    {code: '600000', name: 'Amazon', count: 100, cost: 20},
                    {code: '000001', name: 'CITI Bank', count: 100, cost: 20},
                    {code: '600886', name: 'Version', count: 100, cost: 20},
                ],
                dataTotalCount: 4,
            }
        },
        methods: {
            // 分页导航
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
