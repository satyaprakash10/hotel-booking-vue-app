<template>
  <div class="register-container fade-in">
    <h2>Create Your Account</h2>

    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          placeholder="Enter your name"
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          placeholder="Enter your email"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          placeholder="Create a password"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <button type="submit" class="btn-submit">Register</button>
    </form>

    <p class="text-small">
      Already have an account?
      <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { validate } from "vee-validate";
import { defineRule, configure } from "vee-validate";
import { required, email as emailRule, min } from "@vee-validate/rules";

// Setup VeeValidate rules
defineRule("required", required);
defineRule("email", emailRule);
defineRule("min", min);

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `${ctx.field} is required`,
      email: `Enter a valid email`,
      min: `${ctx.field} must be at least 6 characters`,
    };
    return messages[ctx.rule.name] || `${ctx.field} is invalid`;
  },
});

const form = ref({
  name: "",
  email: "",
  password: "",
});

const errors = ref({
  name: "",
  email: "",
  password: "",
});

const router = useRouter();

async function handleRegister() {
  // Validate fields manually
  const nameResult = await validate(form.value.name, "required", {
    name: "Name",
  });
  const emailResult = await validate(form.value.email, "required|email", {
    name: "Email",
  });
  const passResult = await validate(form.value.password, "required|min:6", {
    name: "Password",
  });

  errors.value.name = nameResult.errors[0] || "";
  errors.value.email = emailResult.errors[0] || "";
  errors.value.password = passResult.errors[0] || "";

  if (!nameResult.valid || !emailResult.valid || !passResult.valid) return;

  // Simulate saving user to localStorage
  const user = {
    id: Date.now(),
    name: form.value.name,
    email: form.value.email,
    password: form.value.password,
  };

  localStorage.setItem("mockUser", JSON.stringify(user));
  toast.success("Account created. Please Log in Now.", { autoClose: 10000 });
  router.push("/login");
}
</script>

<style scoped>
.register-container {
  max-width: 420px;
  margin: 60px auto;
  padding: 28px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.05);
  animation: fadeInSlideUp 0.6s ease;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  font-family: system-ui;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
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

.btn-submit:hover {
  background-color: #5a2fd1;
}

.text-small {
  margin-top: 16px;
  font-size: 14px;
  text-align: center;
}

a {
  color: #7a42f4;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.fade-in {
  animation: fadeIn 0.5s ease;
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
