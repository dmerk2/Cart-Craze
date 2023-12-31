const db = require("../config/connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");
const cookies = "/images/cookie-tin.jpg";
const coffee = "/images/canned-coffee.jpg";
const toiletPaper = "/images/toilet-paper.jpg";
const soap = "/images/soap.jpg";
const woodenSpoons = "/images/wooden-spoons.jpg";
const camera = "/images/camera.jpg";
const tablet = "/images/tablet.jpg";
const bedtimeBook = "/images/bedtime-book.jpg";
const spinningTop = "/images/spinning-top.jpg";
const plasticHorses = "/images/plastic-horses.jpg";
const teddyBear = "/images/teddy-bear.jpg";
const alphabetBlocks = "/images/alphabet-blocks.jpg";

db.once("open", async () => {
  console.log("Database connected");
  await cleanDB("Category", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  const categories = await Category.insertMany([
    { name: "Food" },
    { name: "Household Supplies" },
    { name: "Electronics" },
    { name: "Books" },
    { name: "Toys" },
  ]);

  console.log("categories seeded");

  const products = await Product.insertMany([
    {
      name: "Tin of Cookies",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: cookies,
      category: categories[0]._id,
      price: 2.99,
      quantity: 500,
    },
    {
      name: "Canned Coffee",
      description:
        "Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.",
      image: coffee,
      category: categories[0]._id,
      price: 1.99,
      quantity: 500,
    },
    {
      name: "Toilet Paper",
      category: categories[1]._id,
      description:
        "Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.",
      image: toiletPaper,
      price: 7.99,
      quantity: 20,
    },
    {
      name: "Handmade Soap",
      category: categories[1]._id,
      description:
        "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
      image: soap,
      price: 3.99,
      quantity: 50,
    },
    {
      name: "Set of Wooden Spoons",
      category: categories[1]._id,
      description:
        "Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.",
      image: woodenSpoons,
      price: 14.99,
      quantity: 100,
    },
    {
      name: "Camera",
      category: categories[2]._id,
      description:
        "Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.",
      image: camera,
      price: 399.99,
      quantity: 30,
    },
    {
      name: "Tablet",
      category: categories[2]._id,
      description:
        "In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.",
      image: tablet,
      price: 199.99,
      quantity: 30,
    },
    {
      name: "Tales at Bedtime",
      category: categories[3]._id,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.",
      image: bedtimeBook,
      price: 9.99,
      quantity: 100,
    },
    {
      name: "Spinning Top",
      category: categories[4]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: spinningTop,
      price: 1.99,
      quantity: 1000,
    },
    {
      name: "Set of Plastic Horses",
      category: categories[4]._id,
      description:
        "Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.",
      image: plasticHorses,
      price: 2.99,
      quantity: 1000,
    },
    {
      name: "Teddy Bear",
      category: categories[4]._id,
      description:
        "Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.",
      image: teddyBear,
      price: 7.99,
      quantity: 100,
    },
    {
      name: "Alphabet Blocks",
      category: categories[4]._id,
      description:
        "Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.",
      image: alphabetBlocks,
      price: 9.99,
      quantity: 600,
    },
  ]);

  console.log("products seeded");

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
