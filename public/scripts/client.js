/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function to escape text to prevent cross-site scripting
const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML
}
/*
function that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
*/
const createTweetElement = function (tweetObject) {
  const userAvatar = tweetObject.user.avatars;
  const username = tweetObject.user.name;
  const userHandle = tweetObject.user.handle;
  const textFromUser = tweetObject.content.text;
  const timestamp = tweetObject.created_at;
  const $tweet = $(`
  <article>
    <header class="tweet-log-container">
    <div class="avatar-username">
    <img class="avatar" src=${userAvatar} />
    <span>${username}</span>
    </div>
      <span class="user-handle"><strong>${userHandle}</strong></span>
    </header>
    <p>${escapeText(textFromUser)}</p>
    <footer class="tweet-log-container">
      <time>${$.timeago(timestamp)}</time>
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
  // hide tweets by defualt when page is loaded
  $(".error-msg").hide();
  // fetch tweets
  loadTweets();
  //handle tweet submit button using ajax
  $("#tweet-form").on("submit", function (event) {
    // hide tweets on submission of form
    $(".error-msg").hide();
    event.preventDefault();
    const tweet = $('#tweet-text').val();
    if (!tweet) {
      $(".error-msg").text('⚠️ Oops! This tweet does not contain any characters. Please type something you would like to post ⚠️').slideDown();
      return;
    };
    if (tweet.length > 140) {
      $(".error-msg").text('⚠️ Oops! This post has exceeded the 140 character limit. Please limit tweets to 140 characters or less ⚠️').slideDown();
      return;
    }
    postTweetData();   
  });
});
