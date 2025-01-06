"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Places",
      [
        {
          id: "9e555bd6-0f36-454a-a3d5-89edef4ff9d4",
          name: "Looking for it",
          images: [
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877715/e-commerce/cx03adwvxevuvxxeewyv.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877717/e-commerce/r7h5yvc5nbdtjt5yqoua.jpg",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877719/e-commerce/pegxb75y2c7x6rwtmrho.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877721/e-commerce/biqpzdojtmbv0z55bhew.png",
          ],
          title: "0",
          description: "390",
          providerId: "7321d946-7265-45a1-9ce3-3da1789e657e",
          categoryId: "8efe453c-b779-453c-b96e-afe656eeebab",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: "9e555bd6-0f36-454a-a3d5-89edef4ff9d1",
          name: "Expecting",
          images: [
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877715/e-commerce/cx03adwvxevuvxxeewyv.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877717/e-commerce/r7h5yvc5nbdtjt5yqoua.jpg",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877719/e-commerce/pegxb75y2c7x6rwtmrho.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877721/e-commerce/biqpzdojtmbv0z55bhew.png",
          ],
          title: "0",
          description: "290",
          providerId: "7321d946-7265-45a1-9ce3-3da1789e657e",
          categoryId: "8efe453c-b779-453c-b96e-afe656eeebab",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9e555bd6-0f36-454a-a3d5-89edef4ff9d2",
          name: "Managing",
          images: [
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877715/e-commerce/cx03adwvxevuvxxeewyv.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877717/e-commerce/r7h5yvc5nbdtjt5yqoua.jpg",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877719/e-commerce/pegxb75y2c7x6rwtmrho.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877721/e-commerce/biqpzdojtmbv0z55bhew.png",
          ],
          title: "4",
          description: "190",
          providerId: "7321d946-7265-45a1-9ce3-3da1789e657e",
          categoryId: "8efe453c-b779-453c-b96e-afe656eeebab",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9e555bd6-0f36-454a-a3d5-89edef4ff9d3",
          name: "Request",
          images: [
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877715/e-commerce/cx03adwvxevuvxxeewyv.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877717/e-commerce/r7h5yvc5nbdtjt5yqoua.jpg",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877719/e-commerce/pegxb75y2c7x6rwtmrho.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877721/e-commerce/biqpzdojtmbv0z55bhew.png",
          ],
          title: "0",
          description: "321",
          providerId: "7321d946-7265-45a1-9ce3-3da1789e657e",
          categoryId: "8efe453c-b779-453c-b96e-afe656eeebab",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9e555bd6-0f36-454a-a3d5-89edef4ff9d6",
          name: "For success",
          images: [
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877715/e-commerce/cx03adwvxevuvxxeewyv.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877717/e-commerce/r7h5yvc5nbdtjt5yqoua.jpg",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877719/e-commerce/pegxb75y2c7x6rwtmrho.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877721/e-commerce/biqpzdojtmbv0z55bhew.png",
          ],
          title: "0",
          description: "197",
          providerId: "7321d946-7265-45a1-9ce3-3da1789e657e",
          categoryId: "8efe453c-b779-453c-b96e-afe656eeebab",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9e555bd6-0f36-454a-a3d5-89edef4ff9d5",
          name: "For real",
          images: [
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877715/e-commerce/cx03adwvxevuvxxeewyv.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877717/e-commerce/r7h5yvc5nbdtjt5yqoua.jpg",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877719/e-commerce/pegxb75y2c7x6rwtmrho.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877721/e-commerce/biqpzdojtmbv0z55bhew.png",
          ],
          title: "8",
          description: "141",
          providerId: "7321d946-7265-45a1-9ce3-3da1789e657e",
          categoryId: "8efe453c-b779-453c-b96e-afe656eeebab",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "6f15bcc9-033b-4304-9486-09598705a44f",
          name: "Marbud",
          images: [
            "https://res.cloudinary.com/djtigqist/image/upload/v1716029247/dcd5qw0v2jnleqyx9w4o.jpg",
            "https://res.cloudinary.com/djtigqist/image/upload/v1716029276/y2uxerb8enj4jtlwxybm.jpg",
            "https://res.cloudinary.com/djtigqist/image/upload/v1716029278/jllqyejhf6dkhl9d8pgm.jpg",
          ],
          title: "0",
          description: "17",
          categoryId: "8efe453c-b779-453c-b96e-afe656eeebab",
          providerId: "7321d946-7265-45a1-9ce3-3da1789e657e",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e6b5aa43-9c74-478a-8a49-09146821d014",
          name: "Sun shine",
          images: [
            "https://res.cloudinary.com/djtigqist/image/upload/v1716030176/mws8zetkdhbluydjzenk.jpg",
            "https://res.cloudinary.com/djtigqist/image/upload/v1716030396/ewykpcrenh0qe0qkzlm4.jpg",
            "https://res.cloudinary.com/djtigqist/image/upload/v1716030398/serl9xjwig3px8mkkh0t.jpg",
          ],
          title: "5",
          description: "21",
          categoryId: "8efe453c-b779-453c-b96e-afe656eeebab",
          providerId: "7321d946-7265-45a1-9ce3-3da1789e657e",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a3b9c1e2-8f47-4d3b-b1e1-6f9c8bcb3f34",
          name: "Tight",
          images: [
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877715/e-commerce/cx03adwvxevuvxxeewyv.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877717/e-commerce/r7h5yvc5nbdtjt5yqoua.jpg",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877719/e-commerce/pegxb75y2c7x6rwtmrho.png",
            "https://res.cloudinary.com/dzbxg4xeq/image/upload/v1713877721/e-commerce/biqpzdojtmbv0z55bhew.png",
          ],
          title: "t",
          description: "141",
          providerId: "1001d946-7265-45a1-9ce3-3da1789e100a",
          categoryId: "8efe453c-b779-453c-b96e-afe656eeebab",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Places", null, {});
  },
};
