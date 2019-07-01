// Our router module
const router = require("express").Router();

// Our controller
const genresController = require("../controllers/genresController");

// Our routes
router.get(`/`, genresController.index);
router.get(`/new`, genresController.new);

router.get(`/:id`, genresController.show);
router.get(`/:id/edit`, genresController.edit);
router.post(`/`, genresController.create);
router.post(`/update`, genresController.update);
router.post(`/destroy`, genresController.destroy);

// We have to export our changes
module.exports = router;
