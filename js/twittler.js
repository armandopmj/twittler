var stream = streams.home, end_i = stream.length - 1;

function decon_objs( s_i, l ){  
  for( var i = l; i >= s_i; i-- ){
    var tweet = stream[i];
    var time = String(stream[i].created_at).split(" ")[4]
    var $tweet = 
      $("<div class='row "+ tweet.user +"'> <div class='col-sm-3'> </div> <div class='col-sm-6 label-info' id='tweet'>"+'@'+ tweet.user +': '+ tweet.message +" "+ time +"</div> </div>").hide().fadeIn(800);
    $tweet.prependTo($('#tweet_holder'));
  }
}

function calc_length() {
  var start_i = end_i
  end_i = stream.length - 1;
  decon_objs( start_i, end_i );
};

setInterval( calc_length, 2000 );

$(document).ready(function(){
  var $body = $('#tweet_holder');
  $body.html('');
  var index = end_i;
  while(index >= 0){
    var tweet = stream[index];
    var time = String(stream[index].created_at).split(" ")[4]
    var $tweet = $("<div class='row "+ tweet.user +"'> <div class='col-sm-3'> </div> <div class='col-sm-6 label-info' id='tweet'>"+'@'+ tweet.user +': '+ tweet.message +" "+ time +"</div> </div>");
    $tweet.appendTo($body);
    index -= 1;
  }
	
  $(".friend").on("click", function() {
 	  var clicked_friend = $( this ).data( "user" ), users_names = {};

 	  if( clicked_friend !== "AllFriends" ){
      for( var user in streams.users ) { users_names[user] = user };
      delete users_names[ clicked_friend ];

      for( var u in users_names ) { $( "." + u ).hide() };

      $( "." + clicked_friend ).show()
      stream = streams.users[ clicked_friend ];

  } else {
  	  for( var u in streams.users ) { $( "."+u ).show() };
      stream = streams.home;
  }

  });
});


