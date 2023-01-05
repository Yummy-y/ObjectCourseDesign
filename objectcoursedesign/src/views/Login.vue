<template>
  <div class="container">
    <div class="loginArea">
      <h2 class="title">登录智慧食堂</h2>
      <el-form
      v-if="flag==1"
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm loginForm"
      >
        <el-form-item label="用户名" prop="account">
          <el-input v-model.number="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button type="primary" @click="flag=3"
            >注册</el-button
          >
          <el-button type="primary" @click="flag=2"
            >工作人员登录</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
      <el-form
      v-if="flag==2"
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm loginForm"
      >
        <el-form-item label="用户名" prop="account">
          <el-input v-model.number="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="workerSubmitForm('ruleForm')"
            >登录</el-button
          >
          <el-button type="primary" @click="flag=1"
            >学生登录</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>

      <!-- 注册 -->
      <el-form
      v-if="flag==3"
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm loginForm"
      >
        <el-form-item label="用户名" prop="password">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input  v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="password">
          <el-input  v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="password">
          <el-input  v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerSubmitForm('ruleForm')"
            >注册</el-button
          >
          <el-button type="primary" @click="flag=1"
            >学生登录</el-button
          >
          <el-button type="primary" @click="flag=2"
            >工作人员登录</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: 1,
      registerForm: {
        password: "",
        username: "",
        name: "",
        phone:''
      },
      loginForm: {
        password: "",
        account: "",
        isLogin: false,
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 位", trigger: "blur" },
        ],
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "长度在 2 到 25 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async login() {
      let result = await this.$axios({
        method: "post",
        url: "/api/user/login",
        data: {
          password: this.loginForm.password,
          username: this.loginForm.account,
        },
      });
      console.log(result.data);
      if (result.data.code == 200) {
        // 登录成功 将用户信息存入本地
        window.localStorage.setItem("username", result.data.data.username);
        window.localStorage.setItem("name", result.data.data.name);
        window.localStorage.setItem("phone", result.data.data.phone);
        window.localStorage.setItem("uid", result.data.data.id);
        // 存入用户信息
        this.$store.commit("updataUserInfo", result.data.data.user);
        // 修改vuex中的登录状态
        this.$store.commit("updataIsLogin", true);
        //同步isLogin值
        this.isLogin = this.$store.state.isLogin;
        // 鉴别身份 跳转页面
        this.$router.push('/student')
        this.$message.success('登录成功');
      }
      else if(result.data.code == -1){
        this.$message.error('登录失败，请检查账号密码或网络！');
      }
    },
    async workerlogin() {
      let result = await this.$axios({
        method: "post",
        url: "/api/worker/login",
        data: {
          password: this.loginForm.password,
          username: this.loginForm.account,
        },
      });
      console.log(result.data);
      if (result.data.code == 200) {
        console.log(result.data.data);
        // 登录成功 将用户信息存入本地
        window.localStorage.setItem("username", result.data.data.username);
        window.localStorage.setItem("name", result.data.data.name);
        window.localStorage.setItem("phone", result.data.data.phone);
        window.localStorage.setItem("uid", result.data.data.id);
        // 存入用户信息
        this.$store.commit("updataUserInfo", result.data.data.user);
        // 修改vuex中的登录状态
        this.$store.commit("updataIsLogin", true);
        //同步isLogin值
        this.isLogin = this.$store.state.isLogin;
        // 鉴别身份 跳转页面
        this.$router.push('/admin')
        this.$message.success('登录成功');
      }
      else if(result.data.code == -1){
        this.$message.error('登录失败，请检查账号密码或网络！');
      }
    },
    async register() {
      let result = await this.$axios({
        method: "post",
        url: "/api/user/save",
        data: this.registerForm
      });
      console.log(result.data);
      if (result.data.code == 200) {
        this.$message.success('注册成功！');
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          this.$message.error("error submit!!");
          return false;
        }
      });
    },
    workerSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.workerlogin();
        } else {
          this.$message.error("error submit!!");
          return false;
        }
      });
    },
    registerSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
@import "./style.css";

.container {
  padding-top: 150px;
  background-image: linear-gradient(to right bottom, #00a2ff, #4592df, #95bdeb);
  height: calc(100vh);
  .loginArea {
    background-color: #fff;
    width: 30%;
    margin: 0 auto;
    padding: 30px 80px 20px 0;
    border-radius: 6px;
    .loginFrom {
      padding: 30px !important;
      border-radius: 20px;
    }
  }
  .title {
    padding-bottom: 25px;
    margin-left: 45px;
  }
}
</style>