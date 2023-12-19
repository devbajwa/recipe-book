<template>
  <section class="subhero">
    <h1>About us</h1>
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
    <div class="intro">
      <p>
        Hey there! I'm
        <a href="https://www.linkedin.com/in/waqas-bajwa-35a85744/" target="_blank" rel="noopener noreferrer"
          title="LinkedIn">Waqas</a>, a frontend developer diving headfirst into the wonderful world of
        Vue.js. 🚀
      </p>
      <p>
        Learning Vue has become my latest obsession, and I'm not just keeping it
        to myself—I'm trying to document the key steps of the way on my blog at
        <a href="https://devbajwa.com" target="_blank">Dev Bajwa</a>. From those
        "aha" moments to the occasional coding struggles, I'm laying it all out
        there.
      </p>
      <p class="inverse">
        But here's the exciting part: I'm not just here for my own growth. I'm
        on the lookout for like-minded developers who share my passion for Vue.<br /><br />
        If you're into collaboration, bouncing ideas around, and creating cool
        projects together, I'm extending a virtual high-five your way! 🙌
      </p>
      <p>
        Imagine the awesome things we could build as a team! Whether you're a
        seasoned developer or just starting with Vue, I believe in the power of
        learning and creating together.
      </p>
      <p>
        So, if you're up for some coding adventures, a bit of Vue.js magic, and
        a dash of collaboration, let's connect! Drop me a message, and let's
        make some frontend magic happen. 🚧💻✨
      </p>
    </div>
  </section>
</template>

<style scoped>
.intro {
  line-height: 1.85rem;
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

img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 0px 40px #42b8835e;
}

a {
  color: var(--primary);
  font-weight: bold;
  text-decoration: none;
}

a:hover {
  color: var(--accent);
}

.inverse {
  background: var(--green-lightest);
  color: var(--dark-grey);
  clip-path: inset(0 -100vw);
  box-shadow: 0 0 0 25px var(--green-lightest);
  padding-block: 1rem;
}

@media (max-width: 450px) {
  .profile {
    flex-direction: column;
  }
}
</style>
