<template>
    <div>
        <ul @click="hamburgerToggle()" :class="{active:hamburger}" class="hamburger">
            <li v-for="n in 3" :key="n" class="hamburger_icn"></li>
        </ul>
        <div :class="{active:hamburger}" class="header">
            <div class="container">
                <div class="d-flex align-items-center justify-content-center">
                    <img class="header_img" v-if="$store.state.loginuser.img_name" @error="noImage" :src="'/storage/' + $store.state.loginuser.img_name">
                    <img class="header_img" v-if="!$store.state.loginuser.img_name" @error="noImage" src="/assets/noimage.png">
                    <div class="header_left">
                        <p>{{$store.state.loginuser.name}}</p>
                        <a href="/logout">ログアウト</a>
                    </div>
                </div>
                <div class="header_nav d-md-flex justify-content-center">
                    <router-link @click.native="hamburgerFalse()" :to="{name: 'search'}">search</router-link>
                    <router-link @click.native="hamburgerFalse()" :to="{name: 'calendar'}">calendar</router-link>
                    <router-link @click.native="hamburgerFalse()" :to="{name: 'place'}">place</router-link>
                    <router-link @click.native="hamburgerFalse()" :to="{name: 'user'}">user</router-link>
                </div>
            </div>
        </div>
        <div class="dammyHeader"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hamburger: false,
        };
    },
    methods: {
        noImage(element) {
            element.target.src = "/assets/noimage.png";
        },
        hamburgerToggle() {
            this.hamburger = !this.hamburger;
        },
        hamburgerFalse() {
            this.hamburger = false;
        },
    },
};
</script>
<style lang="scss" scoped>
@mixin mq-pc {
    @media screen and (min-width: 768px) {
        @content;
    }
}
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background-color: #000066;
    transform: translateX(-100%);
    transition: 0.5s;
    color: white;
    @include mq-pc {
        width: 100%;
        position: fixed;
        bottom: auto;
        transform: translateX(0) !important;
        transition: 0;
        font-size: 20px;
        box-shadow: 0 3px 5px rgb(0 0 0 / 50%);
        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    &.active {
        transform: translateX(0);
    }
    &_img {
        margin-right: 10px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid white;
    }
    &_left {
        margin-right: 50px;
        font-size: 20px;
        a {
            font-size: 15px;
            color: #f3920b;
        }
    }
    &_nav {
        a {
            text-align: center;
            font-size: 20px;
            margin-bottom: 10px;
            @include mq-pc {
                text-align: left;
                margin-right: 20px;
                margin-bottom: 0;
            }
            &:first-child {
                margin-top: 20px;
                @include mq-pc {
                    margin-top: 0;
                }
            }
            @include mq-pc {
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}

.dammyHeader {
    padding-top: 50px;
    @include mq-pc {
        padding-top: 120px;
    }
}
.hamburger {
    position: fixed;
    right: 15px;
    top: 15px;
    z-index: 6;
    width: 36px;
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    @include mq-pc {
        display: none;
    }
    &_icn {
        width: 100%;
        height: 5px;
        background-color: #f3920b;
        border-radius: 5px;
        transition: 0.5s;
        box-shadow: 0 0 3px #9a5d08;
    }
    &.active .hamburger_icn {
        box-shadow: none;
        &:nth-child(1) {
            transform: rotate(-45deg) translateY(12px) translateX(-5px);
        }
        &:nth-child(2) {
            transform: translateX(18px);
            opacity: 0;
        }
        &:nth-child(3) {
            transform: rotate(45deg) translateY(-12px) translateX(-5px);
        }
    }
}
</style>