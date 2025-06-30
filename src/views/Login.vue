<template>
  <div class="login-container fade-in">
    <h2>Login to Your Account</h2>

    <form @submit.prevent="handleLogin" novalidate>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Enter email" />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter password"
        />
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <button type="submit" class="btn-submit">Login</button>
    </form>

    <p class="text-small">
      Don’t have an account?
      <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../store/auth";
import { toast } from "vue3-toastify";
import { defineRule, configure, validate } from "vee-validate";
import { required, email as emailRule } from "@vee-validate/rules";

// Define validation rules
defineRule("required", required);
defineRule("email", emailRule);

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `${ctx.field} is required`,
      email: `Enter a valid email address`,
    };
    return messages[ctx.rule.name] || `${ctx.field} is invalid`;
  },
});

const email = ref("");
const password = ref("");
const errors = ref({ email: "", password: "" });
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

async function handleLogin() {
  // Vee-validate check
  const emailResult = await validate(email.value, "required|email", {
    name: "Email",
  });
  const passwordResult = await validate(password.value, "required", {
    name: "Password",
  });

  errors.value.email = emailResult.errors[0] || "";
  errors.value.password = passwordResult.errors[0] || "";

  if (!emailResult.valid || !passwordResult.valid) return;

  // Get saved user from localStorage
  const savedUser = JSON.parse(localStorage.getItem("mockUser"));

  if (
    !savedUser ||
    savedUser.email !== email.value ||
    savedUser.password !== password.value
  ) {
    toast.error("Invalid credentials. Please register if you're a new user.", {
      autoClose: 4000,
    });
    return;
  }

  const token = "mock-token-" + savedUser.id;
  auth.login(savedUser, token);
  toast.success("Login successful!", { autoClose: 10000 });

  const redirect = route.query.redirect || "/dashboard";
  const roomId = route.query.roomId;
  const checkIn = route.query.checkIn;
  const checkOut = route.query.checkOut;

  if (redirect === "/confirmation" && roomId) {
    router.push({
      path: "/confirmation",
      query: { roomId, checkIn, checkOut },
    });
  } else {
    router.push(redirect);
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 24px;
  background: #f5f5f5;
  border-radius: 10px;
  animation: slide-up 0.5s ease-in-out;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border 0.3s ease;
}

input:focus {
  border-color: #7a42f4;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #7a42f4;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-submit:hover {
  background-color: #5a2fd1;
}

.text-small {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

a {
  color: #7a42f4;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.fade-in {
  animation: fadeIn 0.6s ease;
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
