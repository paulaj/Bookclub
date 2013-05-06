$(function() {

  Parse.$ = jQuery;
  
  Parse.initialize("qyuc8DGipEXPi3Fh32EKqnH2H563DPoFqcRjoa9h", "QTmatMd6trXNFaB0OaaPWEeCdCFpWm6YLv53dnn9");
  
  var Book = Parse.Object.extend("Book");
  
  var BookCollection = Parse.Collection.extend({
	model: Book
	});
	
  var allBooks = new BookCollection();
  allBooks.add([
	{"title": "Moby Dick", "genre": "Adventure", "synopsis": "It's got whales and stuff", "numRatings": 0, "avgRating": 0, "id": "mobydick"},
	{"title": "Twilight", "genre": "Romance", "synopsis": "A girl falls in love with a sparkly vampire", "numRatings": 0, "avgRating": 0, "id": "twilight"}
	]);
  });
