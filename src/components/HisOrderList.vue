<template>
    <div>
        <div class="handle-box">
            <el-row>
                <el-col :span="4">
                    <code-input/>
                </el-col>
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
                <el-button style="float: left" size="small" type="primary" icon="el-icon-search"
                           @click="handleSearch">
                    Search
                </el-button>
            </el-row>
        </div>
        <el-table
                :data="tableData.slice( (query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)"
                border
                :cell-style="cellStyle"
                @sort-change="changeTableSort">
            >
            <el-table-column prop="date" label="Date" align="center"
                             sortable :sort-orders="['ascending', 'descending']"/>
            <el-table-column prop="time" label="Time" align="center"/>
            <el-table-column prop="code" label="Stock Code" align="center"/>
            <el-table-column prop="name" label="Name" align="center"/>
            <el-table-column prop="price" label="Price" align="center"/>
            <el-table-column prop="ocount" label="Amount" align="center"/>
            <el-table-column prop="status" label="Status" align="center"/>
        </el-table>
        <div class="pagination">
            <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.currentPage"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"/>
        </div>
    </div>
</template>

<script>
    import CodeInput from "./CodeInput";
    import moment from 'moment';
    export default {
        name: "HisOrderList",
        components: {CodeInput},
        data: function(){
            return {
                tableData: [
                    {
                        date: '20200105',
                        time: '14:00:01',
                        code: 600000,
                        name: 'CITI BANK',
                        price: 10,
                        ocount: 100,
                        status: 1
                    },
                    {
                        date: '20200101',
                        time: '14:00:02',
                        code: 600000,
                        name: 'CITI BANK',
                        price: 11,
                        ocount: 100,
                        status: 1
                    },
                    {
                        date: '20200103',
                        time: '14:00:03',
                        code: 600000,
                        name: 'CITI BANK',
                        price: 12,
                        ocount: 100,
                        status: 1
                    },
                    {
                        date: '20200111',
                        time: '14:00:04',
                        code: 600000,
                        name: 'CITI BANK',
                        price: 13,
                        ocount: 100,
                        status: 1
                    },
                ],
                query: {
                    currentPage: 1,
                    pageSize: 3,
                    code: '',
                    startDate: '',
                    endDate: ''
                },
                pageTotal: 4,
            }
        },
        created() {
            let _today = moment();
            this.query.endDate = _today.subtract(1, 'days').format('YYYYMMDD');
            this.query.startDate = _today.subtract(8, 'days').format('YYYYMMDD');
            this.$bus.on("codeinput-selected", this.updateSelectCode);
        },
        beforeDestroy() {
            this.$bus.off("codeinput-selected", this.updateSelectCode);
        },
        methods: {
            cellStyle({row, column, rowIndex, columnIndex}) {
                return "padding:2px;";
            },
            updateSelectCode(item) {
                this.query.code = item.code;
            },
            handleSearch(){
              this.$set(this.query, 'currentPage', 1);

            },
            handlePageChange(val){
                this.$set(this.query, 'currentPage', val);
            },
            changeTableSort(column){
                let sortingType = column.order;
                let fieldName = column.prop;
                if(sortingType === 'descending'){
                    this.tableData = this.tableData.sort((a, b) => {
                        if(b[fieldName] > a[fieldName]){
                            return 1;
                        }else if(b[fieldName] === a[fieldName]){
                            return 0;
                        }else{
                            return -1;
                        }
                    })
                }else{
                    this.tableData = this.tableData.sort((a, b) => {
                        if(b[fieldName] > a[fieldName]){
                            return -1;
                        }else if(b[fieldName] === a[fieldName]){
                            return 0;
                        }else{
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
