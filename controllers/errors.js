exports.internalError = {
  message: 'Something went wrong with the StoryTime API.'
};

exports.errorMessage = msg => {
  return {
    message: msg
  };
};

exports.theEnd = {
  message: 'This could be the end of the story'
};
