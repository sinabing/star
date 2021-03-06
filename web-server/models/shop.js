import Sequelize from 'sequelize';
import {withLocation} from './index';

export default sequelize => {

  var User = sequelize.models['user'];

  var Shop = sequelize.define('shop', Object.assign(withLocation, {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }));

  sequelize.define('product', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    price: Sequelize.DECIMAL,
    shop_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Shop,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  });
}
