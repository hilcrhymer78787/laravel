<template>
    <div>
        <input type="text" v-model="newTodo" @keyup.enter="onEnter">
        <ul>
            <li v-for="(todo, index) in todos" :key="index">
                <input type="checkbox">
                <span>{{todo}}</span>
                <button>delite</button>
            </li>
        </ul>
        <pre>{{$data}}</pre>
        hoge
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
export type DataType = {
    todos: string[];
    newTodo: string;
};
export default Vue.extend({
    data(): DataType {
        return {
            todos: [],
            newTodo: "",
        };
    },
    methods: {
        onEnter(): void {
            this.addTodo(this.newTodo);
        },
        addTodo(title: string): void {
            this.todos.push(title);
        },
    },
});
</script>
<style scoped>

</style>