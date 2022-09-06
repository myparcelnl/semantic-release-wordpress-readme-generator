// const getStream = require('get-stream');
// const intoStream = require('into-stream');
const fs = require('fs');
const debug = require('debug')('semantic-release:@myparcel/semantic-release-wordpress-readme-generator');

const wordpressReadmePlugin = {
  generateNotes(pluginConfig, context) {
    const { commits, nextRelease, cwd } = context;
    const includeTypes = ['feat', 'fix', 'refactor', 'perf'];
    const isoDate = (new Date().toISOString()).substring(0, 10);

    const parser = (msg) => {
      const getMsgIndex = (char) => {
        return (-1 === msg.indexOf(char)) ? msg.length : msg.indexOf(char);
      };
      return {
        type: msg.substring(0, Math.min(getMsgIndex(':'), getMsgIndex('('), getMsgIndex('!'))),
        message: `* ${msg.charAt(0).toUpperCase()}${msg.slice(1)}`,
      };
    };
    const parsedCommits = commits.map((rawCommit) => {
      return parser(rawCommit.message);
    });

    let txt = `= ${nextRelease.version} (${isoDate}) =`;
    includeTypes.forEach((type) => {
      parsedCommits.forEach((obj) => {
        if (type === obj.type) {
          txt += `\n${obj.message}`;
        }
      });
    });

    // old style update readme.txt:
    const readmeLocation = `${cwd}/readme.txt`;
    let contentsAsString = fs.readFileSync(readmeLocation).toString('utf-8');
    contentsAsString = contentsAsString.replace(`== Changelog ==`, `== Changelog ==\n\n${txt}`);
    fs.writeFileSync(readmeLocation, contentsAsString);
    console.log(`Updated changelog in readme.txt`);

    // return getStream(
    //   intoStream
    //     .object(parsedCommits)
    //     .pipe(writer(changelogContext, writerOpts)),
    // );
  },
};

module.exports = wordpressReadmePlugin;
