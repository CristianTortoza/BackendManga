const { User } = require("../config/database")
const argon2 = require("argon2")

const userControlles = {
  createUser: async (req, res) => {
    const { user_name, email, password, country, googleId, photo_perfil } =
      req.body

    try {
      if (googleId) {
        const user = await User.find({ where: { googleId } })
        if (user) {
          return res.json({
            success: true,
            user,
            message: `Bienvenid@ ${user.dataValues.user_name}, extrañabamos tu visita.
            Esperamos que disfrutes tus lecturas.`,
            error: null,
          })
        }
      }

      const userExist = await User.findOne({ where: { email } })
      if (userExist)
        throw new Error(
          "El mail ya se encuentra registrado, por favor inicie sesión",
        )

      const hashPassword = await argon2.hash(googleId ? googleId : password, {
        type: argon2.argon2i,
      })
      const verify_code = Math.random()
        .toString(36)
        .replace(/[^a-z0-9]+/g, "")
        .substring(1, 6)
        .toUpperCase()

      const user = await User.create({
        user_name,
        email,
        password: hashPassword,
        country,
        googleId,
        photo_perfil,
        google: googleId && true,
        verify: googleId && true,
        verify_code,
      })
      // enviar un mail, cuando este regristado ya, con el verify code.
      res.json({
        success: true,
        user,
        message: `Bienvenid@ al mundo Otakuneta ${user.dataValues.user_name}, 
        Esperamos que disfrute su visita.`,
        error: null,
      })
    } catch (e) {
      res.json({
        success: false,
        user: null,
        error: e,
        message: e.message,
      })
    }
  },

  logIn: async (req, res) => {
    const { user_name_or_email, password, googleId } = req.body

    try {
      const error = () => {
        throw new Error(
          "Datos ingresados incorrectos, por favor intentelo de nuevo",
        )
      }
      const user = {}
      if (user_name_or_email.includes("@")) {
        if (googleId) {
          user = await User.findOne({ where: { googleId } })
        } else {
          user = await User.findOne({ where: { email } })
        }
      } else {
        user = await User.findOne({ where: { user_name } })
      }

      if (!user) return error()

      if (user && googleId)
        return res.json({
          success: true,
          res: user,
          error: null,
          message: `Bienvenid@ ${user.dataValues.user_name}, extrañabamos tu visita.
          Esperamos que disfrutes tus lecturas.`,
        })

      if (!(await argon2.verify(user.dataValues.password, password)))
        return error()

      return res.json({
        success: true,
        res: user,
        error: null,
        message: `Bienvenid@ ${user.dataValues.user_name}, extrañabamos tu visita.
          Esperamos que disfrutes tus lecturas.`,
      })
    } catch (e) {
      res.json({
        success: false,
        user: null,
        error: e,
        message: e.message,
      })
    }
  },

  editUser: async (req, res) => {
    // si es user normal, puede modificar la contraseña, si es de google no.
    const { user_name, password, newPassword, img, country, googleId } =
      req.body
    try {
      const user = await User.find({ where: { user_name } })
      if (!user)
        throw new Error(
          "Hubo un error al encontrar el usuario, vuelva a intentar. Si el error persiste, intentelo mas tarde",
        )

      if (!googleId) {
        if (!(await argon2.verify(user.dataValues.password, password)))
          throw new Error("Contraseña ingresada incorrecta.")
      }

      // hacer valdiación de hace cuanto cambio el user su user_name
      //
      user.set({
        user_name: user_name,
        password: newPassword ? newPassword : user.dataValues.password,
        img: img,
        country: country,
      })

      const newUser = await user.save()

      res.json({
        success: true,
        user: newUser,
        error: e,
        message: `${newUser.dataValues.user_name}, 
        ya tienes un nuevo flow.`,
      })
    } catch (e) {
      res.json({
        success: false,
        user: null,
        error: e,
        message: e.message,
      })
    }
    // al crear el user_name no se aceptaran @ ni caracteres especiales, solo letras y numeros
  },

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
