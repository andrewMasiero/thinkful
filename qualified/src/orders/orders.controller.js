const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

function list(req, res) {
  res.json({ data: orders });
}

function create(req, res) {
  const {
    data: { deliverTo, mobileNumber, dishes },
  } = req.body;
  const newOrder = {
    id: nextId(),
    deliverTo,
    mobileNumber,
    dishes,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function read(req, res) {
  res.json({ data: res.locals.order });
}

function update(req, res) {
  const {
    data: { deliverTo, mobileNumber, dishes },
  } = req.body;
  const updatedOrder = {
    ...res.locals.order,
    deliverTo,
    mobileNumber,
    dishes,
  };
  res.json({ data: updatedOrder });
}

function destroy(req, res) {
  const { order } = res.locals;
  const index = orders.indexOf(order);
  orders.splice(index, 1);
  res.sendStatus(204);
}

function orderExists(req, res, next) {
  const { orderId } = req.params;
  const foundOrder = orders.find((order) => order.id === orderId);
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  }
  next({ status: 404, message: `Order ${orderId} cannot be found.` });
}

function validateOrder(req, res, next) {
  const { data: { id, deliverTo, mobileNumber, status, dishes } = {} } =
    req.body;
  const { orderId } = req.params;

  if (!deliverTo || deliverTo === "") {
    return next({ status: 400, message: "Order must include a deliverTo" });
  }

  if (!mobileNumber || mobileNumber === "") {
    return next({ status: 400, message: "Order must include a mobileNumber" });
  }

  if (!dishes) {
    return next({ status: 400, message: "Order must include a dish" });
  }

  if (!Array.isArray(dishes)) {
    return next({
      status: 400,
      message: "Order must include a dish",
    });
  }

  if (dishes.length === 0) {
    return next({
      status: 400,
      message: "Order must include at least one dish",
    });
  }

  for (let index = 0; index < dishes.length; index++) {
    const dish = dishes[index];
    if (!dish.quantity) {
      return next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0`,
      });
    }
    if (dish.quantity <= 0 || !Number.isInteger(dish.quantity)) {
      return next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0`,
      });
    }
  }

  if (id && id !== orderId) {
    return next({
      status: 400,
      message: `Order id does not match route id. Order: ${id}, Route: ${orderId}`,
    });
  }

  next();
}

function validateStatus(req, res, next) {
  const { data: { status } = {} } = req.body;
  const { order } = res.locals;
  const validStatuses = [
    "pending",
    "preparing",
    "out-for-delivery",
    "delivered",
  ];
  if (!validStatuses.includes(status)) {
    return next({
      status: 400,
      message:
        "Order must have a status of pending, preparing, out-for-delivery, delivered",
    });
  }
  if (order.status === "delivered") {
    return next({
      status: 400,
      message: "A delivered order cannot be changed",
    });
  }
  next();
}

function validateStatusForDelete(req, res, next) {
  const { order } = res.locals;
  if (order.status !== "pending") {
    return next({
      status: 400,
      message: "Only pending orders can be deleted",
    });
  }
  next();
}

module.exports = {
  list,
  create: [validateOrder, create],
  read: [orderExists, read],
  update: [orderExists, validateOrder, validateStatus, update],
  delete: [orderExists, validateStatusForDelete, destroy],
  orderExists,
};
