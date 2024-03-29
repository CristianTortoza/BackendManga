const { User } = require("../config/database")

const userControlles = {
  createUser: async (req, res) => {
    const { name, email, password, country, googleId, photo } = req.body
  },

  logIn: async (req, res) => {},

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
