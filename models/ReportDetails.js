const mongoose = require('mongoose')

const ReportDetailsSchema = new mongoose.Schema({
	userID : {
		type : String,
		required : true,
	},
	marketID : {
		type : String,
		required : true,
	},
	marketName : {
		type : String,
		required : true,
	},
	cmdtyID : {
		type : String,
		required : true,
	},
	marketType : {
		type : String,
		required : true,
	},
	cmdtyName : {
		type : String,
		required : true,
	},
	priceUnit : {
		type : String,
		required : true,
	},
	price : {
		type : Number,
		required : true,
	},
	users : {
		type: [String]
	},
},{
	timestamps : true
});


module.exports = mongoose.model('ReportDetail',ReportDetailsSchema);