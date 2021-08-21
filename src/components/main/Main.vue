<template>
  <div class="main">
    <Header class="el-col-24"></Header>
    <SideBar class="el-col-4"></SideBar>
    <MainContent class="el-col-20"></MainContent>
<!--    <router-view></router-view>-->
  </div>
</template>

<script>
    import Header from "./Header";
    import SideBar from "./SideBar";
    import MainContent from "./MainContent";

    export default {
        name: "main",
        components: {
            SideBar,
            Header,
            MainContent
        }
    }
</script>

<style scoped>

</style>
