import _ from 'lodash';

const a = 1;
const b = 2;

function unusedFunction() {
  console.log('This will be removed');
}

function usedFunction() {
  console.log('This will be kept');
}

usedFunction();