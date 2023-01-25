/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetObject) {
  // takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
  const $tweet = $(`
  <article>
        <header class="tweet-log-container">
        <div>
        <img class="avatar" src=${user.avatars} />
        </div>
          <span>${user.name}</span>
          <span class="user-handle"><strong>${user.handle}</strong></span>
        </header>
        <p><strong>${content.text}</strong></p>
        <footer class="tweet-log-container">
          <span>${created_at}</span>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-retweet"></i>
          </div>
        </footer>
      </article>`);

  return $tweet;
};
