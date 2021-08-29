<template>
  <div class="sideBar">
    <el-tree :data="data" show-checkbox @node-click="handleNodeClick" class="tree" icon-class="el-icon-star-off"></el-tree>
  </div>
</template>

<script>
    export default {
        name: 'sideBar',
        data() {
            return {
                data: [{
                    label: '预防保健',
                    children: [
                        {label: '节气养生', path: '/jqys'},
                        {label: '自我保健', path: '/zwbj'},
                        {label: '药膳食疗', path: '/yssl'},
                        {label: '中药常识', path: '/zycs'},
                        {label: '中医文化', path: '/zywh'},
                        {label: '儿童健康', path: '/etjk'},
                    ]
                }, {
                    label: '信息管理',
                    children: [
                        {label: '号源管理', path: '/hygl'},
                        {label: '服务团队', path: '/fwtd'},
                        {label: '开展项目', path: '/kzxm'},
                        {label: '功效特色', path: '/gxts'},
                        {label: '信息维护', path: '/xxwh'}
                    ],
                    defaultProps: {
                        children: 'children',
                        label: 'label'
                    }
                }],
            }
        },
        methods: {
            handleNodeClick(data) {
                // console.log(data.path);
                if(data.path){
                    this.$router.push(data.path)
                }else{
                    console.log("失误了")
                }
            }
        }
    }
</script>

<style scoped>
  .sideBar {
    /*width: 150px;*/
    height: 600px;
    text-align: center;
    border: aquamarine solid;
  }

  .tree {
    font-size: 30px;
  }
</style>
