<template>
    <div>
        <div class="cmn_pageTitle">出勤先一覧</div>
        <div v-show="$store.state.places.length" class="table">
            <ul class="table_row ar">
                <li class="table_row_list img_name pl-2">画像</li>
                <li class="table_row_list name">出勤先</li>
                <li class="table_row_list tel d-none d-md-block">住所</li>
                <li class="table_row_list btn">　</li>
            </ul>
            <ul v-for="place in $store.state.places" :key="place.id" class="table_row">
                <li class="table_row_list img_name">
                    <img :src='place.img_name ? "/storage/" + place.img_name : "/assets/noimage.png"'>
                </li>
                <li class="table_row_list name">{{ place.name }}</li>
                <li class="table_row_list tel d-none d-md-block">{{ place.address }}</li>
                <li class="table_row_list btn" style="text-align:right;">
                    <button class="cmn_btn_sub mr-1" @click="edit(place)">編集</button>
                    <button class="cmn_btn_delete" @click="deleteplace(place.id, place.name)">削除</button>
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
                <PlaceEditComponent ref="placeEdit" />
            </div>
        </div>

        <div v-if="$store.state.placeLoading" class="vue-loading-wrap">
            <vue-loading type="spin" color="#333" :size="{ width: '80px', height: '80px'}"></vue-loading>
        </div>
    </div>
</template>

<script>
import PlaceEditComponent from "./PlaceEditComponent";
export default {
    components: {
        PlaceEditComponent,
    },
    data() {
        return {
            editmodal: false,
        };
    },
    methods: {
        deleteplace(id, name) {
            if (confirm("「" + name + "」を削除しますか？")) {
                this.$store.state.placeLoading = true;
                axios
                    .delete("/api/places/" + id)
                    .then((res) => {
                        this.$store.commit("getplaces");
                        this.$store.commit("getCalendars");
                    })
                    .catch((err) => {
                        alert("エラーです");
                    })
                    .finally(() => (this.$store.state.placeLoading = false));
            }
        },
        edit(place) {
            this.editmodal = true;
            this.$refs.placeEdit.setplace(place);
        },
        closeEditModal() {
            this.editmodal = false;
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
            &.tel {
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