/* 新增道路类型 */
const RoadType = {
  MANUAL: 1,
  AUTO_NOT_CHECK: 2,
  AUTO_CHECKED: 3
};
/* 标注状态 */
const MarkStatus = {
  MARKING: 1,
  MARKED: 2
};
const ResponseType = {
  SUCCESS: 200,
  ROAD_NOT_EXIST: 20000,
  ROAD_CREATE: 20001,
  ROAD_UPDATE: 20002,
  POINT_CREATE: 30000,
  POINT_UPDATE: 30001
};
module.exports = {
  RoadType,
  MarkStatus,
  ResponseType
};