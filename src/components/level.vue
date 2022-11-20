<template>
    <iframe id="myframe" :src="url" scrolling="no" frameborder="0" width="100%" height="100%" @load="onLoad"></iframe>
</template>

<script>
export default {
    data() {
        return {
            url: 'blockly_games/index.html'
        }
    },
    mounted() {
    },
    methods: {
        onLoad() {
            // modify window.location.href without refreshing
            let frame = document.getElementById('myframe');
            let pathname = frame.contentWindow.location.pathname;
            let level = pathname.split('/').pop().replace('.html', '');
            history.pushState(null, null, level);

            this.$emit("updateFrame", level);
        }
    }
}
</script>
