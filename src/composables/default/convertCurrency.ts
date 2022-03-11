export function convertNumberToCurrency(number: any): string {
  const formateNumber = number.replaceAll(",", ".");
  let parseNumberFloat = parseFloat(formateNumber);

  return (
    Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(
      parseNumberFloat
    ) ?? "R$ 0,00"
  );
}
