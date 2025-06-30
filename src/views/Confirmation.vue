<template>
  <div class="confirmation-container">
    <h2 class="confirmation-title">Booking Confirmation</h2>

    <div v-if="loading" class="confirmation-skeleton">
      <div class="skeleton-card"></div>
    </div>

    <div v-else class="confirmation-card">
      <img :src="room.image" alt="Room Image" class="confirmation-image" />
      <div class="confirmation-info">
        <h3>{{ room.name }}</h3>
        <div class="display-row-class">
          <p>
            <strong>Check-In:</strong> <span>{{ formatDate(checkIn) }}</span>
          </p>
          <p>
            <strong>Check-Out:</strong> <span>{{ formatDate(checkOut) }}</span>
          </p>
        </div>
        <div class="display-row-class">
          <p><strong>Guests:</strong> {{ room.guests }}</p>
          <p><strong>Price:</strong> ₹{{ room.price }}/night</p>
        </div>
        <div class="display-row-class">
          <button class="confirm-btn" @click="confirmBooking">
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const room = ref({});
const roomId = computed(() => route.query.roomId);
const checkIn = computed(() => route.query.checkIn);
const checkOut = computed(() => route.query.checkOut);
const guests = computed(() => route.query.guests);

const loading = ref(true);

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

onMounted(() => {
  const rooms = JSON.parse(localStorage.getItem("availableRooms") || "[]");
  room.value = rooms.find((r) => r.id === bookingData.roomId);

  if (!roomId.value) {
    toast.error("Invalid room selected");
    router.push("/rooms");
    return;
  }
  setTimeout(() => {
    const id = route.query.roomId;
    room.value = {
      id,
      name: `Room Type ${id}`,
      guests: (id % 4) + 1,
      price: 2000 + id * 70,
      image: `https://picsum.photos/seed/room-${id}/400/250`,
    };
    loading.value = false;
  }, 1000);
});

const bookingData = {
  roomId: route.query.roomId,
  checkIn: route.query.checkIn,
  checkOut: route.query.checkOut,
  guests: route.query.guests,
};

function confirmBooking() {
  const newBooking = {
    id: Date.now(), // unique booking ID
    name: room.value.name,
    image: room.value.image,
    checkIn: bookingData.checkIn,
    checkOut: bookingData.checkOut,
    guests: bookingData.guests,
  };

  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  bookings.push(newBooking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  toast.success("Booking confirmed!");
  router.push("/dashboard");
}
</script>

<style>
p {
  margin: 5px;
}

h3 {
  text-align: center;
}

h2 {
  font-family: system-ui;
}

.display-row-class {
  display: flex;
  justify-content: space-evenly;
}
.confirmation-container {
  max-width: 960px;
  margin: 40px auto;
  padding: 20px;
}

.confirmation-title {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
  font-size: 24px;
}

.confirmation-skeleton {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
}

.skeleton-card {
  width: 100%;
  height: 250px;
  background: #eaeaea;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    background-color: #eaeaea;
  }
  50% {
    background-color: #f5f5f5;
  }
  100% {
    background-color: #eaeaea;
  }
}

.confirmation-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}

.confirmation-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.confirmation-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.confirmation-info h3 {
  margin-bottom: 8px;
  font-size: 20px;
  color: #333;
}

.confirmation-info p {
  font-size: 15px;
  color: #555;
}

.confirm-btn {
  margin-top: 16px;
  padding: 10px;
  background: #7a42f4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  align-self: flex-start;
}

.confirm-btn:hover {
  background: #5a2fd1;
}

@media (max-width: 768px) {
  .confirmation-card {
    flex-direction: column;
  }
  .confirmation-image {
    height: 200px;
  }
}
</style>
