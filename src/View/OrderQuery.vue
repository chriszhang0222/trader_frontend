<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-order"></i> Query
                </el-breadcrumb-item>
                <el-breadcrumb-item>Today's Entrust</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="container">
            <order-list/>
        </el-card>

    </div>
</template>

<script>
    import OrderList from "../components/OrderList";
    export default {
        name: "OrderQuery",
        components: {
            OrderList,
        },
    }
</script>

<style scoped>

</style>
