$(document).ready(function() {
  const $form = $('tweet-form')
  const $inputTweet = $('#tweet-text'); // can also directly reference tweet-text 

  $inputTweet.on("input", function(event) {
    // number of characters in tweet
    const tweetCharacterCount = $(this).val().length;
    // number of characters remaining 
    const tweetCharactersLeft = 140 - tweetCharacterCount;
    // accessing the counter element
    const tweetCounter = $(this).siblings('div').children('.counter');
    // updating counter with characters left in tweet 
    tweetCounter.text(tweetCharactersLeft);
    // add class to turn counter red when tweet goes above character limit
    if (tweetCharactersLeft < 0) {
      $('.counter').addClass("counter-warning");
    } else {
      $('.counter').removeClass("counter-warning");
    }
  });
})


