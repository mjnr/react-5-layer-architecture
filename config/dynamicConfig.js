const baseExperienceEndpoint = '/experiences/{expName}/';

const dynamicConfig = {
	"default": {
		"ROOT_PATH": "/",
    "STATE": "/",
		"API": {},
		"SETTINGS": {
			title: 'Default Title'
		},
		apps: {}
	},
	'local': {},
	'prod': {},
	'dev': {},
	'staging': {}
};

module.exports = dynamicConfig;
