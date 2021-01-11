<template>
  <div>
    <header class="header">
      <h1>HTML quiz</h1>
    </header>
    <main class="main">
      <section class="section intro">
        <h2 class="intro__text">
          👋 Hello, this is a simple quiz to check you knowledge about html
          tags.
        </h2>
        <p class="intro__text">
          ✔️ Your job is to enter as many html tag names as you remember.
        </p>
        <p class="intro__text">
          🤞 Good luck!
        </p>
      </section>
      <section class="section quiz">
        <div class="statistics">
          <QuizStatistic
            label="Total HTML5 tags: "
            :value="elementsCount"
            valueStyling="color-dark"
          />
          <QuizStatistic
            label="Tags left: "
            :value="elementsLeft"
            valueStyling="color-danger"
          />
          <QuizStatistic
            label="Tags found: "
            :value="elementsFound"
            valueStyling="color-success"
          />
        </div>
        <div class="progress-wrapper">
          <ProgressRing :strokeWidth="10" :progress="progress" />
        </div>
        <form class="quiz__form">
          <input
            name="tag name"
            aria-label="tag name"
            class="quiz__input"
            :class="invalid ? 'invalid' : ''"
            v-model="currentElement"
            @focus="clearErrorMessage"
            @keyup.enter="checkElement"
            placeholder="enter html tag name"
          />
          <button
            type="submit"
            class="button quiz__button"
            :disabled="invalid || success"
            :class="
              invalid
                ? 'quiz__button--invalid'
                : success
                ? 'quiz__button--success'
                : ''
            "
            @click.prevent="checkElement"
          >
            {{ invalid ? "nope" : success ? "great" : "check" }}
          </button>
        </form>
        <button
          class="button button--danger reset-button"
          @click.prevent="resetProgress"
        >
          Reset progress
        </button>
      </section>
      <section class="section tags-section">
        <h3 class="tags-section__heading">Your tags</h3>
        <ul class="tags-section__list">
          <li v-for="element in foundElements" :key="element.id">
            <VueChip class="tag" bgColor="#E1FDED" color="#44F6B2">
              {{ element.name }}</VueChip
            >
          </li>
        </ul>
      </section>
    </main>
    <footer class="footer">
      <p class="attribution">
        Designed and coded by
        <a
          class="attribution__link"
          href="https://github.com/GSterczewski"
          rel="noreferrer"
          target="_blank"
          >g.sterczewski</a
        >
      </p>
    </footer>
  </div>
</template>

<script>
import htmlElements from "./elements";
import useElementSelector from "@/composables/useElementSelector.js";
import ProgressRing from "@/components/ProgressRing.vue";
import VueChip from "@/components/VueChip.vue";
import QuizStatistic from "@/components/QuizStatistic.vue";
export default {
  name: "App",
  components: { ProgressRing, VueChip, QuizStatistic },
  setup() {
    const {
      elementsCount,
      elementsFound,
      elementsLeft,
      progress,
      invalid,
      success,
      currentElement,
      foundElements,
      checkElement,
      resetProgress
    } = useElementSelector(htmlElements);
    return {
      elementsCount,
      elementsFound,
      elementsLeft,
      progress,
      invalid,
      success,
      currentElement,
      foundElements,
      checkElement,
      resetProgress
    };
  }
};
</script>

<style lang="scss">
.color-danger {
  color: $color-red;
}
.color-dark {
  color: $color-black;
}
.color-success {
  color: $color-green;
}
.header {
  padding: 1.4rem;
  text-align: center;
}
.main {
  width: 1100px;
  padding: 2rem 5rem;
}

.section{
  @media screen and(min-height:1000px){
    margin-bottom: 10rem;

  }
}
.intro {
  &__text {
    font-size: 1.4rem;
    text-align: center;
    max-width: 90vw;
    margin: 0 auto;
    @media screen and (max-width: 800px) {
      font-size: 1.2rem;
    }
  }
}

.button {
  padding: 0.5rem 2rem;
  border: none;
  color: #fff;
  text-transform: uppercase;
  background-color: $color-black;
  display: block;
  &:hover:not(:disabled) {
    cursor: pointer;
  }
  &--danger {
    background-color: $color-red;
  }
}
.reset-button {
  margin: 0 auto;
  margin-top: 3rem;
}
.quiz {
  display: block;
  margin-top: 5rem;
  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__input {
    width: 20rem;
    height: 2rem;
    font-size: 1.2rem;
    padding: 0;
  }
  &__button {
    transition: background-color 0.2s ease-in-out;
    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      background-color: #3e5163;
    }
    &--invalid {
      background-color: $color-red;
    }
    &--success {
      background-color: $color-green;
    }
  }
}
.statistics {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.progress-wrapper {
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}
.tags-section {
  margin-top: 5rem;
  padding-bottom: 5rem;
  background-color: #fff;
  padding: 2rem;
  padding-bottom: 4rem;
  border-radius: 20px;
  &__heading {
    margin-bottom: 1.5rem;
    font-size: 2rem;
    text-align: center;
  }
  &__list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}

.tag {
  display: block;
  margin-right: 10px;
  animation: fly 0.9s;
}
.invalid {
  animation: shake 0.5s 3;
}

.footer {
  padding: 1rem 0;
}
.attribution {
  margin: 0 auto;
  text-align: center;
  font-size: 1.1rem;
  letter-spacing: 1px;
  &__link {
    text-decoration: none;
    color: $color-green;
    font-weight: bold;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
}

@keyframes fly {
  0% {
    transform: translateY(-250px);
  }
  100% {
    transform: translate(0);
  }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
