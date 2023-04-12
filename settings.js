

let settings = {
	types: [
		{ name: 'feat', description: 'It is used to describe the addition of a new functionality or feature to the code.' },
		{ name: 'fix', description: 'It is used to describe the correction of an error or bug in the code.' },
		{ name: 'docs', description: 'It is used to describe changes to the documentation, such as typographical corrections or updated installation instructions.' },
		{ name: 'style', description: 'It is used to describe changes to the style of the code, such as correction of formatting errors, removal of white space, or changes in indentation.' },
		{ name: 'refactor', description: 'It is used to describe changes to the code that do not add new functionality or fix bugs, but do improve the structure or readability of the code.' },
		{ name: 'test', description: 'It is used to describe changes to tests or tests, such as adding new tests or fixing failed tests.' },
		{ name: 'chore', description: 'It is used to describe maintenance changes, such as updating dependencies or fixing minor issues.' },
	],

	scopes: [
		{ name: 'app', description: 'Affects all the repository' },
	]
}

export const setSettings = (callback) => {
	settings = callback(settings)
	return settings
}

export const getSettings = () => {
	return settings
}
