<template>
    <div class="header mb-5">
        <div class="container d-flex justify-content-center">
            <router-link v-bind:to="{name: 'user.list'}">
                <button class="btn">user</button>
            </router-link>
            <router-link  :to="`/calendar/${year}/${month}`">
                <button class="btn">calendar</button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth()+1,
        };
    },
}
</script>
<style lang="scss" scoped>
    .header{
        background-color: #000066;
        color: white;
        padding: 15px 0;
        .btn{
            color: white;
        }
    }
</style>