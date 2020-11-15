<template>
    <div class="grid grid-cols-7 bg-gray-700">
        
        <div v-if="settings" class="col-span-3">
            <img class="webcam shadow-xxl rounded-lg" :src="settings.webcam.streamUrl">
        </div>

        <div v-if="printer" class="status grid grid-cols-12 grid-rows-8 col-span-4">

            <div class="col-span-5 col-start-1 ml-8 row-start-4 rounded-lg bg-gray-600 shadow-2xl  relative overflow-hidden">
                <div class="px-3 pt-6 pb-12 text-center relative z-10">
                    <h4 class="text-sl uppercase text-gray-500 leading-tight">Extruder</h4>
                        <h3 class="text-6xl text-gray-900 font-semibold leading-tight my-3"> {{printer.temperature.tool0.actual}}°</h3>
                </div>
                <div class="absolute bottom-0 inset-x-0">
                    <trend
                        :data=nozzletemp
                        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                        auto-draw
                        stroke-width=4
                        smooth>
                    </trend>
                </div>
            </div>

            <div class="col-span-5 col-start-7 ml-8 row-start-4 rounded-lg bg-gray-600 shadow-2xl  relative overflow-hidden">
                <div class="px-3 pt-6 pb-12 text-center relative z-10">
                    <h4 class="text-sl uppercase text-gray-500 leading-tight">Bed</h4>
                    <h3 class="text-6xl text-gray-900 font-semibold leading-tight my-3"> {{printer.temperature.bed.actual}}°</h3>
                </div>
                    <div class="absolute bottom-0 inset-x-0">
                    <trend
                        :data=bedtemp
                        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                        auto-draw
                        stroke-width=4
                        smooth>
                    </trend>
                </div>
            </div>
            
        
            <div v-if="job" class="col-span-12 row-start-7 progress">
                               
                <div class="flex mb-2 items-center justify-between">
                        <span class="text-xs font-semibold inline-block py-1 px-2  uppercase rounded-full text-gray-900  bg-gray-600">
                            {{ job.state }}
                        </span>
                    <div class="text-right">
                        <span class="text-xl font-semibold inline-block text-gray-500">{{ job.job.file.name }}</span>
                    </div>
                </div>

                <div class="overflow-hidden h-6 mb-4 text-xs shadow-2xl flex rounded bg-gray-600">
                    <div :style="style" class=" flex text-black flex-col text-center text-xl font-bold justify-center whitespace-no-wrap bg-blue-300">
                        {{ progress }}
                    </div>
                </div>

                </div>
        </div>
    </div>
</template>

<script lang="ts">
import { createFrontend } from "@awtrix/common";
import Vue from "vue"
import Trend from "vuetrend"

export default createFrontend({
    components: Trend,
    data() {
        return {
            status: "n/a",
            host: "http://192.168.178.20:5000",
            apiKey: "343FDAECF165476A80EA3CB718000623",
            data: undefined,
            settings: undefined,
            job: undefined,
            printer: undefined,
            state: undefined,
            nozzle:[],
            bed:[]
        };
    },

    mounted() {
        setInterval(() => this.getData(), 2000);
        this.getSettings();
        this.getData();
    },

    computed: {
        progress() {
            if (this.job.progress.completion > 0) {
                return this.job.progress.completion.toFixed(2) + "%";
            } else {
                return "";
            }
        },
        style() {
            if (this.job.progress.completion > 0) {
                return { width: this.job.progress.completion.toFixed(2) + "%" };
            } else {
                return "";
            }
        },
        nozzletemp(){
            return this.nozzle.slice(Math.max(this.nozzle.length - 10, 1))
        },
        bedtemp(){
            return this.bed.slice(Math.max(this.bed.length - 10, 1))
        }
    },

    methods: {
        getData() {
            fetch(this.host + "/api/printer", {
                headers: {
                    "X-Api-Key": this.apiKey,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.data = data;

                    if ((data.state.flags.printing = true)) {
                        this.state = "Printing";
                        this.getJob();
                        this.getPrinter();
                    } else {
                        this.job = undefined;
                    }
                });
        },
        getSettings() {
            fetch(this.host + "/api/settings", {
                headers: {
                    "X-Api-Key": this.apiKey,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.settings = data;
                });
        },
        getJob() {
            fetch(this.host + "/api/job", {
                headers: {
                    "X-Api-Key": this.apiKey,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.job = data;
                });
        },
        getPrinter() {
            fetch(this.host + "/api/printer", {
                headers: {
                    "X-Api-Key": this.apiKey,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.printer = data;
                    this.nozzle.push(data.temperature.tool0.actual);
                    this.bed.push(data.temperature.bed.actual);
                });
        },
    },
});
</script>

<style lang="stylus">

.webcam {
    margin: 20px;
    height: 360px;
    width: 490px;
}

.progress {
    width: 95%;
}
</style>


</script>
