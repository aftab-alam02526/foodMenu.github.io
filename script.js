async function fetchFoodItems() {
  try {
    const response = await fetch(
      "https://storage.googleapis.com/acciojob-open-file-collections/appsmith-uploads/bb3807e9b0bc49958d39563eb1759406.json"
    );
    const data = await response.json();

    const foodList = document.getElementById("foodList");
    foodList.innerHTML = "";

    data.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}" width="200" />
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
      `;
      foodList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading food items:", error);
  }
}


function TakeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = [
        { name: "Cheese Burger", price: 120 },
        { name: "Veggie Burger", price: 100 },
        { name: "Chicken Burger", price: 150 },
        { name: "BBQ Burger", price: 160 },
        { name: "Bacon Burger", price: 170 },
        { name: "Paneer Tikka Burger", price: 130 },
      ];

      const selected = [];
      const used = new Set();

      while (selected.length < 3) {
        const randomIndex = Math.floor(Math.random() * burgers.length);
        if (!used.has(randomIndex)) {
          used.add(randomIndex);
          selected.push(burgers[randomIndex]);
        }
      }

      const order = {
        orderId: Math.floor(Math.random() * 10000),
        burgers: selected,
      };

      console.log("✅ Order Placed:", order);
      resolve(order);
    }, 2500);
  });
}


function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const status = { order_status: true, paid: false };
      console.log("🥣 Order Prepared:", status);
      resolve(status);
    }, 1500);
  });
}


function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const payment = { order_status: true, paid: true };
      console.log("💰 Payment Successful:", payment);
      resolve(payment);
    }, 1000);
  });
}


function thankyouFnc() {
  alert("Thank you for eating with us today!");
}


async function handleOrderFlow() {
  try {
    await fetchFoodItems();

    const order = await TakeOrder();
    const orderStatus = await orderPrep();
    const paymentStatus = await payOrder();

    if (paymentStatus.paid) {
      thankyouFnc();
    }
  } catch (error) {
    console.error("❌ Something went wrong:", error);
  }
}


handleOrderFlow();
