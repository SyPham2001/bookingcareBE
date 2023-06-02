"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("handbooks", {
      // name: DataTypes.STRING,
      // address: DataTypes.STRING,
      // descriptionHTML: DataTypes.TEXT,
      // descriptionMarkdown: DataTypes.TEXT,
      // image: DataTypes.TEXT,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
      },

      image: {
        type: Sequelize.BLOB("long"),
      },
      descriptionHTML: {
        type: Sequelize.TEXT,
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("handbooks");
  },
};
