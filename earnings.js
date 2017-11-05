const request = require('request')
const cheerio = require('cheerio')

function getEarnings(callback){
	const url = 'http://www.nasdaq.com/earnings/earnings-calendar.aspx'

	request(url, function(err, response, body){
		if(!err && response.statusCode === 200){
			$ = cheerio.load(body)

			var $table = $(".USMN_EarningsCalendar").children().eq(1)

			var $first = $table.children().eq(0)
			var one1 = $first.children().eq(1).children('a').html().split('<br>')
			var one = {
				"name": one1[0],
				"marketCap": one1[1].replace('</b>', '').replace('<b>', ''),
				"date": $first.children().eq(2).html().replace(/\s+/g,'')
			}
			callback(one.name + one.marketCap + one.date)

			var $second = $table.children().eq(1)
			var second1 = $second.children().eq(1).children('a').html().split('<br>')
			var two = {
				"name": second1[0],
				"marketCap": second1[1].replace('</b>', '').replace('<b>', ''),
				"date": $second.children().eq(2).html().replace(/\s+/g,'')
			}
			callback(two.name + two.marketCap + two.date)

			var $third = $table.children().eq(2)
			var third1 = $third.children().eq(1).children('a').html().split('<br>')
			var three = {
				"name": third1[0],
				"marketCap": third1[1].replace('</b>', '').replace('<b>', ''),
				"date": $third.children().eq(2).html().replace(/\s+/g,'')
			}
			callback(three.name + three.marketCap + three.date)

			var $fourth = $table.children().eq(3)
			var fourth1 = $fourth.children().eq(1).children('a').html().split('<br>')
			var four = {
				"name": fourth1[0],
				"marketCap": fourth1[1].replace('</b>', '').replace('<b>', ''),
				"date": $fourth.children().eq(2).html().replace(/\s+/g,'')
			}
			callback(four.name + four.marketCap + four.date)

			var $fifth = $table.children().eq(4)
			var fifth1 = $fifth.children().eq(1).children('a').html().split('<br>')
			var five = {
				"name": fifth1[0],
				"marketCap": fifth1[1].replace('</b>', '').replace('<b>', ''),
				"date": $fifth.children().eq(2).html().replace(/\s+/g,'')
			}
			callback(five.name + five.marketCap + five.date)
		}
	})
}

getEarnings(function(data) {
	console.log(data)
})
