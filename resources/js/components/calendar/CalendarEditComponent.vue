<template>
    <form class="form" v-on:submit.prevent="postcalendar">
        <div class="form_ttl">
            出勤編集<br>
            {{calendar.date}}
        </div>
        <ul class="work">
            <li class="work_list" v-for="(work, index) in calendar.works" :key="index">
                <div class="form_list_wrap">
                    <ul class="form_list">
                        <li class="form_list_item">
                            <dt class="form_list_item_ttl">出勤者</dt>
                            <dd class="form_list_item_main">
                                <select v-model="work.members_id">
                                    <option value="0">選択してください</option>
                                    <option v-for="user in $store.state.users" :key="user.id" :value="user.id">{{user.name}}</option>
                                </select>
                            </dd>
                            <div v-if="work.error_members_id" class="error">出勤者を入力してください</div>
                        </li>
                        <li class="form_list_item">
                            <dt class="form_list_item_ttl">出勤場所</dt>
                            <dd class="form_list_item_main">
                                <select v-model="work.places_id">
                                    <option value="0">選択してください</option>
                                    <option v-for="place in $store.state.places" :key="place.id" :value="place.id">{{place.name}}</option>
                                </select>
                            </dd>
                            <div v-if="work.error_places_id" class="error">出勤場所を入力してください</div>
                        </li>
                        <li class="form_list_item">
                            <dt class="form_list_item_ttl">日給</dt>
                            <dd class="form_list_item_main"><input type="text" v-model="work.price"></dd>
                            <div v-if="work.error_price" class="error">日給を数値で入力してください</div>
                        </li>
                    </ul>
                    <div class="delete_list" @click="deletelist(index)">×</div>
                </div>
            </li>
            <div class="addwork" @click="addwork()">出勤を追加</div>
        </ul>
        <div class="form_btn">
            <div class="cmn_btn_delete" @click="deletecalendar(calendar.date)">全て削除</div>
            <button type="submit" class="cmn_btn_sub">登録</button>
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
            calendar: {
                date: "",
                works: [
                    {
                        id: 0,
                        members_id: 0,
                        places_id: 0,
                        price: 0,
                    },
                ],
            },
            users: [],
            places: [],
        };
    },
    methods: {
        addwork() {
            let obj = {
                id: 0,
                members_id: 0,
                places_id: 0,
                price: 0,
            };
            this.calendar.works.push(obj);
        },
        deletelist(index) {
            this.calendar.works.splice(index, 1);
            if (this.calendar.works.length === 0) {
                this.addwork();
            }
        },
        setcalendar(calendar) {
            this.$set(this.calendar, "date", calendar.date);
            this.calendar.works.splice(0, this.calendar.works.length);
            this.calendar.works.push(
                ...calendar.works.filter((work) => work.id !== 0)
            );
            this.calendar.works.forEach((work) => {
                if (work.member === "（削除済）") {
                    work.members_id = 0;
                }
                if (work.place === "（削除済）") {
                    work.places_id = 0;
                }
                this.$set(work, "error_members_id", false);
                this.$set(work, "error_places_id", false);
                this.$set(work, "error_price", false);
            });
        },
        postcalendar() {
            if (this.validation()) {
                this.$parent.loading = true;
                axios
                    .post("/api/calendars", this.calendar)
                    .then((res) => {
                        this.$parent.editmodal = false;
                        this.$store.commit("getCalendars");
                    })
                    .catch((err) => {
                        alert("エラーです");
                    })
                    .finally(() => {
                        this.$parent.loading = false;
                    });
            }
        },
        deletecalendar(date) {
            if (confirm(date + "のデータを全て削除しますか？")) {
                this.$parent.loading = true;
                axios
                    .delete("/api/calendars/" + date)
                    .then((res) => {
                        this.$parent.editmodal = false;
                        this.$store.commit("getCalendars");
                    })
                    .catch((err) => {
                        alert("エラーです");
                    })
                    .finally(() => {
                        this.$parent.loading = false;
                    });
            }
        },
        validation() {
            let noProblem = true;
            this.calendar.works.forEach((work) => {
                this.$set(work, "error_members_id", false);
                if (Number(work.members_id) === 0) {
                    this.$set(work, "error_members_id", true);
                    noProblem = false;
                }
                this.$set(work, "error_places_id", false);
                if (Number(work.places_id) === 0) {
                    this.$set(work, "error_places_id", true);
                    noProblem = false;
                }
                this.$set(work, "error_price", false);
                if (!/^([1-9]\d*|0)$/.test(work.price)) {
                    this.$set(work, "error_price", true);
                    noProblem = false;
                }
            });
            return noProblem;
        },
    },
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
.work {
    &_list {
        padding-bottom: 15px;
        border-bottom: 1px solid gray;
        margin-bottom: 50px;
    }
    .addwork {
        width: 140px;
        margin: 0 auto;
        text-align: center;
        background-color: black;
        padding: 5px 0;
        color: white;
        cursor: pointer;
        border-radius: 100px;
        position: relative;
        &::before {
            content: "+";
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
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
    &_list_wrap {
        display: flex;
        justify-content: space-between;
        .delete_list {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 16%;
            background-color: black;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            @include mq-pc {
                width: 30px;
            }
        }
    }
    &_list {
        width: 80%;
        @include mq-pc {
            width: 500px;
            margin-right: 20px;
        }
        &_item {
            font-size: 15px;
            margin-bottom: 10px;
            @include mq-pc {
                display: flex;
                flex-wrap: wrap;
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
                input,
                select {
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
            }
        }
    }
    &_btn {
        padding: 15px 0 50px;
        text-align: right;
    }
}
</style>