const { User } = require("../config/database")
const argon2 = require("argon2")

const userControlles = {
  createUser: async (req, res) => {
    const { name, email, password, country, googleId, photo } = req.body

    try {
      const userExist = await User.findOne({ where: { email } })
      if (userExist)
        throw new Error(
          "El mail, ya se encuentra registrado, por favor inicie sesión",
        )
      const hashPassword = await argon2.hash(password, { type: argon2.argon2i })
      const verify_code = Math.random()
        .toString(36)
        .replace(/[^a-z0-9]+/g, "")
        .substring(1, 6)
        .toUpperCase()

      const user = await User.create({
        name,
        email,
        password: hashPassword,
        country,
        googleId,
        photo,
        google: googleId && true,
        verify_code,
      })
      // enviar un mail, cuando este regristado ya, con el verify code.
      res.json({
        success: true,
        user,
        error: null,
      })
    } catch (e) {
      res.json({
        success: false,
        user: null,
        error: e,
      })
    }
  },

  logIn: async (req, res) => {
    const { name, email, password, googleId } = req.body

    try {
      const error = () => {
        throw new Error(
          "Datos ingresados incorrectos. Por favor intentelo de nuevo",
        )
      }

      const user = await User.findOne({ where: { email } })
      console.log("aaa", user)
      if (!user) error()

      const verifyPassword = await argon2.verify(
        user.dataValues.password,
        password,
      )
      if (!verifyPassword) error()

      console.log(dataValues)
      res.json({
        dataValues,
      })
    } catch (e) {
      res.json({
        success: false,
        error: e,
      })
    }
  },

  editUser: async (req, res) => {},

  verifyUser: async (req, res) => {
    /* Esto es en caso de que no haya iniciado sesion con google, si es así verify pasa a true directamente */
    /* La verificación la hacemos a parte, porque para crear un user_name, tiene que estar verify en true */
  },

  deleteUser: async (req, res) => {},

  addFavoriteMangaById: async (req, res) => {},

  deleteFavoriteMangaById: async (req, res) => {
    /* Al borrar un fav manga, verificar si tiene "chapter favorites" 
     En caso afirmativo, avisar que tambien se borraran los chapter favorites de ese manga */
  },

  addFavoriteChapterByIdChapterAndMangaId: (req, res) => {
    /* Si agrega un chapter, pero no tiene agregado el manga a favoritos, se agrega automaticamente
    el manga a favoritos y se le da aviso del mismo */
  },

  deleteFavoriteChapterByIdChapterAndMangaId: (req, res) => {},

  getUserByUserName: async (req, res) => {},

  addFriendByUserName: async (req, res) => {},
}

module.exports = userControlles
