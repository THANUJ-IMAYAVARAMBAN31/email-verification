(function () {
  emailjs.init("6Jtniu-QWS_5efCgU");
})();

let total = 0;
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

document.querySelectorAll(".service-box").forEach(box => {
  const btn = box.querySelector("button");

  btn.addEventListener("click", () => {
    const name = box.dataset.name;
    const price = Number(box.dataset.price);

    if (btn.classList.contains("remove")) {
      removeItem(name, price, btn);
    } else {
      addItem(name, price, btn);
    }
  });
});

function addItem(name, price, btn) {
  const li = document.createElement("li");
  li.textContent = `${name} - ₹${price}`;
  li.id = name;
  cartItems.appendChild(li);

  total += price;
  totalEl.textContent = total;

  btn.textContent = "Remove Item";
  btn.classList.add("remove");
}

function removeItem(name, price, btn) {
  const item = document.getElementById(name);
  if (item) cartItems.removeChild(item);

  total -= price;
  totalEl.textContent = total;

  btn.textContent = "Add Item";
  btn.classList.remove("remove");
}

function showBooking() {
  const booking = document.getElementById("booking-section");
  booking.style.display = "grid";
  booking.scrollIntoView({ behavior: "smooth" });
}
function getCartItemsText() {
  const items = [];
  document.querySelectorAll("#cart-items li").forEach(li => {
    items.push(li.textContent);
  });
  return items.join(", ");
}

document.getElementById("book-btn").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all fields");
    return;
  }

  const totalAmount = document.getElementById("total").innerText;
  const cartItemsText = getCartItemsText();

  emailjs.send("service_ie0ahms", "template_34c9olh", {
    user_name: name,
    user_email: email,
    user_phone: phone,
    total_amount: totalAmount,
    cart_items: cartItemsText
  });

  emailjs.send("service_ie0ahms", "template_kxupwjr", {
    user_name: name,
    user_email: email,
    user_phone: phone,
    total_amount: totalAmount,
    cart_items: cartItemsText
  })
  .then(() => {
    document.getElementById("success-msg").innerText =
      "Thank you for booking the service. We will get back to you soon!";
  })
  .catch((error) => {
    console.error("Email failed:", error);
    alert("Email not sent. Check console.");
  });
});

