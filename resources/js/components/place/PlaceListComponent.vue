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
                    <img v-if="place.img_name" @error="noImage" :src="'/storage/' + place.img_name">
                    <img v-if="!place.img_name" @error="noImage" src="/assets/noimage.png">
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
                <button class="footbar_btn" @click="create()">新規登録</button>
            </div>
        </div>

        <div :class="{active:editmodal}" class="cmn_modal">
            <div class="cmn_modal_inner">
                <div @click="closeEditModal()" class="cmn_modal_inner_close">×</div>
                <PlaceEditComponent v-show="mode === 'edit'" ref="placeEdit" />
                <PlaceCreateComponent v-show="mode === 'create'" ref="placeCreate" />
            </div>
        </div>

        <div v-if="$store.state.placeLoading" class="vue-loading-wrap">
            <vue-loading type="spin" color="#333" :size="{ width: '80px', height: '80px'}"></vue-loading>
        </div>
    </div>
</template>

<script>
import PlaceEditComponent from "./PlaceEditComponent";
import PlaceCreateComponent from "./PlaceCreateComponent";
export default {
    components: {
        PlaceEditComponent,
        PlaceCreateComponent,
    },
    data() {
        return {
            editmodal: false,
            mode: "",
        };
    },
    methods: {
        deleteplace(id, name) {
            if (confirm("「" + name + "」を削除しますか？")) {
                this.$store.state.placeLoading = true;
                axios.delete("/api/places/" + id).then((res) => {
                    this.$store.commit("getplaces");
                    this.$store.commit("getCalendars");
                });
            }
        },
        noImage(element) {
            element.target.src = "/assets/noimage.png";
        },
        create() {
            this.mode = "create";
            this.editmodal = true;
            this.$refs.placeCreate.setplace();
        },
        edit(place) {
            this.mode = "edit";
            let editplace = {};

            this.$set(editplace, "id", place.id);
            this.$set(editplace, "img_name", place.img_name);
            this.$set(editplace, "img_oldname", place.img_name);
            this.$set(editplace, "name", place.name);
            this.$set(editplace, "tel", place.tel);
            this.$set(editplace, "address", place.address);

            this.$refs.placeEdit.setplace(editplace);
            this.editmodal = true;
        },
        closeEditModal() {
            this.editmodal = false;
        },
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
            &.tel {
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
                &.tel {
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