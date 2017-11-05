'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const stocks = require('./stocks.js')
const earnings = require('./earnings.js')

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'test') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	//console.log(stocks)
	console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    var text = event.message.text
		    if (event.message.quick_reply) {
	            var status = JSON.stringify(event.message.quick_reply.payload)
	            text = status
	        }
	        if (text === '"STOCKS_NORTHAMERICA"') {
	        	stocks.getStocks("NA", function(data) {
	        		var message = "Here are the stocks information in North America.\n"
	        		for (var i = 0; i < data.length; i++) {
	        			var chunk = (i + 1) + ":\t" + data[i].name + "\t" + data[i].stock + "\t" + data[i].rate + "\n"
	        			message += chunk
	        		}
	        		sendTextMessage(sender, message)
	        	})
	        }
	        else if(text === '"STOCKS_EUROPE"'){
	        	stocks.getStocks("Europe", function(data){
	        		var message = "Here are the stocks information in Europe.\n"
	        		for (var i = 0; i < data.length; i++) {
	        			var chunk = (i + 1) + ":\t" + data[i].name + "\t" + data[i].stock + "\t" + data[i].rate + "\n"
	        			message += chunk
	        		}
	        		sendTextMessage(sender, message)
	        	})
	        }
	        else if(text === '"STOCKS_ASIA"'){
	        	stocks.getStocks("Asia", function(data){
	        		var message = "Here are the stocks information in Asia.\n"
	        		for (var i = 0; i < data.length; i++) {
	        			var chunk = (i + 1) + ":\t" + data[i].name + "\t" + data[i].stock + "\t" + data[i].rate + "\n"
	        			message += chunk
	        		}
	        		sendTextMessage(sender, message)
	        	})
	        }
	        else if(text.indexOf("earnings") >= 0){
	        	earnings.getEarnings(function(data){
	        		var message = "Here are the next earnings dates of companies listed at the Nasdaq: \n"
	        		for (var i = 0; i < data.length; i++) {
	        			var chunk = (i + 1) + ":\t" + data[i].name + "\tMarket Cap: " + data[i].marketCap + "\tDate: " + data[i].date + "\n"
	        			message += chunk
	        		}
	        		sendTextMessage(sender, message)
	        	})
	        }
		    else if (text.indexOf("stocks") >= 0) {
		    	sendQuickReply(sender, "What region are you interested in?")
		    } else {
		    	sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
			}
	    }
    }
    res.sendStatus(200)
})

const token = "EAACPwmfQSnsBAFnhKJNKWXqRIld1hxZCKtyFFLRZCYkZCKa6CRCEYTsPiNoocXJx8vZAqPBN50Hbvs409y3EwZCNX1JDG6UWnZC8yS3nu1unxuaZCIaFCYZBQuEDZB1E3lK2HFGunPtamK7gr5tutJBkjAbrc1PUrphxZBsmYhiz2hekY79Bnh8JR8"

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function sendQuickReply(sender, text) {
	let messageData = {
        "text": text,
        "quick_replies":[
          {
            "content_type":"text",
            "title":"North America",
            "payload":"STOCKS_NORTHAMERICA"
          },
          {
            "content_type":"text",
            "title":"Europe",
            "payload":"STOCKS_EUROPE"
          },
          
          {
            "content_type":"text",
            "title":"Asia",
            "payload":"STOCKS_ASIA"
          }
        ]
    }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

