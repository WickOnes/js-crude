// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Product {
  static #list = [
  ]

  constructor(name, price, description) {
    this.id = Math.floor(Math.random().toFixed(5) * 100000)
    this.createDate = new Date().toISOString()
    this.name = name
    this.price = price
    this.description = description
  }

  static getList() {
    return Product.#list
  }

  static add(product) {
    Product.#list.push(product)
  }

  static getById(id) {
    return Product.#list.find(
      (product) => product.id === id,
    )
  }
  static updateById(id, data) {
    const product = this.getById(id)
    if (product) {
      product.name = data.name || product.name
      product.price = data.price || product.price
      product.description =
        data.description || product.description
    }
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
    }
  }
}

class User {
  static #list = []
  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => {
    return this.password === password
  }

  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((user) => user.id === id)
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (user) => user.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, data) => {
    const user = this.getById(id)

    if (user) {
      this.update(user, data)
      return true
    } else {
      return false
    }
  }

  static update = (user, { email }) => {
    if (email) {
      user.email = email
    }
  }
}

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

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/user', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = User.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body

  const user = new User(email, login, password)

  User.add(user)

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач створенний',
    store: 'user',
  })
})

// ================================================================

router.get('/user-delete', function (req, res) {
  const { id } = req.query
  User.deleteById(Number(id))

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувача виделено',
    store: 'user',
  })
})
// ======================================================

router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body

  const user = User.getById(Number(id))
  console.log(user)

  let result = false

  console.log(user.verifyPassword(password))
  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  res.render('success-info', {
    style: 'success-info',
    info: result
      ? 'Пошту Користувача змінено'
      : 'Сталася помилка',
    store: 'user',
  })
})

// ================================================================
router.get('/product', function (req, res) {
  const productList = Product.getList()

  res.render('product', {
    style: 'product',
    products: {
      productList,
      isEmpty: productList.length === 0,
    },
  })
})
// ======================================================

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  const product = new Product(name, price, description)

  Product.add(product)

  res.render('success-info', {
    style: 'success-info',
    info: 'Продукт створено',
    store: 'product',
  })
})
// ======================================================
router.get('/product-list', function (req, res) {
  const productList = Product.getList()
  res.render('product-list', {
    style: 'product-list',
    productList,
    store: 'product',
  })
})

// ============================================================
router.get('/product-edit', function (req, res) {
  const { id } = req.query
  const productId = Product.getById(Number(id))
  res.render('product-edit', {
    style: 'product-edit',
    productId,
    store: 'product',
  })
})

// ============================================================
router.post('/product-edit', function (req, res) {
  const { id, ...data } = req.body

  Product.updateById(Number(id), data)

  res.render('success-info', {
    style: 'success-info',
    store: 'product-list',
    info: 'Продукт оновлено',
  })
})

// ============================================================

router.get('/product-delete', function (req, res) {
  const { id } = req.query
  Product.deleteById(Number(id))
  res.render('success-info', {
    style: 'success-info',
    info: 'Продукт виделено',
    store: 'product',
  })
})
// ======================================================

// Підключаємо роутер до бек-енду
module.exports = router
