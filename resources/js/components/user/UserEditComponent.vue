<template>
    <div>
        
        <form class="form" v-on:submit.prevent="putuser">
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
                    <dt class="form_list_item_ttl">編集日時</dt>
                    <dd class="form_list_item_main"><input class="ar" type="text" readonly :value="user.updated_at | format"></dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">名前</dt>
                    <dd class="form_list_item_main"><input type="text" v-model="user.name"></dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">メール</dt>
                    <dd class="form_list_item_main"><input type="text" v-model="user.email"></dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">パスワード</dt>
                    <dd class="form_list_item_main"><input type="text" v-model="user.password"></dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_ttl">日給</dt>
                    <dd class="form_list_item_main"><input type="text" v-model="user.salary"></dd>
                </li>
            </ul>
            <div class="form_btn">
                <button type="submit" class="cmn_btn_sub">編集を確定</button>
            </div>
        </form>
    </div>
</template>

<script>
    import moment from "moment"
    export default {
        props: ['val'],

        data: function () {
            return {
                user: {}
            }
        },
        methods: {
            putuser() {
                axios.put('/api/users/' + this.user.id, this.user)
                    .then((res) => {
                        this.$parent.editmodal = false;
                        this.$parent.users.forEach(element => {
                            if(element.id === this.user.id){
                                element = this.user;
                            }
                        });
                    });
            }
        },
        watch: {
            val:function(){
                this.user = this.val;
            }
        },
        mounted: function(){
        },
        filters: {
            format:function(value) {
                return moment(value).format("YYYY/MM/DD HH:mm:ss");
            }
        }
    }
</script>
<style lang="scss" scoped>
.form {
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
        margin-top: 15px;
        text-align: right;
    }
}
@media(min-width:768px){
    .form {
        &_list {
            &_item {
                display: flex;
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