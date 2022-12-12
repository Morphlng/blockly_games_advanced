<template>
    <iframe id="myframe" :src="url" scrolling="no" frameborder="0" width="100%" height="100%" @load="onLoad"></iframe>
</template>

<script>
export default {
    data() {
        return {
            url: "blockly_games/index.html",
        };
    },
    mounted() { },
    methods: {
        onLoad() {
            // modify window.location.href without refreshing
            let frame = document.getElementById("myframe");
            let pathname = frame.contentWindow.location.pathname;
            let search = frame.contentWindow.location.search;
            let args = search.split('&');

            let chapter = pathname.split("/").pop().replace(".html", "");
            let level = "1";
            for (let i in args) {
                if (args[i].indexOf('level') !== -1) {
                    level = args[i].split('=')[1];
                    break;
                }
            }

            history.pushState(null, null, chapter);

            this.$emit("updateFrame", {
                chapter: chapter,
                level: level,
            });
        },
    },
};
</script>
