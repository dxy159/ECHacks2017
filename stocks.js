const request = require('request')
const cheerio = require('cheerio')

function getStocks(region, callback) {
	const url = 'http://markets.businessinsider.com/indices'

	request(url, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			$ = cheerio.load(body)

			var $table = $(".table-responsive").children().eq(1)

			var $globaldow = $table.children().eq(0).children().eq(3)
			var stock1 = $globaldow.children().eq(1).html().split('<br>')
			//var gd = [$globaldow.children().eq(0).children('a').html(), stock1[0], "\n" + $globaldow.children().eq(2).children().eq(2).html()]
			//callback(gd[0] + " " + gd[1])	//array with info of stock
			var gd = {
				"name": $globaldow.children().eq(0).children('a').html(),
				"stock": stock1[0],
				"rate": $globaldow.children().eq(2).children().eq(2).html()
			}
			//callback(gd)

			var $sandp = $table.children().eq(0).children().eq(8)
			var stock2 = $sandp.children().eq(1).html().split('<br>')
			//var sp = [$sandp.children().eq(0).children('a').html(), stock2[0], "\n" + $sandp.children().eq(2).children().eq(2).html()]
			//callback(sp[0] + " " + sp[1])
			var sp = {
				"name": $sandp.children().eq(0).children('a').html(),
				"stock": stock1[0],
				"rate": $sandp.children().eq(2).children().eq(2).html()
			}

			var $Nasdaq = $table.children().eq(0).children().eq(4)
			var stock3 = $Nasdaq.children().eq(1).html().split('<br>')
			//var nd = [$Nasdaq.children().eq(0).children('a').html(), stock3[0], "\n" + $Nasdaq.children().eq(2).children().eq(2).html()]
			//callback(nd[0] + " " + nd[1])
			var nd = {
				"name": $Nasdaq.children().eq(0).children('a').html(),
				"stock": stock1[0],
				"rate": $Nasdaq.children().eq(2).children().eq(2).html()
			}

			var $spca = $table.children().eq(0).children().eq(10)
			var stock4 = $spca.children().eq(1).html().split('<br>')
			var ca = {
				"name": $spca.children().eq(0).children('a').html(), 
				"stock": stock4[0], 
				"rate": $spca.children().eq(2).children().eq(2).html()
			}
			//callback(ca[0] + " " + ca[1])

			var na = [gd, sp, nd, ca]
			//callback(na)

			var $ftse = $table.children().eq(0).children().eq(20)
			var stock5 = $ftse.children().eq(1).html().split('<br>')
			var uk = {
				"name": $ftse.children().eq(0).children('a').html(), 
				"stock": stock5[0], 
				"rate": $ftse.children().eq(2).children().eq(2).html()
			}
			//callback(uk[0] + " " + uk[1])

			var $cac = $table.children().eq(0).children().eq(19)
			var stock6 = $cac.children().eq(1).html().split('<br>')
			var fr = {
				"name": $cac.children().eq(0).children('a').html(), 
				"stock": stock6[0], 
				"rate": $cac.children().eq(2).children().eq(2).html()
			}
			//callback(fr[0] + " " + fr[1])

			var $dax = $table.children().eq(0).children().eq(14)
			var stock7 = $dax.children().eq(1).html().split('<br>')
			var ger = {
				"name": $dax.children().eq(0).children('a').html(), 
				"stock": stock7[0], 
				"rate": $dax.children().eq(2).children().eq(2).html()
			}
			//callback(ger[0] + " " + ger[1])

			var eu = [uk, fr, ger]

			var $nik = $table.children().eq(0).children().eq(51)
			var stock8 = $nik.children().eq(1).html().split('<br>')
			var jap = {
				"name": $nik.children().eq(0).children('a').html(), 
				"stock": stock8[0],
				"rate": $nik.children().eq(2).children().eq(2).html()
			}
			//callback(jap[0] + " " + jap[1] + " " + jap[2])

			var $shan = $table.children().eq(0).children().eq(53)
			var stock9 = $shan.children().eq(1).html().split('<br>')
			var chin = {
				"name": $shan.children().eq(0).children('a').html(), 
				"stock": stock9[0], 
				"rate": $shan.children().eq(2).children().eq(2).html()
			}
			//callback(chin[0] + " " + chin[1] + " " + chin[2])

			var asia = [jap, chin]

			if (region === "NA") callback(na)
			else if(region === "Europe") callback(eu)
			else if(region === "Asia") callback(asia)

		}
	})
}

getStocks("NA", function(data) {
	console.log(data)
})

getStocks("Europe", function(data){
	console.log(data)
})

getStocks("Asia", function(data){
	console.log(data)
})

module.exports = {
	getStocks: getStocks
}