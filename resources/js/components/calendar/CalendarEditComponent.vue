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
                                    <option v-for="user in users" :key="user.id" :value="user.id">{{user.name}}</option>
                                </select>
                            </dd>
                            <div v-if="work.error_members_id" class="error">出勤者を入力してください</div>
                        </li>
                        <li class="form_list_item">
                            <dt class="form_list_item_ttl">出勤場所</dt>
                            <dd class="form_list_item_main">
                                <select v-model="work.places_id">
                                    <option value="0">選択してください</option>
                                    <option v-for="place in places" :key="place.id" :value="place.id">{{place.name}}</option>
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
            <button type="submit" class="cmn_btn_sub">編集を確定</button>
        </div>
                <!-- <pre>{{$data}}</pre> -->
    </form>
</template>

<script>
import moment from "moment"
export default {
    data: function () {
        return {
            loading:false,
            error:{
                name:false,
                tel:false,
                address:false,
            },
            calendar: {
                date:"",
                works:[
                    {
                        id:0,
                        members_id:0,
                        places_id:0,
                        price:0,
                    }
                ],
            },
            users: [],
            places: [],
        }
    },
    methods: {
        getusers() {
            this.loading = true;
            axios.get('/api/users')
                .then((res) => {
                    this.users = res.data;
                    this.loading = false;
                });
        },
        getplaces() {
            this.loading = true;
            axios.get('/api/places')
                .then((res) => {
                    this.places = res.data;
                    this.loading = false;
                });
        },
        addwork(){
            let obj = {
                id:0,
                members_id:0,
                places_id:0,
                price:0,
            }
            this.calendar.works.push(obj);
        },
        deletelist(index){
            this.calendar.works.splice(index,1);
            if(this.calendar.works.length === 0){
                this.addwork();
            }
        },
        setcalendar(calendar) {
            this.$set(this.calendar, "date", calendar.date);
            this.calendar.works.splice(0, this.calendar.works.length);
            this.calendar.works.push(...calendar.works.filter(work => work.id !== 0));
            this.calendar.works.forEach(work => {
                if(work.member === "（削除済）"){
                    work.members_id = 0;
                }
                if(work.place === "（削除済）"){
                    work.places_id = 0;
                }
                this.$set(work, "error_members_id", false);
                this.$set(work, "error_places_id", false);
                this.$set(work, "error_price", false);
            });
        },
        postcalendar() {
            if(this.validation()){
                this.$parent.loading = true;
                axios.post('/api/calendars', this.calendar)
                    .then((res) => {
                        console.log(res.data);
                        this.$parent.editmodal = false;
                        this.$parent.getcalendars();
                    })
                    .catch(err => {
                        alert("エラーです");
                        this.$parent.loading = false;
                    });
            }
        },
        deletecalendar(date){
            if(confirm(date + "のデータを全て削除しますか？")){
                this.$parent.loading = true;
                axios.delete('/api/calendars/' + date)
                    .then((res) => {
                        this.$parent.editmodal = false;
                        this.$parent.getcalendars();
                    })
                    .catch(err => {
                        alert("エラーです");
                        this.$parent.loading = false;
                    });
            }
        },
        validation(){
            let noProblem = true;
            this.calendar.works.forEach(work => {
                this.$set(work, 'error_members_id', false);
                if(Number(work.members_id) === 0){
                    this.$set(work, 'error_members_id', true);
                    noProblem = false;
                }
                this.$set(work, 'error_places_id', false);
                if(Number(work.places_id) === 0){
                    this.$set(work, 'error_places_id', true);
                    noProblem = false;
                }
                this.$set(work, 'error_price', false);
                if(!(/^([1-9]\d*|0)$/.test(work.price))){
                    this.$set(work, 'error_price', true);
                    noProblem = false;
                }
            });
            return noProblem;
        },
    },
    mounted: function(){
        this.getusers();
        this.getplaces();
    },
    filters: {
        format:function(value) {
            return moment(value).format("YYYY/MM/DD HH:mm:ss");
        }
    },
}
</script>
<style lang="scss" scoped>
.error {
    color: red;
    position: relative;
    bottom: 8px;
}
.work{
    &_list{
        padding-bottom: 15px;
        border-bottom: 1px solid gray;
        margin-bottom: 50px;
    }
    .addwork{
        width: 140px;
        margin: 0 auto;
        text-align: center;
        background-color: black;
        padding: 5px 0;
        color: white;
        cursor: pointer;
        border-radius: 100px;
        position: relative;
        &::before{
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
    }
    .form_list_wrap{
        display: flex;
        justify-content: space-between;
        .delete_list{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 16%;
            background-color: black;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
    }
	&_list {
        width: 80%;
		&_item {
            font-size: 15px;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
			&_ttl {
			}
			&_main {
                input, select{
                    border: 1px solid gray;
                    border-radius: 5px;
                    width: 100%;
                    padding: 5px;
                    &.ar{
                        padding: 0;
                        border: none;
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
@media(min-width:768px){
    .error {
        padding: 5px;
    }
    .form {
        .form_list_wrap{
            .delete_list{
                width: 30px;
            }
        }
        &_ttl {
            font-size: 35px;
            margin-bottom: 25px;
        }
        &_list {
            width: 500px;
            margin-right: 20px;
            &_item {
                display: flex;
                flex-wrap: wrap;
                &_ttl {
                    width: 30%;
                    padding: 5px;
                }
                &_main {
                    width: 70%;
                    input{
                        &.ar{
                            padding: 5px;
                        }
                    }
                }
            }
        }
        &_btn {
        }
    }
}


</style>