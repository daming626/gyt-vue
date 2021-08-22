<template xmlns:el-col="http://www.w3.org/1999/html">
    <div class="main">
      <div class="top">
        <div class="el-col-10">
          <el-input
            placeholder="请输入关键字（名称）搜索"
            prefix-icon="el-icon-search"
            v-model="searchBoxValue">
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
          :data="tableNewData.filter(data => !searchBoxValue || data.name.toLowerCase().includes(searchBoxValue.toLowerCase()))"
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
            label="功能特色名称"
            width="220">
          </el-table-column>
          <el-table-column
            prop="content"
            label="功能特色描述"
            width="260">
          </el-table-column>
          <el-table-column
            prop="webStatus"
            label="功能特色状态"
            v-model="selectBoxValue"
            :filters="[{ text: '审核中', value: '管理员提交待县局审核' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag"
            width="260">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="240">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: "Feature",
  data() {
    return {
      tableData: [{
        //表格原始数据，用于存储原始表格信息
      }],
      tableNewData:[{
        //表格渲染数据，直接渲染到视图
      }],
      options: [{
        value: '全部',
        label: '全部'
      }, {
        value: '保存',
        label: '保存'
      }, {
        value: '审核中',
        label: '审核中'
      }, {
        value: '审核未通过',
        label: '审核未通过'
      }, {
        value: '已上架',
        label: '已上架'
      }, {
        value: '已下架',
        label: '已下架'
      }],
      selectBoxValue: '全部',
      searchBoxValue: ''
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    tableInit: function (tableItems) {
      //初始化表格信息
      tableItems.forEach(function (i,index) {
        if(i.dataStatus==='0'){
          i.webStatus = '保存'
        }else if(i.dataStatus==='1'){
          i.webStatus = '管理员提交待县局审核'
        }else if(i.dataStatus==='2'){
          i.webStatus = '县局审核不通过'
        }else if(i.dataStatus==='3'){
          i.webStatus = '县局审核通过待市局审核'
        }else if(i.dataStatus==='4'){
          i.webStatus = '市局审核不通过'
        }else if(i.dataStatus==='5'){
          i.webStatus = '市局审核通过待省局审核'
        }else if(i.dataStatus==='6'){
          i.webStatus = '省局审核不通过'
        }else if(i.dataStatus==='7'){
          i.webStatus = '省局审核通过待管理员确认发布到小程序'
        }else if(i.dataStatus==='8'){
          i.webStatus = '管理员确认发布到小程序'
        }else if(i.dataStatus==='9'){
          i.webStatus = '从小程序上下架'
        }
      })
      this.tableData = tableItems;
      this.tableNewData = tableItems;
    },
    filterTag(value, row) {
      console.log(value)
      console.log(row)
      return row.webStatus === value
    },
    filterTable:function (value){
      if(value === '全部'){
        return this.tableNewData = this.tableData
      }else if(value === '保存' ){
        this.tableNewData = this.tableData.filter(function(i){
          return i.dataStatus === '0'
        })
        return this.tableNewData
      }else if(value === '审核中'){
        return this.tableNewData = this.tableData.filter(function(i){
          return i.dataStatus === '1' || i.dataStatus === '3' || i.dataStatus === '5' || i.dataStatus === '7'
        })
      }else if(value === '审核未通过' ){
        this.tableNewData = this.tableData.filter(function(i){
          return i.dataStatus === '2' || i.dataStatus === '4' || i.dataStatus === '6'
        })
        return this.tableNewData
      }else if(value === '已上架' ){
        this.tableNewData = this.tableData.filter(function(i){
          return i.dataStatus === '8'
        })
        return this.tableNewData
      }else if(value === '已下架' ){
        this.tableNewData = this.tableData.filter(function(i){
          return i.dataStatus === '9'
        })
        return this.tableNewData
      }

    }
  },
  computed:{

  },
  mounted: function () {
    var allProject;
    var vm = this
    this.axios.get('http://localhost:8088/hello',{
      params:{
        status:"1",
        userCode:"9f1992a0-f60d-4738-b15e-b17e8e10717e"
      }
    }).then(res =>{
      allProject = res.data
      vm.tableInit(allProject)
    }).catch(()=>{
      console.log(error)
      console.log("请求失败了")
    })
  }
}
</script>
<style scoped>
</style>
