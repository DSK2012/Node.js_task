const express = require('express')
const router = express.Router()
const ReportDetail = require('../models/ReportDetails')

router.get('', async(req,res) =>{
	try{
		const data = await ReportDetail.findById(req.query.reportID)
							.select({_id : 1,
								cmdtyName : 1,
								cmdtyID : 1,
								marketID : 1,
								marketName : 1,
								users : 1,
								updatedAt : 1,
								priceUnit : 1,
								price : 1
							});
		res.json(data)
	}catch(err){
		res.send(err)
	}
})

router.post('',async (req, res) =>{
	const convFctr = req.body.reportDetails.convFctr;
	const price = req.body.reportDetails.price;
	const usr_name = req.body.reportDetails.userID;
	const price_per_unit = price/convFctr;
	var arr = [];
	let prev_data;
	try{
		prev_data = await ReportDetail.find(
			{ marketID : req.body.reportDetails.marketID,
				cmdtyID : req.body.reportDetails.cmdtyID
			})
			.then()
			.catch(err => console.log('error found',err));
		}catch(err){
			console.log('some error')
		}
	if (prev_data.length){
		prev_data = prev_data[0]
		new_price = (prev_data.price + price_per_unit)/2;
		prev_data.price = new_price;
		prev_data.users.push(usr_name)
		try{
			// const p2 = await ReportDetail.updateOne({ marketID : req.body.reportDetails.marketID,cmdtyID : req.body.reportDetails.cmdtyID},
			// 	{
			// 		$push:{ users : usr_name }
			// 	});
			// console.log(p2);
			const p1 = await prev_data.save();
			res.json({'status':'success','reportID' : val._id});
		}catch(err){
			res.send('error updating data',err)
		}
	}
	else{
		arr.push(usr_name);
		const reportd = new ReportDetail({
			userID : usr_name,
			marketID : req.body.reportDetails.marketID,
			marketName : req.body.reportDetails.marketName,
			cmdtyID : req.body.reportDetails.cmdtyID,
			marketType : req.body.reportDetails.marketType,
			cmdtyName : req.body.reportDetails.cmdtyName,
			priceUnit : 'Kg',
			price : price_per_unit,
			users : arr
	
		})
		
		try{
			const val = await reportd.save();
			res.json({'status':'success','reportID' : val._id});
		}catch(err){
			res.send(err);
		}
	}
});

module.exports = router;