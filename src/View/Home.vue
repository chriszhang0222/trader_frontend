<template>
    <div class="wrapper">
        <vHeader></vHeader>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHeader from "../components/Header.vue";
    import vSidebar from "../components/sidebar.vue";
    import {queryBanalce, queryOrderData, queryPosiData, queryTradeData} from "../api/orderApi";
    import vue from '../main.js';
    import {codeFormat} from "../api/formatter";
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
            this.$bus.on("tradechange", res => {
               let jres = JSON.parse(res);
               let msg = "Success: " + (jres.direction == "BUY" ? "Buy" : "Sell") + codeFormat(jres.code + " " + jres.volume);
               this.$notify({
                    title: 'New Trade',
                   message: msg,
                   position: 'bottom-right',
                   type: 'success'
               });

            });
        },
        beforeDestroy() {
            this.$bus.off("collapse-content", (msg) => {
                this.collapse = msg;
            })
        },
        eventBus: {
            handlers:[
                {
                    address: 'orderchange-' + sessionStorage.getItem("uid"),
                    headers: {},
                    callback: function(err, msg){
                        queryOrderData();
                        queryTradeData();
                        queryPosiData();
                        queryBanalce();
                    }
                },
                {
                    address: 'tradechange-' + sessionStorage.getItem("uid"),
                    headers: {},
                    callback: function(err, msg){
                        vue.$bus.emit("tradechange", msg);
                    }
                }
            ]
        }
    }
</script>

<style scoped>

</style>
