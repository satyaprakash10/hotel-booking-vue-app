<template>
  <div class="room-detail fade-in">
    <div v-if="room" class="room-wrapper">
      <div class="image-wrapper" v-if="!room.image">
        <div class="skeleton skeleton-img"></div>
      </div>

      <div class="room-image" v-else>
        <img :src="room.image" alt="Room Image" />
      </div>

      <div class="room-content room-content-border">
        <h2>{{ room.name }}</h2>
        <p class="description">{{ room.description }}</p>
        <p><strong>Guests:</strong> {{ guests }}</p>
        <p><strong>Check-In:</strong> {{ formatDate(checkIn) }}</p>
        <p><strong>Check-Out:</strong> {{ formatDate(checkOut) }}</p>
        <p><strong>Price:</strong> ₹{{ room.price }}/night</p>
        <p><strong>Availability:</strong> Available</p>

        <button class="confirm-btn" @click="handleConfirm">
          Confirm Booking
        </button>
      </div>
    </div>
    <div v-else class="loading">Loading room details...</div>

    <!-- RoomBookingModal Component -->
    <RoomBookingModal
      v-if="showModal"
      :room="room"
      @close="showModal = false"
      @confirm="handleModalConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import RoomBookingModal from "../components/RoomBookingModal.vue";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const room = ref(null);
const showModal = ref(false);
const searchData = JSON.parse(localStorage.getItem("searchData") || "{}");
const checkIn = ref(route.query.checkIn || searchData.checkIn || "");
const checkOut = ref(route.query.checkOut || searchData.checkOut || "");
const guests = ref(route.query.guests || searchData.guests || "");

console.log("CheckIn:", checkIn.value);
console.log("CheckOut:", checkOut.value);

onMounted(() => {
  const id = parseInt(route.params.id);
  room.value = {
    id,
    name: `Room Type ${id}`,
    description: `Beautiful modern Room ${id} with all the amenities for a comfortable stay. Located in a prime area with great view.`,
    guests: (id % 5) + 1,
    price: 2500 + id * 75,
    image: `https://picsum.photos/seed/room-${id}/800/400`,
  };
});

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function handleConfirm() {
  if (!checkIn.value || !checkOut.value || !guests.value) {
    showModal.value = true;
    return;
  }

  redirectToConfirmation();
}

function handleModalConfirm({ checkIn: ci, checkOut: co, guests: g }) {
  checkIn.value = ci;
  checkOut.value = co;
  guests.value = g;
  showModal.value = false;
  redirectToConfirmation();
}

function redirectToConfirmation() {
  if (!auth.isAuthenticated) {
    router.push({
      path: "/login",
      query: {
        redirect: "/confirmation",
        roomId: room.value.id,
        checkIn: checkIn.value,
        checkOut: checkOut.value,
        guests: guests.value,
      },
    });
  } else {
    router.push({
      path: "/confirmation",
      query: {
        roomId: room.value.id,
        checkIn: checkIn.value,
        checkOut: checkOut.value,
        guests: guests.value,
      },
    });
  }
}
</script>
<style scoped>
.room-detail {
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
}

.room-wrapper {
  gap: 32px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

.room-image img {
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.room-content-border {
  border-top: 1px solid lightgray;
  margin-top: 20px;
}

.room-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  padding: 12px 0;
}

h2 {
  font-size: 26px;
  color: #333;
  font-family: system-ui;
  margin: 5px;
}

.description {
  color: #555;
  font-size: 15px;
}

p {
  margin: 5px;
}
.confirm-btn {
  display: inline-block;
  padding: 10px 18px;
  margin-top: 5px;
  background-color: #7a42f4;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  width: fit-content;
  transition: background 0.3s ease;
  border: none;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #5a2fd1;
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e2e2e2 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.2s infinite;
  border-radius: 6px;
}

.skeleton-img {
  height: 180px;
  width: 100%;
}
@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.loading {
  text-align: center;
  font-size: 16px;
  color: #888;
}

@media (max-width: 768px) {
  .room-wrapper {
    flex-direction: column;
    padding: 16px;
  }

  .room-image img {
    max-width: 100%;
    height: auto;
  }

  h2 {
    font-size: 22px;
  }
}
</style>
