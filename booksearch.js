$(document).ready(function() {
	Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
	var Book = Parse.Object.extend("Book");
	var query = new Parse.Query(Book);
	query.find({
		success: function(results) {
			for (var i = 0; i<results.length; i++){
				console.log(results[i].get("url"));
				$(".readinglist").append("<a href="+results[i].get('url')+".html class='listedBook'>"+results[i].get('title')+" by "+results[i].get('author')+"</a><br/><br/>");
			}
		},
	});
});