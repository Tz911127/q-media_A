<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link></router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style>
@import "./style/basic.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
  background: #f2f5f7;
  min-width: 1366px;
  margin: 0;
  padding: 0;
}
</style>
