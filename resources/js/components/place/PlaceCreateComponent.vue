<template>
    <form class="form" v-on:submit.prevent="postplace">
        <div class="form_ttl">出勤先登録</div>
        <ul class="form_list">
            <li class="form_list_item">
                <dt class="form_list_item_ttl">画像</dt>
                <dd class="form_list_item_main">
                    <img @click="previewImg()" :src="uploadedImage" @error="noImage">
                </dd>
                <input ref="input" class="d-none" type="file" accept="image/*" v-on:change="fileSelected">
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">出勤先</dt>
                <dd class="form_list_item_main"><input type="text" v-model="place.name"></dd>
                <div v-if="error.name" class="error">出勤先を入力してください</div>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">電話番号</dt>
                <dd class="form_list_item_main"><input type="text" v-model="place.tel"></dd>
                <div v-if="error.tel" class="error">電話番号を入力してください</div>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">住所</dt>
                <dd class="form_list_item_main"><input type="text" v-model="place.address"></dd>
                <div v-if="error.address" class="error">住所を入力してください</div>
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
                tel: false,
                address: false,
            },
            uploadedImage: "",
            file: "",
            place: {
                id: 0,
                img_name: "",
                name: "",
                tel: "",
                address: "",
            },
        };
    },
    methods: {
        setplace() {
            Object.keys(this.place).forEach((key) => {
                this.$set(this.place, key, "");
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
                this.place,
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
        postplace() {
            if (this.validation()) {
                this.$store.state.placeLoading = true;
                let postData = new FormData();
                postData.append("file", this.file);
                postData.append("img_name", this.place.img_name);
                postData.append("name", this.place.name);
                postData.append("tel", this.place.tel);
                postData.append("address", this.place.address);
                axios
                    .post("/api/places", postData)
                    .then((res) => {
                        this.$parent.editmodal = false;
                        this.$store.commit("getplaces");
                        this.$store.commit("getCalendars");
                    })
                    .catch((err) => {
                        alert("エラーです");
                    })
                    .finally(() => (this.$store.state.placeLoading = false));
            }
        },
        validation() {
            let noProblem = true;
            this.$set(this.error, "name", false);
            if (this.place.name === "") {
                this.$set(this.error, "name", true);
                noProblem = false;
            }
            this.$set(this.error, "tel", false);
            if (this.place.tel === "") {
                this.$set(this.error, "tel", true);
                noProblem = false;
            }
            this.$set(this.error, "address", false);
            if (this.place.address === "") {
                this.$set(this.error, "address", true);
                noProblem = false;
            }
            return noProblem;
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