(function () {
  emailjs.init("6Jtniu-QWS_5efCgU");
})();

let total = 0;
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const services = document.querySelectorAll(".service-box");
const emptyMsg = document.getElementById("empty-cart-msg");

for (let i = 0; i < services.length; i++) {
  const box = services[i];
  const button = box.querySelector("button");

  button.addEventListener("click", function () {
    const serviceName = box.dataset.name;
    const servicePrice = Number(box.dataset.price);

    if (button.innerText === "Add Item") {
      addItem(serviceName, servicePrice, button);
    } else {
      removeItem(serviceName, servicePrice, button);
    }
  });
}

function updateEmptyMessage() {
  if (cartItems.children.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}

function addItem(name, price, button) {
  const li = document.createElement("li");
  li.innerText = name + " - ₹" + price;
  li.id = name;
  cartItems.appendChild(li);
  total += price;
  totalEl.innerText = total;
  button.innerText = "Remove Item";
  updateEmptyMessage(); 
}

function removeItem(name, price, button) {
  const item = document.getElementById(name);
  if (item) {
    cartItems.removeChild(item);
  }

  total -= price;
  totalEl.innerText = total;
  button.innerText = "Add Item";
  updateEmptyMessage();
}

function showBooking() {
  const section = document.getElementById("booking-section");
  section.style.display = "grid";
  section.scrollIntoView({ behavior: "smooth" });
}

function getCartItemsText() {
  let text = "";
  const items = document.querySelectorAll("#cart-items li");

  for (let i = 0; i < items.length; i++) {
    text = text + items[i].innerText + ", ";
  }

  return text;
}

document.getElementById("book-btn").addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (name === "" || email === "" || phone === "") {
    alert("Please fill all fields");
    return;
  }

  const cartText = getCartItemsText();
  const totalAmount = totalEl.innerText;

  emailjs.send("service_ie0ahms", "template_34c9olh", {
    user_name: name,
    user_email: email,
    user_phone: phone,
    cart_items: cartText,
    total_amount: totalAmount
  });
  emailjs.send("service_ie0ahms", "template_kxupwjr", {
    user_name: name,
    user_email: email,
    user_phone: phone,
    cart_items: cartText,
    total_amount: totalAmount
  }).then(function () {
    document.getElementById("success-msg").innerText =
      "Thank you for booking the service. We will get back to you soon!";
  }).catch(function (error) {
    console.log("Email error:", error);
    alert("Email not sent");
  });
});
