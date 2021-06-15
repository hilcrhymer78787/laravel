<template>
    <div>
        <div class="cmn_pageTitle">出勤者一覧</div>
        <div v-show="$store.state.users.length" class="table">
            <ul class="table_row ar">
                <li class="table_row_list img_name pl-2">画像</li>
                <li class="table_row_list name">名前</li>
                <li class="table_row_list email d-none d-md-block">メール</li>
                <li class="table_row_list btn">　</li>
            </ul>
            <ul v-for="user in $store.state.users" :key="user.id" class="table_row">
                <li class="table_row_list img_name">
                    <img :src='user.img_name ? "/storage/" + user.img_name : "/assets/noimage.png"'>
                </li>
                <li class="table_row_list name">{{ user.name }}</li>
                <li class="table_row_list email d-none d-md-block">{{ user.email }}</li>
                <li class="table_row_list btn">
                    <button class="cmn_btn_sub mr-1" @click="edit(user)">編集</button>
                    <button class="cmn_btn_delete" @click="deleteUser(user.id, user.name)">削除</button>
                </li>
            </ul>
        </div>

        <div class="footbar">
            <div class="container">
                <button class="footbar_btn" @click="edit()">新規登録</button>
            </div>
        </div>

        <div :class="{active:editmodal}" class="cmn_modal">
            <div class="cmn_modal_inner">
                <div @click="closeEditModal()" class="cmn_modal_inner_close">×</div>
                <UserEditComponent ref="userEdit" />
            </div>
        </div>

        <div v-if="$store.state.userLoading" class="vue-loading-wrap">
            <vue-loading type="spin" color="#333" :size="{ width: '80px', height: '80px'}"></vue-loading>
        </div>
    </div>
</template>

<script lang="ts">
import UserEditComponent from "./UserEditComponent.vue";
import Vue from "vue";
import axios from "axios";

export type DataType = {
    editmodal: Boolean;
};

export default Vue.extend({
    components: {
        UserEditComponent,
    },
    data(): DataType {
        return {
            editmodal: false,
        };
    },
    methods: {
        deleteUser(id: any, name: any) {
            if (confirm("「" + name + "」を削除しますか？")) {
                this.$store.state.userLoading = true;
                axios
                    .delete("/api/users/" + id)
                    .then((res: any) => {
                        this.$store.commit("getusers");
                        this.$store.commit("getCalendars");
                    })
                    .catch((err: any) => {
                        alert("エラーです");
                    })
                    .finally(() => (this.$store.state.userLoading = false));
            }
        },
        edit(user: any) {
            this.editmodal = true;
            // this.$refs.userEdit.setuser(user);
        },
        closeEditModal() {
            this.editmodal = false;
        },
    },
});
</script>
<style lang="scss" scoped>
@mixin mq-pc {
    @media screen and (min-width: 768px) {
        @content;
    }
}
.table {
    background-color: white;
    box-shadow: 0 0 10px #636363;
    &_row {
        display: flex;
        align-items: center;
        padding: 5px;
        border-bottom: 1px solid #dee2e6;
        font-size: 15px;
        &.ar {
            font-weight: bold;
            background-color: #e9ecef;
            border-bottom: 2px solid #dee2e6;
        }
        &_list {
            padding: 5px;
            @include mq-pc {
                font-size: 18px;
            }
            &.img_name {
                width: 20%;
                font-weight: bold;
                padding: 0 5px 0 0;
                img {
                    width: 100%;
                    max-width: 70px;
                }
            }
            &.name {
                width: 35%;
                @include mq-pc {
                    width: 20%;
                }
            }
            &.email {
                @include mq-pc {
                    width: 40%;
                }
            }
            &.btn {
                width: 45%;
                text-align: right;
                @include mq-pc {
                    width: 20%;
                }
            }
        }
    }
}
.footbar {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    .container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        @include mq-pc {
            justify-content: flex-end;
        }
    }
    &_btn {
        padding: 5px 10px;
        border-radius: 5px;
        background-color: white;
    }
}
</style>