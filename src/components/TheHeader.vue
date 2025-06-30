<template>
  <header class="site-header" ref="headerRef">
    <div class="container">
      <TheSiteLogo />

      <!-- Desktop Nav -->
      <nav class="nav-links desktop">
        <router-link
          v-for="link in filteredLinks"
          :key="link.name"
          :to="link.path"
          class="nav-link"
          :class="{ active: $route.path === link.path }"
          >{{ link.name }}</router-link
        >

        <button v-if="!isLoggedIn" @click="goToLogin" class="auth-btn">
          Login
        </button>
        <button v-else @click="logout" class="auth-btn">Logout</button>
      </nav>

      <!-- Mobile Menu Icon -->
      <div class="hamburger" @click="toggleMobileNav">
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
      </div>
    </div>

    <!-- Mobile Nav Drawer -->
    <transition name="slide">
      <div v-if="isOpen" class="mobile-nav" ref="drawerRef">
        <div class="user-name-class" v-if="isAuthenticated">
          <!-- User name -->
          <div class="drawer-header" style="margin-top: 10px">
            <router-link
              to="/contact"
              style="text-decoration: none; cursor: pointer; color: black"
            >
              <span class="user-icon-class">
                <svg
                  data-slot="icon"
                  fill="none"
                  stroke-width="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style="
                    color: black;
                    width: 30px;
                    height: 30px;
                    margin-right: 3px;
                  "
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  ></path>
                </svg>
                {{ user?.name || "Guest" }}</span
              >
            </router-link>
          </div>
          <button class="close-btn" @click="toggleMobileNav">×</button>
        </div>

        <router-link
          v-for="link in filteredLinks"
          :key="link.name"
          :to="link.path"
          class="mobile-link"
          :class="{ active: $route.path === link.path }"
          @click="toggleMobileNav"
          >{{ link.name }}</router-link
        >

        <button
          v-if="!isLoggedIn"
          @click="goToLogin"
          class="auth-btn"
          style="display: flex; align-items: center; justify-content: center"
        >
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            style="width: 20px; height: 20px; margin-right: 11px"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            ></path>
          </svg>
          Login
        </button>
        <button
          v-else-if="isAuthenticated"
          @click="logout"
          class="auth-btn"
          style="display: flex; align-items: center; justify-content: center"
        >
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            style="width: 20px; margin-right: 11px; height: 20px"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            ></path>
          </svg>
          Logout
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import TheSiteLogo from "../components/TheSiteLogo.vue";

const router = useRouter();
const isOpen = ref(false);
const auth = useAuthStore();
const headerRef = ref(null);
const drawerRef = ref(null);
const isLoggedIn = computed(() => auth.isAuthenticated);

const user = computed(() => auth.user);
const isAuthenticated = computed(() => auth.isAuthenticated);

const toggleMobileNav = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (e) => {
  if (
    isOpen.value &&
    drawerRef.value &&
    !drawerRef.value.contains(e.target) &&
    !headerRef.value.contains(e.target)
  ) {
    isOpen.value = false;
  }
};

const goToLogin = () => {
  router.push("/login");
};

// const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   isLoggedIn.value = false;
//   router.push("/");
// };

const logout = () => {
  auth.logout();
  router.push("/");
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const links = [
  { name: "Home", path: "/" },
  { name: "Rooms", path: "/rooms" },
  { name: "Contact", path: "/contact", authOnly: true },
  { name: "Dashboard", path: "/dashboard", authOnly: true },
];

const filteredLinks = computed(() => {
  return links.filter((link) => {
    if (link.authOnly) {
      return auth.isAuthenticated;
    }
    return true;
  });
});
</script>

<style scoped>
.site-header {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: relative;
  z-index: 99;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.container {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
}
.nav-links.desktop {
  display: flex;
  align-items: center;
  gap: 20px;
}
.nav-link {
  position: relative;
  padding: 6px 4px;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: blue;
  transition: width 0.3s ease-in-out;
}
.nav-link:hover::after {
  font-family: math;
  width: 100%;
}
.nav-link.active {
  font-weight: bold;
  font-family: math;
  border-bottom: 2px solid blue;
}
.auth-btn {
  padding: 6px 12px;
  background: rgb(43, 43, 43);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
.auth-btn:hover {
  background: #333;
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}
.hamburger span {
  width: 25px;
  height: 3px;
  background-color: #333;
  transition: transform 0.4s ease, background-color 0.4s ease;
  border-radius: 2px;
}
.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
  background-color: red;
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
  background-color: red;
}
.user-name-class {
  display: flex;
  align-items: baseline;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;
}
.user-icon-class {
  display: flex;
  align-items: center;
}
.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  z-index: 100;
  background: #efecec;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  transition: transform 0.3s ease-in-out;
}
.mobile-link {
  position: relative;
  text-decoration: none;
  color: black;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}
.mobile-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: blue;
  transition: width 0.3s ease-in-out;
}
.mobile-link:hover::after {
  width: 100%;
}
.mobile-link.active {
  font-weight: bold;
  border-bottom: 2px solid blue;
}
.close-btn {
  font-size: 2rem;
  align-self: flex-end;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  margin-bottom: 20px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
@media (max-width: 768px) {
  .nav-links.desktop {
    display: none;
  }
  .auth-btn {
    margin-top: 20px;
  }
  .hamburger {
    display: flex;
  }
}
</style>
