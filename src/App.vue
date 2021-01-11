<template>
  <div>
    <header class="header">
      <h1>HTML quizz</h1>
    </header>
    <main class="main">
      <section class="intro">
        <h2 class="intro__text">
          👋 Hello, this is a simple quizz to check you knowledge about html
          tags.
        </h2>
        <p class="intro__text">
          ✔️ Your job is to enter as many html tag names as you remember.
        </p>
        <p class="intro__text">
          🤞 Good luck!
        </p>
      </section>
      <secion class="quiz">
        <div class="statistics">
          <div class="statistic">
            <p class="statistic__label">Total tags</p>
            <p class="statistic__value color-dark">{{ elementsCount }}</p>
          </div>
          <div class="statistic">
            <p class="statistic__label">Tags left</p>
            <p class="statistic__value color-danger">{{ elementsLeft }}</p>
          </div>
        </div>
        <div class="progress-wrapper">
          <ProgressRing :strokeWidth="10" :progress="progress" />
        </div>
        <form class="quiz__form">
          <input
            class="quiz__input"
            :class="invalid ? 'invalid' : ''"
            v-model="currentElement"
            @focus="clearErrorMessage"
            @keyup.enter="checkElement"
            placeholder="enter html tag name"
          />
          <button
            role="button"
            class="quiz__button"
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
      </secion>
      <section class="tags-section">
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
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import htmlElements from "./elements";
import ProgressRing from "@/components/ProgressRing.vue";
import VueChip from "@/components/VueChip.vue";
export default {
  name: "App",
  components: { ProgressRing, VueChip },
  setup() {
    const currentElement = ref(null);
    const foundElements = reactive([]);
    const foundElementsMap = {};
    const elementsCount = htmlElements.length;
    const elementsLeft = ref(elementsCount);
    const foundCount = computed(() => elementsCount - elementsLeft.value);
    const calculatePercent = (value, max) => Math.floor((value / max) * 100);
    const progress = ref(
      computed(() => calculatePercent(foundCount.value, elementsCount))
    );
    const errorMessage = ref("");
    const invalid = ref(false);
    const success = ref(false);

    const clearErrorMessage = () => {
      errorMessage.value = "";
    };
    const setStatus = (status, duration = 1000) => {
      status.value = true;
      setTimeout(() => {
        status.value = false;
      }, duration);
    };
    const checkElement = () => {
      const element = htmlElements.find(
        ({ name }) => name === currentElement.value
      );

      if (element) {
        if (foundElementsMap[element.id]) {
          errorMessage.value = `You have already submitted ${element.name}`;
        } else {
          setStatus(success);
          foundElements.push(element);
          foundElementsMap[element.id] = true;
          elementsLeft.value--;
        }
      } else {
        errorMessage.value = `${currentElement.value} - no such element`;
        setStatus(invalid);
      }
    };
    return {
      currentElement,
      foundElements,
      checkElement,
      errorMessage,
      clearErrorMessage,
      elementsCount,
      elementsLeft,
      progress,
      invalid,
      success
    };
  }
};
</script>

<style lang="scss">
$color-black: #212f4a;
$color-gray--blue: #dde5f6;
$color-gray: #8f9aae;
$color-gray--light: #f5f8fc;
$color-red: #fd3689;
$color-green: #44F6B2;
$font-family--body: "Yrsa", serif;
$font-family--headers: "Exo", sans-serif;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4 {
  font-family: $font-family--headers;
}
ul {
  list-style: none;
}
body {
  background-color: $color-gray--light;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-family: $font-family--body;
}

.color-danger {
  color: $color-red;
}
.color-dark {
  color: $color-black;
}
.header {
  padding: 1.4rem;
  text-align: center;
}
.main {
  width: 1100px;
  padding: 2rem 5rem;
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
    padding: 0.5rem 2rem;
    border: none;
    color: #fff;
    text-transform: uppercase;
    background-color: $color-black;
    transition: background-color 0.2s ease-in-out;
    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      cursor: pointer;
      background-color: #3E5163;
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
.statistic {
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  &__label {
    color: $color-gray;
    margin-right: 0.5rem;
    text-transform: uppercase;
  }
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
