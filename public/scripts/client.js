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
      <time>${$.timeago(tweetObject.created_at)}</time>
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
const postTweetData = function () {
  $.ajax({
    url: "/tweets",
    type: "POST",
    data: $("#tweet-form").serialize(),
    // dataType: "json",
    success: () => {
      console.log("Your tweet was posted successfully");
      $('#tweet-text').val("");
      $('#tweets-container').empty();
      loadTweets();
    },
    error: (error) => {
      console.error("an error occured.", error);
    },
  });
};

// ajax GET call to fetch tweets
const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "json",
    success: (data) => {
      renderTweets(data);
    },
    error: (error) => {
      console.error("An error occurred, ", error);
    },
  });
};

$(document).ready(function () {
  // fetch tweets
  loadTweets();
  //handle tweet submit button using ajax
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    const tweet = $('#tweet-text').val();
    if (!tweet) {
      alert("Error! There are no characters in this tweet! Please enter valid characters to send out a  tweet 🐦")
      return;
    };
    if (tweet.length > 140) {
      alert("Your tweet has exceeded the character limit!")
      return;
    }
    postTweetData();
  });
});
