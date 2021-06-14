<template>
    <div class="app">
        <HeaderComponent />
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderComponent from "./HeaderComponent.vue";
export default Vue.extend({
    components: {
        HeaderComponent,
    },
    mounted() {
        this.$store.commit("getLoginUser");
        this.$store.commit("getplaces");
        this.$store.commit("getusers");
        this.$store.commit("getCalendars");
    },
});
</script>
<style lang="scss">
@charset "utf-8";

@mixin mq-pc {
    @media screen and (min-width: 768px) {
        @content;
    }
}

body {
    padding: 0 0 50px;
    background-color: #e9e9e9;
    font-family: "Noto Sans JP", "ヒラギノ角ゴ Pro W3", sans-serif;
    font-size: 12px;
    color: black;
    @include mq-pc {
        font-size: 15px;
    }
}
table {
    background-color: white;
    box-shadow: 0 0 10px rgb(100, 100, 100);
}
input {
    background-color: white;
}
.is-pc {
    display: none;
    @include mq-pc {
        display: block;
    }
}
.is-sp {
    @include mq-pc {
        display: none;
    }
}
.container {
    max-width: 900px !important;
}
.vue-loading-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    @include mq-pc {
        top: 84px;
    }
}
.router-link-active {
    color: #f3920b !important;
}
.cmn_modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    transform: scale(0);
    &.active {
        transform: scale(1);
        .cmn_modal_inner {
            transform: scale(1);
            opacity: 1;
        }
    }
    &_inner {
        overflow-y: scroll;
        transform: scale(0);
        opacity: 0;
        transition: 0.5s;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        max-width: 870px;
        height: 80%;
        background-color: white;
        padding: 0 20px;
        &_close {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }
    }
}
.cmn_btn {
    display: block;
    background-color: #f3920b;
    border-radius: 3px;
    padding: 10px 15px;
    border-bottom: 5px solid #a26209;
    margin: 15px 0 0 auto;
    white-space: nowrap;
    cursor: pointer;
}
.cmn_btn_sub {
    display: inline-block;
    background-color: #f3920b;
    border-radius: 5px;
    padding: 5px 10px;
    white-space: nowrap;
    cursor: pointer;
}
.cmn_btn_delete {
    display: inline-block;
    background-color: #fd7171;
    border-radius: 5px;
    padding: 5px 10px;
    white-space: nowrap;
    cursor: pointer;
}
.cmn_pageTitle {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    margin-bottom: 30px;
    @include mq-pc {
        font-size: 40px;
        margin-bottom: 40px;
    }
}
.cmn_pageSecondTitle {
    font-size: 25px;
    margin-top: 30px;
    margin-bottom: 10px;
    @include mq-pc {
        font-size: 35px;
        margin-top: 50px;
        margin-bottom: 20px;
    }
}
</style>