let elementsCount = 0;

const createElement = name =>({
  id: `element-${elementsCount++}`,
  name
});

const htmlElements = [
  createElement("nav"),
  createElement("head"),
  createElement("body"),
  createElement("script"),
  createElement("link")
]

export default htmlElements;