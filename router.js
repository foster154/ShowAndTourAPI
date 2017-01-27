const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// const Invoice = require('./controllers/invoice');
// const Customer = require('./controllers/customer');
const ToursController = require('./controllers/tours_controller');

// see passport.js => JWT strategy
const requireAuth = passport.authenticate('jwt', { session: false });

// see passport.js => local strategy
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  // AUTH
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  // TOURS

  // Create a tour
  app.post('/tours', requireAuth, ToursController.create);
  // Get list of current user's tours
  app.get('/tours', requireAuth, ToursController.list);
  // Get a tour (by Id)
  app.get('/tours/:tourId', requireAuth, ToursController.getById)
  // Update a tour
  app.put('/tours/:tourId', requireAuth, ToursController.update)
  // Delete a tour
  app.delete('/tours/:tourId', requireAuth, ToursController.delete)
  // Get a tour by slug
  app.get('/:tourSlug', ToursController.getBySlug)
}
