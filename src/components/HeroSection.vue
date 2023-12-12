<template>
    <section class="container hero">
        <h1>ReciPen</h1>
</section>
<div class="container intro">
    <p>
      Welcome to <span class="brand">ReciPen</span>, your go-to recipe companion for effortless
      record-keeping. Designed with busy wives and mothers in mind, our app
      simplifies the art of organizing and recalling your favorite recipes.</p>
      <p>Easily document the dishes you prepare for special occasions, creating a
      personalized culinary archive. With a straightforward interface, <span class="brand">ReciPen</span> makes it a breeze to revisit and recreate those cherished recipes,
      transforming every meal into a delightful memory.</p><p>Streamline your cooking
      journey and savor the convenience of having your go-to recipes at your
      fingertips.</p><p>Welcome to stress-free and organized meal planning with <span class="brand">ReciPen</span>.
    </p>
</div>
</template>
<style scoped>
    section{
        /*background-image: url('https://img.freepik.com/free-photo/indian-condiments-with-copy-space-view_23-2148723492.jpg?w=1060&t=st=1701906910~exp=1701907510~hmac=56da487c7b96c2ffb7111b8e50578495b1477f382529fc07312c48f82006f07f'), linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));*/
        background-image: url('https://img.freepik.com/free-vector/watercolor-background-world-vegetarian-day_23-2149612954.jpg?w=1060&t=st=1701908399~exp=1701908999~hmac=d4cb39862ae550694d76e280213e412d27dfabea2a7026989004c723afb71d93'), linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255,255,255,1));
        background-blend-mode: overlay;
        background-size: cover;
        background-position: bottom center; /* This is for specific image */
        background-position-x: 50px; /* This is for specific image */
        background-repeat: no-repeat;
        height: 325px;
        display: flex;
        align-items: center;
        /* justify-content: center; */
        color: #ffffff; /* Set text color to white or a contrasting color */
        max-width: calc(1200px - 2rem);
    }
    section img{
        max-width: 100%;
    }

    .hero h1{
        font-size: 5rem;
        color: var(--smoke-white);
        color: var(--primary);
        font-family: var(--heading-font);
    }

    @media(max-width: 1023px){
        section{
            height: 200px;
        }
        .hero h1{
         font-size: 3rem;
        }
    }
    @media(max-width: 545px){
        section{
            height: 150px;
        }
        .hero h1{
         font-size: 2rem;
        }
    }

</style>