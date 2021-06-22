<template>
    <div>
        <div class="cmn_pageTitle">出勤検索</div>

        <form class="form" v-on:submit.prevent>
            <ul class="form_list">
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">出勤者</dt>
                    <dd class="form_list_item_main">
                        <select class="form_list_item_main_input" v-model="members_id">
                            <option value="0">選択してください</option>
                            <option v-for="user in $store.state.users" :key="user.id" :value="user.id">{{user.name}}</option>
                        </select>
                    </dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">出勤先</dt>
                    <dd class="form_list_item_main">
                        <select class="form_list_item_main_input" v-model="places_id">
                            <option value="0">選択してください</option>
                            <option v-for="place in $store.state.places" :key="place.id" :value="place.id">{{place.name}}</option>
                        </select>
                    </dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">日付</dt>
                    <dd class="form_list_item_main date">
                        <Datepicker v-model="date_min" :clear-button="true" :format="DatePickerFormat" :language="ja" class="form_list_item_main_input datepicker" />
                        <span> 〜 </span>
                        <Datepicker v-model="date_max" :clear-button="true" :format="DatePickerFormat" :language="ja" class="form_list_item_main_input datepicker right" />
                    </dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">日給</dt>
                    <dd class="form_list_item_main price">
                        <input v-model.number="price_min" class="form_list_item_main_input" type="text">
                        <span> 〜 </span>
                        <input v-model.number="price_max" class="form_list_item_main_input" type="text">
                    </dd>
                </li>
            </ul>
        </form>

        <div v-show="searchCalendars.length && maxPages > 1" class="pagination">
            <v-pagination v-model="currentPage" :length="maxPages"></v-pagination>
        </div>

        <p v-if="!$store.state.calendarLoading && !searchCalendars.length" style="font-size:25px;">データはありません</p>

        <div class="table_wrap">
            <div v-show="searchCalendars.length" class="table">
                <ul class="table_row ar">
                    <li class="table_row_list date">日付</li>
                    <li class="table_row_list member">出勤者</li>
                    <li class="table_row_list place d-none d-md-block">出勤先</li>
                </ul>
                <ul v-for="calendar in calendars" :key="calendar.id" class="table_row">
                    <li class="table_row_list date">{{ calendar.date }}</li>
                    <li class="table_row_list member">{{ calendar.member }}</li>
                    <li class="table_row_list place d-none d-md-block">{{ calendar.place }}</li>
                </ul>
            </div>
        </div>

        <div v-if="$store.state.userLoading || $store.state.placeLoading || $store.state.calendarLoading" class="vue-loading-wrap">
            <vue-loading type="spin" color="#333" :size="{ width: '80px', height: '80px'}"></vue-loading>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
const Datepicker = require("vuejs-datepicker").default;
const ja = require("vuejs-datepicker/dist/locale").ja;
const moment = require("moment");
export default Vue.extend({
    components: {
        Datepicker,
    },
    data() {
        return {
            currentPage: 1,
            perPage: 10,

            members_id: 0,
            places_id: 0,
            date_min: "Invalid date",
            date_max: "Invalid date",
            price_min: "",
            price_max: "",

            DatePickerFormat: "yyyy.MM.dd",
            ja: ja,
        };
    },
    computed: {
        calendars() :any{
            return this.searchCalendars.filter((value: any, index: number) => {
                return (
                    this.perPage * (this.currentPage - 1) <= index &&
                    index < this.perPage * this.currentPage
                );
            });
        },
        searchCalendars(): any {
            this.currentPage = 1;
            let outputDatas = this.$store.state.calendarDatas;
            if (this.members_id != 0) {
                outputDatas = outputDatas.filter(
                    (value: any) => value.members_id === this.members_id
                );
            }
            if (this.places_id != 0) {
                outputDatas = outputDatas.filter(
                    (value: any) => value.places_id === this.places_id
                );
            }
            if (this.date_min != "Invalid date") {
                outputDatas = outputDatas.filter(
                    (value: any) => value.date >= this.date_min
                );
            }
            if (this.date_max != "Invalid date") {
                outputDatas = outputDatas.filter(
                    (value: any) => value.date <= this.date_max
                );
            }
            if (this.price_min != "") {
                outputDatas = outputDatas.filter(
                    (value: any) => value.price >= this.price_min
                );
            }
            if (this.price_max != "") {
                outputDatas = outputDatas.filter(
                    (value: any) => value.price <= this.price_max
                );
            }
            return outputDatas;
        },
        maxPages() :any{
            return Math.ceil(this.searchCalendars.length / this.perPage);
        },
    },
    methods: {
        format(value: Date | string): string {
            return moment(value).format("YYYY-MM-DD");
        },
    },
    mounted() {
        this.date_min = this.format(new Date());
    },
    watch: {
        date_min() {
            this.date_min = this.format(this.date_min);
        },
        date_max() {
            this.date_max = this.format(this.date_max);
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
.vdp-datepicker {
    position: relative;
    &.right ::v-deep .vdp-datepicker__calendar {
        right: 0;
    }
    & ::v-deep input {
        width: 100%;
        cursor: pointer;
    }
    & ::v-deep &__clear-button {
        i span {
            position: absolute;
            right: 5px;
            bottom: 57%;
            transform: translateY(50%);
            font-size: 30px;
            line-height: 1em;
        }
    }
}
.pagination {
    max-width: 500px;
    margin: 0 0 15px;
    overflow: hidden;
    nav ::v-deep .v-pagination {
        &__item {
            color: #000066;
            border: 1px solid #000066;
            text-align: center;
            &--active {
                color: white;
                background-color: #000066;
            }
        }
        &__navigation {
            border: 1px solid #000066;
            .theme--light.v-icon {
                color: #000066;
            }
            &--disabled {
                opacity: 0.3;
            }
        }
    }
}
.form {
    margin-bottom: 30px;
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
                display: flex;
                align-items: center;
                @include mq-pc {
                    width: 70%;
                }
                &_input {
                    border: 1px solid gray;
                    border-radius: 5px;
                    width: 100%;
                    padding: 5px;
                    background-color: white;
                    &.ar {
                        padding: 0;
                        border: none;
                        @include mq-pc {
                            padding: 5px;
                        }
                    }
                    &.datepicker {
                        cursor: pointer;
                        width: 44%;
                    }
                }
                &.date,
                &.price {
                    span {
                        display: block;
                        text-align: center;
                        width: 12%;
                    }
                    input,
                    select {
                        width: 44%;
                    }
                }
            }
        }
    }
}
.table_wrap {
    min-height: 600px;
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
            &.date {
                width: 50%;
                font-weight: bold;
                @include mq-pc {
                    width: 20%;
                }
            }
            &.member {
                width: 50%;
                @include mq-pc {
                    width: 20%;
                }
            }
            &.place {
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
</style>