module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        product_id: 1,
        product_code: 'ELEC001',
        product_name: 'Smartphone X',
        description: 'Latest smartphone with advanced features',
        category: 'Electronics',
        price: 599.99,
        stock_quantity: 50,
        weight: 0.2,
        release_date: new Date('2023-01-15'),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 2,
        product_code: 'ELEC002',
        product_name: 'Laptop Pro',
        description: 'High-performance laptop for professionals',
        category: 'Electronics',
        price: 1299.99,
        stock_quantity: 25,
        weight: 2.1,
        release_date: new Date('2023-02-20'),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 3,
        product_code: 'FOOD001',
        product_name: 'Organic Coffee',
        description: 'Premium organic coffee beans',
        category: 'Food',
        price: 19.99,
        stock_quantity: 100,
        weight: 0.5,
        release_date: new Date('2023-03-10'),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 4,
        product_code: 'CLTH001',
        product_name: 'Summer T-Shirt',
        description: 'Comfortable cotton t-shirt for summer',
        category: 'Clothing',
        price: 24.99,
        stock_quantity: 75,
        weight: 0.15,
        release_date: new Date('2023-04-05'),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 5,
        product_code: 'OTH001',
        product_name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness',
        category: 'Other',
        price: 39.99,
        stock_quantity: 40,
        weight: 0.8,
        release_date: new Date('2023-05-12'),
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};