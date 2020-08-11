<template>
    <div class="sidebar">
        <el-menu
        class="sidebar-el-menu"
        background-color="#108048"
        text-color="#ffffff"
        active-text-color="#20a0ff"
        router
        unique-opened
        :collapse="collapse"
        :default-active="onRoutes">
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-menu-item :index="subItem.index"
                                          :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>

        </el-menu>
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
                        title: 'Dashboard'
                    },
                    {
                        icon: 'el-icon-s-order',
                        index: 'buy',
                        title: 'Buy'
                    },
                    {
                        icon: 'el-icon-sell',
                        index: 'sell',
                        title: 'Sell'
                    },
                    {
                        icon: 'el-icon-search',
                        index: '3',
                        title: 'Management',
                        subs: [
                            {
                                index: 'orderquery',
                                title: 'Order Query'
                            },
                            {
                                index: 'tradequery',
                                title: 'Trade Query'
                            },
                            {
                                index: 'hisorderquery',
                                title: 'History Trade'
                            },
                            {
                                index: 'histradequery',
                                title: 'History Order'
                            },
                        ]
                    },

                    {
                        icon: 'el-icon-bank-card',
                        index: '4',
                        title: 'Bank Card',
                        subs: [
                            {
                                index: 'transfer',
                                title: 'Transfer'
                            },
                            {
                                index: 'transferquery',
                                title: 'Transfer Query'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'pwdsetting',
                        title: 'Reset Password'
                    },


                ]
            };
        },
        computed: {
          onRoutes(){
              return this.$route.path.replace('/', '');
          }
        },
        created() {
            this.$bus.on("collapse", (msg) => {
               this.collapse = msg;
               this.$bus.emit("collapse-content", msg);
            });

        },
        beforeDestroy() {
            this.$bus.off("collapse", (msg) => {
                this.collapse = msg;
                this.$bus.emit("collapse-content", msg);
            })
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
