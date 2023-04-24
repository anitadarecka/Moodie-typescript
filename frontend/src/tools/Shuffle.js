/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const Shuffle = (array) => {
  let i = array.length;
  let j = 0;
  let temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export default Shuffle;
