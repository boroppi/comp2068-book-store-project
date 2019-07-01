const Book = require("../models/book");
const Genre = require("../models/genre");
const mongoose = require("mongoose");

exports.index = (req, res) => {
  req.isAuthenticated();

  Book.find()
    .populate("genre")
    .then(books => {
      res.render("books/index", {
        books: books,
        title: "Books Archive"
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.show = (req, res) => {
  req.isAuthenticated();

  Book.findById(req.params.id)
    .populate("genre")
    .then(book => {
      res.render("books/show", {
        book: book,
        title: book.title
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.new = (req, res) => {
  req.isAuthenticated();

  Genre.find()
    .then(genres => {
      res.render("books/new", {
        title: `New Book`,
        genres: genres
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.edit = (req, res) => {
  req.isAuthenticated();
  Book.findById(req.params.id)
    .populate("genre")
    .then(book => {
      Genre.find().then(genres => {
        res.render("books/edit", {
          title: `Edit ${book.title}`,
          book: book,
          genres: genres
        });
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.create = (req, res) => {
  req.isAuthenticated();
  Book.create(req.body.book)
    .then(() => {
      req.flash("success", "New book was created successfully.");
      res.redirect("/books");
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/books/new");
    });
};

exports.update = (req, res) => {
  req.isAuthenticated();
  Book.updateOne(
    {
      _id: req.body.id
    },
    req.body.book,
    {
      runValidators: true
    }
  )
    .then(() => {
      req.flash("success", "The book was updated successfully.");
      res.redirect(`/books/${req.body.id}`);
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect(`/books/${req.body.id}/edit`);
    });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();
  Book.deleteOne({
    _id: req.body.id
  })
    .then(() => {
      req.flash("success", "The book was deleted successfully.");
      res.redirect("/books");
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect(`/books`);
    });
};
