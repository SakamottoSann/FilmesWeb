<template>
  <div :style="bgImg" id="app">
    <home :adm="adm" :user="user" />
    <router-view />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  data() {
    return {
      user: null,
      adm: null,
      bgImg: {
        overflowX: "hidden",
        height: "100vh",
        backgroundImage:
          "url('https://media.gazetadopovo.com.br/viver-bem/2015/07/minion-love-cartoon-hd-wallpaper-2560x1600-6142-7a9bff90.jpg')",
        backgroundSize: "100% auto",
      },
    };
  },
  methods: {
    AltUser(nome) {
      this.user = nome
    },
    AltAdm(adm) {
      this.adm = adm
    },
  },
  name: "App",
  components: {
    Home,
  },
};
</script>






