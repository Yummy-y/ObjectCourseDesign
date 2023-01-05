<template>
  <div class="navbarContainer">
    <div class="userInfo">
      <div class="username">账户：{{ userInfo.username }}</div>
      <div class="username">用户名：{{ userInfo.name }}</div>
      <div class="username">用户手机号：{{ userInfo.phone }}</div>
    </div>
    <div class="btn"><el-button type="success" plain @click="loginOut"
            >退出登录</el-button
          ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.userInfo.username = window.localStorage.getItem("username");
    this.userInfo.name = window.localStorage.getItem("name");
    this.userInfo.phone = window.localStorage.getItem("phone");
    this.userInfo.id = window.localStorage.getItem("uid");
    console.log(this.userInfo);
  },
  methods: {
    loginOut() {
      this.$router.push('/login')
    },
    async 方法名() {
      let result = await this.$axios.get("/url");
      console.log(result);
      this.d = result.data;
    },
  },
};
</script>

<style lang="less" scoped>
.navbarContainer {
  .btn {
    position: absolute;
    right: 30px;
    top: 10px;
  }
  background-color: rgb(67, 185, 249);
  height: 100%;
  display: flex;
  position: relative;
  .userInfo {
    display: flex;
    padding: 0 30px;
  }
  .username {
    color: #fff;
    font-size: 20px;
    margin-left: 15px;
    padding-top: 15px;
  }
  .avatar {
    margin-top: 5px;
    height: 50px;
    width: 50px;
    img {
      border-radius: 50%;
      height: 100%;
      width: 100%;
    }
  }
}
</style>