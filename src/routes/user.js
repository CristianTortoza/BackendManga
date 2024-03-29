const express = require("express")
const router = express.Router()
const userControlles = require("../controllers/user")

router.route("/create_user").post(userControlles.createUser)

router.route("/log_in").post(userControlles.logIn)

router
  .route("/:id")
  .put(userControlles.editUser)
  .delete(userControlles.deleteUser)

router.route("/:id/:verify_code").put(userControlles.verifyUser)

router
  .route("/favorites/:manga_id")
  .put(userControlles.addFavoriteMangaById)
  .delete(userControlles.deleteFavoriteMangaById)

router
  .route("/favorites/:manga_id/:chapter_id")
  .put(userControlles.addFavoriteChapterByIdChapterAndMangaId)
  .delete(userControlles.deleteFavoriteChapterByIdChapterAndMangaId)

// antes de acc a estas rutas, tiene que estar verify in true
// y tener un user_name
router
  .route("/:user_name")
  .get(userControlles.getUserByUserName)
  .put(userControlles.addFriendByUserName)

module.exports = router
