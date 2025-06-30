<template>
  <div class="dashboard fade-in">
    <h2 class="title">Your Bookings</h2>

    <div class="tabs">
      <button
        :class="{ active: activeTab === 'upcoming' }"
        @click="activeTab = 'upcoming'"
      >
        Upcoming
      </button>
      <button
        :class="{ active: activeTab === 'past' }"
        @click="activeTab = 'past'"
      >
        Past
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <div
        v-if="filteredBookings.length"
        key="booking-list"
        class="booking-grid"
      >
        <div
          v-for="booking in filteredBookings"
          :key="booking.id"
          class="booking-card"
        >
          <img :src="booking.image" alt="Room Image" class="room-img" />
          <div class="card-body">
            <h3>{{ booking.name }}</h3>
            <p><strong>Guests:</strong> {{ booking.guests }}</p>
            <p><strong>Check-In:</strong> {{ formatDate(booking.checkIn) }}</p>
            <p>
              <strong>Check-Out:</strong> {{ formatDate(booking.checkOut) }}
            </p>
            <button
              v-if="activeTab === 'upcoming'"
              class="cancel-btn"
              @click="cancelBooking(booking.id)"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <p v-else class="no-booking">No {{ activeTab }} bookings found.</p>
    </transition>

    <!-- Rooms Loading Placeholder -->
    <div class="room-grid" v-if="isLoading">
      <RoomCardSkeleton v-for="n in 9" :key="n" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import { format } from "date-fns";
import RoomCardSkeleton from "../components/RoomCardSkeleton.vue";

const bookings = ref([]);
const activeTab = ref("upcoming");
const route = useRoute();
const now = new Date();
const isLoading = ref(true);

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.value = stored.map((b) => ({
      ...b,
      image:
        b.image ||
        `https://source.unsplash.com/400x250/?hotel,${b.name || "room"}`,
    }));

    isLoading.value = false;
  }, 1000);

  const tabFromQuery = route.query.tab;
  if (tabFromQuery === "past" || tabFromQuery === "upcoming") {
    activeTab.value = tabFromQuery;
  }
});

const filteredBookings = computed(() => {
  return bookings.value
    .filter((b) => {
      const outDate = new Date(b.checkOut);
      return activeTab.value === "upcoming" ? outDate > now : outDate <= now;
    })
    .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
});

function cancelBooking(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to cancel this booking?",
    icon: "warning",
    showCancelButton: true,
    width: 300,
    height: 350,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, cancel it!",
    customClass: {
      popup: "small-modal",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      bookings.value = bookings.value.filter((b) => b.id !== id);
      localStorage.setItem("bookings", JSON.stringify(bookings.value));
    }
  });
}

function formatDate(date) {
  try {
    return format(new Date(date), "MMM d, yyyy");
  } catch (e) {
    return "Invalid Date";
  }
}
</script>

<style scoped>
p {
  margin: 0;
  color: gray;
}
h2 {
  font-family: system-ui;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  transition: opacity 0.4s ease;
}

.dashboard {
  max-width: 960px;
  margin: 40px auto;
  padding-bottom: 20px;
}
.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}
.tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}
.tabs button {
  padding: 10px 20px;
  border: none;
  background: #eee;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.tabs button.active {
  background: #7a42f4;
  color: white;
}
.booking-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.booking-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.room-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.card-body {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.card-body h3 {
  margin: 0 0 6px;
  color: #444;
  font-size: 18px;
}
.cancel-btn {
  margin-top: auto;
  align-self: flex-start;
  background-color: #ff4d4f;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.cancel-btn:hover {
  background-color: #d9363e;
}
.no-booking {
  text-align: center;
  margin-top: 40px;
  color: #777;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.small-modal {
  width: 300px !important;
  font-size: 14px;
}

@media (max-width: 768px) {
  .booking-grid {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
  .room-grid {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}
</style>
