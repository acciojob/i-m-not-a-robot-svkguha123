//your JS code here. If required.
// define image array
const images = ["https://picsum.photos/150/150", "https://picsum.photos/150/150", "https://picsum.photos/150/150", "https://picsum.photos/150/150", "https://picsum.photos/150/150", "https://picsum.photos/150/150"];

// shuffle images
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// randomly assign repeating image
function assignRepeatingImage(images) {
  const index = Math.floor(Math.random() * images.length);
  const repeatingImage = images[index];
  images.splice(index, 1);
  images.splice(Math.floor(Math.random() * images.length), 0, repeatingImage);
}

// render images
function renderImages() {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  const shuffledImages = shuffle([...images]);
  assignRepeatingImage(shuffledImages);
  shuffledImages.forEach(image => {
    const img = document.createElement('img');
    img.classList.add(`img${shuffledImages.indexOf(image) + 1}`);
    img.src = image;
    img.addEventListener('click', handleClick);
    container.appendChild(img);
  });
}

// initialize state
let clickedImages = [];
let state = 1;

// render images on load
window.onload = function() {
  renderImages();
};

// handle click event
function handleClick(e) {
  // prevent double-clicking the same image
  if (e.target === clickedImages[0]) {
    return;
  }

  // add clicked image to array and update state
  clickedImages.push(e.target);
  state = clickedImages.length === 1 ? 2 : 3;

  // render reset button
  const resetButton = document.querySelector('#reset');
  resetButton.style.display = 'block';
  resetButton.addEventListener('click', handleReset);

  // render verify button
  const verifyButton = document.querySelector('#verify');
  if (state === 3 && !verifyButton) {
    const button = document.createElement('button');
    button.id = 'verify';
    button.innerHTML = 'Verify';
    button.addEventListener('click', handleVerify);
    container.after(button);
  }
}

// handle reset event
function handleReset() {
  clickedImages = [];
  state = 1;
  const resetButton = document.querySelector('#reset');
  resetButton.style.display = 'none';
  const verifyButton = document.querySelector('#verify');
  if (verifyButton) {
    verifyButton.remove();
  }
  const para = document.querySelector('#para');
  para.innerHTML = '';
  renderImages();
}

// handle verify event
function handleVerify() {
  const para = document.querySelector('#para');
  if (clickedImages.length !== 2) {
    para.innerHTML = "Please select two tiles to verify that you are not a robot.";
    return;
  }
  if (clickedImages[0].classList[0] === clickedImages[1].classList[0]) {
    para.innerHTML = 'You are a human. Congratulations!';
  } else {
    para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  const verifyButton = document.querySelector('#verify');
  if (verifyButton) {
    verifyButton.remove();
  }
}