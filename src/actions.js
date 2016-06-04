import urlParser from 'url';
import fetch from 'isomorphic-fetch';

const getRenditionsFromMasterM3u8 = (masterM3u8, masterM3u8Url) => {
  const res = masterM3u8.split(/\r?\n/)
    .filter(line => line.match(/\.m3u8/))
    .map(url => ({
      url: urlParser.resolve(masterM3u8Url, url),
    }));
  console.log(res);
  return res;
};

const updateMasterM3u8UrlToStore = (masterM3u8Url) => (dispatch) => {
  dispatch({
    type: 'SET_MASTER_M3U8_URL',
    masterM3u8Url,
  });

  fetch(masterM3u8Url)
  .then(resp => resp.text())
  .then(body => dispatch({
    type: 'SET_RENDTION_LIST',
    renditions: getRenditionsFromMasterM3u8(body, masterM3u8Url),
  }));
};

export default {
  updateMasterM3u8UrlToStore,
};
