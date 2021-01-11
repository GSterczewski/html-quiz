import { ref, reactive, computed } from "vue";
import useLocalStorage from "@/composables/useLocalStorage.js";
const store = useLocalStorage("htmlQuiz");
const useElementsSelector = htmlElements => {
  const currentElement = ref(null);
  const foundElements = reactive(store.load() || []);
  const findElement = element =>
    foundElements.find(({ id }) => id === element.id);
  const elementsCount = htmlElements.length;
  const elementsLeft = computed(() => elementsCount - foundElements.length);
  const elementsFound = computed(() => elementsCount - elementsLeft.value);
  const calculatePercent = (value, max) => Math.floor((value / max) * 100);
  const progress = ref(
    computed(() => calculatePercent(elementsFound.value, elementsCount))
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
      if (findElement(element)) {
        errorMessage.value = `You have already submitted ${element.name}`;
      } else {
        setStatus(success);
        foundElements.push(element);

        elementsLeft.value--;
        if (store) {
          store.save(foundElements);
        }
      }
    } else {
      errorMessage.value = `${currentElement.value} - no such element`;
      setStatus(invalid);
    }
  };
  const resetProgress = () => {
    const confirm = window.confirm(
      "This will reset all your progress, are you sure ?"
    );
    if (confirm) {
      store.clear();
      foundElements.splice(0, foundElements.length);

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
    elementsFound,
    progress,
    invalid,
    success,
    resetProgress
  };
};
export default useElementsSelector;
