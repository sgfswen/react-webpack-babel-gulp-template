const scoreFilePath = 'score.csv';

export const saveDscqsScore = (videoSulg, testerId, referenceVideoScore, testVideoScore) => {
  console.log(scoreFilePath, `${testerId},${referenceVideoScore},${testVideoScore},${videoSulg}`);
};

export const saveSsScore = (videoSulg, testerId, testVideoScore) => {
  console.log(scoreFilePath, `${testerId},,${testVideoScore},${videoSulg}`);
};
