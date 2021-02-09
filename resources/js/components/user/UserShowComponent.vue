<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-8">
                <form>
                    <div class="form-group row border-bottom">
                        <label for="id" class="col-sm-3 col-form-label">ID</label>
                        <input type="text" class="col-sm-9 form-control-plaintext" readonly id="id"
                               v-model="user.id">
                    </div>
                    <div class="form-group row border-bottom">
                        <label for="name" class="col-sm-3 col-form-label">名前</label>
                        <input type="text" class="col-sm-9 form-control-plaintext" readonly id="name"
                               v-model="user.name">
                    </div>
                    <div class="form-group row border-bottom">
                        <label for="email" class="col-sm-3 col-form-label">メール</label>
                        <input type="text" class="col-sm-9 form-control-plaintext" readonly id="email"
                               v-model="user.email">
                    </div>
                    <div class="form-group row border-bottom">
                        <label for="created_at" class="col-sm-3 col-form-label">登録日</label>
                        <input type="text" class="col-sm-9 form-control-plaintext" readonly id="created_at"
                               v-model="user.created_at">
                    </div>
                    <div class="form-group row border-bottom">
                        <label for="updated_at" class="col-sm-3 col-form-label">更新日</label>
                        <input type="text" class="col-sm-9 form-control-plaintext" readonly id="updated_at"
                               v-model="user.updated_at">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            userId: String,
        },
        data: function () {
            return {
                user: {},
            }
        },
        methods: {
            getuser() {
                axios.get('/api/users/' + this.userId)
                    .then((res) => {
                        this.user = res.data;
                    });
            }
        },
        mounted() {
            this.getuser();
        }
    }

</script>