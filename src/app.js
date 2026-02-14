document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Coffe Nganu", img: "1.jpg", price: 2000 },
      { id: 2, name: "Coffe Ngene", img: "2.jpg", price: 7000 },
      { id: 3, name: "Coffe Ngono", img: "3.jpg", price: 6000 },
      { id: 4, name: "Coffe Ngunu", img: "4.jpg", price: 9000 },
      { id: 5, name: "Coffe Ngopo", img: "5.jpg", price: 5000 },
    ],
    selectedItem: null,
    showModal: false,
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      const existing = this.items.find((item) => item.id === newItem.id);

      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      this.calculate();
    },

    increase(id) {
      const item = this.items.find((item) => item.id === id);
      item.quantity++;
      this.calculate();
    },

    decrease(id) {
      const item = this.items.find((item) => item.id === id);

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.remove(id);
      }

      this.calculate();
    },

    remove(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.calculate();
    },

    calculate() {
      this.total = this.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      this.quantity = this.items.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);
    },
  });
});

//konversi ke rupiah

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
