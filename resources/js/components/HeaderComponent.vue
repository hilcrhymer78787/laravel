<template>
    <div>
        <ul @click="hamburgerToggle()" :class="{active:hamburger}" class="hamburger">
            <li class="hamburger_icn"></li>
            <li class="hamburger_icn"></li>
            <li class="hamburger_icn"></li>
        </ul>
        <div :class="{active:hamburger}" class="header">
            <div class="header_nav d-flex justify-content-center">
                <router-link @click.native="hamburgerFalse()" :to="{name: 'search'}">search</router-link>
                <router-link @click.native="hamburgerFalse()" :to="{name: 'calendar'}">calendar</router-link>
                <router-link @click.native="hamburgerFalse()" :to="{name: 'place'}">place</router-link>
                <router-link @click.native="hamburgerFalse()" :to="{name: 'user'}">user</router-link>
                <p style="margin-left:100px;">{{loginuser.name}}</p>
                <a href="/logout" style="margin-left:30px;">ログアウト</a>
            </div>
        </div>
        <div class="dammyHeader"></div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            loginuser:{},
            hamburger:false,
            year: new Date().getFullYear(),
            month: new Date().getMonth()+1,
        };
    },
    methods:{
        getLoginUser(){
            axios.get('/api/loginuser')
                .then((res) => {
                    this.loginuser = res.data.loginuser;
                });
        },
        hamburgerToggle(){
            this.hamburger = !this.hamburger;
        },
        hamburgerFalse(){
            this.hamburger = false;
        }
    },
    mounted() {
        this.getLoginUser();
    }
}
</script>
<style lang="scss" scoped>
/* header sp
--------------------------------------------- */
.header{
    display: flex;
    justify-content: center;
    align-items: center;
    position:fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index:5;
    background-color:#000066;
    transform: translateX(-100%);
    transition: .5s;
    color: white;
    &.active{
        transform: translateX(0);
    }
    &_nav{
        a{
            margin-right: 20px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
}

.dammyHeader{
    padding-top: 120px;
}
.hamburger{
position: fixed;
right: 15px;
top: 15px;
z-index: 6;
width: 36px;
height: 30px;
display: flex;
flex-direction: column;
justify-content: space-between;
cursor: pointer;
    &_icn{
    height: 5px;
    background-color: #f3920b;
    border-radius: 5px;
    transition: .5s;
    box-shadow: 0 0 3px #9a5d08;
    }
    &.active .hamburger_icn{
    box-shadow: none;
        &:nth-child(1){
        transform: rotate(-45deg) translateY(12px) translateX(-5px);
        }
        &:nth-child(2){
        transform: translateX(18px);
        opacity: 0;
        }
        &:nth-child(3){
        transform: rotate(45deg) translateY(-12px) translateX(-5px);
        }
    }
}
@media (min-width: 768px) {
    /* header pc
    --------------------------------------------- */
    .header{
        width:100%;
        position:fixed;
        bottom: auto;
        transform: translateX(0) !important;
        padding: 20px 0;
        transition: 0;
        font-size: 20px;
    }
    .hamburger{
        display: none;
    }
}
</style>