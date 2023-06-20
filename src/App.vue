<template>
  <div id="app">
    <transition>
      <keep-alive :include="keepAlive">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    keepAlive() {
      return this.$store.state.keepAlive
    },
  },
}
</script>
<style lang="scss">
@import './assets/css/common.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
