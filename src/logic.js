
export const makeNewBoard = () => {

  let totalNumberOfPicture = 12;
  let photoNumberArray = [];
  let newBoard = [];

  for (let i = 0; i < 5; i++) {
    let isIncluded = true;
    while (isIncluded) {
      let currentRandom = getRandomPictureNumber(totalNumberOfPicture);
      if (!photoNumberArray.includes(currentRandom)) {
        photoNumberArray.push(currentRandom);
        isIncluded = false;
      }

    }
  }
  console.log(totalNumberOfPicture)

  while (photoNumberArray.length > 1) {

    let currentNumber = photoNumberArray.pop();
    let photo =
    {
      photoURL: `https://res.cloudinary.com/dmp2crnzz/image/upload/v1562195541/gamer/${currentNumber}.jpg`,
      side: 0,
      photoId: currentNumber,
      isMatched: false
    }
    newBoard.push(photo);
    newBoard.push({ ...photo });

  }

  let currentNumber = photoNumberArray.pop();
  let photoNotMatch =
  {
    photoURL: `https://res.cloudinary.com/dmp2crnzz/image/upload/v1562195541/gamer/${currentNumber}.jpg`,
    side: 0,
    photoId: currentNumber
  }
  newBoard.push(photoNotMatch);

  let shuffledBoard = randomizeBoard(newBoard);

  return shuffledBoard;

}

const getRandomPictureNumber = (total) => {
  return Math.floor(Math.random() * total) + 1;

}

const randomizeBoard = (board) => {


  let index = board.length - 1;

  while (index > 0) {

    let randomNewIndex = Math.floor(Math.random() * index);
    let temp = board[randomNewIndex];

    board[randomNewIndex] = board[index];
    board[index] = temp;

    index--;


  }


  return board;
}
