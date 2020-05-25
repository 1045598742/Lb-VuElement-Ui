import axios from './index';

export const getMusic = data => {
  return axios({
    url: 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery19109124046546068159_1590333336506&hash=615C2E2E5682E7F9FEAD86416AA512AB&album_id=968370&dfid=&mid=1642a015cbb1363e610d929f558c1417&platid=4&_=1590333336508'
  })
}