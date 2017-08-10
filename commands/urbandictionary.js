const Kirbi = require('../kirbi');
const urban = require('urban');

exports.commands = [
	'urban'
];

exports.urban = {
	usage: '<word>',
	description: "looks up a word on Urban Dictionary",
	process: (msg, suffix) => {
		var targetWord = suffix == "" ? urban.random() : urban(suffix);
		targetWord.first(function (json) {
			var title = `Urban Dictionary: ${suffix}`;
			var message;
			var example;

			if (json) {
				title = `Urban Dictionary: ${json.word}`
				message = `${json.definition}`;
				if (json.example) {
					example = `Example: ${json.example}`;
				}

			} else {
				message = 'No matches found';
			}

			msg.channel.send({
				embed: {
					color: Kirbi.Config.defaultEmbedColor,
					title: title,
					description: message,
					footer: {
						text: example
					}
				}
			});
		});
	}
}
