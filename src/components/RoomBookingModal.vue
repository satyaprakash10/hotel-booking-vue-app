<!-- 📁 src/components/RoomBookingModal.vue -->
<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-box">
      <h3>Select Booking Details</h3>

      <form @submit.prevent="submitForm">
        <label>Guests:</label>
        <div>
          <span style="position: relative"
            ><svg
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              class="icon-class"
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
        </div>

        <SelectInput
          v-model="guests"
          placeholder="Select guests"
          style="width: auto"
          :guests="[1, 2, 3, 4, 5]"
        />

        <label>Check-In Date:</label>
        <Datepicker
          v-model="checkIn"
          :format="'yyyy-MM-dd'"
          :clearable="false"
        />

        <label>Check-Out Date:</label>
        <Datepicker
          v-model="checkOut"
          :format="'yyyy-MM-dd'"
          :clearable="false"
        />

        <button type="submit" class="confirm-btn">Confirm Booking</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Datepicker from "vuejs3-datepicker";
import SelectInput from "../components/SelectInput.vue";

const props = defineProps({ room: Object });
const emit = defineEmits(["confirm", "close"]);

const guests = ref("");
const checkIn = ref("");
const checkOut = ref("");

function submitForm() {
  if (guests.value && checkIn.value && checkOut.value) {
    emit("confirm", {
      guests: guests.value,
      checkIn: checkIn.value,
      checkOut: checkOut.value,
    });
    emit("close");
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-box {
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.guest-field {
  position: relative;
}
.icon-class {
  color: #333;
  width: 15px;
  height: 15px;
  left: 10px;
  color: rgb(51, 51, 51);
  width: 15px;
  height: 15px;
  top: 25px;
  position: absolute;
  z-index: 100;
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
.confirm-btn {
  padding: 10px;
  background: #7a42f4;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}
.confirm-btn:hover {
  background: #5a2fd1;
}
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
