<template>        
    <form class="form" v-on:submit.prevent="postcalendar">
        <div class="form_ttl">{{calendar.date}}出勤登録</div>
        <ul class="form_list">
            <li class="form_list_item">
                <dt class="form_list_item_ttl">出勤先</dt>
                <dd class="form_list_item_main"><input type="text" v-model="calendar.name"></dd>
                <div v-if="error.name" class="error">出勤先を入力してください</div>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">電話番号</dt>
                <dd class="form_list_item_main"><input type="text" v-model="calendar.tel"></dd>
                <div v-if="error.tel" class="error">電話番号を入力してください</div>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">住所</dt>
                <dd class="form_list_item_main"><input type="text" v-model="calendar.address"></dd>
                <div v-if="error.address" class="error">住所を入力してください</div>
            </li>
        </ul>
        <div class="form_btn">
            <button type="submit" class="cmn_btn_sub">編集を確定</button>
        </div>
        <pre>{{$data}}</pre>
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
                    works:[],
                },
            }
        },
        methods: {
            setcalendar() {
                this.$set(this.calendar, date, "");
                this.$set(this.calendar, works, []);
            },
            postcalendar() {
                if(this.validation()){
                    this.$parent.loading = true;
                    axios.post('/api/calendars', this.calendar)
                        .then((res) => {
                            this.$parent.editmodal = false;
                            this.$parent.getcalendars();
                            this.$parent.loading = false;
                        })
                        .catch(err => {
                            alert("エラーです");
                            console.log(err);

                            this.$parent.loading = false;
                        });
                }
            },
            validation(){
                let noProblem = true;
                this.$set(this.error, 'name', false);
                if(this.calendar.name === ""){
                    this.$set(this.error, 'name', true);
                    noProblem = false;
                }
                this.$set(this.error, 'tel', false);
                if(this.calendar.tel === ""){
                    this.$set(this.error, 'tel', true);
                    noProblem = false;
                }
                this.$set(this.error, 'address', false);
                if(this.calendar.address === ""){
                    this.$set(this.error, 'address', true);
                    noProblem = false;
                }
                return noProblem;
            },
        },
        mounted: function(){
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
.form {
    height: 100%;
    padding-top: 50px;
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
			&_ttl {
			}
			&_main {
                input{
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