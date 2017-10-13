# Transfer Slack Emojis

Simple script used in addition to [Emojipacks](https://github.com/lambtron/emojipacks) to transfer emojis from one Slack workspace to another

1. Use Slack's [Emoji.list](https://api.slack.com/methods/emoji.list) method to retrieve a JSON file of existing emojis for both your old and new workspace. Save these responses (pretty-printed) to old.json and new.json respectively.

2. npm install and run *node index.js*. This will deduplicate and return the emojis missing from your new workspace as *output.json*

3. Convert output.json to .yaml, following emojipack's outlines for styling.