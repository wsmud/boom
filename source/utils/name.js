import word from './word.json' assert { type: 'json' };

export default function getName() {
  let name = ''
  for (let i = 0; i < 5; i++) {
    name += word[Math.floor(Math.random() * word.length)]
  }
  return name;
}
