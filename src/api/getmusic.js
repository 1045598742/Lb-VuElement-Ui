import axios from './index';

export const getMusic = data => {
  return axios({
    // url: 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery19109124046546068159_1590333336506&hash=615C2E2E5682E7F9FEAD86416AA512AB&album_id=968370&dfid=&mid=1642a015cbb1363e610d929f558c1417&platid=4&_=1590333336508'
    url: 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery19108599863825737386_1590419765943&hash=B0B156EC96B28BF49FD7DD31369433AC&album_id=2530746&dfid=0Pe8KC3CdJ2t0mJ0hJ1KTFJd&mid=1642a015cbb1363e610d929f558c1417&platid=4&_=1590419765960'
    // url: 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery19106379132624259733_1590424837273&hash=31C8B1202A71967C84CC7CC85D696297&album_id=35747126&dfid=0Pe8KC3CdJ2t0mJ0hJ1KTFJd&mid=1642a015cbb1363e610d929f558c1417&platid=4&_=1590424837282'
    // url: 'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery19109611633841957532_1590426113670&hash=D714A63968B9D1AC26ACC5E400C98ED1&album_id=12219250&dfid=0Pe8KC3CdJ2t0mJ0hJ1KTFJd&mid=1642a015cbb1363e610d929f558c1417&platid=4&_=1590426113672'
  })
}