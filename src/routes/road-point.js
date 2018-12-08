let express = require('express');
let router = express.Router();
let { Road, RoadPoint, sequelize } = require('../db');
let { APIResult } = require('../utils');
let { ResponseType } = require('../enum');
/* 道路下新增点 */
router.post('/create', function (req, res, next) {
  let { body: { roadId, direction,
    longitude, latitude, type, count,
    reverseCount, crossType, crossInfo } } = req;

  return sequelize.transaction(function (t) {
    return RoadPoint.findOne({
      where: {
        roadId,
        longitude,
        latitude
      }
    }).then(point => {
      if (point) {
        return res.send(new APIResult(ResponseType.SUCCESS, point));
      }
      return Road.findOne({
        where: {
          id: roadId
        }
      }).then(road => {
        if (!road) {
          return res.send(new APIResult(ResponseType.ROAD_NOT_EXIST, null, '道路信息不存在'))
        }
        RoadPoint.create({
          roadId,
          direction,
          longitude,
          latitude,
          type,
          count,
          reverseCount,
          crossType,
          crossInfo
        }, { transaction: t }).then(point => {
          return res.send(new APIResult(ResponseType.SUCCESS, point));
        }, error => {
          return res.send(new APIResult(ResponseType.POINT_CREATE, null, error));
        });
      })
    });
  }).catch(next);
});
/* 删除道路下的点 */
router.post('/remove', function (req, res, next) {
  let { body: { id } } = req;
  return sequelize.transaction(() => {
    return sequelize.query('DELETE FROM points WHERE id = ' + id, {
      model: RoadPoint,
      type: sequelize.QueryTypes.DELETE
    });
  }).then(() => {
    return res.send(new APIResult(ResponseType.SUCCESS));
  }, error => {
    return res.send(new APIResult(ResponseType.POINT_UPDATE, null, error));
  }).catch(next);
});
/* 道路下更新点 */
router.post('/edit', function (req, res, next) {
  let { body: { id, direction,
    longitude, latitude, type, count,
    reverseCount, crossType, crossInfo } } = req;
  return RoadPoint.update({
    direction,
    longitude,
    latitude,
    type,
    count,
    reverseCount,
    crossType,
    crossInfo
  }, {
      where: {
        id
      }
    }).then(() => {
      return res.send(new APIResult(ResponseType.SUCCESS));
    }, error => {
      return res.send(new APIResult(ResponseType.POINT_UPDATE, null, error));
    }).catch(next);
});
/* 查询单个点信息 */
router.get('/:id', function (req, res, next) {
  let { params: { id } } = req;
  return RoadPoint.findOne({
    where: {
      id
    }
  }).then(point => {
    point = point || {};
    return res.send(new APIResult(ResponseType.SUCCESS, point));
  }).catch(next);
});
/*查询道路下所有点*/
router.get('/:roadId/findAll', function (req, res, next) {
  let { params: { roadId } } = req;
  return RoadPoint.findAll({
    where: {
      roadId
    }
  }).then(points => {
    return res.send(new APIResult(ResponseType.SUCCESS, points));
  }).catch(next);
});
module.exports = router;