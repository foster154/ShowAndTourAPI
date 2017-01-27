const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourSchema = new Schema({
	date: {type: Date, default: Date.now},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
  address: String,
  city: String,
  state: String,
  zip: String,
  description: String,
  price: String,
  beds: String,
  baths: String,
  homeSize: Number,
  lotSize: Number,
  yearBuilt: Number,
  latitude: Number,
  longitude: Number,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
});

// TODO: when tour is deleted, also remove it from user.tours array
// TourSchema.pre('remove', function(next) {});

const Tour = mongoose.model("tour", TourSchema);

module.exports = Tour;
