<template>
  <el-container>
    <el-header>
      <nav-bar></nav-bar>
    </el-header>
    <el-container>
      <el-main>
        <work></work>
      </el-main>
    </el-container>
    <el-footer> </el-footer>
  </el-container>
</template>

<script>
import NavBar from "../components/navBar/NavBar";
import Work from '../components/work/Work.vue'
export default {
  components: { NavBar,Work },
  data() {
    return {
      activeName: "institutes",
    };
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
.el-container {
  min-height: calc(100vh);
}
.tabsContainer {
  margin: 0 60px;
}
</style>