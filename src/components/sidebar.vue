<template>
    <div class="sidebar">

    </div>
</template>

<script>
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'dashboard',
                        title: '资金股份'
                    },
                    {
                        icon: 'el-icon-s-order',
                        index: 'buy',
                        title: '买入'
                    },
                    {
                        icon: 'el-icon-sell',
                        index: 'sell',
                        title: '卖出'
                    },
                    {
                        icon: 'el-icon-search',
                        index: '3',
                        title: '查询',
                        subs: [
                            {
                                index: 'orderquery',
                                title: '当日委托'
                            },
                            {
                                index: 'tradequery',
                                title: '当日成交'
                            },
                            {
                                index: 'hisorderquery',
                                title: '历史委托'
                            },
                            {
                                index: 'histradequery',
                                title: '历史成交'
                            },
                        ]
                    },

                    {
                        icon: 'el-icon-bank-card',
                        index: '4',
                        title: '银证业务',
                        subs: [
                            {
                                index: 'transfer',
                                title: '银证转账'
                            },
                            {
                                index: 'transferquery',
                                title: '转账查询'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'pwdsetting',
                        title: '修改密码'
                    },


                ]
            };
        },
        name: "sidebar"
    }
</script>

<style lang="scss">
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;


        .el-menu-item {
            min-width: 150px;
        }

        li {
            text-align: left;
            .el-tooltip {
                width: auto ! important;
            }
        }

        /*下拉导航菜单多出1px*/
        .el-menu {
            border-right-width: 0;
        }

        .el-menu--collapse{
            width: auto ! important;
        }
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 150px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
