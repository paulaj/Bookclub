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

$(document).ready(function(){
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
					
					// Put in liked books here after Hannahdorf does ratings
					
					if (Parse.User.current() != null){
						var user = Parse.User.current();
						if (user.get("friends").indexOf(person.get("username")) != -1){
							console.log("yeah dude");
							$("#recommendButton").append("<div><h5>Recommend a book: <input class='text' id='profileRecommendBook'></input><button type='button' id='recommendButton' onClick='recommend()'>Recommend</button></h5></div><br>");
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

function recommend(){
	console.log("clicked yo");
	var shouldRec = confirm("Recommend "+$("#profileRecommendBook").val()+"?");
	if (shouldRec){
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
			rec.set("recommendedBy", Parse.User.current().id);
			rec.set("title", bookTitle);
			rec.set("recommendedTo", person.id)
			rec.save();
		},
	});
	}
	alert("Recommended.");
};

var picIds = {"s0":"no", "s1":"no", "s2":"no", "s3":"no", "s4":"no", "s5":"no"};

function activatePic(pic){
  var ids = ["s0","s1","s2","s3","s4","s5"];
  for (var p=0;p<6;p++){
    if (picIds[ids[p]] == "yes"){picIds[ids[p]]="no";}
  }
  picIds[pic]="yes";
  for (var p=0;p<6;p++){
    if (picIds[ids[p]] == "yes"){$("#s"+p).attr("style", "opacity:.5;");}
    else{$("#s"+p).attr("style", "opacity:1;");}
  }
};

function updatePicZ(){
var ids = ["s0","s1","s2","s3","s4","s5"];
    for (var p=0;p<6;p++){
        if (picIds[ids[p]] == "yes"){updatePic(ids[p]);}
    }
}

function updatePic(newUrl){
  var translator = {"s0":"stockphotos/stock1.png", "s1":"stockphotos/stock2.png", "s2":"stockphotos/stock3.png", "s3":"stockphotos/stock4.png", "s4":"stockphotos/stock5.png", "s5":"stockphotos/stock6.png"};
  Parse.User.current().set("userpic", translator[newUrl]);
  Parse.User.current().set("password", Parse.User.current().get("password"));
  Parse.User.current().set("authData", Parse.User.current().get("authData"));
  Parse.User.current().set("emailVerified", Parse.User.current().get("emailVerified"));
  Parse.User.current().set("books", Parse.User.current().get("books"));
  Parse.User.current().set("email", Parse.User.current().get("email"));
  Parse.User.current().set("friends", Parse.User.current().get("friends"));
  Parse.User.current().set("goingToRead", Parse.User.current().get("goingToRead"));
  Parse.User.current().set("liked", Parse.User.current().get("liked"));
  Parse.User.current().set("read", Parse.User.current().get("read"));
  Parse.User.current().set("reading", Parse.User.current().get("reading"));
  Parse.User.current().save();
  renewpic(translator[newUrl]);
};

function renewpic(loc){
  $("#profilePic").attr("src",loc);
};

$(document).ready(function(){
  Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
  var currentUser = $.getUrlVar("username");
  var logInUser = Parse.User.current().get("username");
  currentUser = currentUser.replace("%20", " ");
  if (currentUser != logInUser){
    $("#newPicToggle").attr("style", "display:none;");
  }
  currUserDiv = document.getElementById("currUser");
  $("#profileLink").attr('href', 'profile.html?username='+logInUser);
});