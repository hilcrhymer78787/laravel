<template>
    <div>
        <div @click="closeEditModal()" class="cmn_modal_inner_close">×</div>
        <form class="form" v-on:submit.prevent="postplace">
            <div class="form_ttl">出勤先登録</div>
            <ul class="form_list">
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">画像</dt>
                    <dd class="form_list_item_main">
                        <div @click="$refs.input.click()" class="img_wrap">
                            <img v-if="!file" :src='editPlace.img_name ? "/storage/" + editPlace.img_name : "/assets/noimage.png"'>
                            <img v-if="file" :src="uploadedImage">
                        </div>
                    </dd>
                    <input ref="input" class="d-none" type="file" accept="image/*" @change="fileSelected">
                </li>
                <li v-if="editPlace.id" class="form_list_item">
                    <dt class="form_list_item_ttl">登録日時</dt>
                    <dd class="form_list_item_main"><input class="ar" type="text" readonly :value="editPlace.created_at | format"></dd>
                </li>
                <li v-if="editPlace.id" class="form_list_item">
                    <dt class="form_list_item_ttl">更新日時</dt>
                    <dd class="form_list_item_main"><input class="ar" type="text" readonly :value="editPlace.updated_at | format"></dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">出勤先</dt>
                    <dd class="form_list_item_main"><input type="text" v-model="editPlace.name"></dd>
                    <div v-if="error.name" class="error">出勤先を入力してください</div>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">電話番号</dt>
                    <dd class="form_list_item_main"><input type="text" v-model="editPlace.tel"></dd>
                    <div v-if="error.tel" class="error">電話番号を入力してください</div>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">住所</dt>
                    <dd class="form_list_item_main"><input type="text" v-model="editPlace.address"></dd>
                    <div v-if="error.address" class="error">住所を入力してください</div>
                </li>
            </ul>
            <div class="form_btn">
                <button type="submit" class="cmn_btn_sub">登録</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
const moment = require("moment");

export default Vue.extend({
    props: {
        editPlace: {
            type: Object,
        },
    },
    data() {
        return {
            uploadedImage: "" as string,
            file: "" as any,
            error: {
                name: false as boolean,
                tel: false as boolean,
                address: false as boolean,
            },
        };
    },
    methods: {
        fileSelected(e: any): void {
            this.file = e.target.files[0];
            this.$set(
                this.editPlace,
                "img_name",
                moment().format("YYYYMMDDHHmmss") + this.file.name
            );
            let reader = new FileReader();
            reader.onload = (e: any) => {
                this.uploadedImage = e.target.result;
            };
            reader.readAsDataURL(this.file);
        },
        postplace(): void {
            if (this.validation()) {
                this.$store.state.placeLoading = true;
                let postData: any = new FormData();
                postData.append("file", this.file);
                Object.keys(this.editPlace).forEach((key) => {
                    postData.append(key, this.editPlace[key]);
                });
                axios
                    .post("/api/placesUpdate", postData)
                    .then((res) => {
                        this.closeEditModal();
                        this.$store.commit("getplaces");
                        this.$store.commit("getCalendars");
                    })
                    .catch((err) => {
                        alert("エラーです");
                    })
                    .finally(() => (this.$store.state.placeLoading = false));
            }
        },
        validation(): boolean {
            let noProblem = true;
            this.$set(this.error, "name", false);
            if (this.editPlace.name === "") {
                this.$set(this.error, "name", true);
                noProblem = false;
            }
            this.$set(this.error, "tel", false);
            if (this.editPlace.tel === "") {
                this.$set(this.error, "tel", true);
                noProblem = false;
            }
            this.$set(this.error, "address", false);
            if (this.editPlace.address === "") {
                this.$set(this.error, "address", true);
                noProblem = false;
            }
            return noProblem;
        },
        closeEditModal(): void {
            this.file = "";
            let inputRef: any = this.$refs.input;
            inputRef.value = "";
            Object.keys(this.error).forEach((key) => {
                this.$set(this.error, key, false);
            });
            this.$emit("closeEditModal");
        },
    },
    filters: {
        format(value: Date) :Date{
            return moment(value).format("YYYY/MM/DD HH:mm:ss");
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