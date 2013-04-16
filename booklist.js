$(function() {

  var reading	= {"books":{ "title":"Holes" , "author":"Louis Sachar" },
"booksone":{ "title":"Harry Potter and the Philosopher's Stone" , "author":"JK Rowling" }};
	var reading_list="\n";
	
    
    //Part 2: replace words with variables
	//document.getElementById("from").innerHTML=reading.title
    
	
	for(var key in reading){
	
	reading_list=reading_list + reading[key].title 
	+ "    " + reading[key].author +" \n";
	
	}
	$(".from").html(reading_list);

		
	
	
	
    });
