'use strict'

Backendless.ServerCode.customEvent('clockInorOut', (request) => {
	console.log(request.args)
	const id = request.args.id
	// const query = {
	//   condition: `movie = '${movie}'`
	// };

	return Backendless.Persistence.of('Review').find(query).then(
		(reviews) => {
			const totalReviews = reviews.data.length
			const totalStars = reviews.data.reduce((memo, review) => memo + review.stars, 0)

			// use console to debug your server code
			console.log(`${totalReviews} reviews found with ${totalStars} stars in total`)

			if (totalReviews === 0) {
				throw new Error(`No reviews found for [${movie}] movie`)
			}

			return totalStars / totalReviews
		},
		(err) => {
			console.error(err)

			throw new Error('Movie lookup failed')
		}
	)
})
