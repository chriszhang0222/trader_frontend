<template>
    <div>
        <el-table
        :data="tableData.slice((query.currentPage-1)*query.pageSize,  query.currentPage * query.pageSize)"
        border
        :cell-style="cellStyle"
        style=" width: 100%;font-size: 14px;"
        :default-sort="{prop:'time',order:'descending'}"
        @sort-change="changeTableSort"
        >
            <el-table-column prop="time" label="Time" align="center"
                             sortable :sort-orders="['ascending', 'descending']"/>
            <el-table-column prop="code" label="Stock Code" align="center"/>
            <el-table-column prop="name" label="Name" align="center"/>
            <el-table-column prop="price" label="Price" align="center"/>
            <el-table-column prop="ocount" label="Amount" align="center"/>
            <el-table-column prop="direction" label="Direction" align="center"/>
            <el-table-column prop="status" label="Status" align="center"/>
            <el-table-column width="85">
                <template slot-scope="scope">
                    <el-button
                            v-show="isCancelBtnShow(scope.row.status)"
                            type="primary"
                            size="mini"
                            @click="handleCancel(scope.$index, scope.row)"
                    >Cancel Order
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-button round
                       type="primary" size="mini"
                       style="margin-top:2px;float: right"
                       icon="el-icon-refresh"
                       >
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
        name: "OrderList",
        data() {
            return {
                tableData: [
                    {
                        time: '09:55:00',
                        code: '000001',
                        name: 'TD Bank',
                        price: 100,
                        ocount: 10,
                        direction: 'Buy In',
                        status: 3
                    },
                    {
                        time: '09:50:00',
                        code: '000001',
                        name: 'TD Bank',
                        price: 100,
                        ocount: 10,
                        direction: 'Buy In',
                        status: 1
                    },
                    {
                        time: '09:40:00',
                        code: '000001',
                        name: 'TD Bank',
                        price: 100,
                        ocount: 10,
                        direction: 'Buy In',
                        status: 3
                    }
                ],
                query: {
                    currentPage: 1, // 当前页码
                    pageSize: 2 // 每页的数据条数
                }
            };
        },
        methods: {
            handleCancel(index, row){

            },
            isCancelBtnShow(status) {
                if (status == 3 || status == 5) {
                    return true;
                } else {
                    return false;
                }
            },
            cellStyle({row, column, rowIndex, columnIndex}) {
                return "padding:2px;";
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'currentPage', val);
            },
            //处理排序
            changeTableSort(column) {
                let sortingType = column.order;
                let fieldName = column.prop;
                if (fieldName === "time") {
                    if (sortingType == "descending") {
                        this.tableData = this.tableData.sort((a, b) => {
                                if (b[fieldName] > a[fieldName]) {
                                    return 1;
                                } else if (b[fieldName] === a[fieldName]) {
                                    return 0;
                                } else {
                                    return -1;
                                }
                            }
                        );
                    } else {
                        this.tableData = this.tableData.sort((a, b) => {
                            if (b[fieldName] > a[fieldName]) {
                                return -1;
                            } else if (b[fieldName] === a[fieldName]) {
                                return 0;
                            } else {
                                return 1;
                            }
                        });
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
