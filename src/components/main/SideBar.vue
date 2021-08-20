<template>
  <div class="sideBar">
    左侧
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
                        {label: '节气养生'},
                        {label: '自我保健'},
                        {label: '药膳食疗'},
                        {label: '中药常识'},
                        {label: '中医文化'},
                        {label: '儿童健康'},
                    ]
                }, {
                    label: '信息管理',
                    children: [
                        {label: '号源管理'},
                        {label: '服务团队'},
                        {label: '开展项目'},
                        {label: '功效特色'},
                        {label: '信息维护'}
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
                console.log(data);
            }
        }
    }
</script>

<style scoped>
  .sideBar {
    width: 150px;
    height: 700px;
    text-align: center;
    border: aquamarine solid;
    /*background-color: green;*/
    float: left;
  }
</style>
