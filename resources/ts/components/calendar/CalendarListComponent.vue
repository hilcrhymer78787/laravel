<template>
    <div class="calendar">
        <!-- ページャー -->
        <div class="pager">
            <router-link v-if="month == 1" class="pager_prev" :to="`/calendar/${Number(year)-1}/12`">＜</router-link>
            <router-link v-if="month != 1" class="pager_prev" :to="`/calendar/${year}/${Number(month)-1}`">＜</router-link>
            <h1 class="cmn_pageTitle">{{ year }}年 {{ month }}月</h1>
            <router-link v-if="month == 12" class="pager_next" :to="`/calendar/${Number(year)+1}/1`">＞</router-link>
            <router-link v-if="month != 12" class="pager_next" :to="`/calendar/${year}/${Number(month)+1}`">＞</router-link>
        </div>

        <!-- カレンダー -->
        <div>
            <ul class="indent">
                <li v-for="day in week" :key="day" class="indent_item">{{day}}</li>
            </ul>

            <ul class="content">
                <li v-for="n in first_day" :key="n" class="content_item blank"></li>

                <li @click="clickCalendar(calendar)" v-for="(calendar, index) in calendars" :key="calendar.date" class="content_item main">
                    <span class="content_item_icn">{{ index + 1 }}</span>
                    <ul>
                        <li v-if="calendar.works.length >= 1">・{{calendar.works[0].member}}</li>
                        <li v-if="calendar.works.length >= 2">・{{calendar.works[1].member}}</li>
                        <li v-if="calendar.works.length >= 3" style="color:#f3920b;">　他{{calendar.works.length - 2}}件</li>
                    </ul>
                </li>

                <li v-for="n in lastDayCount" :key="n + 100" class="content_item blank"></li>
            </ul>

            <div :class="{active:editmodal}" class="cmn_modal">
                <div class="cmn_modal_inner">
                    <div class="cmn_modal_inner_container">
                        <CalendarEditComponent :deleteBtn="deleteBtn" :calendar="calendar" @closeEditModal="closeEditModal" ref="calendarEdit" />
                    </div>
                </div>
            </div>

            <div v-if="loading || $store.state.userLoading || $store.state.placeLoading || $store.state.calendarLoading" class="vue-loading-wrap">
                <vue-loading type="spin" color="#333" :size="{ width: '80px', height: '80px'}"></vue-loading>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import CalendarEditComponent from "./CalendarEditComponent.vue";
const moment = require("moment");

export type newcalendarType = {
    date: string;
    works: [
        {
            id:number
            member: string;
            members_id: number;
            place: string;
            places_id: number;
            price: number;
        }
    ];
};

export type calendarType = {
    date: string;
    works: workType[];
};
export type workType = {
    id: number;
    member: string;
    members_id: number;
    place: string;
    places_id: number;
    price: number;
};
export default Vue.extend({
    components: {
        CalendarEditComponent,
    },
    data() {
        return {
            week: ["日", "月", "火", "水", "木", "金", "土"] as string[],
            loading: false as boolean,
            editmodal: false as boolean,
            calendar: {} as calendarType,
            deleteBtn: false as boolean,
        };
    },
    computed: {
        calendars(): calendarType[] {
            let outputData: calendarType[] = [];

            for (let day = 1; day <= this.lastday; day++) {
                outputData.push({
                    date: moment(
                        new Date(this.year, this.month - 1, day)
                    ).format("YYYY-MM-DD"),
                    works: [] as workType[],
                });
            }

            if (!this.$store.state.calendarLoading) {
                outputData.forEach((calendar: calendarType) => {
                    let calendarWorksFilterDate =
                        this.$store.state.calendarWorks.filter(
                            (calendarElm: calendarType) =>
                                calendarElm.date === calendar.date
                        );
                    if (calendarWorksFilterDate.length) {
                        calendar.works.push(
                            ...calendarWorksFilterDate[0].works
                        );
                    }
                });
            }

            return outputData;
        },
        year(): number {
            return Number(this.$route.params.year);
        },
        month(): number {
            return Number(this.$route.params.month);
        },
        lastday(): number {
            return new Date(this.year, this.month, 0).getDate();
        },
        first_day(): number {
            return new Date(this.year, this.month - 1, 1).getDay();
        },
        lastDayCount(): number {
            return (
                6 - new Date(this.year, this.month - 1, this.lastday).getDay()
            );
        },
    },
    methods: {
        clickCalendar(calendar: calendarType) {
            this.editmodal = true;
            this.$set(this.calendar, "date", calendar.date);
            this.$set(this.calendar, "works", []);
            if (calendar.works.length) {
                this.deleteBtn = true;
                calendar.works.forEach((work: workType) => {
                    this.calendar.works.push({
                        id:work.id,
                        member: work.member,
                        members_id:
                            work.member === "（削除済）" ? 0 : work.members_id,
                        place: work.place,
                        places_id:
                            work.place === "（削除済）" ? 0 : work.places_id,
                        price: work.price,
                    });
                });
            } else {
                this.deleteBtn = false;
                this.calendar.works.push({
                    id: 0,
                    member: "",
                    members_id: 0,
                    place: "",
                    places_id: 0,
                    price: 0,
                });
            }
        },
        closeEditModal() {
            this.editmodal = false;
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
input,
button {
    border: none;
    outline: none;
}
.cmn_pageTitle {
    margin-bottom: 0;
    @include mq-pc {
        margin-bottom: 0;
        width: 335px;
    }
}
.cmn_pageSecondTitle {
    margin-top: 50px;
}
.pager {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    @include mq-pc {
        margin-bottom: 50px;
    }
    &_prev {
        font-size: 20px;
        margin-right: 10px;
        @include mq-pc {
            font-size: 40px;
            margin-right: 20px;
        }
    }
    &_next {
        font-size: 20px;
        margin-left: 10px;
        @include mq-pc {
            font-size: 40px;
            margin-left: 20px;
        }
    }
}

.indent {
    display: flex;
    &_item {
        width: calc(100% / 7);
        text-align: center;
        padding-bottom: 10px;
        &:nth-child(1) {
            color: red;
        }
        &:nth-child(7) {
            color: blue;
        }
    }
}

.content {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    background-color: white;
    box-shadow: 0 0 10px rgb(99, 99, 99);
    &_item {
        width: calc(100% / 7);
        height: 100px;
        padding: 25px 5px 0;
        position: relative;
        border-right: 1px solid #e9e9e9;
        border-top: 1px solid #e9e9e9;
        overflow: hidden;
        @include mq-pc {
            padding: 23px 5px 0;
        }
        &:nth-child(7n) {
            border-right: none;
        }
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6),
        &:nth-child(7) {
            border-top: none;
        }
        &:nth-child(7n) .content_item_icn {
            color: blue;
        }
        &:nth-child(7n-6) .content_item_icn {
            color: red;
        }
        &.blank {
            background-color: rgb(213, 213, 213);
        }
        &.main:hover {
            cursor: pointer;
            background-color: #f3920b7e;
        }
        &.color {
            background-color: #fccc88;
        }
        &_name {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            @include mq-pc {
                font-size: 18px;
            }
        }
        &_icn {
            font-size: 14px;
            position: absolute;
            top: 1px;
            left: 3px;
        }
        &_inner {
            height: 50%;
            position: relative;
        }
        &_input {
            opacity: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 10px;
            left: 0;
            z-index: 1;
        }
        &_price {
            width: 100%;
            text-align: center;
            font-size: 12px;
            @include mq-pc {
                font-size: 16px;
            }
        }
    }
}
</style>