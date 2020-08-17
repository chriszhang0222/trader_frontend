<template>
    <div class="header">
        <div class="collapse-btn" v-on:click="collapseChange">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">Quantum Trade</div>
        <div class="header-right">
            <div class="header-user-con">
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">Logout</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>


    </div>
</template>

<script>
    import {logout} from '../api/loginApi.js';
    export default {
        name: "Header",
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChange();
            }
        },
        computed: {
            username(){
               let name = sessionStorage.getItem("name");
               return name === null ? "User" : name
            }
        },
        data: function(){
            return {
                collapse: true,
                fullscreen: false,
                message: 2,

            }
        },
        methods: {
            handleCommand(command){
                if(command === 'logout'){
                    logout();
                }
            },
            collapseChange(){
                this.collapse = !this.collapse;
                this.$bus.emit("collapse", this.collapse);
            }
        }

    }
</script>

<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
        background: #1e4632;
    }

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }

    .header .logo {
        float: left;
        width: 250px;
        line-height: 70px;
    }

    .header-right {
        float: right;
        padding-right: 50px;
    }

    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator {
        margin-left: 20px;
    }

    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
