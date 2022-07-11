exports.eNumero = function (input) {
  return typeof input === "number";
}

exports.ePositivo = function (numero) {
  return numero > 0;
}

exports.eString = function (input) {
  return typeof input === "string";
}

exports.naoVazia = function (string) {
  return string !== "";
}

exports.eData = function (data) {
  // to-do
  return true;
}