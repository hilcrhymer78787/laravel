<template>
    <div>
        <div class="cmn_pageTitle">出勤検索</div>

        <form class="form" v-on:submit.prevent="getSearchCalendars">
            <ul class="form_list">
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">出勤者</dt>
                    <dd class="form_list_item_main">
                        <select class="form_list_item_main_input" v-model="form.members_id">
                            <option value="0">選択してください</option>
                            <option v-for="user in $store.state.users" :key="user.id" :value="user.id">{{user.name}}</option>
                        </select>
                    </dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">出勤先</dt>
                    <dd class="form_list_item_main">
                        <select class="form_list_item_main_input" v-model="form.places_id">
                            <option value="0">選択してください</option>
                            <option v-for="place in $store.state.places" :key="place.id" :value="place.id">{{place.name}}</option>
                        </select>
                    </dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">日付</dt>
                    <dd class="form_list_item_main date">
                        <Datepicker v-model="form.date_min" :clear-button="true" :format="DatePickerFormat" :language="ja" class="form_list_item_main_input datepicker" />
                        <span> 〜 </span>
                        <Datepicker v-model="form.date_max" :clear-button="true" :format="DatePickerFormat" :language="ja" class="form_list_item_main_input datepicker right" />
                    </dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">日給</dt>
                    <dd class="form_list_item_main price">
                        <input v-model="form.price_min" class="form_list_item_main_input" type="text">
                        <span> 〜 </span>
                        <input v-model="form.price_max" class="form_list_item_main_input" type="text">
                    </dd>
                </li>
                <li class="form_list_item btn">
                    <div class="form_btn">
                        <button type="submit" class="cmn_btn_sub">検索</button>
                    </div>
                </li>
            </ul>
        </form>

        <div v-show="isShow" class="table">
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

        <div v-show="isShow" class="pagination">
            <v-pagination v-model="nowPage" :length="maxPages" @input="getNumber"></v-pagination>
        </div>
    </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { ja } from "vuejs-datepicker/dist/locale";
import moment from "moment";
export default {
    components: {
        Datepicker,
    },
    data: function () {
        return {
            isShow: false,
            nowPage: 1,
            maxPages: 0,
            itemsNum: 1,
            maxItems: 10,
            calendarDatas: [],
            calendars: [],
            loading: false,
            form: {
                members_id: 0,
                places_id: 0,
                date_min: "Invalid date",
                date_max: "Invalid date",
                price_min: "",
                price_max: "",
            },
            DatePickerFormat: "yyyy.MM.dd",
            ja: ja,
        };
    },
    methods: {
        getSearchCalendars() {
            this.$store.state.loading = true;
            axios
                .post("/api/search", this.form)
                .then((res) => {
                    this.calendarDatas = res.data.calendars;
                    this.getNumber(1);
                    this.isShow = true;
                })
                .catch((err) => {
                    alert("エラーです");
                })
                .finally(() => (this.$store.state.loading = false));
        },
        getNumber(page) {
            let maxNum = this.calendarDatas.length;
            this.maxPages = Math.ceil(maxNum / this.maxItems);
            this.calendars.splice(0, this.calendars.length);
            for (let i = 0; i < this.maxItems; i++) {
                if (i + this.maxItems * (page - 1) < maxNum - 1) {
                    this.calendars.push(
                        this.calendarDatas[i + this.maxItems * (page - 1)]
                    );
                }
            }
        },
        format: function (value) {
            return moment(value).format("YYYY-MM-DD");
        },
    },
    mounted: function () {
        this.form.date_min = this.format(new Date());
        this.$store.commit("getusers");
        this.getSearchCalendars();
    },
    watch: {
        "form.date_min": function () {
            this.form.date_min = this.format(this.form.date_min);
        },
        "form.date_max": function () {
            this.form.date_max = this.format(this.form.date_max);
        },
    },
};
</script>
<style lang="scss" scoped>
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
    margin: 0 auto 15px;
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
    &_ttl {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: center;
    }
    &_list {
        &_item {
            font-size: 15px;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
            &.btn {
                padding: 0;
                width: 100%;
            }
            &_ttl {
            }
            &_main {
                display: flex;
                align-items: center;
                &_input {
                    border: 1px solid gray;
                    border-radius: 5px;
                    width: 100%;
                    padding: 5px;
                    background-color: white;
                    &.ar {
                        padding: 0;
                        border: none;
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
    &_btn {
        width: 100%;
        padding: 0 0 50px;
        text-align: right;
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
            &.date {
                width: 20%;
                font-weight: bold;
            }
            &.member {
                width: 35%;
            }
            &.place {
            }
            &.btn {
                width: 45%;
                text-align: right;
            }
        }
    }
}
@media (min-width: 768px) {
    .form {
        &_ttl {
            font-size: 35px;
            margin-bottom: 25px;
        }
        &_list {
            &_item {
                display: flex;
                flex-wrap: wrap;
                width: 500px;
                &_ttl {
                    width: 30%;
                    padding: 5px;
                }
                &_main {
                    width: 70%;
                    input {
                        &.ar {
                            padding: 5px;
                        }
                    }
                }
            }
        }
        &_btn {
            max-width: 500px;
        }
    }
    .table {
        &_row {
            &_list {
                padding: 5px;
                font-size: 18px;
                &.date {
                    width: 20%;
                }
                &.member {
                    width: 20%;
                }
                &.place {
                    width: 40%;
                }
                &.btn {
                    width: 20%;
                    text-align: right;
                }
            }
        }
    }
}
</style>