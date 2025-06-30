<template>
  <div class="rooms-container fade-in">
    <h2>Available Rooms</h2>

    <!-- Filters for Sort by Price -->
    <SortDropdown
      style="display: flex; justify-content: flex-end; margin-bottom: 20px"
      v-model="selectedSort"
      :options="[
        { label: 'Low Price', value: 'low' },
        { label: 'High Price', value: 'high' },
      ]"
    />

    <RoomBookingModal
      v-if="showModal"
      :room="selectedRoom"
      @close="showModal = false"
      @confirm="handleModalConfirm"
    />

    <!-- Rooms Loading Placeholder -->
    <div class="room-grid" v-if="isLoading">
      <RoomCardSkeleton v-for="n in 9" :key="n" />
    </div>

    <div
      class="room-grid"
      v-else-if="filteredRooms && filteredRooms.length > 0"
    >
      <div
        v-for="room in paginatedRooms"
        :key="room.id"
        class="room-card"
        @click="handleRoomSelect(room)"
      >
        <div class="image-wrapper">
          <img :src="room.image" alt="Room Image" class="room-image" />
        </div>
        <div class="room-info">
          <h3>{{ room.name }}</h3>
          <p>{{ room.description }}</p>
          <p><strong>Guests:</strong> {{ room.guests }}</p>
          <p><strong>Price:</strong> ₹{{ room.price }}/night</p>
          <router-link
            :to="{
              path: `/room/${room.id}`,
              query: {
                checkIn: route.query.checkIn,
                checkOut: route.query.checkOut,
                guests: route.query.guests,
              },
            }"
            class="view-button"
            >View Details</router-link
          >
        </div>
      </div>
    </div>

    <div v-if="loading" class="loader-spinner"></div>

    <!-- Global Pagination Component -->
    <Pagination
      v-if="sortedRooms && sortedRooms.length > 0"
      :total-items="sortedRooms.length"
      :items-per-page="itemsPerPage"
      v-model:current-page="currentPage"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { generateMockRooms } from "../utils/generateRooms";
import Pagination from "../components/Pagination.vue";
import SortDropdown from "../components/SortDropdown.vue";
import RoomBookingModal from "../components/RoomBookingModal.vue";
import RoomCardSkeleton from "../components/RoomCardSkeleton.vue";

const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const allRooms = ref([]);
const currentPage = ref(1);
const itemsPerPage = 9;

const checkIn = ref(route.query.checkIn || "");
const checkOut = ref(route.query.checkOut || "");
const guests = ref(route.query.guests || "");

const selectedSort = ref("low");

// 🔁 Modal State
const showModal = ref(false);
const selectedRoom = ref(null);

//  Load Mock Rooms
onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    allRooms.value = generateMockRooms(60);
    isLoading.value = false;
  }, 1000);
});

// Filter rooms based on guests
const filteredRooms = computed(() =>
  allRooms.value.filter((room) => {
    if (!guests.value) return true;
    return Number(room.guests) >= Number(guests.value);
  })
);

//  Sort filtered rooms
const sortedRooms = computed(() => {
  const sorted = [...filteredRooms.value];
  if (selectedSort.value === "low")
    return sorted.sort((a, b) => a.price - b.price);
  if (selectedSort.value === "high")
    return sorted.sort((a, b) => b.price - a.price);
  return sorted;
});

//  Paginate sorted rooms
const paginatedRooms = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedRooms.value.slice(start, end);
});

//  Room click handler
function handleRoomSelect(room) {
  if (!checkIn.value || !checkOut.value || !guests.value) {
    selectedRoom.value = room;
    showModal.value = true;
  } else {
    redirectToRoom(room);
  }
}

//  Modal confirm handler
function handleModalConfirm({ checkIn: ci, checkOut: co, guests: g }) {
  checkIn.value = ci;
  checkOut.value = co;
  guests.value = g;
  showModal.value = false;

  redirectToRoom(selectedRoom.value);
}

//  Push route to room view
function redirectToRoom(room) {
  router.push({
    path: `/room/${room.id}`,
    query: {
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      guests: guests.value,
    },
  });
}
</script>

<style scoped>
.room-enter-active,
.room-leave-active {
  transition: all 0.4s ease;
}

.room-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.room-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.room-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.room-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.loader-spinner {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}

.loader-spinner::after {
  content: "";
  width: 40px;
  height: 40px;
  border: 4px solid #7a42f4;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.rooms-container::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}

.rooms-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

.rooms-container::-webkit-scrollbar-thumb {
  background-color: #7a42f4;
  border-radius: 8px;
  border: 2px solid #f1f1f1;
}

.rooms-container::-webkit-scrollbar-thumb:hover {
  background-color: #5a2fd1;
}
.rooms-container {
  max-width: 1200px;
  margin: 10px auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  font-family: system-ui;
  margin-top: 0;
  color: #333;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  transition: opacity 0.4s ease;
}

.room-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  display: flex;
  cursor: pointer;
  flex-direction: column;
}

.room-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-color: #eeedf1;
  -duration: 1ms;
  transition: 0.6s;
}

.image-wrapper {
  overflow: hidden;
}

.image-wrapper {
  overflow: hidden;
}

.room-image {
  width: 100%;
  height: auto;
  cursor: pointer;
  display: block;
  transition: transform 0.4s ease;
}

.room-card:hover .room-image {
  cursor: pointer;
  transition: 0.6s;
}
@keyframes zoomInOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.room-image.animated {
  animation: zoomInOut 2s ease-in-out infinite;
  transition: 0.6s;
}

.room-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.room-info h3 {
  margin: 0 0 8px;
  color: #444;
  font-size: 18px;
}

.room-info p {
  margin: 4px 0;
  color: #666;
  font-size: 14px;
}

.view-button {
  margin-top: 12px;
  padding: 8px 14px;
  background-color: #7a42f4;
  color: white;
  border: none;
  text-align: center;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.3s ease;
  align-self: start;
}

.view-button:hover {
  background-color: #5a2fd1;
  transition: 0.6s;
}

@media (max-width: 768px) {
  .room-grid {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}
</style>
