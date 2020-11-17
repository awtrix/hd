<template>
    <div v-if="stat">

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
 <img v-on:click="open(stat.name)" v-bind:src="'data:image/jpeg;base64,' + stat.image" />
</button>

        
        {{ stat.name }}
    </div>
</template>

<script lang="ts">
import { createFrontend } from "@awtrix/common";

export default createFrontend({
    data() {
        return {
            stat: undefined,
        };
    },

    mounted() {
        this.io.on("quickdeck", (value) => {
            console.log(value);
            this.stat = JSON.parse(value);
        });
    },

    methods: {
        async open(msg) {
            var obj = new Object();
            obj.type = "open";
            obj.file = msg;
            this.io.emit("quickdeck1", JSON.stringify(obj));
        },
    },
});
</script>
