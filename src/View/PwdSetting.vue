<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-setting"></i>Reset Password
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="container">
            <el-row style="padding:0 15% ;">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="Old Password">
                        <el-input :type="'password'" v-model="form.oldpassword"/>
                    </el-form-item>
                    <el-form-item label="New Password">
                        <el-input :type="'password'" v-model="form.newpassword"/>
                    </el-form-item>
                    <el-form-item label="Confirm Password">
                        <el-input :type="'password'" v-model="form.newpasswordcfm"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="float: right" size="small" type="primary">Confirm</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "PwdSetting",
        data() {
            return {
                form: {
                    oldpassword: '',
                    newpassword: '',
                    newpasswordcfm: '',
                }
            };
        },
    }
</script>

<style scoped>

</style>
