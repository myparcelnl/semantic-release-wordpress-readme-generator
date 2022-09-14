const fs = require('fs');
const debug = require('debug')(
  'semantic-release:@myparcel/semantic-release-wordpress-readme-generator',
);

const DEFAULT_TYPES = [
  {
    type: 'feat',
    prefix: 'New: ',
  },
  {
    type: 'fix',
    prefix: 'Fixed bug: ',
  },
  {
    type: 'perf',
    prefix: 'Performance improvement: ',
  },
  {
    type: 'revert',
    prefix: 'Revert: ',
  },
];

const wordpressReadmePlugin = {
  generateNotes(pluginConfig, context) {
    const {commits, nextRelease, cwd, logger} = context;
    const readmePath = `${cwd}/readme.txt`;
    const isoDate = new Date().toISOString().substring(0, 10);

    let {types} = pluginConfig;

    if (!types || !Array.isArray(types) || types.length === 0) {
      types = DEFAULT_TYPES;
    }

    const plainTypes = types.map((item) => item.type);
    const readmeLines = commits
      .reduce((acc, rawCommit) => {
        debug('Parsing ' + rawCommit.subject);
        const typeWithScope = rawCommit.subject.split(':')[0];
        const type = typeWithScope?.replace(/!|\(.+\)/, '').trim();

        if (!plainTypes.includes(type)) {
          debug(`Skipping commit: ${rawCommit.subject}`);
          return acc;
        }

        const prefix = types.find((item) => item.type === type).prefix;
        const message = rawCommit.subject.split(':')[1]?.trim();

        acc.push({
          type,
          message: `* ${prefix}${message}`,
        });

        debug(`Adding commit: ${rawCommit.subject} – * ${prefix}${message}`);

        return acc;
      }, [])
      .sort((a, b) => plainTypes.indexOf(a.type) - plainTypes.indexOf(b.type));

    const text =
      `= ${nextRelease.version} (${isoDate}) =\n\n` +
      readmeLines.map((commit) => commit.message).join('\n');

    const contentsAsString = fs
      .readFileSync(readmePath)
      .toString('utf-8')
      .replace(`== Changelog ==`, `== Changelog ==\n\n${text}`);

    fs.writeFileSync(readmePath, contentsAsString);
    logger.log(`Updated changelog in readme.txt`);
  },
};

module.exports = wordpressReadmePlugin;
