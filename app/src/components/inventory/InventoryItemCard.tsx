import { Trash2, Pencil } from "lucide-react";
import { Quantity } from "./quantity";
import { Item } from "@/types/Item";
export function InventoryItemCard({
  item,
  onEdit,
  onDelete,
}: InventoryItemCard.Props) {
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <div className="flex gap-2">
          <button onClick={() => onEdit(item.id.toString())} aria-label="Edit">
            <Pencil />
          </button>
          <button
            onClick={() => onDelete(item.id.toString())}
            aria-label="Delete"
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-600">{item.description}</p>
        <Quantity
          quantity={item.quantity}
          minQuantity={item.minQuantity || 0}
        />
      </div>
    </div>
  );
}

export namespace InventoryItemCard {
  export type Props = {
    item: Item;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  };
}
