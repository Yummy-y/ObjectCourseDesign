<template>
  <div class="userContainer">
    <div class="tabsContainer">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="item.name"
          :name="item.name"
          v-for="item in list"
          :key="item.id"
        >
          <div v-if="cateList[item.id] == null">
            <h1>该分类下暂无菜品，敬请期待</h1>
          </div>
          <div v-for="it in cateList[item.id]" :key="it.id" class="cateItem">
            <div class="cateimg"><img :src="foodImg[it.id]" alt="" /></div>
            <div class="cateInfo">
              <div>品名：{{ it.name }}</div>
              <div>配料：{{ it.ingredient }}</div>
              <div>价格：{{ it.price }}</div>
              <div>上线时间：{{ it.createtime }}</div>
            </div>
            <div class="order">
              <el-input-number
                v-model="numList[it.id]"
                @change="handleChange"
                :min="0"
                :max="10"
                label="数量"
                class="number"
              ></el-input-number>
              <el-button
                type="primary"
                @click="joinOrder(it.id, numList[it.id])"
                >加入订单</el-button
              >
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的订单" name="myList"> 
          <div>
            <div :key="item.id" v-for="item in myOrderList" class="cateItem">
              <div class="orderInfo">
                <h2>订单号：{{item.id}}</h2>
                <h2>取餐桌：{{item.tableNum}}</h2>
                <h2>创建时间：{{item.createtime}}</h2>
                <h2>订单状态：{{item.status==0?'已完成':'未完成'}}</h2>
              </div>
              <div class="orderDetail">
                <div class="detailTop">
                  <div v-for="(it,index) in item.foodArr" :key="index">
                    <div>{{allCateList[it].name}}</div>
                    <div class="detailImg"><img :src="foodImg[it]" alt=""></div>
                  </div>
                </div>
                <div class="detailBottom">
                    <div v-for="(it2,index) in item.numArr" :key="index">
                    <div>x {{it2}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-button type="primary" @click="pushOrder">创建订单</el-button>
    <el-button type="primary" @click="dialogVisible = true">查看订单</el-button>

    <!--  -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="30%">
      <div>
        <div v-for="(item,index) in foodIdList" :key="index" class="orderitem">
          菜品：{{ allCateList[item].name }} 数量：{{ numList[item] }}
          <el-button @click="cancleOrder(item)">取 消</el-button>
        </div>
      </div>
      <div>
        <h1>总价：{{ total }}</h1>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testarr:[1,2,3],
      dialogVisible:false,
      foodIdList: [],
      num:'',
      numList: [],
      activeName: "猪肉类",
      list: [],
      cateList: [],
      // 所有菜品列表
      allCateList:[],
      myOrderList:[],
      orderDetailList:[{foodArr:[],numArr:[]}],
      myOrder:{
        userId:null,
        foodId: '',
        num: '',
        tableNum:null,
        status:1
      },
      foodImg:[null,require('../../assets/img/1.jpg'),require('../../assets/img/2.jpg'),require('../../assets/img/3.jpg'),require('../../assets/img/4.jpg')]
    };
  },
  computed: {
    total() {
      let num=0;
      for(let i=0;i<this.foodIdList.length;i++){
        num+=this.allCateList[this.foodIdList[i]].price*this.numList[this.foodIdList[i]]
      }
      return num;
    }
  },
  created() {
    console.log(this.testarr['1'])
    this.getList();
    this.myOrder.userId = window.localStorage.getItem("id");
  },
  methods: {
    handleClick(tab, event) {
      var uid = window.localStorage.getItem("uid");
      console.log(tab._props.label);
      if(tab._props.label=="我的订单"){
        this.getMyOrderList(uid)
      }
    },
    async getMyOrderList(id) {
      let result = await this.$axios({
        method: "get",
        url: "/api/orders/listByUserId/"+id,
      });
      this.myOrderList = result.data.data;
      for(let i=0;i<this.myOrderList.length;i++){
        let foodStr=this.myOrderList[i].foodId
        let numStr=this.myOrderList[i].num
        this.orderDetailList[i]={}
        this.myOrderList[i].foodArr=foodStr.split('-')
        this.myOrderList[i].numArr=numStr.split('-')
        this.orderDetailList[i].foodArr=foodStr.split('-')
        this.orderDetailList[i].numArr=numStr.split('-')
      }
      // console.log(this.orderDetailList);
      },
    async getList() {
      let result = await this.$axios({
        method: "get",
        url: "/api/category/list",
      });
      this.list = result.data.data;
      console.log(result.data.data);
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id!=null) {
          this.getCateList(this.list[i].id);
        }
      }
      console.log(this.numList)
      console.log(this.cateList);
      console.log(this.allCateList);
    },
    async getCateList(id) {
      let getUrl = "/api/food/list/" + id;
      let result = await this.$axios({
        method: "get",
        url: getUrl,
      });
      this.cateList[id]=result.data.data
      for (let i = 0; i < this.cateList[id].length; i++) {
        if (this.cateList[id][i].id!=null) {
          this.allCateList[this.cateList[id][i].id]=this.cateList[id][i]
          this.numList[this.cateList[id][i].id]=0
        }
      }
    },
    async subOrder(data) {
      let getUrl = "/api/orders/save"
      let result = await this.$axios({
        method: "post",
        url: getUrl,
        data:data
      });
      console.log(result.data)
      if(result.data.code==200)
      {
        this.$message.success('订单创建成功！');
        this.foodIdList=[]
        for(let i=0;i<this.numList.length;i++){
          numList[i]=0
        }
      }
      else
      this.$message.error(result.data.msg);
    },
    handleChange(value) {
      console.log(value)
      console.log('numlist',this.numList)

    },
    joinOrder(id,num) {
      if(num==0)
      this.$message.error('菜品不能为空！');
      else
      {
        this.foodIdList.push(id)
        this.$message.success('添加成功！');
      }
      console.log('foodL',this.foodIdList)
    },
    cancleOrder(id) {
      this.foodIdList = this.foodIdList.filter((x) => x !== id);
    },
    pushOrder() {
      if(this.foodIdList.length==0) {
        this.$message.error('订单为空！');
      }
      else {
      var idList=''
      var numl=''
      this.myOrder.userId = window.localStorage.getItem("uid");
      for(let i=0;i<this.foodIdList.length;i++){
        if(i!=this.foodIdList.length-1)
        {
          numl +=this.numList[this.foodIdList[i]]+'-'
          idList += this.foodIdList[i]+'-'
        }
        else
        {
          idList += this.foodIdList[i]
          numl += this.numList[this.foodIdList[i]]
        }
      }
      this.myOrder.foodId=idList
      this.myOrder.num=numl
      this.myOrder.tableNum=1
      console.log(this.myOrder)
      this.subOrder(this.myOrder)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.userContainer {
  padding: 10px 55px;
  background-color: rgb(245, 245, 245);
}
.cateItem {
  display: flex;
  height: 180px;
  padding: 15px;
  margin: 15px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 5px 4px 5px rgb(204, 200, 200);
  .cateimg {
    margin: 10px 10px;
    border-radius: 8px;
    overflow: hidden;
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .order {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-left: 600px;
    .number {
      margin: 10px;
    }
  }
  .cateInfo {
    display: flex;
    flex-direction: column;
    div {
      text-align: left;
      margin: 5px;
      font-size: 15px;
      font-weight: bold;
    }
  }
}
.orderitem {
  font-size: 13px;
  padding: 8px;
  margin: 8px;
}
.orderInfo {
  padding: 20px 10px;
  h2{
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
</style>