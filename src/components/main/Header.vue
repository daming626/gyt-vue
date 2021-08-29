<template>
  <div class="header">
    <div class="el-col-24" style="margin: 30px;font-size: 20px">
      <div class="el-col-20 hello" style="text-align: right">你好：{{this.username}}</div>
      <div class="el-col-1"><el-avatar icon="el-icon-user-solid"></el-avatar></div>
      <div class="el-col-3 exit" style="text-align: left"><a href="/" style="text-decoration: none">退出登录</a></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Header',
        computed: {
            username() {
                return this.$store.getters.getUsername;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    width: 100%;
    height: 100px;
    text-align: center;
    border: aquamarine solid;
    /*background-color:pink;*/
  }
</style>
