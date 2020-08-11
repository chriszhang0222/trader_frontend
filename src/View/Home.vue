<template>
    <div class="wrapper">
        <vHeader></vHeader>
        <v-sidebar></v-sidebar>
        <router-view></router-view>
    </div>
</template>

<script>
    import vHeader from "../components/Header.vue";
    import vSidebar from "../components/sidebar.vue";
    export default {
        name: "Home",
        components: {vHeader, vSidebar},
        data: function(){
          return {
              collapse: false
          }
        },
        created() {
            this.$bus.on("collapse-content", (msg) => {
                this.collapse = msg;
            })
        },
        beforeDestroy() {
            this.$bus.off("collapse-content", (msg) => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>

</style>
