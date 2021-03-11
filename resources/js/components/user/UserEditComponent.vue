<template>
    <div>
        <div class="form">
            <ul class="form_list">
                <li class="form_list_item">
                    <dt class="form_list_item_label">ID</dt>
                    <dd><input class="form_list_item_input" type="text" v-model="user.id"></dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_label">名前</dt>
                    <dd><input class="form_list_item_input" type="text" v-model="user.name"></dd>
                </li>
                <li class="form_list_item">
                    <dt class="form_list_item_label">メール</dt>
                    <dd><input class="form_list_item_input" type="text" v-model="user.email"></dd>
                </li>
            </ul>
            <button @click="putuser()" class="form_btn cmn_btn_sub">編集を確定</button>
        </div>
    </div>
</template>

<script>
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
                    });
            }
        },
        watch: {
            val:function(){
                this.user = this.val;
            }
        },
        mounted() {
            // this.getuser();
        }
    }
</script>