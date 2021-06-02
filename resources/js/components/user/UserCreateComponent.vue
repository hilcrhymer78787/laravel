<template>
    <form class="form" v-on:submit.prevent="postuser">
        <div class="form_ttl">出勤者登録</div>
        <ul class="form_list">
            <li class="form_list_item">
                <dt class="form_list_item_ttl">画像</dt>
                <dd class="form_list_item_main">
                    <img @click="previewImg()" :src="uploadedImage" @error="noImage">
                </dd>
                <input ref="input" class="d-none" type="file" accept="image/*" v-on:change="fileSelected">
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
            <li class="form_list_item">
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
            <button type="submit" class="cmn_btn_sub">新規登録</button>
        </div>
    </form>
</template>

<script>
import moment from "moment";
export default {
    data() {
        return {
            loading: false,
            error: {
                name: false,
                email: false,
                password: false,
                salary: false,
            },
            uploadedImage: "",
            file: "",
            user: {
                id: 0,
                img_name: "",
                name: "",
                email: "",
                password: "",
                salary: "",
            },
        };
    },
    methods: {
        setuser() {
            Object.keys(this.user).forEach((key) => {
                this.$set(this.user, key, "");
            });
        },
        noImage(element) {
            element.target.src = "/assets/noimage.png";
        },
        previewImg() {
            this.$refs.input.click();
        },
        fileSelected(event) {
            this.$set(
                this.user,
                "img_name",
                moment(new Date()).format("YYYYMMDDHHmmss") +
                    event.target.files[0].name
            );
            this.file = event.target.files[0];
            let reader = new FileReader(); //File API生成
            reader.onload = (e) => {
                this.uploadedImage = e.target.result;
            };
            reader.readAsDataURL(this.file);
        },
        postuser() {
            if (this.validation()) {
                this.$store.state.userLoading = true;
                let postData = new FormData();
                postData.append("file", this.file);
                postData.append("img_name", this.user.img_name);
                postData.append("name", this.user.name);
                postData.append("email", this.user.email);
                postData.append("password", this.user.password);
                postData.append("salary", this.user.salary);
                axios
                    .post("/api/users", postData)
                    .then((res) => {
                        this.$parent.editmodal = false;
                        this.$store.commit("getusers");
                        this.$store.commit("getCalendars");
                    })
                    .catch((err) => {
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
            this.$set(this.error, "password", false);
            if (!/^([a-zA-Z0-9]{8,})$/.test(this.user.password)) {
                this.$set(this.error, "password", true);
                noProblem = false;
            }
            this.$set(this.error, "salary", false);
            if (!/^([1-9]\d*|0)$/.test(this.user.salary)) {
                this.$set(this.error, "salary", true);
                noProblem = false;
            }
            return noProblem;
        },
    },
    mounted: function () {},
    filters: {
        format: function (value) {
            return moment(value).format("YYYY/MM/DD HH:mm:ss");
        },
    },
};
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
                img {
                    width: 70px;
                    height: 70px;
                    cursor: pointer;
                    @include mq-pc {
                        width: 120px;
                        height: 120px;
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