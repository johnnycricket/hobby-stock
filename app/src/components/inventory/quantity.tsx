export function Quantity({ quantity, minQuantity }: Quantity.Props) {
  return (
    <div className="flex items-center">
      <p>
        In stock:{quantity}
        <br /> Minimum: {minQuantity}
      </p>
    </div>
  );
}

export namespace Quantity {
  export type Props = {
    quantity: number;
    minQuantity: number;
  };
}
