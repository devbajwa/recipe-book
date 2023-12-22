<script setup>
import { ref } from 'vue'
import Tabs from '../components/Tabs.vue'
import TechStackIcons from '../components/TechStackIcons.vue';


const tabs = [{
  label: 'Developer',
  content: `   
  <h1 class="sub-heading">
        Developer
      </h1>
      <p>
        Hey there! I'm
        <a href="https://www.linkedin.com/in/waqas-bajwa-35a85744/" target="_blank" rel="noopener noreferrer"
          title="LinkedIn">Waqas</a>, a frontend developer diving headfirst into the wonderful world of
        Vue.js. 🚀
      </p>
      <h2 class="sub-heading">Vue.js Journey</h2>
      <p>
        Learning Vue has become my latest obsession. I am always keep trying to learn new tech and try to document the
        coding struggles, challenges and their solutions on my blog at
        <a href="https://devbajwa.com" target="_blank">Dev Bajwa</a>.
      </p>
      <h2 class="sub-heading">Collaboration Invitation</h2>
      <p>
        But here's the exciting part: I'm not just here for my own growth. I'm
        on the lookout for <strong>like-minded developers</strong> who share my passion for
        Vue and learning.<br />
        If you're into collaboration, bouncing ideas around, and creating cool
        projects together, I'm extending a virtual high-five your way! 🙌
      </p>
      <h2 class="sub-heading">Team Building</h2>
      <p>
        Imagine the awesome things we could build as a team! Whether you're a
        seasoned developer or just starting with Vue, I believe in the power of
        learning and creating together.
      </p>
      <h2 class="sub-heading">Let's Connect</h2>
      <p>
        So, if you're up for some coding adventures, a bit of Vue.js magic, and
        a dash of collaboration, let's connect! Drop me a message, and let's
        make some frontend magic happen. 🚧💻✨
      </p>
    `
}, {
  label: 'Recipen App',
  content: `    
      <h1 class="sub-heading">
        ReciPen App
      </h1>
      <p>
            Welcome to <span class="brand">ReciPen</span>, your go-to recipe companion for effortless
            record-keeping. Designed with busy wives and mothers in mind, our app
            simplifies the art of organizing and recalling your favorite recipes.</p>
        <p>Easily document the dishes you prepare for special occasions, creating a
            personalized culinary archive. With a straightforward interface, <span class="brand">ReciPen</span> makes it a
            breeze to revisit and recreate those cherished recipes,
            transforming every meal into a delightful memory.</p>
        <p>Streamline your cooking
            journey and savor the convenience of having your go-to recipes at your
            fingertips.</p>
        <p>Welcome to stress-free and organized meal planning with <span class="brand">ReciPen</span>.
        </p>

    `
}, {
  label: 'Disclaimer',
  content: `    
      <h1 class="sub-heading">
        Disclaimer
      </h1>
      <p>This web app has been crafted as part of a learning journey, and while I've put my best effort into creating a
        functional and enjoyable experience, it comes with a few important disclaimers:</p>
      <h2 class="sub-heading">Educational purpose</h2>
      <p>This project is primarily <strong>a learning exercise</strong>.<br />While it might showcase some good features,
        it's not intended
        for
        commercial use or as a fully polished, production-ready application.</p>
      <h2 class="sub-heading">Limited functionality</h2>
      <p>The app might lack some advanced functionalities.</p>
      <h2 class="sub-heading">Security consideration</h2>
      <p>Although I've taken steps to implement security best practices, this app might not adhere to the same level of
        scrutiny as production-ready applications.<br />Use it cautiously!</p>
      <h2 class="sub-heading">Ongoing development</h2>
      <p>Learning is a journey, not a destination.<br />This app might undergo updates, improvements, and changes as I
        continue to learn and refine my skills.</p>

      <h2 class="sub-heading">Feedback welcome</h2>
      <p>More than happy to receive any feedback, suggestions or thoughts.<br />Thanks for understanding and joining us
        on this learning adventure! 🚀</p>

    `
}
]
</script>
<template>
  <section class="subhero">
    <h1>About</h1>
  </section>

  <section class="container">
    <div class="profile">
      <img src="https://avatars.githubusercontent.com/u/46511392?v=4" alt="Waqas" />
      <div class="details">
        <h2>Waqas Naeem Bajwa</h2>
        <p>Frontend Developer</p>
        <div class="social-links">
          <a class="social-link" href="https://www.linkedin.com/in/waqas-bajwa-35a85744/" target="_blank"
            rel="noopener noreferrer" title="LinkedIn">
            <font-awesome-icon icon="fa-brands fa-linkedin" />
          </a>
          <a class="social-link" href="https://github.com/devbajwa" target="_blank" rel="noopener noreferrer"
            title="GitHub">
            <font-awesome-icon icon="fa-brands fa-github" />
          </a>
          <a class="social-link" href="https://devbajwa.com" target="_blank" rel="noopener noreferrer" title="Hashnode">
            <font-awesome-icon icon="fa-brands fa-hashnode" />
          </a>
        </div>
      </div>

    </div>
    <Tabs :tabs="tabs" />

    <TechStackIcons />

  </section>
</template>

<style scoped>
.border-block {
  border-block: 1px solid var(--border-color);
  padding-block: 24px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile h2,
.profile p {
  margin: 0;
}

.profile h2 {
  color: var(--primary);
}

.profile p {
  color: #444;
  font-weight: 700;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.social-links {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.social-links .svg-inline--fa {
  width: 1.55rem;
  height: 1.55rem;
}

.social-links .svg-inline--fa:hover {
  color: var(--accent);
}

.profile img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 0px 20px #42b8835e;
}

@media (max-width: 450px) {
  .profile {
    flex-direction: column;
  }
}
</style>
