/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
function that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
*/
const createTweetElement = function (tweetObject) {
  const $tweet = $(`
  <article>
    <header class="tweet-log-container">
    <div class="avatar-username">
    <img class="avatar" src=${tweetObject.user.avatars} />
    <span>${tweetObject.user.name}</span>
    </div>
      <span class="user-handle"><strong>${tweetObject.user.handle}</strong></span>
    </header>
    <p><strong>${tweetObject.content.text}</strong></p>
    <footer class="tweet-log-container">
      <span>${tweetObject.created_at}</span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-retweet"></i>
      </div>
    </footer>
  </article>
  `);
  return $tweet;
};

// function to take in an array of tweet objects and then appending each one to the #tweets-container
const renderTweets = function (tweetsArray) {
  for (tweet of tweetsArray) {
    const tweetElement = createTweetElement(tweet);
    $("#tweets-container").append(tweetElement);
  }
  return;
};

// ajax POST call to handle tweet submission
const postTweetData = function() {
  $.ajax({
    url: "/tweets",
    type: "POST",
    data: $('#tweet-form').serialize(),
    dataType:"json",
    success: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.error("an error occured.", error);
    },
  });  
}

// ajax GET call to fetch tweets
const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "json",
    success: (data) => {
      console.log("the request was successful. Here is the data:", data)
    },
    error: (error) => {
      console.error("There was an error:", error)
    }
  })
}

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];


$(document).ready(function () {
// render data onto tweeter page
  renderTweets(data);
// fetch tweets
  loadTweets();
//handle tweet submit button using ajax
$('#tweet-form').on('submit', function(event) {
  event.preventDefault();
  postTweetData();
})
});
