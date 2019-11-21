module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
        },
        body: {
          type: DataTypes.STRING
        }
    }, {
        hooks: {

        }
    })
    return BlogPost
}