export function convertNumToText(num: number | string): string {
  if (typeof num !== 'string') num = num.toString();

  const numArr = num.split('');
  const strArr = numArr.map((num, i) => {
    switch (num) {
      case '1':
        return 'one';
      case '2':
        return 'two';
      case '3':
        return 'three';
      case '4':
        return 'four';
      case '5':
        return 'five';
      case '6':
        return 'six';
      case '7':
        return 'seven';
      case '8':
        return 'eight';
      case '9':
        return 'nine';
      case '0':
        return 'zero';
      default:
        return '';
    }
  });
  return strArr.join(' ');
}
