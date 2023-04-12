
import path from 'path'
import { existsSync } from 'fs'
import inquirer from 'inquirer'
import { exec } from 'child_process';
import { getSettings } from './settings.js';


let settings = {}
let commitData = {}

const setConfig = async () => {

	const basedir = path.dirname(new URL(import.meta.url).pathname)
	const configPath = `${basedir}/convetional_commit.config.js`

	if (!existsSync(configPath.slice(1))) {
		settings = getSettings()
		return 
	}

	settings = (await import(configPath)).default
}



const getStagedFiles = () => {
	return new Promise((resolve, reject) => {
		exec('git diff --name-only --cached', (error, stdout, stderr) => {
			if (error) {
				reject(error)
				return;
			}
			const files = stdout.split('\n').filter((file) => file !== '');
			resolve(files);
		})
	})
}

const setCommit = async () => {

	const typeOptions = (
		settings.types
		.filter(type => typeof type.name === 'string')
		.map(type => {
			if (!type.description) {
				return type.name
			}

			return `${type.name}: ${type.description}`
		})
	)

	const scopeOptions = (
		settings.scopes
		.filter(scope => typeof scope.name === 'string')
		.map(scope => {
			if (!scope.description) {
				return scope.name
			}

			return `${scope.name}: ${scope.description}`
		})
	)

	const questions = [
		{
			type: 'list',
			name: 'type',
			message: 'Select the commit type:',
			choices: typeOptions,
		},
		{
			type: 'list',
			name: 'scope',
			message: 'Select the scope:',
			choices: scopeOptions,
		},
		{
			type: 'input',
			name: 'message',
			message: 'Commit message:',
			validate: function (value) {
				if (value.length > 50) {
					return `The commit message must be less 50 characters long (${value.length})`
				}

				if (value.length === 0) {
					return `This is a required field`
				}

				return true
			},
		},
		{
			type: 'input',
			name: 'description',
			message: 'Description:'
		},
	]

	commitData = (await inquirer.prompt(questions)) || {}
}




const createCommit = async () => {

	const scope = commitData.scope.split(':')[0]
	const type = commitData.type.split(':')[0]
	const description = commitData.description ? `\n\n ${commitData.description}` : ''

	const commitMessage = `${type} (${scope}) ${commitData.message} ${description}`

	exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {

		if (error) {
			console.error(error)
			return
		}

		if (stderr) {
			console.error(stderr)
			return
		}

		console.log(`Commit succeeded with message: ${commitMessage}`)
	});
}



getStagedFiles()
.then(async (files) => {

	if (files.length === 0) {
		console.error('There is not files added to staging area')
		return
	}

	await setConfig()
	await setCommit()

	await createCommit()
})
.catch((error) => {
	console.error(error);
});

