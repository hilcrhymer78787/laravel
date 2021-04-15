<template>
    <div>
        <input type="text" v-model="newTask.content" @keyup.enter="createTask">
        <ul>
            <li v-for="(task, index) in tasks" :key="index">
                <input v-model="task.state" type="checkbox">
                <span :class="{done: task.state}">{{task.content}}</span>
                <button @click="deleteTask(index)">delite</button>
            </li>
        </ul>
        <pre>{{$data}}</pre>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
export type DataType = {
    tasks: any[];
    newTask: {
        state: Boolean,
        content: String,
    };
};
export default Vue.extend({
    data(): DataType {
        return {
            tasks: [],
            newTask: {
                state: false,
                content: ""
            },
        };
    },
    methods: {
        createTask(): void {
            let task: any = {
                state: Boolean,
                content: String
            }
            task = {
                state: this.newTask.state,
                content: this.newTask.content
            }
            this.tasks.push(task);
        },
        deleteTask(index: number): void {
            this.tasks.splice(index, 1);
        },
    },
});
</script>
<style scoped>
.done{
    opacity: 0.5;
    text-decoration: line-through;
}
button{
    padding: 0 5px;
    border: 1px solid black;
}
li{
    margin: 15px 0;
}
</style>