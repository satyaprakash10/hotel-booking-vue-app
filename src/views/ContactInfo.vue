<template>
  <div class="contact-container fade-in">
    <h2 class="page-title">Contact Information</h2>

    <form @submit.prevent="onSubmit" class="contact-form">
      <div class="form-row">
        <label for="name">Full Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          placeholder="Your full name"
        />
      </div>

      <div class="form-row">
        <label for="email">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          placeholder="you@example.com"
        />
      </div>

      <div class="form-row">
        <label for="phone">Phone</label>
        <input
          v-model="form.phone"
          type="tel"
          id="phone"
          placeholder="Enter phone number"
        />
      </div>

      <div class="form-row">
        <label for="address">Address</label>
        <textarea
          v-model="form.address"
          id="address"
          rows="3"
          placeholder="Your full address"
        ></textarea>
      </div>

      <button type="submit" class="btn-save">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { toast } from "vue3-toastify";

const form = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
});

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    form.name = storedUser.name || "";
    form.email = storedUser.email || "";
    form.phone = storedUser.phone || "";
    form.address = storedUser.address || "";
  }
});

function onSubmit() {
  if (!form.name || !form.email) {
    toast.error("Name and email are required!");
    return;
  }

  const updatedUser = { ...form };
  localStorage.setItem("user", JSON.stringify(updatedUser));
  toast.success("Contact info updated successfully!");
}
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 60px auto;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.page-title {
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-bottom: 25px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

h2 {
  font-family: system-ui;
}

input,
textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #7a42f4;
}

.btn-save {
  background-color: #7a42f4;
  color: white;
  padding: 12px;
  border: none;
  font-weight: 600;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-save:hover {
  background-color: #5a2fd1;
}

.fade-in {
  animation: fadeInSlideUp 0.5s ease;
}

@keyframes fadeInSlideUp {
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
