const getStream = require("get-stream");
const intoStream = require("into-stream");

const wordpressReadmePlugin = {
  generateNotes(pluginConfig, context) {
    return getStream(
      intoStream
        .object(parsedCommits)
        .pipe(writer(changelogContext, writerOpts))
    );
  },
};

module.exports = wordpressReadmePlugin;
