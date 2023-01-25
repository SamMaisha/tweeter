$(document).ready(function() {
  const $form = $('tweet-form')
  const $inputTweet = $('#tweet-text'); // can also directly reference tweet-text 


  $inputTweet.on("input", function(event) {
    const tweetCharacterCount = $(this).val().length;
    const tweetCharactersLeft = 140 - tweetCharacterCount;
    console.log(tweetCharactersLeft);
    
    const tweetCounter = $(this).siblings('div').children('.counter');
  
    tweetCounter.text(tweetCharactersLeft);
    
  });
})


