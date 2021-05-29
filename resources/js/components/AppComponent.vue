<template>
    <div class="app">
        <HeaderComponent/>
        <div class="container">
            <router-view></router-view>
        </div>
        <div v-if="$store.state.loading" class="vue-loading-wrap">
            <vue-loading type="spin" color="#333" :size="{ width: '80px', height: '80px'}"></vue-loading>
        </div>
    </div>
</template>

<script>
import HeaderComponent from "./HeaderComponent"
export default {
    components: {
        HeaderComponent,
    },
}
</script>
<style lang="scss">
@charset "utf-8";
* {
    box-sizing: border-box;
}
:after,
:before {
    box-sizing: inherit;
}
html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
    margin: 0;
}
main {
    display: block;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    margin: 0;
}
address,
blockquote,
dl,
figure,
form,
iframe,
ol,
p,
pre,
table,
ul {
    margin: 0;
}
ol,
ul {
    padding: 0;
    list-style: none;
}
dt {
    font-weight: 700;
}
dd {
    margin-left: 0;
}
hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    border: 0;
    border-top: 1px solid;
    margin: 0;
    clear: both;
    color: inherit;
}
pre {
    font-family: monospace;
    font-size: inherit;
}
address {
    font-style: inherit;
}
a {
    background-color: transparent;
    text-decoration: none;
    color: inherit;
}
abbr[title] {
    border-bottom: 0;
    text-decoration: underline;
    text-decoration: underline dotted;
}
b,
strong {
    font-weight: bolder;
}
code,
kbd,
samp {
    font-family: monospace;
    font-size: inherit;
}
small {
    font-size: 80%;
}
sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}
sub {
    bottom: -0.25em;
}
sup {
    top: -0.5em;
}
img {
    border-style: none;
    vertical-align: bottom;
}
embed,
iframe,
object {
    border: 0;
    vertical-align: bottom;
}
button,
input,
optgroup,
select,
textarea {
    -webkit-appearance: none;
    appearance: none;
    vertical-align: middle;
    color: inherit;
    font: inherit;
    border: 0;
    background: transparent;
    padding: 0;
    margin: 0;
    outline: 0;
    border-radius: 0;
    text-align: inherit;
}
[type="checkbox"] {
    -webkit-appearance: checkbox;
    appearance: checkbox;
}
[type="radio"] {
    -webkit-appearance: radio;
    appearance: radio;
}
button,
input {
    overflow: visible;
}
button,
select {
    text-transform: none;
}
[type="button"],
[type="reset"],
[type="submit"],
button {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
}
[type="button"][disabled],
[type="reset"][disabled],
[type="submit"][disabled],
button[disabled] {
    cursor: default;
}
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner,
button::-moz-focus-inner {
    border-style: none;
    padding: 0;
}
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring,
button:-moz-focusring {
    outline: 1px dotted ButtonText;
}
select::-ms-expand {
    display: none;
}
fieldset,
option {
    padding: 0;
}
fieldset {
    margin: 0;
    border: 0;
    min-width: 0;
}
legend {
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
}
progress {
    vertical-align: baseline;
}
textarea {
    overflow: auto;
}
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
    height: auto;
}
[type="search"] {
    outline-offset: -2px;
}
[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}
::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
}
label[for] {
    cursor: pointer;
}
details {
    display: block;
}
summary {
    display: list-item;
}
[contenteditable] {
    outline: 0;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
caption {
    text-align: left;
}
td,
th {
    vertical-align: top;
    padding: 0;
}
th {
    text-align: left;
    font-weight: 700;
}
[hidden],
template {
    display: none;
}
a,
img {
    display: block;
}
a {
    display: block;
    color: inherit;
}
img {
    display: block;
}
a:hover {
    text-decoration: none;
    color: inherit;
}
table {
    border: none;
}
select {
    cursor: pointer;
}

/* common sp
--------------------------------------------- */
body {
    padding: 0 0 50px;
    background-color: #e9e9e9;
    font-family: "Noto Sans JP", "ヒラギノ角ゴ Pro W3",
        "Hiragino Kaku Gothic Pro", sans-serif;
    font-size: 12px;
    color: black;
}
.is-pc {
    display: none;
}
.container {
    max-width: 900px;
}
.vue-loading-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    .vue-loading {
    }
}
.router-link-active {
    color: #f3920b !important;
}
.cmn_modal {
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
    &.active {
        transform: scale(1);
        .cmn_modal_inner {
            transform: scale(1);
            opacity: 1;
        }
    }
    &_inner {
        overflow-y: scroll;
        transform: scale(0);
        opacity: 0;
        transition: 0.5s;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        max-width: 870px;
        height: 80%;
        background-color: white;
        padding: 0 20px;
        &_close {
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
.cmn_btn {
    display: block;
    background-color: #f3920b;
    border-radius: 3px;
    padding: 10px 15px;
    border-bottom: 5px solid #a26209;
    margin: 15px 0 0 auto;
    white-space: nowrap;
    cursor: pointer;
}
.cmn_btn_sub {
    display: inline-block;
    background-color: #f3920b;
    border-radius: 5px;
    padding: 5px 10px;
    white-space: nowrap;
    cursor: pointer;
}
.cmn_btn_delete {
    display: inline-block;
    background-color: #fd7171;
    border-radius: 5px;
    padding: 5px 10px;
    white-space: nowrap;
    cursor: pointer;
}
.cmn_pageTitle {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    margin-bottom: 30px;
}
.cmn_pageSecondTitle {
    font-size: 25px;
    margin-top: 30px;
    margin-bottom: 10px;
}
table {
    background-color: white;
    box-shadow: 0 0 10px rgb(100, 100, 100);
}
input {
    background-color: white;
}
input[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    transition: 0.15s;
    cursor: pointer;
    border: 2px solid #000066;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
input[type="radio"]:before {
    content: "";
    display: block;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background: #000066;
    transition: 0.25s;
    transform: scale(0);
}
input[type="radio"]:checked:before {
    transform: scale(1);
}

/* update_modal sp
--------------------------------------------- */

.update_modal_wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 7;
    display: none;
}
.update_modal_wrap.active {
    display: block;
}
.update_modal {
    z-index: 8;
    margin: 0 auto;
    width: 90%;
    max-width: 500px;
    background-color: white;
    padding: 30px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: none;
}
.update_modal.active {
    display: block;
}
.update_modal_text {
    border: 1px solid black;
    width: 100%;
    height: 80px;
}
.update_modal_close {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    color: #000066;
}

@media (min-width: 768px) {
    /* common pc
--------------------------------------------- */
    .is-sp {
        display: none;
    }
    .is-pc {
        display: block;
    }
    body {
        font-size: 15px;
    }
    .cmn_pageTitle {
        font-size: 40px;
        margin-bottom: 40px;
    }
    .cmn_pageSecondTitle {
        font-size: 35px;
        margin-top: 50px;
        margin-bottom: 20px;
    }
}
</style>