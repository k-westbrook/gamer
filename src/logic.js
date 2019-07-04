
export const makeNewBoard = () => {

  let totalNumberOfPicture = 12;
  let photoNumberArray = [];
  let newBoard = [];

  for (let i = 0; i < 4; i++) {
    let isIncluded = true;
    while (isIncluded) {
      let currentRandom = getRandomPictureNumber(totalNumberOfPicture);
      if (!photoNumberArray.includes(currentRandom)) {
        isIncluded = false;
      }

    }
  }

  while (photoNumberArray.length) {
    let photo =
    {
      photoURL: `https://res.cloudinary.com/dmp2crnzz/image/upload/v1562195541/gamer/{photoNumberArray.pop()}.heic`,
      side: 0,
      photoId: photoNumberArray.pop()
    }
    newBoard.push(photo);
    newBoard.push({ ...photo });

  }

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

    console.log(randomNewIndex, index);
    index--;


  }


  return board;
}
