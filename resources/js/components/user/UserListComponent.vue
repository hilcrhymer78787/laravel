<template>
    <div>
        <div class="cmn_pageTitle">出勤者一覧</div>
        <div v-show="isShow" class="table">
            <ul class="table_row ar">
                <li class="table_row_list img_name pl-2">画像</li>
                <li class="table_row_list name">名前</li>
                <li class="table_row_list email d-none d-md-block">メール</li>
                <li class="table_row_list btn">　</li>
            </ul>
            <ul v-for="user in users" :key="user.id" class="table_row">
                <li class="table_row_list img_name">
                    <img v-if="user.img_name" @error="noImage" :src="'/storage/' + user.img_name">
                    <img v-if="!user.img_name" @error="noImage" src="/assets/noimage.png">
                </li>
                <li class="table_row_list name">{{ user.name }}</li>
                <li class="table_row_list email d-none d-md-block">{{ user.email }}</li>
                <li class="table_row_list btn" style="text-align:right;">
                    <button class="cmn_btn_sub mr-1" @click="edit(user)">編集</button>
                    <button class="cmn_btn_delete" @click="deleteuser(user.id, user.name)">削除</button>
                </li>
            </ul>
        </div>

        <div class="footbar">
            <div class="container">
                <button class="footbar_btn" @click="create()">新規登録</button>
            </div>
        </div>

        <div :class="{active:editmodal}" class="cmn_modal">
            <div class="cmn_modal_inner">
                <div @click="closeEditModal()" class="cmn_modal_inner_close">×</div>
                <UserEditComponent v-show="mode === 'edit'" ref="userEdit" />
                <UserCreateComponent v-show="mode === 'create'" ref="userCreate" />
            </div>
        </div>

        <div v-if="loading" class="vue-loading-wrap">
            <vue-loading type="spin" color="#333" :size="{ width: '80px', height: '80px'}"></vue-loading>
        </div>
        <!-- <pre>{{$data}}</pre> -->
    </div>
</template>

<script>
import UserEditComponent from "./UserEditComponent";
import UserCreateComponent from "./UserCreateComponent";
export default {
    components: {
        UserEditComponent,
        UserCreateComponent,
    },
    data: function () {
        return {
            isShow: false,
            loading: false,
            editmodal: false,
            mode: "",
            users: [],
        };
    },
    methods: {
        getusers() {
            this.loading = true;
            axios.get("/api/users").then((res) => {
                this.users = res.data;
                this.isShow = true;
                this.loading = false;
            });
        },
        deleteuser(id, name) {
            if (confirm("「" + name + "」を削除しますか？")) {
                this.loading = true;
                axios.delete("/api/users/" + id).then((res) => {
                    this.getusers();
                    this.loading = false;
                });
            }
        },
        noImage(element) {
            element.target.src = "/assets/noimage.png";
        },
        create() {
            this.mode = "create";
            this.editmodal = true;
            this.$refs.userCreate.setuser();
        },
        edit(user) {
            this.mode = "edit";
            let edituser = {};

            this.$set(edituser, "id", user.id);
            this.$set(edituser, "img_name", user.img_name);
            this.$set(edituser, "img_oldname", user.img_name);
            this.$set(edituser, "name", user.name);
            this.$set(edituser, "email", user.email);
            this.$set(edituser, "email_verified_at", user.email_verified_at);
            this.$set(edituser, "password", user.password);
            this.$set(edituser, "salary", user.salary);
            this.$set(edituser, "created_at", user.created_at);
            this.$set(edituser, "updated_at", user.updated_at);

            this.$refs.userEdit.setuser(edituser);
            this.editmodal = true;
        },
        closeEditModal() {
            this.editmodal = false;
        },
    },
    mounted() {
        this.getusers();
    },
};
</script>
<style lang="scss" scoped>
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
            }
            &.email {
            }
            &.btn {
                width: 45%;
                text-align: right;
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
    }
    &_btn {
        padding: 5px 10px;
        border-radius: 5px;
        background-color: white;
    }
}
@media (min-width: 768px) {
    .table {
        &_row {
            &_list {
                padding: 5px;
                font-size: 18px;
                &.img_name {
                    width: 20%;
                }
                &.name {
                    width: 20%;
                }
                &.email {
                    width: 40%;
                }
                &.btn {
                    width: 20%;
                    text-align: right;
                }
            }
        }
    }
    .footbar {
        .container {
            justify-content: flex-end;
        }
    }
}
</style>