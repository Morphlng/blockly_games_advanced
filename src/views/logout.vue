<template>
    <infinite-loading></infinite-loading>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
    components: {
        InfiniteLoading,
    },
    mounted() {
        this.$store.dispatch("UserLogout");

        if (!this.$store.state.token) {
            localStorage.clear();
            this.$router.push("/login");
        } else {
            this.$message.error("退出失败");
        }
    },
};
</script>
