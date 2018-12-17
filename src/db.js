let Sequelize = require('sequelize');
let Config = require('./conf');
let sequelize = new Sequelize(Config.DB_NAME, Config.DB_USER, Config.DB_PASSWORD, {
  host: Config.DB_HOST,
  port: Config.DB_PORT,
  dialect: 'mysql',
  timezone: '+08:00'
});
let Road = sequelize.define('roads', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(250),
    allowNull: false,
    comment: '道路名称'
  },
  userId: {
    type: Sequelize.STRING(250),
    allowNull: false
  },
  type: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: '标注类型 1: 手动标注、2: 自动生成未核对、3: 自动生成已核对'
  },
  status: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: '标注状态 1: 标注中、 2: 已完成'
  }
});

let RoadPoint = sequelize.define('points', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  roadId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: '道路 Id'
  },
  direction: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: '道路方向 1: 上行、 2: 下行'
  },
  longitude: {
    type: Sequelize.STRING(250),
    allowNull: false,
    comment: '点: 经度'
  },
  latitude: {
    type: Sequelize.STRING(250),
    allowNull: false,
    comment: '点: 纬度'
  },
  type: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: '点类型 1: 起点、2: 中间、3: 终点'
  },
  count: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: '点所在侧道路的车道数'
  },
  reverseCount: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    comment: '点所在侧对面道路的车道数'
  },
  crossType: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true,
    comment: '路口类型, 只有起点、终点时填入: 1: 丁字路口、2: 三岔路口 、3: 四岔路口（十字路口）、4: 五岔路口 、5: 六岔路口'
  },
  crossInfo: {
    type: Sequelize.STRING(250),
    allowNull: true,
    comment: '相邻路口名称组合, 中间点时传入'
  },
  wheelType: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true,
    comment: '补充点类型 1: 左转、2: 左转补充、3: 右转'
  },
  reverseLng: {
    type: Sequelize.STRING(250),
    allowNull: true,
    comment: '对面点: 经度'
  },
  reverseLat: {
    type: Sequelize.STRING(250),
    allowNull: true,
    comment: '对面点: 经度'
  }
});

RoadPoint.belongsTo(Road, {
  foreignKey: 'roadId',
  constraints: false
});
module.exports = {
  sequelize, Road, RoadPoint
};
