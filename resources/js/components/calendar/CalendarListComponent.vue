<template>
  <div class="calendar">
    <div class="container">
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
          <li v-for="n in first_day" class="content_item blank"></li>

          <li v-for="calendar in calendars" class="content_item">
            <span class="content_item_icn">{{ calendar.day }}</span>
            <div class="content_item_inner">
              <select class="content_item_input" @change="submit(calendar.day)" v-model="calendar.members_id">
                <option value="0">−</option>
                <option v-for="user in users" v-bind:value="user.id">{{user.name}}</option>
              </select>
              <div class="content_item_name">
                <span v-if="calendar.members_id === 0">−</span>
                <span v-for="user in users">
                  <span v-if="user.id === calendar.members_id">{{user.name}}</span>
                </span>
              </div>
            </div>
            <div class="content_item_inner">
              <input @input="submit(calendar.day)" class="content_item_price" type="text" name="price-1" v-model="calendar.price">
            </div>
          </li>
          <li v-for="n in last_day_cnt" class="content_item blank" ></li>
        </ul>
      </form>
      <!-- <h2 class="cmn_pageSecondTitle">給与</h2>
    <table border="1" class="salary_table">
    <tbody><tr>
        <th>名前</th>
        <th>出演</th>
        <th>合計</th>
      </tr>
                  <tr>
        <td>YU</td>
        <td>5回</td>
        <td>50000円</td>
      </tr>
              <tr>
        <td>KOICHI</td>
        <td>5回</td>
        <td>30000円</td>
      </tr>
              <tr>
        <td>HIRO</td>
        <td>5回</td>
        <td>35000円</td>
      </tr>
        </tbody>
        </table> -->
    </div>

    <!-- <pre>{{"year:"+year}}</pre>
    <pre>{{"month:"+month}}</pre>
    <pre>{{"users:"+users}}</pre>
    <pre>{{"first_day:"+first_day}}</pre>
    <pre>{{"lastday:"+lastday}}</pre>
    <pre>{{"last_day_cnt:"+last_day_cnt}}</pre> -->
    <!-- <pre>{{users}}</pre> -->
    
    <!-- <pre>{{calendars}}</pre> -->
    
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      calendars: [],
      users: [],
      year: 0,
      month: 0,
      lastday: 0,
      first_day: 0,
      last_day_cnt: 0,
    };
  },
  methods: {
    getusers() {
      axios.get('/api/users')
      .then((res) => {
          this.users = res.data;
      });
    },
    getcalendars() {
      axios.get('/api/calendars/' + this.year + '/' + this.month)
      .then((res) => {
        for(let i = 0; i < res.data.calendars.length; i++){
          let calendar = res.data.calendars[i];
          this.calendars.splice(calendar.day-1,1,calendar);
        }
      });
    },
    submit(day) {
        axios.post('/api/calendars', this.calendars[day-1])
        .then((res) => {
          this.getcalendars();
        });
    },
    createcalendar(){
      this.calendars=[];
      this.year = this.$route.params.year;
      this.month = this.$route.params.month;
      this.lastday = new Date(this.year, this.month, 0).getDate();
      this.first_day = new Date(this.year, this.month - 1, 1).getDay();
      this.last_day_cnt = 6 - new Date(this.year, this.month - 1, this.lastday).getDay();
      this.getusers();
      for(let i = 0; i < this.lastday; i++){
        this.calendars.push({
          id:0,
          year:this.year,
          month:this.month,
          day:i+1,
          price:0,
          members_id:0,
        });
      }
      this.getcalendars();
    }
  },
  watch: {
      '$route':'createcalendar'
  },
  mounted() {
    this.createcalendar();
  },
};
</script>

<style lang="scss" scoped>
input,button {
  border: none;
  outline: none;
}
th,td {
  padding: 15px;
  text-align: center;
}
.cmn_pageTitle {
  margin-bottom: 0;
  // width: 200px;
}
.cmn_pageSecondTitle {
  margin-top: 50px;
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
    height: 90px;
    padding: 40px 0 0;
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
    height: 90px;
    padding: 10px 0;
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