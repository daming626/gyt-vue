<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <div class="main">
      <div class="top">
        <div class="el-col-10">
          <el-input
            placeholder="请输入关键字（名称）搜索"
            prefix-icon="el-icon-search"
            v-model="searchBox">
          </el-input>
        </div>
        <div class="el-col-3">
          <el-select v-model="selectBoxValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="el-col-2">
          <el-button @click="filterTable(selectBoxValue)" type="warning" v-model="selectBoxValue">搜索</el-button>
        </div>
      </div>
      <div class="content">
        <el-table
          ref="filterTable"
          :data="tableNewData.slice((paging.currentPage - 1 ) * paging.pagesize, paging.currentPage * paging.pagesize)"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="transparent"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="num"
            type="index"
            label="序号"
            width="150">
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="开展项目名称"
            width="220">
          </el-table-column>
          <el-table-column
            prop="content1"
            label="开展项目描述"
            width="550">
          </el-table-column>
          <el-table-column
            prop="price"
            label="开展项目价格"
            width="150">
          </el-table-column>
          <el-table-column
            prop="webStatus"
            label="开展项目状态"
            v-model="selectBoxValue"
            :filters="options"
            :filter-method="filterTable"
            width="260">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="250">
            <template slot-scope="scope">
              <PermButton size="small"  label='查看'  @click="handleClick(scope.row)" perms='view' type="primary"/>
              <PermButton v-if="scope.row.dataStatus === '0'" size="small"  label='提交'  @click="confirm(scope.row,'submit','提交后，信息将无法修改，是否确认提交')" perms='update' type="danger"/>
              <PermButton v-if="scope.row.dataStatus !== '0'" size="small"  label='取消提交'  @click="confirm(scope.row,'cancel','取消提交将重置所有审核记录，是否确认取消')" perms='delete' type="danger"/>
              <PermButton v-if="scope.row.dataStatus === '7'" size="small"  label='发布到小程序'  @click="confirm(scope.row,'submit','是否确认发布到小程序')" perms='update' type="danger"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main-footer">
        <pagination
          :total="total"
          :paging="paging"
          @pagination="handleSizeChange">
        </pagination>
      </div>
    </div>
  </div>
</template>
<script>
import PermButton from "../component/PermButton";
import Pagination from "../component/Pagination"
import config from "../../config"
import { copyObj } from '../../utils/common'
export default {
  name: "Project",
  components: {PermButton,Pagination},
  data() {
    return {
      tableData: [{
        //表格原始数据，用于存储原始表格信息
      }],
      options: [{
        value: '全部',
        text: '全部',
        label: '全部'
      }, {
        value: '保存',
        text: '保存',
        label: '保存'
      }, {
        value: '审核中',
        text: '审核中',
        label: '审核中'
      }, {
        value: '审核未通过',
        text: '审核未通过',
        label: '审核未通过'
      }, {
        value: '已上架',
        text: '已上架',
        label: '已上架'
      }, {
        value: '已下架',
        text: '已下架',
        label: '已下架'
      }],
      selectBoxValue: '全部',
      filterVal: '全部',
      loading: false, // 表格数据加载状态
      searchBox: '',
      paging: copyObj(config.paging), // 分页的信息
      roleName: '县级',
      Status: '1',
      // userCode: '9f1992a0-f60d-4738-b15e-b17e8e10717e'
      userCode: '0022f7a3-9610-4747-b8c5-4bc771ebd288'
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
      console.log(`${config.hostName}updateProject`)
    },
    /***
     * 页面大小转换
     * @param paging 页面参数
     */
    handleSizeChange(paging) {
      this.paging.currentPage = paging.currentPage
      this.paging.pagesize = paging.pagesize
    },
    /***
     * 弹窗方法封装
     * @param value  传入参数 一般为行数据
     * @param type  用于选择“确定”后的方法
     * @param message 消息提示参数
     */
    confirm(value,type,message) {
      var val = value //传参
      var msg = message //错误信息
      var flag = type //需要进入的方法
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if(flag === 'submit'){
          this.statusUpdate(val)
        }else if(flag === 'cancel'){
          this.submitCancel(val)
        }
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '数据异常，请重试'
        });
      });
    },

    /***
     * 改变项目提交状态
     * @param row 当前行
     */
    statusUpdate(row) {
      if(row.dataStatus==='0')row.dataStatus = '1'
      else if(row.dataStatus==='1') row.dataStatus = '3'
      else if(row.dataStatus==='3') row.dataStatus = '5'
      else if(row.dataStatus==='5') row.dataStatus = '7'
      else if(row.dataStatus==='7') row.dataStatus = '8'
      this.axios.put(`${config.hostName}updateProject`, {
        itemid: row.itemid,
        itemcode: row.itemcode,
        dataStatus: row.dataStatus
      }).then(res => {
        this.refreshTable()
        console.log("请求成功")
      }).catch(() => {
        console.log("请求失败了")
      })
    },

    /***
     * 取消项目提交
     * @param row 当前行
     */
    submitCancel(row) {//取消提交
      row.dataStatus = '0'
      this.axios.put(`${config.hostName}updateProject`, {
        itemid: row.itemid,
        itemcode: row.itemcode,
        dataStatus: row.dataStatus
      }).then(res => {
        this.refreshTable()
        console.log("请求成功")
      }).catch(() => {
        console.log("请求失败了")
      })
    },
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      return hasPermission(perms)
    },
    getPermission(){ // 模拟接口 获取 权限数据集合
      let perms = ['search','view','update','delete'];
      this.$store.dispatch("SET_PERMISSION",perms);
    },
    refreshTable(){//刷新表格
      this.axios.get(`${config.hostName}selectchaAll`, {
        params: {
          status: this.Status,
          userCode: this.userCode
        }
      }).then(res => {
        this.tableInit(res.data)
      }).catch(() => {
        console.log(error)
        console.log("请求失败了")
      })
    },

    /***
     * 初始化表格信息
     * @param tableItems 传入表格对象
     */
    tableInit: function (tableItems) {
      //初始化表格信息
      tableItems.forEach(function (i) {
        if (i.dataStatus === '0') i.webStatus = '保存'
        else if (i.dataStatus === '1') i.webStatus = '管理员提交待县局审核'
        else if (i.dataStatus === '2') i.webStatus = '县局审核不通过'
        else if (i.dataStatus === '3') i.webStatus = '县局审核通过待市局审核'
        else if (i.dataStatus === '4') i.webStatus = '市局审核不通过'
        else if (i.dataStatus === '5') i.webStatus = '市局审核通过待省局审核'
        else if (i.dataStatus === '6') i.webStatus = '省局审核不通过'
        else if (i.dataStatus === '7') i.webStatus = '省局审核通过待管理员确认发布到小程序'
        else if (i.dataStatus === '8') i.webStatus = '管理员确认发布到小程序'
        else if (i.dataStatus === '9') i.webStatus = '从小程序上下架'
      })
      this.tableData = tableItems;
    },
    filterTable: function (value,row) {
      this.filterVal = value
    },

    /***
     * 用于搜索表格
     * @param search 搜索框内容
     * @param tableData 需要搜索的表格
     * @returns {*}
     */
    search(search,tableData){
      if (search) {//搜索
        return tableData.filter(data => {
          return Object.keys(data).some(key => {
            if (key === 'name') { // 检索的关键词
              return String(data[key]).toLowerCase().indexOf(search) > -1
            }
          })
        })
      }
      return tableData
    },
    getProjectList(){
      // this.axios.get('http://localhost:9090/selectchaAll?status=1&userCode=9f1992a0-f60d-4738-b15e-b17e8e10717e').then(function(res){})
      this.axios.get(`${config.hostName}selectchaAll`, {
        params: {
          status: this.Status,
          userCode: this.userCode
        }
      }).then(res => {
        this.tableInit(res.data)
      }).catch(() => {
        console.log("请求失败了")
      })
    }
  },
  computed:{
    total() {
      return this.tableData.length
    },
    tableNewData() {//真正渲染到表格组件上的表格数据
      const filter = this.filterVal
      const searchBoxValue = this.searchBox
      if(filter){//提交状态筛选
        if(filter === '全部'){
          return this.search(searchBoxValue,this.tableData)
        }else if(filter === '保存'){
          return this.search(searchBoxValue,this.tableData.filter(i=>(i.dataStatus === '0')))
        }else if(filter === '审核中'){
          return this.search(searchBoxValue,this.tableData.filter(i=>(i.dataStatus === '1' || i.dataStatus === '3' || i.dataStatus === '5' || i.dataStatus === '7')))
        }else if(filter === '审核未通过'){
          return this.search(searchBoxValue,this.tableData.filter(i=>(i.dataStatus === '2' || i.dataStatus === '4' || i.dataStatus === '6' )))
        }else if(filter === '已上架'){
          return this.search(searchBoxValue,this.tableData.filter(i=>(i.dataStatus === '8' )))
        }else if(filter === '已下架'){
          return this.search(searchBoxValue,this.tableData.filter(i=>(i.dataStatus === '9' )))
        }
      }
      return this.tableData
    }
  },
  mounted() {
    this.getPermission()
    this.getProjectList()
  }
}
</script>
<style scoped>
.content{
  width: 100%;
  height: 520px;
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
}
.main-footer{
  width: 100%;
  height: 50px;
  align-items: center;
}
</style>
