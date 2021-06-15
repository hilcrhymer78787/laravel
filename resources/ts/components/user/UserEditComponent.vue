<template>
    <form class="form" v-on:submit.prevent="postuser">
        <div class="form_ttl">出勤者登録</div>
        <ul class="form_list">
            <li class="form_list_item">
                <dt class="form_list_item_ttl">画像</dt>
                <dd class="form_list_item_main">
                    <div @click="$refs.input.click()" class="img_wrap">
                        <img v-if="!file" :src='user.img_name ? "/storage/" + user.img_name : "/assets/noimage.png"'>
                        <img v-if="file" :src="uploadedImage">
                    </div>
                </dd>
                <input ref="input" class="d-none" type="file" accept="image/*" @change="fileSelected">
            </li>
            <li v-if="user.id" class="form_list_item">
                <dt class="form_list_item_ttl">登録日時</dt>
                <dd class="form_list_item_main"><input class="ar" type="text" readonly :value="user.created_at | format"></dd>
            </li>
            <li v-if="user.id" class="form_list_item">
                <dt class="form_list_item_ttl">更新日時</dt>
                <dd class="form_list_item_main"><input class="ar" type="text" readonly :value="user.updated_at | format"></dd>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">名前</dt>
                <dd class="form_list_item_main"><input type="text" v-model="user.name"></dd>
                <div v-if="error.name" class="error">名前を入力してください</div>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">メール</dt>
                <dd class="form_list_item_main"><input type="text" v-model="user.email"></dd>
                <div v-if="error.email" class="error">メールアドレスを適切な形で入力してください</div>
            </li>
            <li v-if="!user.id" class="form_list_item">
                <dt class="form_list_item_ttl">パスワード</dt>
                <dd class="form_list_item_main"><input type="text" v-model="user.password"></dd>
                <div v-if="error.password" class="error">パスワードを8文字以上の英数字で入力してください</div>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">日給</dt>
                <dd class="form_list_item_main"><input type="text" v-model="user.salary"></dd>
                <div v-if="error.salary" class="error">日給を数値で入力してください</div>
            </li>
        </ul>
        <div class="form_btn">
            <button type="submit" class="cmn_btn_sub">登録</button>
        </div>
        <pre>{{user}}</pre>
    </form>
</template>

<script lang="ts">
// import moment from "moment";
import Vue from "vue";
import axios from "axios";

export type DataType = {
    error: any;
    uploadedImage: any;
    file: any;
    user: any;
};
export default Vue.extend({
    data(): DataType {
        return {
            error: {},
            uploadedImage: "",
            file: "",
            user: {},
        };
    },
    methods: {
        setuser(edituser: any) {
            this.file = "";
            if (edituser) {
                this.$set(this.user, "img_oldname", edituser.img_name);
                Object.keys(edituser).forEach((key) => {
                    this.$set(this.user, key, edituser[key]);
                });
            } else {
                Object.keys(this.user).forEach((key) => {
                    this.$set(this.user, key, "");
                });
            }
            Object.keys(this.error).forEach((key) => {
                this.$set(this.error, key, false);
            });
        },
        fileSelected(e: any) {
            this.file = e.target.files[0];
            this.$set(
                this.user,
                "img_name",
                this.file.name
                // moment().format("YYYYMMDDHHmmss") + this.file.name
            );
            let reader = new FileReader();
            reader.onload = (e: any) => {
                this.uploadedImage = e.target.result;
            };
            reader.readAsDataURL(this.file);
        },
        postuser() {
            if (this.validation()) {
                this.$store.state.userLoading = true;
                let postData: any = new FormData();
                postData.append("file", this.file);
                Object.keys(this.user).forEach((key: any) => {
                    postData.append(key, this.user[key]);
                });
                axios
                    .post("/api/usersUpdate", postData)
                    .then((res: any) => {
                        // this.$parent.editmodal = false;
                        this.$store.commit("getLoginUser");
                        this.$store.commit("getusers");
                        this.$store.commit("getCalendars");
                    })
                    .catch((err: any) => {
                        alert("エラーです");
                    })
                    .finally(() => (this.$store.state.userLoading = false));
            }
        },
        validation() {
            let noProblem = true;
            this.$set(this.error, "name", false);
            if (this.user.name === "") {
                this.$set(this.error, "name", true);
                noProblem = false;
            }
            this.$set(this.error, "email", false);
            if (
                !/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
                    this.user.email
                )
            ) {
                this.$set(this.error, "email", true);
                noProblem = false;
            }
            if (!this.user.id) {
                this.$set(this.error, "password", false);
                if (!/^([a-zA-Z0-9]{8,})$/.test(this.user.password)) {
                    this.$set(this.error, "password", true);
                    noProblem = false;
                }
            }
            this.$set(this.error, "salary", false);
            if (!/^([1-9]\d*|0)$/.test(this.user.salary)) {
                this.$set(this.error, "salary", true);
                noProblem = false;
            }
            return noProblem;
        },
    },
    filters: {
        format(value: any) {
            // return moment(value).format("YYYY/MM/DD HH:mm:ss");
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
.error {
    color: red;
    position: relative;
    bottom: 8px;
    @include mq-pc {
        padding: 5px;
    }
}
.form {
    height: 100%;
    padding-top: 50px;
    &_ttl {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: center;
        @include mq-pc {
            font-size: 35px;
            margin-bottom: 25px;
        }
    }
    &_list {
        &_item {
            font-size: 15px;
            margin-bottom: 10px;
            @include mq-pc {
                display: flex;
                flex-wrap: wrap;
                width: 500px;
            }
            &:last-child {
                margin-bottom: 0;
            }
            &_ttl {
                @include mq-pc {
                    width: 30%;
                    padding: 5px;
                }
            }
            &_main {
                @include mq-pc {
                    width: 70%;
                }
                input {
                    border: 1px solid gray;
                    border-radius: 5px;
                    width: 100%;
                    padding: 5px;
                    &.ar {
                        padding: 0;
                        border: none;
                        @include mq-pc {
                            padding: 5px;
                        }
                    }
                }
                .img_wrap {
                    width: 70px;
                    height: 70px;
                    cursor: pointer;
                    @include mq-pc {
                        width: 120px;
                        height: 120px;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    &_btn {
        padding: 15px 0 50px;
        text-align: right;
    }
}
</style>