export default function Media(arrayOfObject, value, length) {
  let soma = 0;

  arrayOfObject.forEach((element) => {
    soma += element[value];
  });

  return (soma / length).toFixed(2);
}
