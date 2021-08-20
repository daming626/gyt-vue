<template>
  <div id="main">
    <Header></Header>
    <SideBar></SideBar>
    <router-view></router-view>
  </div>
</template>

<script>
    import Header from "./Header";
    import SideBar from "./SideBar";

    export default {
        name: "main",
        components: {
            SideBar,
            Header
        }
    }
</script>

<style scoped>

</style>
