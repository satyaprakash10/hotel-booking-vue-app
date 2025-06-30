<template>
  <div class="home-search">
    <!-- Banner / Swiper Section -->
    <div class="banner-section">
      <swiper
        :slides-per-view="1"
        :autoplay="{ delay: 3000 }"
        :loop="true"
        class="home-swiper"
      >
        <swiper-slide v-for="(img, i) in bannerImages" :key="i">
          <img :src="img" alt="Banner Image" class="banner-image" />
        </swiper-slide>
      </swiper>
    </div>

    <h2 class="search-heading">Book a Room</h2>

    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-row">
        <div class="form-block guest-field">
          <span class="icon-user"
            ><svg
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              style="color: #333; width: 15px; height: 15px"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              ></path></svg
          ></span>
          <SelectInput v-model="guests" :guests="[1, 2, 3, 4, 5]" />
        </div>

        <div class="form-block">
          <Datepicker
            v-model="checkIn"
            :format="formatDate"
            placeholder="Check-in Date"
            :input-class="'full-width-input'"
            :wrapper-class="'full-width-wrapper'"
          />
        </div>
        <div class="form-block">
          <Datepicker
            v-model="checkOut"
            :format="formatDate"
            :input-class="'full-width-input'"
            placeholder="Check-out Date"
            :wrapper-class="'full-width-wrapper'"
          />
        </div>

        <div class="search-button-container">
          <button type="submit" class="btn-submit">Search for Rooms</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Datepicker from "vuejs3-datepicker";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import SelectInput from "../components/SelectInput.vue";
import { format } from "date-fns";

const bannerImages = [
  "/img/banner-img-1.jpg",
  "/img/banner-img-2.jpg",
  "/img/banner-img-3.jpg",
];
const checkIn = ref(null);
const checkOut = ref(null);
const guests = ref("");
const router = useRouter();

function handleSearch() {
  if (!checkIn.value || !checkOut.value || !guests.value) {
    toast.error("Please select check-in, check-out, and number of guests.");
    return;
  }

  const checkInFormatted = format(new Date(checkIn.value), "yyyy-MM-dd");
  const checkOutFormatted = format(new Date(checkOut.value), "yyyy-MM-dd");

  router.push({
    path: "/rooms",
    query: {
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      guests: guests.value,
    },
  });
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
</script>

<style>
h3 {
  font-family: system-ui;
}
.styled-input {
  width: 100%;
  box-sizing: border-box;
}
:deep(.vuejs3-datepicker__input) {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.vuejs3-datepicker__value {
  min-width: 259px;
  padding: 10px 15px;
}
.form-group {
  flex: 1 1 30%;
  min-width: 260px;
  width: 100%;
}
.home-search {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Banner Section */
.banner-section {
  width: 100%;
}

.home-swiper {
  width: 100%;
  height: 400px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Headline */
.search-heading {
  font-size: 2rem;
  margin: 2rem 0 1rem;
  text-align: center;
  color: #333;
}

/* Search Form Layout */
.search-form {
  width: 100%;
  max-width: 1000px;
  padding: 1rem;
  box-sizing: border-box;
}

.search-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
  flex-wrap: wrap;
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 6px;
}
.guest-field {
  position: relative;
}
.icon-user {
  position: absolute;
  left: 10px;
  top: 53%;
  transform: translateY(-50%);
  font-size: 1rem;
  z-index: 1;
  pointer-events: none;
}

.select-box {
  padding-left: 2rem !important;
}
.form-block {
  flex: 1;
  min-width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Search Button */
.search-button-container {
  margin-top: 1rem;
  text-align: center;
}

.btn-submit {
  background: black;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.3s ease;
}

.btn-submit:hover {
  background: #333;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .search-row {
    flex-direction: column;
  }

  .form-block {
    width: 100%;
    justify-content: flex-center;
  }
}
</style>
