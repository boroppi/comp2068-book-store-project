const Genre = require("../models/genre");
const mongoose = require("mongoose");

exports.index = (req, res) => {
  req.isAuthenticated();

  Genre.find()
    .then(genres => {
      res.render("genres/index", {
        genres: genres,
        title: "Genres Archive"
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.show = (req, res) => {
  req.isAuthenticated();

  Genre.findById(req.params.id)
    .then(genre => {
      res.render("genres/show", {
        genre: genre,
        title: genre.name
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.new = (req, res) => {
  req.isAuthenticated();

  res.render("genres/new", {
    title: `New Genre`
  });
};

exports.edit = (req, res) => {
  req.isAuthenticated();
  Genre.findById(req.params.id)
    .then(genre => {
      res.render("genres/edit", {
        title: `Edit ${genre.title}`,
        genre: genre
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.create = (req, res) => {
  req.isAuthenticated();
  Genre.create(req.body.genre)
    .then(() => {
      req.flash("success", "New genre was created successfully.");
      res.redirect("/genres");
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/genres/new");
    });
};

exports.update = (req, res) => {
  req.isAuthenticated();
  Genre.updateOne(
    {
      _id: req.body.id
    },
    req.body.genre,
    {
      runValidators: true
    }
  )
    .then(() => {
      req.flash("success", "The genre was updated successfully.");
      res.redirect(`/genres/${req.body.id}`);
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect(`/genres/${req.body.id}/edit`);
    });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();
  Genre.deleteOne({
    _id: req.body.id
  })
    .then(() => {
      req.flash("success", "The genre was deleted successfully.");
      res.redirect("/genres");
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect(`/genres`);
    });
};
