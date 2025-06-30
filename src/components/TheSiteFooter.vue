<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Company Info -->
      <div class="footer-section">
        <TheSiteLogo />
        <p>
          Experience luxury and comfort with HotelVue. Book your perfect stay
          with ease and enjoy exclusive services.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/rooms">Rooms</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="footer-section">
        <h4>Contact Us</h4>
        <ul class="footer-contact">
          <li><strong>Email:</strong> support@hotelvue.com</li>
          <li><strong>Phone:</strong> +91 98765 43210</li>
          <li><strong>Address:</strong> 123 Grand Street, Mumbai, IN</li>
        </ul>
      </div>

      <!-- Social Links -->
      <div class="footer-section social">
        <h4>Follow Us</h4>
        <div class="social-icons">
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 20px; color: white"
              viewBox="0 0 448 512"
            >
              <path
                d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
              />
            </svg>
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 20px; color: white"
              viewBox="0 0 448 512"
            >
              <path
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              />
            </svg>
          </a>

          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 20px; color: white"
              viewBox="0 0 512 512"
            >
              <path
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
              />
            </svg>
          </a>

          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style="width: 20px; color: white"
              viewBox="0 0 640 512"
            >
              <path
                d="M640 317.9C640 409.2 600.6 466.4 529.7 466.4C467.1 466.4 433.9 431.8 372.8 329.8L341.4 277.2C333.1 264.7 326.9 253 320.2 242.2C300.1 276 273.1 325.2 273.1 325.2C206.1 441.8 168.5 466.4 116.2 466.4C43.4 466.4 0 409.1 0 320.5C0 177.5 79.8 42.4 183.9 42.4C234.1 42.4 277.7 67.1 328.7 131.9C365.8 81.8 406.8 42.4 459.3 42.4C558.4 42.4 640 168.1 640 317.9H640zM287.4 192.2C244.5 130.1 216.5 111.7 183 111.7C121.1 111.7 69.2 217.8 69.2 321.7C69.2 370.2 87.7 397.4 118.8 397.4C149 397.4 167.8 378.4 222 293.6C222 293.6 246.7 254.5 287.4 192.2V192.2zM531.2 397.4C563.4 397.4 578.1 369.9 578.1 322.5C578.1 198.3 523.8 97.1 454.9 97.1C421.7 97.1 393.8 123 360 175.1C369.4 188.9 379.1 204.1 389.3 220.5L426.8 282.9C485.5 377 500.3 397.4 531.2 397.4L531.2 397.4z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>
        &copy; {{ new Date().getFullYear() }} HotelVue. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
import TheSiteLogo from "../components/TheSiteLogo.vue";
</script>

<style scoped>
.footer {
  background-color: #1e1e1e;
  color: #ccc;
  padding: 40px 20px 20px;
  font-family: "Segoe UI", sans-serif;
}

.footer-container {
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
}

.footer-title {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.footer-section h4 {
  color: #fff;
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.footer-section p {
  line-height: 1.6;
  font-size: 14px;
}

.footer-links,
.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li,
.footer-contact li {
  margin-bottom: 10px;
  font-size: 14px;
  font-family: math;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  font-family: math;
  transition: color 0.3s;
}

.footer-links a:hover {
  font-family: math;
  color: #7a42f4;
}

.social-icons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.social-icons a {
  color: #ccc;
  font-size: 18px;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #7a42f4;
}

.footer-bottom {
  border-top: 1px solid #333;
  margin-top: 30px;
  padding-top: 15px;
  text-align: center;
  font-size: 13px;
  color: #999;
}

p {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

@media (max-width: 600px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .footer {
    padding: 30px 15px 15px;
  }

  .footer-title {
    font-size: 1.5rem;
  }
}
</style>
