const Tour = require('../models/tour');
const User = require('../models/user');
// require('dotenv').config();

module.exports = {
  create(req, res, next) {
    const tour = new Tour(req.body);
    const user = req.user;
    user.tours.push(tour);
    tour.user = user;

    Promise.all([user.save(), tour.save()])
      .then(tour => res.send(tour))
      .catch(next)
  },

  list(req, res, next) {
    const user = req.user;
    User.findById(user._id)
      .populate('tours')
      .then(user => res.send(user.tours))
      .catch(next)
  },

  getById(req, res, next) {
    const tourId = req.params.tourId
    Tour.findById(tourId)
      .then(tour => res.send(tour))
      .catch(next)
  },

  getBySlug(req, res, next) {
    const slug = req.params.tourSlug
    Tour.findOne({ slug })
      .then(tour => res.send(tour))
      .catch(next)
  },

  update(req, res, next) {
    const tourId = req.params.tourId
    Tour.findByIdAndUpdate(tourId, req.body, {new: true})
      .then(tour => res.send(tour))
      .catch(next)
  },

  delete(req, res, next) {
    const tourId = req.params.tourId
    Tour.findByIdAndRemove(tourId)
      .then(tour => res.send(tour))
      .catch(next)
  }
}
