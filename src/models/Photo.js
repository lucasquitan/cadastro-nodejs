import Sequelize, { Model } from 'sequelize';

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validade: {
          notEmpty: {
            msg: 'O arquivo deve possuir um nome válido.',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validade: {
          notEmpty: {
            msg: 'O arquivo deve possuir um nome válido.',
          },
        },
      },

    }, {
      sequelize,
      tableName: 'avatar',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}
