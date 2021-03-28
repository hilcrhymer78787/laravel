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
    <form v-on:submit.prevent="submit">

      <div v-if="loading" class="vue-loading-wrap">
        <vue-loading type="spin" color="#333" :size="{ width: '80px', height: '80px'}"></vue-loading>
      </div>

      <ul class="indent">
        <li class="indent_item">日</li>
        <li class="indent_item">月</li>
        <li class="indent_item">火</li>
        <li class="indent_item">水</li>
        <li class="indent_item">木</li>
        <li class="indent_item">金</li>
        <li class="indent_item">土</li>
      </ul>

      <ul class="content">
        <li v-for="(n, index) in first_day" :key="index+100" class="content_item blank"></li>

        <li @click="create(calendar)" v-for="calendar in calendars" :key="calendar.date" class="content_item main">
          <span class="content_item_icn">{{ calendar.date|format }}</span>
          <ul>
            <li v-if="!(calendar.works[0].members_id == 0)">・{{calendar.works[0].member}}</li>
            <li v-if="!(calendar.works[1].members_id == 0)">・{{calendar.works[1].member}}</li>
            <li v-if="calendar.works.length >= 3">他{{calendar.works.length - 2}}件</li>
          </ul>
        </li>

        <li v-for="(n, index) in last_day_cnt" :key="index" class="content_item blank" ></li>
      </ul>

      <div :class="{active:editmodal}" class="cmn_modal">
          <div class="cmn_modal_inner">
              <div @click="closeEditModal()" class="cmn_modal_inner_close">×</div>
              <!-- <PlaceEditComponent v-show="mode === 'edit'" ref="placeEdit"/> -->
              <CalendarCreateComponent v-show="mode === 'create'" ref="calendarCreate"/>
          </div>
      </div>

    </form>
    
    <pre>{{$data}}</pre>
  </div>
</template>
<script>
import CalendarCreateComponent from './CalendarCreateComponent'
import { VueLoading } from 'vue-loading-template'
import moment from "moment"
export default {
  components: {
    CalendarCreateComponent,
    VueLoading,
  },
  data: function () {
    return {
      loading:false,
      editmodal:false,
      mode:"",
      calendars: [],
      nowyear: new Date().getFullYear(),
      nowmonth: new Date().getMonth()+1,
      users: [],
      year: 0,
      month: 0,
      lastday: 0,
      first_day: 0,
      last_day_cnt: 0,
    };
  },
  methods: {
    edit(){
      this.editmodal = true;
    },
    create(calendar){
        this.mode = "create";
        this.editmodal = true;
        this.$refs.calendarCreate.setcalendar(calendar)
    },
    closeEditModal(){
        this.editmodal = false;
    },
    getusers() {
      axios.get('/api/users')
      .then((res) => {
          this.users = res.data;
      });
    },
    getcalendars() {
      this.loading = true;
      axios.get('/api/calendars/' + this.year + '/' + this.month)
      .then((res) => {
        if(res.data.calendars.length !== 0){
          this.calendars.forEach(calendar => {
            if(res.data.calendars.filter(calendarElm => calendarElm.date === calendar.date).length !== 0){
              calendar.works.splice(0, calendar.works.length);
              calendar.works.push(...res.data.calendars.filter(calendarElm => calendarElm.date === calendar.date)[0].works);
            }
          });
        }
        this.loading = false;
      });
    },
    createcalendar(){
      this.year = this.$route.params.year;
      this.month = this.$route.params.month;
      this.lastday = new Date(this.year, this.month, 0).getDate();
      this.first_day = new Date(this.year, this.month - 1, 1).getDay();
      this.last_day_cnt = 6 - new Date(this.year, this.month - 1, this.lastday).getDay();

      this.calendars.splice(0, this.calendars.length);
      for(let i = 0; i < this.lastday; i++){
        this.calendars.push({
          date:this.year+"-"+('00' + this.month).slice(-2)+"-"+('00' + Number(i+1)).slice(-2),
          works:[
            {
              "members_id":0,
            },
            {
              "members_id":0,
            },
          ],
        });
      }
      this.getcalendars();
    }
  },
  watch: {
    '$route':'createcalendar'
  },
  mounted() {
    this.getusers();
    this.createcalendar();
  },
  filters: {
    format:function(value) {
        return moment(value).format("D");
    }
  },
};
</script>

<style lang="scss" scoped>
input,button {
  border: none;
  outline: none;
}
.cmn_pageTitle {
  margin-bottom: 0;
  // width: 200px;
}
.cmn_pageSecondTitle {
  margin-top: 50px;
}
form{
  position: relative;
  .vue-loading-wrap{
    position: absolute;
  }
}
.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  &_prev {
    font-size: 20px;
    margin-right: 10px;
  }
  &_next {
    font-size: 20px;
    margin-left: 10px;
  }
}

.indent {
  display: flex;
    &_item{
      width: calc(100% / 7);
      text-align: center;
      padding-bottom: 10px;
      &:nth-child(1){
        color: red;
      }
      &:nth-child(7){
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
    &:nth-child(7n) {
      border-right: none;
    }
    &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7) {
      border-top: none;
    }
    &:nth-child(7n) .content_item_icn{
      color: blue;
    }
    &:nth-child(7n-6) .content_item_icn{
      color: red;
    }
    &.blank {
      background-color: rgb(213, 213, 213);
    }
    &.main:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 0, 0.527);
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
    }
  }
}

@media (min-width: 768px) {
  .cmn_pageTitle {
    margin-bottom: 0;
    width: 335px;
  }
  .content_item {
    height: 100px;
    padding: 23px 5px 0;
    &_name {
      font-size: 18px;
    }
    &_price {
      font-size: 16px;
    }
  }
  .pager {
    margin-bottom: 50px;
    &_prev {
      font-size: 40px;
      margin-right: 20px;
    }
    &_next {
      font-size: 40px;
      margin-left: 20px;
    }
  }
}
</style>