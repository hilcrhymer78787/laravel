<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form v-on:submit.prevent="submit">
                    <div class="form-group row">
                        <label for="name" class="col-sm-3 col-form-label">name</label>
                        <input type="text" class="col-sm-9 form-control" id="name" v-model="user.name">
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-sm-3 col-form-label">email</label>
                        <input type="text" class="col-sm-9 form-control" id="email" v-model="user.email">
                    </div>
                    <div class="form-group row">
                        <label for="password" class="col-sm-3 col-form-label">password</label>
                        <input type="text" class="col-sm-9 form-control" id="password" v-model="user.password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    {{user}}
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                user: {}
            }
        },
        methods: {
            submit() {
                axios.post('/api/users', this.user)
                    .then((res) => {
                        this.$router.push({name: 'user.list'});
                    });
            }
        }
    }
</script>