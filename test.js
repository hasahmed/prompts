// const prompts = require('.');
// const Listr = require('listr');
// const delay = require('delay');
// const execa = require('execa');
//
// const inquirer = require('inquirer');
// const {Subject} = require('rxjs');

// const add = {
//   type: 'toggle',
//   name: 'value',
//   message: 'Can you confirm?',
//   initial: false,
//   active: 'Quit',
//   inactive: 'Continue',
// 	// onState: (...args) => console.log('onState', ...args),
// }

// const questions = [{
//     type: () => 'select',
//     name: 'value2',
//     message: 'Pick a color',
// 		// onState: (...args) => console.log('onState', ...args),
//     choices: [
//         { title: 'Red', value: 'red', disabled: false },
//         { title: 'Green', value: 'green', disabled: false },
//         { title: 'Blue', value: 'blue', disabled: true },
//         { title: 'Purple', value: 'purple', disabled: true }
//     ],
//     initial: 3,
// },
// ]
//
// const tasks1 = () => new Listr([{
// 		title: 'Run task 1',
// 		task: async () => {
//       await delay(1000);
//       return 'aaaa'
//     }
// 	}, {
//   		title: 'Run task 2',
//       task: async () => {
//         await delay(1000);
//         return execa.stdout('echo', ['bbb'])
//       }
//   	}])
//
//   const tasks2 = new Listr([{
//   		title: 'Run task 2',
//   		task: () => delay(1000).then(() => console.log('bbbb'))
//   	}])
//
const prompts = require('.');
const delay = require('delay');

const questions = [{
    type: 'number',
    name: 'price',
    message: 'Guess the price',
    format: val => Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(val)
}];
const answers = [];

const ask = async questions => prompts(questions, {
   onSubmit: async (prompt, response) => {
    if (prompt.name === 'price' && !(await checkPriceOnServer(response))) {
      console.log('You guessed wrong...try again!');
      answers.push(await ask(questions));
      return;
    }
    console.log('You guessed right!');
  },
    onCancel: async prompt => {
      if (prompt.name === 'price') {
        console.log('Don\'t stop prompting until you guess right...');
        answers.push(await ask(questions));
        return true;
      }
    }
})

async function checkPriceOnServer(price) {
  return delay(1000).then(() => price === '$10.00');
}

module.exports = async () => {
  await ask(questions);
  return Object.assign(...answers.reverse());
};

prompts.inject({ price: [5, new Error('Hit Ctrl+C'), 10] });
module.exports().then(console.log)
// tasks1().run().then(() => call(questions).then(console.log)).catch(err => {
// 	console.error(err);
// });

// console.log(response); // => { value: 24 }

// const q1 = {
//     type: 'input',
//     name: 'quantity',
//     message: 'How many do you need?',
//     validate: function(value) {
//       var valid = !isNaN(parseFloat(value));
//       return valid || 'Please enter a number';
//     },
//     filter: Number
//   };
//
// const q2 = {
//     type: 'list',
//     name: 'size',
//     message: 'What size do you need?',
//     choices: ['Large', 'Medium', 'Small'],
//     filter: function(val) {
//       return val.toLowerCase();
//     }
//   };
//
// // var ui = new inquirer.ui.BottomBar();
//
// const prompts = new Subject();
// const prompt = inquirer.prompt(prompts);
// prompt.ui.process.subscribe(async ({ name, answer }) => {
//   // console.log('onEachAnswer', { name, answer });
//   // ui.log.write('Almost over, standby!\n');
//   if (name === 'size') {
//     prompts.complete();
//   } else {
//     if (answer !== 2) {
//       await tasks1().run()
//       prompts.next(q1);
//     } else {
//       await tasks1().run()
//       // ui.updateBottomBar('bottom bar: ' + name);
//       prompts.next(q2);
//     }
//   }
// }, (...args) => {
//   // console.log('onError', ...args)
// }, (...args) => {
//   // console.log('onComplete', ...args)
// })
//
// prompts.next(q1);
// prompt.then(() => {})
// // ui.log.write('something just happened.');
// // ui.log.write('Almost over, standby!');
// // ui.updateBottomBar('new bottom bar content');
