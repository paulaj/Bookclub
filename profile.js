$.extend({
	getUrlVars : function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(
				window.location.href.indexOf('?') + 1).split('&');
		for ( var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		
		return vars;
	},
	getUrlVar : function(name) {
		return $.getUrlVars()[name];
	}
});

function sendRecommendation(){
	var bookTitle = $("#profileRecommendBook").val();
	console.log(bookTitle);
	Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
	var query = new Parse.Query(Parse.User);
	var Recommendation = Parse.Object.extend("Recommendation");
	var username = $.getUrlVar('username');
	username = username.replace("%20"," ");
	console.log(username);
	query.equalTo('username', username);
	query.first({
		success: function(person){
			var rec = new Recommendation();
			console.log(Parse.User.current().get("username"));
			rec.set("recommendedBy", Parse.User.current());
			rec.set("title", bookTitle);
			rec.set("recommendedTo", person)
			rec.save();
		},
	});
	}

$(function(){
  Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
		var query = new Parse.Query(Parse.User);
		var username = $.getUrlVar('username');
		username = username.replace("%20"," ");
		console.log(username);
		query.equalTo('username', username);
		query.first({
			success: function(person){
				if (person != undefined){
					$(".username").html(username);
					var source = person.get("userpic");
					$("#profilePic").attr("src",source);
					var Book = Parse.Object.extend("Book");
					if (person.get("reading")){
						for (var i = 0; i < person.get("reading").length; i++){
							var readingQuery = new Parse.Query(Book);
							console.log(person.get("reading")[i]);
							var book = readingQuery.equalTo("title", person.get("reading")[i]);
							book.first({
								success: function(object){
									$("#reading").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</div>");
								},
							});
						}
					} else {
					$("#reading").append("nothing at the moment");
					}
					if (person.get("liked")){
						for (var i = Math.max(0, person.get("liked").length-4); i < person.get("liked").length; i++){
							var likedQuery = new Parse.Query(Book);
							console.log(person.get("liked")[i]);
							var book = readingQuery.equalTo("title", person.get("liked")[i]);
							book.first({
								success: function(object){
									$("#likes").append("<div id='"+object.get("url")+"div'><a href='"+object.get("url")+".html' class='listedBook'>"+object.get("title")+" by "+object.get("author")+"</div>");
								},
							});
						}
					} else {
					$("#liked").append("nothing so far");
					}
					if (Parse.User.current() != null){
						var user = Parse.User.current();
						if (user.get("friends").indexOf(person.get("username")) != -1){
							console.log("yeah dude");
							$("#recommendButton").append("<div><h5>Recommend a book: <input class='text' id='profileRecommendBook'><input type='submit' onclick='sendRecommendation()' value='Send'></input></input></h5></div><br>");
						}
						$(function() {
							var bookQuery = new Parse.Query(Book);
							var bookTitles = []
							bookQuery.find({
								success: function(books){
									for (var i = 0; i<books.length; i++){
										bookTitles.push(books[i].get("title"));
									}
									console.log(bookTitles);
									$("#profileRecommendBook").autocomplete({source: bookTitles});  
								},
							});
 
						});
					}

				} else {
					alert("That user doesn't exist!")
					window.location = "friendsList.html";
				}
			}
		});
});
