<template>
    <div>
        <div class="handle-box">
            <el-row>
                <el-col :span="5">
                    <code-input style="float: left"></code-input>
                </el-col>
                <el-col :span="12">
                    <div style="float: left;margin-left: 10px">
                        <el-date-picker
                                size="small"
                                type="date"
                                placeholder="StartDate"
                                v-model="query.startDate"
                                value-format="yyyyMMdd"/>
                        -
                        <el-date-picker
                                size="small"
                                type="date"
                                style="margin-right: 5px"
                                placeholder="EndDate"
                                v-model="query.endDate"
                                value-format="yyyyMMdd"/>
                    </div>
                </el-col>
                <el-col :span="2">
                    <el-button style="float: left" size="small" type="primary" icon="el-icon-search"
                               @click="handleSearch">Search
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <el-table
                :data="tableData.slice( (query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)"
                border
                :cell-style="cellStyle"
                style=" width: 100%;font-size: 14px;"
                @sort-change="changeTableSort">
            >
            <el-table-column prop="date" label="Deal Date" align="center" />
            <el-table-column prop="time" label="Deal Time" align="center"/>
            <el-table-column prop="code" label="Stock Code" align="center"/>
            <el-table-column prop="name" label="Name" align="center"/>
            <el-table-column prop="price" label="Price" align="center"/>
            <el-table-column prop="tcount" label="Amount" align="center"/>
            <el-table-column label="Deal Amount" align="center"/>
            <el-table-column label="Direction" align="center"/>
        </el-table>
        <div class="pagination">
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import CodeInput from "./CodeInput";
    import moment from 'moment';
    export default {
        name: "HisTradeList",
        components: {CodeInput},
        created() {
            let _today = moment();
            this.query.endDate = _today.subtract(1, 'days').format('YYYYMMDD');
            this.query.startDate = _today.subtract(8, 'days').format('YYYYMMDD');
            this.$bus.on("codeinput-selected", this.updateSelectCode);
        },
        beforeDestroy() {
            this.$bus.off("codeinput-selected", this.updateSelectCode);
        },
        data() {
            return {
                tableData: [],
                query: {
                    pageIndex: 1,
                    startDate: '',
                    endDate: '',
                    code: '',
                    currentPage: 1, // 当前页码
                    pageSize: 4 // 每页的数据条数
                },
                pageTotal: 0,
            };
        },
        methods: {
            handleSearch(){

            },
            updateSelectCode(item){
                this.query.code = item.code;
            },
            handlePageChange(val){
              this.$set(this.query, 'currentPage', val);
            },
            changeTableSort(column) {
                let sortingType = column.order;
                let fieldName = column.prop;
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
            },
            cellStyle({row, column, rowIndex, columnIndex}) {
                return "padding:2px;";
            },
        }
    }
</script>

<style scoped>

</style>
