export function decidePresentationRepeatTime(video) {
  return video.height >= 720 ? 2 : 1;
}

export function getVideoSlug(video) {
  return `${video.inputFileName}-${video.width}-${video.height}-${video.averageBitRate}`;
}

export function getVideoFileName(video) {
  return `${getVideoSlug(video)}.mp4`;
}

export function getReferenceVideoFileName(video) {
  return `${video.inputFileName}.mp4`;
}
