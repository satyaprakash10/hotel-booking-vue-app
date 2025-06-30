<template>
  <div id="app">
    <TheHeader />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <TheSiteFooter />
  </div>
</template>

<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheSiteFooter from "./components/TheSiteFooter.vue";
</script>

<style>
/* ✅ Page transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-thumb {
  background-color: #7a42f4;
  border-radius: 8px;
}

body::-webkit-scrollbar-thumb:hover {
  background-color: #5a2fd1;
}

body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

body {
  scrollbar-width: thin;
  scrollbar-color: #7a42f4 #f1f1f1;
}
</style>
