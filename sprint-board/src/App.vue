<script setup>

</script>

<template>
    <div class="container">
        <nav>
            <router-link :to="{ name: 'project-list' }">Project List</router-link>
        </nav>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<style scoped>
.container {
    padding: 20px;
    font-family: Arial, sans-serif;
    display: flex;
}
nav {
    margin-right: 20px;
}

main {
    padding: 20px;
}
</style>
