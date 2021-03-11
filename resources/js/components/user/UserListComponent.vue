<template>
    <div>
        <div class="table">
            <ul class="table_row">
                <li class="table_row_list id">ID</li>
                <li class="table_row_list name">名前</li>
                <li class="table_row_list email d-none d-md-block">メール</li>
                <li class="table_row_list btn">　</li>
            </ul>
            <ul v-for="user in users" :key="user.id" class="table_row">
                <li class="table_row_list id">{{ user.id }}</li>
                <li class="table_row_list name">{{ user.name }}</li>
                <li class="table_row_list email d-none d-md-block">{{ user.email }}</li>
                <li class="table_row_list btn" style="text-align:right;">
                    <button class="cmn_btn_sub mr-1" @click="edit(user)">編集</button>
                    <button class="cmn_btn_delete" @click="deleteuser(user.id)">削除</button>
                </li>
            </ul>
        </div>
        
        <div :class="{active:editmodal}" class="edit_modal">
            <div class="edit_modal_inner">
                <div @click="closeEditModal()" class="edit_modal_inner_close">×</div>
                <UserEditComponent :val="edituser" />
            </div>
        </div>
        <pre>{{$data}}</pre>
    </div>
</template>

<script>
import UserEditComponent from './UserEditComponent'
export default {
    components: {
        UserEditComponent,
    },
    data: function () {
        return {
            editmodal:false,
            edituser:{},
            users: []
        }
    },
    methods: {
        getusers() {
            axios.get('/api/users')
                .then((res) => {
                    this.users = res.data;
                });
        },
        deleteuser(id) {
            axios.delete('/api/users/' + id)
                .then((res) => {
                    this.getusers();
                });
        },
        edit(user){
            this.edituser = user;
            this.editmodal = true;
        },
        closeEditModal(){
            this.editmodal = false;
        }
    },
    mounted() {
        this.getusers();
    }
}
</script>
<style lang="scss" scoped>
.table {
    background-color: white;
    box-shadow: 0 0 10px #636363;
	&_row {
        display: flex;
        align-items: center;
        padding: 5px;
        border-bottom: 1px solid gray;
        &_list {
            padding: 5px;
            &.id {
                width: 20%;
            }
            &.name {
                width: 35%;
            }
            &.email {
            }
            &.btn {
                width: 45%;
                text-align: right;
            }
        }
	}
}
.edit_modal{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    transform: scale(0);
    &.active{
        transform: scale(1);
        .edit_modal_inner{
            transform: scale(1);
            opacity: 1;
        }
    }
    &_inner{
        transform: scale(0);
        opacity: 0;
        transition: .5s;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        max-width: 870px;
        height: 80%;
        background-color: white;
        padding: 20px;
        &_close{
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }
    }
}
@media (min-width: 768px) {
.table {
	&_row {
        &_list {
            padding: 5px;
            &.id {
                width: 20%;
            }
            &.name {
                width: 20%;
            }
            &.email {
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