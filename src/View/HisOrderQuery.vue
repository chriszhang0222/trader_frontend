<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-order"></i> Query
                </el-breadcrumb-item>
                <el-breadcrumb-item>History Entrust</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="container">
            <his-order-list/>
        </el-card>

    </div>
</template>

<script>
    import HisOrderList from "../components/HisOrderList";
    export default {
        name: "HisOrderQuery",
        components: {
            HisOrderList,
        },
    }
</script>

<style scoped>

</style>
