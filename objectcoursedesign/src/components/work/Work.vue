<template>
  <div class="workContainer">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部订单" name="all">
        <div v-if="myOrderList.length == 0"><h1>暂无数据！</h1></div>
        <div
          :key="item.id"
          v-for="item in myOrderList"
          class="cateItem"
          v-show="flag"
        >
          <div class="orderInfo">
            <h2>订单用户号：{{ item.userId }}</h2>
            <h2>订单号：{{ item.id }}</h2>
            <h2>取餐桌：{{ item.tableNum }}</h2>
            <h2>创建时间：{{ item.createtime }}</h2>
            <h2>订单状态：{{ item.status == 0 ? "已完成" : "未完成" }}</h2>
          </div>
          <div class="orderDetail">
            <div class="detailTop">
              <div v-for="(it, index) in item.foodArr" :key="index">
                <div>{{ allCateList[it].name }}</div>
                <div class="detailImg"><img :src="foodImg[it]" alt="" /></div>
              </div>
            </div>
            <div class="detailBottom">
              <div v-for="(it2, index) in item.numArr" :key="index">
                <div>x {{ it2 }}</div>
              </div>
            </div>
          </div>
          <div class="orderbtn" v-if="item.status == 1">
            <el-button type="primary" @click="doOrder(item.id)"
              >完成订单</el-button
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成订单" name="done">
        <div v-if="done.length == 0"><h1>暂无数据！</h1></div>
        <div :key="item.id" v-for="item in done" class="cateItem" v-show="flag">
          <div class="orderInfo">
            <h2>订单用户号：{{ item.userId }}</h2>
            <h2>订单号：{{ item.id }}</h2>
            <h2>取餐桌：{{ item.tableNum }}</h2>
            <h2>创建时间：{{ item.createtime }}</h2>
            <h2>订单状态：{{ item.status == 0 ? "已完成" : "未完成" }}</h2>
          </div>
          <div class="orderDetail">
            <div class="detailTop">
              <div v-for="(it, index) in item.foodArr" :key="index">
                <div>{{ allCateList[it].name }}</div>
                <div class="detailImg"><img :src="foodImg[it]" alt="" /></div>
              </div>
            </div>
            <div class="detailBottom">
              <div
                v-for="(it2, index) in item.numArr"
                :key="index"
                v-show="flag"
              >
                <div>x {{ it2 }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="未完成订单" name="waiting">
        <div v-if="waiting.length == 0"><h1>暂无数据！</h1></div>
        <div :key="item.id" v-for="item in waiting" class="cateItem">
          <div class="orderInfo">
            <h2>订单用户号：{{ item.userId }}</h2>
            <h2>订单号：{{ item.id }}</h2>
            <h2>取餐桌：{{ item.tableNum }}</h2>
            <h2>创建时间：{{ item.createtime }}</h2>
            <h2>订单状态：{{ item.status == 0 ? "已完成" : "未完成" }}</h2>
          </div>
          <div class="orderDetail">
            <div class="detailTop">
              <div v-for="(it, index) in item.foodArr" :key="index">
                <div>{{ allCateList[it].name }}</div>
                <div class="detailImg"><img :src="foodImg[it]" alt="" /></div>
              </div>
            </div>
            <div class="detailBottom">
              <div v-for="(it2, index) in item.numArr" :key="index">
                <div>x {{ it2 }}</div>
              </div>
            </div>
          </div>
          <div class="orderbtn">
            <el-button type="primary" @click="doOrder(item.id)"
              >完成订单</el-button
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="数据分析" name="data">
        <div class="doneData">
          <h1>各菜品被订购占比</h1>

          <div class="one">
            <span>五花肉</span
            ><el-progress
              class="doneitem"
              :percentage="30"
              id="1"
            ></el-progress>
          </div>
          <div class="one">
            <span>猪肉饺子</span
            ><el-progress class="doneitem" :percentage="40"></el-progress>
          </div>
          <div class="one">
            <span>红烧肉</span
            ><el-progress class="doneitem" :percentage="10"></el-progress>
          </div>
          <div class="one">
            <span>牛肉汤</span
            ><el-progress class="doneitem" :percentage="20"></el-progress>
          </div>
        </div>
        <div class="doneData">
          <h1 class="title">各时间段用餐人数</h1>
          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                <el-statistic title="早上">
                  <template slot="formatter"> 6 </template>
                </el-statistic>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-statistic title="中午">
                  <template slot="formatter"> 12 </template>
                </el-statistic>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-statistic title="晚上">
                  <template slot="formatter"> 8 </template>
                </el-statistic>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-statistic title="十点后">
                  <template slot="formatter"> 8 </template>
                </el-statistic>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="doneData">
          <h1 class="title">工作人员工作量</h1>
          <el-table
          stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="工作人员"
        width="380">
      </el-table-column>
      <el-table-column
        prop="works"
        label="完成订单数"
        width="380">
      </el-table-column>
    </el-table>
          
        </div>
        <div class="doneData">
          <h1 class="title">平均点餐配餐时间</h1>
          <i class="el-icon-time"></i> 13 min
          
        </div>
        <div class="doneData">
          <h1 class="title">累计收入</h1>
          <i class="el-icon-s-shop"></i> 250元
          
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
            name: 'workr1',
            works: 20
          }, {
            name: 'workr1',
            works: 10
          }, {
            name: 'workr1',
            works: 4
          }],
      activeName: "data",
      flag: true,
      cateList: [],
      // 所有菜品列表
      allCateList: [],
      myOrderList: [],
      foodImg: [
        null,
        require("../../assets/img/1.jpg"),
        require("../../assets/img/2.jpg"),
        require("../../assets/img/3.jpg"),
        require("../../assets/img/4.jpg"),
      ],
    };
  },
  computed: {
    done() {
      let num = [];
      for (let i = 0; i < this.myOrderList.length; i++) {
        if (this.myOrderList[i].status == 0) {
          num.push(this.myOrderList[i]);
        }
      }
      return num;
    },
    waiting() {
      let num = [];
      for (let i = 0; i < this.myOrderList.length; i++) {
        if (this.myOrderList[i].status == 1) {
          num.push(this.myOrderList[i]);
        }
      }
      return num;
    },
  },
  created() {
    this.getList();
    this.getMyOrderList();
  },
  methods: {
    async doOrder(id) {
      let result = await this.$axios({
        method: "get",
        url: "/api/orders/update/" + id,
      });
      console.log(result.data);
      if (result.data.code == 200) {
        this.$message.success("订单已完成！");
        this.getList();
      } else {
        this.$message.error(result.data.msg);
      }
    },
    async getList() {
      this.flag = false;
      let result = await this.$axios({
        method: "get",
        url: "/api/category/list",
      });
      this.list = result.data.data;
      console.log(result.data.data);
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id != null) {
          this.getCateList(this.list[i].id);
        }
      }
      this.flag = true;
      console.log("全部", this.allCateList);
    },
    async getCateList(id) {
      let getUrl = "/api/food/list/" + id;
      let result = await this.$axios({
        method: "get",
        url: getUrl,
      });
      this.cateList[id] = result.data.data;
      for (let i = 0; i < this.cateList[id].length; i++) {
        if (this.cateList[id][i].id != null) {
          this.allCateList[this.cateList[id][i].id] = this.cateList[id][i];
        }
      }
    },
    async getMyOrderList() {
      let result = await this.$axios({
        method: "get",
        url: "/api/orders/list",
      });
      this.myOrderList = result.data.data;
      for (let i = 0; i < this.myOrderList.length; i++) {
        let foodStr = this.myOrderList[i].foodId;
        let numStr = this.myOrderList[i].num;
        // this.orderDetailList[i]={}
        this.myOrderList[i].foodArr = foodStr.split("-");
        this.myOrderList[i].numArr = numStr.split("-");
        // this.orderDetailList[i].foodArr=foodStr.split('-')
        // this.orderDetailList[i].numStr=numStr.split('-')
      }
      console.log(this.myOrderList);
    },
    async 方法名() {
      var token = window.localStorage.getItem("token"); //要取的名称
      let result = await this.$axios({
        method: "post",
        url: "/institute/admin/get",
        data: getInsdata,
        // 自定义请求头,
        headers: { Authorization: token },
      });
      console.log(result);
    },
  },
};
</script>

<style lang="less" scoped>
.workContainer {
  padding: 10px 55px;
  background-color: rgb(245, 245, 245);
  .orderitem {
    font-size: 13px;
    padding: 8px;
    margin: 8px;
  }
  .orderbtn {
    margin-top: 60px;
    padding: 30px;
  }
  .cateItem {
    display: flex;
    height: 180px;
    padding: 15px;
    margin: 15px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 5px 4px 5px rgb(204, 200, 200);
  }
  .orderInfo {
    padding: 20px 10px;
    h2 {
      font-size: 15px;
      text-align: left;
    }
  }
  .orderDetail {
    font-weight: bold;
    color: gray;
    margin-left: 60px;
    display: flex;
    flex-direction: column;
    .detailTop {
      display: flex;
    }
    .detailBottom {
      display: flex;
      height: 20px;
      div {
        margin: 0 10px;
        width: 120px;
      }
    }
    .detailImg {
      margin: 10px 20px;
      height: 100px;
      width: 100px;
      overflow: hidden;
      border-radius: 10px;
      box-shadow: 5px 4px 5px rgb(204, 200, 200);
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .doneData {
    padding: 30px;
    width: 60%;
    margin: 0 auto;
    background-color: #fff;
    .title {
      margin-bottom: 25px;
    }
    .one {
      display: flex;
      span {
        line-height: 40px;
      }
    }
    .doneitem {
      margin: 10px;
      width: 85%;
    }
  }
}
</style>