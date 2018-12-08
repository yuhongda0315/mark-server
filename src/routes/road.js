let { Road, RoadPoint, sequelize } = require('../db');
let express = require('express');
let router = express.Router();
let { RoadType, MarkStatus, ResponseType } = require('../enum');
let { APIResult } = require('../utils');
/*新增道路信息*/
router.post('/create', function (req, res, next) {
  let { body: { name, userId } } = req;
  let type = RoadType.MANUAL;
  let status = MarkStatus.MARKING;
  return sequelize.transaction(function (t) {
    return Road.findOne({ 
      where: {
        name,
        userId
      }
    }).then(road => {
      if (road) {
        return res.send(new APIResult(200, road));
      }
      Road.create({
        name,
        userId,
        type,
        status
      }, { transaction: t }).then(road => {
        return res.send(new APIResult(ResponseType.SUCCESS, road));
      }, error => {
        return res.send(new APIResult(ResponseType.ROAD_CREATE, null, error));
      });
    });
  }).catch(next);
});
/*更新道路信息*/
router.post('/edit', function (req, res, next) {
  let { body: { id, status } } = req;
  return Road.update({
    status
  }, {
    where: {
      id
    }
  }).then(() => {
    return res.send(new APIResult(ResponseType.SUCCESS));
  }, error => {
    return res.send(new APIResult(ResponseType.ROAD_UPDATE, null, error));
  }).catch(next);
});
router.post('/findAll', function (req, res, next) {
  let { body: { userId } } = req;
  let sql = 'select * from roads t1 left join points t2 on t1.id = t2.roadId where t1.userId = "' + userId + '"';
  return sequelize.query(sql, {
    model: RoadPoint,
    type: sequelize.QueryTypes.QUERY
  }).then((roads) => {
    return res.send(new APIResult(ResponseType.SUCCESS, roads));
  }, error => {
    console.log(error);
    return res.send(new APIResult(ResponseType.ROAD_UPDATE, null, error));
  }).catch(next);
});
module.exports = router;