<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <i class="el-icon-setting"></i>Reset Password
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="container">
            <el-row style="padding:0 15% ;">
                <el-form ref="form" :model="form" label-width="120px" :rules="rules">
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
                        <el-button style="float: right" size="small" type="primary" @click="submitForm()">Confirm</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-card>

    </div>
</template>

<script>
    import {changePassword} from '../api/loginApi';
    import encryptMD5 from "js-md5";
    export default {
        name: "PwdSetting",
        data() {
            return {
                form: {
                    oldpassword: '',
                    newpassword: '',
                    newpasswordcfm: '',
                    uid: ''
                },
                rules: {
                    oldpassword: [{required: true, message: 'Please input account', trigger: 'blur'}],
                    newpassword: [{required: true, message: 'Please input password', trigger: 'blur'}],
                    newpasswordcfm: [{required: true, message: 'Please input captcha', trigger: 'blur'}]
                },
            };
        },
        methods: {
            submitForm(){
                let vm = this;
                if(this.form.newpassword !== this.form.newpasswordcfm){
                    this.$message.error('New Password and Confirm are not same!');
                    return;
                }
                changePassword({
                    uid: sessionStorage.getItem("uid"),
                    oldPassword: encryptMD5(this.form.oldpassword),
                    newPassword: encryptMD5(this.form.newpassword)
                }, (res) => {
                    if(res.success == true){
                        this.$message.success("Save password successfully!");
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
