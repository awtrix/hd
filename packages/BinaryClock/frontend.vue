<template>
    <div class="app text-white" :style="{ background: activeColor}">
        <v-btn
            outlined
            :disabled="disabled"
            color="blue"
            rounded
            block
            @click="start"
            >{{ activeColor }}</v-btn
        >
       
    </div>
</template>

<script lang="ts">
import { createFrontend } from "@awtrix/common";

export default createFrontend({
    data() {
        return {
            text: "Lets go",
            disabled: false,
            logs: [],
            activeColor: "red",
            recognition: undefined,
        };
    },

   
    mounted() {
        this.init();
    },

    methods: {
        start() {
            this.recognition.start();
        },
        init() {
            var SpeechRecognition =
                SpeechRecognition || webkitSpeechRecognition;
            var SpeechGrammarList =
                SpeechGrammarList || webkitSpeechGrammarList;
            var SpeechRecognitionEvent =
                SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

            var colors = [
                "aqua",
                "azure",
                "beige",
                "bisque",
                "black",
                "blue",
                "brown",
                "chocolate",
                "coral",
                "crimson",
                "cyan",
                "fuchsia",
                "ghostwhite",
                "gold",
                "goldenrod",
                "gray",
                "green",
                "indigo",
                "ivory",
                "khaki",
                "lavender",
                "lime",
                "linen",
                "magenta",
                "maroon",
                "moccasin",
                "navy",
                "olive",
                "orange",
                "orchid",
                "peru",
                "pink",
                "plum",
                "purple",
                "red",
                "salmon",
                "sienna",
                "silver",
                "snow",
                "tan",
                "teal",
                "thistle",
                "tomato",
                "turquoise",
                "violet",
                "white",
                "yellow",
            ];
            var grammar =
                "#JSGF V1.0; grammar colors; public <color> = " +
                colors.join(" | ") +
                " ;";

            this.recognition = new SpeechRecognition();
        
            this.recognition.continuous = false;
            this.recognition.lang = "en-US";
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 1;

            this.recognition.onresult = function (event) {
              var color = event.results[0][0].transcript;
                this.activeColor = color
                console.log(this.activeColor);
            };
        },
    },
});
</script>
