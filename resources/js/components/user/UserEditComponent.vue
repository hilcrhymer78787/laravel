<template>        
    <form class="form" v-on:submit.prevent="putuser">
        <div class="form_ttl">ユーザー編集</div>
        <ul class="form_list">
            <li class="form_list_item">
                <dt class="form_list_item_ttl">ID</dt>
                <dd class="form_list_item_main"><input class="ar" type="text" readonly v-model="user.id"></dd>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">登録日時</dt>
                <dd class="form_list_item_main"><input class="ar" type="text" readonly :value="user.created_at | format"></dd>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">更新日時</dt>
                <dd class="form_list_item_main"><input class="ar" type="text" readonly :value="user.updated_at | format"></dd>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">名前</dt>
                <dd class="form_list_item_main"><input type="text" v-model="user.name"></dd>
                <div v-if="error.name" class="error">名前を入力してください</div>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">メール</dt>
                <dd class="form_list_item_main"><input type="text" v-model="user.email"></dd>
                <div v-if="error.email" class="error">メールアドレスを適切な形で入力してください</div>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">パスワード</dt>
                <dd class="form_list_item_main"><input type="text" v-model="user.password"></dd>
                <div v-if="error.password" class="error">パスワードを8文字以上の英数字で入力してください</div>
            </li>
            <li class="form_list_item">
                <dt class="form_list_item_ttl">日給</dt>
                <dd class="form_list_item_main"><input type="text" v-model="user.salary"></dd>
                <div v-if="error.salary" class="error">日給を数値で入力してください</div>
            </li>
        </ul>
        <div class="form_btn">
            <button type="submit" class="cmn_btn_sub">編集を確定</button>
        </div>
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
                    email:false,
                    password:false,
                    salary:false,
                },
                user: {
                    name:"",
                    email:"",
                    password:"",
                    salary:"",
                },
            }
        },
        methods: {
            setuser(edituser) {
                this.user = edituser;
                this.$set(this.error, 'name', false);
                this.$set(this.error, 'email', false);
                this.$set(this.error, 'password', false);
                this.$set(this.error, 'salary', false);
            },
            putuser() {
                if(this.validation()){
                    this.$parent.loading = true;
                    axios.put('/api/users/' + this.user.id, this.user)
                        .then((res) => {
                            this.$parent.editmodal = false;
                            this.$parent.getusers();
                            this.$parent.loading = false;
                        });
                }
            },
            validation(){
                let noProblem = true;
                this.$set(this.error, 'name', false);
                if(this.user.name === ""){
                    this.$set(this.error, 'name', true);
                    noProblem = false;
                }
                this.$set(this.error, 'email', false);
                if(!(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(this.user.email))){
                    this.$set(this.error, 'email', true);
                    noProblem = false;
                }
                this.$set(this.error, 'password', false);
                if(!(/^([a-zA-Z0-9]{8,})$/.test(this.user.password))){
                    this.$set(this.error, 'password', true);
                    noProblem = false;
                }
                this.$set(this.error, 'salary', false);
                if(!(/^([1-9]\d*|0)$/.test(this.user.salary))){
                    this.$set(this.error, 'salary', true);
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