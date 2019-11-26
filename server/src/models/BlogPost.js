module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        body: {
          type: DataTypes.STRING,
          allowNull: false
        },
        imageUrl: {
          type: DataTypes.STRING
        },
        UserId: {
          type: DataTypes.INTEGER ,
          allowNull: false,
          references: {
            model: "Users",
            key: "id"
          }
        }
    })

    return BlogPost
}