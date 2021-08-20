<template>
  <div class="header">
    头部区域
    <span id="header-h">你好：{{this.username}}</span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed:{
    username(){
        return this.$store.getters.getUsername;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width:100%;
  height:100px;
  text-align: center;
  border: aquamarine solid;
  /*background-color:pink;*/
}
#header-h{
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 30px;
}
</style>
