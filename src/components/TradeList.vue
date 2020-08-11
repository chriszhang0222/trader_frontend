<template>
    <div>
        <el-table
        :data="tableData.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)"
        border
        :cell-style="cellStyle"
        style=" width: 100%;font-size: 14px;"
        :default-sort="{prop:'time', order:'descending'}"
        @sort-change="changeTableSort">
            <el-table-column prop="time" label="Completed Time" align="center"/>
            <el-table-column prop="code" label="Stock Code" align="center"/>
            <el-table-column prop="name" label="Name" align="center"/>
            <el-table-column prop="price" label="Price" align="center"/>
            <el-table-column prop="count" label="Count" align="center"/>
            <el-table-column label="Balance" align="center"/>
            <el-table-column label="Direction" align="center"/>

        </el-table>
        <div class="pagination">
            <el-button round
                       type="primary" size="small"
                       style="margin-top:2px;float: right"
                       icon="el-icon-refresh"
                       @click="">
                Refresh
            </el-button>
            <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.currentPage"
                    :page-size="query.pageSize"
                    :total="3"
                    @current-change="handlePageChange"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TradeList",
        data(){
            return {
                tableData: [
                    {
                        time: '09:55:00',
                        code: '000001',
                        name: 'Bank of America',
                        price: 100,
                        tcount: 10,
                    },
                    {
                        time: '09:50:00',
                        code: '000001',
                        name: 'Bank of America',
                        price: 100,
                        tcount: 10,
                    },
                    {
                        time: '09:40:00',
                        code: '000001',
                        name: 'CITI Bank',
                        price: 100,
                        tcount: 10,
                    }
                ],
                query: {
                    currentPage: 1,
                    pageSize: 4
                }
            }
        },
        methods:{
            cellStyle({row, column, rowIndex, columnIndex}) {
                return "padding:2px;";
            },
            handlePageChange(val) {
                this.$set(this.query, 'currentPage', val);
            },
            changeTableSort(column){
                let sortingType = column.order;
                let fieldName = column.prop;
                if(fieldName === "time"){
                    if(sortingType === "descending"){
                        this.tableData = this.tableData.sort((a,b) => {
                            if(b[fieldName] > a[fieldName]){
                                return 1;
                            }else if(b[fieldName] === a[fieldName]){
                                return 0;
                            }else{
                                return -1;
                            }
                        })
                    }
                }else{
                    this.tableData = this.tableData.sort((a,b) => {
                        if(b[fieldName] > a[fieldName]){
                            return -1;
                        }else if(b[fieldName] === a[fieldName])
                            return 0;
                        else{
                            return 1;
                        }
                    })
                }
            }

        }
    }
</script>

<style scoped>

</style>
