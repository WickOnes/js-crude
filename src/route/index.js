// Підключаємо технологію express для back-end сервера

const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// error: src refspec 3-purchase does not match any
// error: failed to push some refs to 'https://github.com/WickOnes/js-crude.git'

// ================================================================

class Track {
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 9000)
    this.name = name
    this.author = author
    this.image = image
  }

  static create(name, author, image) {
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }

  static getList() {
    return this.#list.reverse()
  }
}

Track.create(
  'SOD',
  'Chop say',
  'https://picsum.photos/100/100',
)
Track.create(
  'Green day',
  'Say hello',
  'https://picsum.photos/100/100',
)
Track.create(
  'Adel',
  'Worck hard',
  'https://picsum.photos/100/100',
)
Track.create(
  'Slim',
  'Paranoya',
  'https://picsum.photos/100/100',
)
Track.create(
  'Bon Jovy',
  'Nice day',
  'https://picsum.photos/100/100',
)

class Playlist {
  static #list = []

  constructor(name) {
    this.id = this.id = Math.floor(
      1000 + Math.random() * 9000,
    )
    this.name = name
    this.tracks = []
  }

  static create(name) {
    const newPlaylist = new Playlist(name)
    this.#list.push(newPlaylist)
    return newPlaylist
  }

  static getList() {
    return this.#list.reverse()
  }

  static makeMix(playList) {
    const allTracks = Track.getList()
    let randomTracks = allTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    playList.tracks.push(...randomTracks)
  }

  static getById(id) {
    return (
      Playlist.#list.find(
        (playlist) => playlist.id === id,
      ) || null
    )
  }

  static findPlaylist(value) {
    return this.#list.filter((playlist) =>
      playlist.name
        .toLowerCase()
        .includes(value.toLowerCase()),
    )
  }

  addTrack(trackID) {
    const allTracks = Track.getList()

    return this.tracks.push(
      allTracks.find((track) => track.id === trackID),
    )
  }

  deleteTrackById(trackId) {
    this.tracks = this.tracks.filter(
      (track) => track.id !== trackId,
    )
  }
}

Track.create(
  'SOD',
  'Chop say',
  'https://picsum.photos/100/100',
)
Track.create(
  'Green day',
  'Say hello',
  'https://picsum.photos/100/100',
)
Track.create(
  'Adel',
  'Worck hard',
  'https://picsum.photos/100/100',
)
Track.create(
  'Slim',
  'Paranoya',
  'https://picsum.photos/100/100',
)
Track.create(
  'Bon Jovy',
  'Nice day',
  'https://picsum.photos/100/100',
)

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify', function (req, res) {
  const playList = Playlist.getList()

  res.render('spotify', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify',
    data: {
      playList: playList,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-search', function (req, res) {
  const playList = Playlist.getList()

  res.render('spotify-search', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-search',
    data: {
      playList: playList,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/spotify-search', function (req, res) {
  
  const value = req.body.value
  const playList = Playlist.findPlaylist(value)

  res.render('spotify-search', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-search',
    data: {
      playList: playList,
      value: value,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-choose', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-choose', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-choose',
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  const isMix = !!req.query.isMix
  res.render('spotify-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-create',

    data: { isMix },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/spotify-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer

  const isMix = !!req.query.isMix
  const name = req.body.name
  if (!name) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Введіть назві плейлиста',
        link: '/spotify-create',
      },
    })
  }

  const playlist = Playlist.create(name)
  console.log(isMix)
  if (isMix) {
    Playlist.makeMix(playlist)
  }

  // console.log(playlist);
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    data: {
      message: 'Успішно',
      info: 'Мікс створенний',
      link: `/spotify-playlist?id=${playlist.id}`,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-playlist', function (req, res) {
  const id = Number(req.query.id)
  const trackId = Number(req.query.trackId)
  const playlist = Playlist.getById(id)

  if (trackId) {
    playlist.addTrack(trackId)
  }

  if (!playlist) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Такого плейлиста не знайдено',
        link: '/spotify-choose',
      },
    })
  }

  res.render('spotify-playlist', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-playlist',
    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-track-delete', function (req, res) {
  const playListId = Number(req.query.playListId)
  console.log(req.query)
  const trackId = Number(req.query.trackId)

  const playList = Playlist.getById(playListId)

  if (!playList) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Такого плейлиста не знайдено',
        link: '/spotify-choose',
      },
    })
  }

  playList.deleteTrackById(trackId)

  res.render('spotify-playlist', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-playlist',
    data: {
      playlistId: playList.id,
      tracks: playList.tracks,
      name: playList.name,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotyfy-track-add', function (req, res) {
  const playListId = Number(req.query.playListId)
  const playList = Playlist.getById(playListId)
  console.log(playList.id)
  // console.log(req.query);

  res.render('spotify-track-add', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-track-add',
    data: {
      playlistId: playList.id,
      tracks: Track.getList(),
      name: playList.name,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================
// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('page', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'page',
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
