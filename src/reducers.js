export default function stateReducers(prevState=null, action){
  switch (action.type) {
    case 'SET_RENDTION_URL':
      return {
        ...prevState,
        renditionUrl: action.renditionUrl,
      }

    case 'SET_MASTER_M3U8_URL':
      return {
        masterM3u8Url: action.masterM3u8Url,
        renditions: [],
        renditionUrl: null,
      }

    case 'SET_RENDTION_LIST':
      return {
        ...prevState,
        renditions: action.renditions,
        renditionUrl: action.renditions[0].url,
      }

    default:
      return prevState;
  }
};
