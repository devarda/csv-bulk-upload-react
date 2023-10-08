const { create } = require("zustand");

const PurchaseOrdersStore = create((set) => ({
  purchaseOrders: [],
  setPurchaseOrders: (purchaseOrders) => set({ purchaseOrders }),
  addPurchaseOrders: (newOrders) =>
    set((state) => ({
      purchaseOrders: [...state.purchaseOrders, ...newOrders],
    })),
  addPurchaseOrder: (purchaseOrder) =>
    set((state) => ({
      purchaseOrders: [...state.purchaseOrders, purchaseOrder],
    })),
}));

export default PurchaseOrdersStore;
