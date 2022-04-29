/* eslint-disable no-unused-vars */

/*
 * @Descripttion:
 * @version:
 * @Author: JiaLe
 * @Date: 2021-10-13 15:25:56
 * @LastEditors: JiaLe
 * @LastEditTime: 2021-12-01 13:44:23
 */
const enmus = {
  taskStatus: [
    { code: '', name: '全部' },
    { code: '1', name: '成功' },
    { code: '-1', name: '失败' },
    { code: '0', name: '待执行' }
  ],
  uploadStatus: [
    { code: '', name: '全部' },
    { code: '1', name: '已上传' },
    { code: '0', name: '待上传' }
  ],
  aiTypes: [
    { code: '', name: '全部' },
    { code: '0', name: '无' },
    { code: '1', name: '清点' },
    { code: '2', name: '姿态分析' },
    { code: '3', name: '清点和姿态分析' },
    { code: '4', name: '人脸1比1' },
    { code: '5', name: '人脸1比N' },
    { code: '6', name: '人脸N比N' }
  ],
  aiStatus: [
    { code: '', name: '全部' },
    { code: '0', name: '待分析' },
    { code: '2', name: '待其他分析' },
    { code: '1', name: '完成' },
    { code: '-1', name: '失败' }
  ],
  executeStatus: [
    { code: '', name: '全部' },
    { code: '1', name: '已下发' },
    { code: '0', name: '待下发' },
    { code: '-1', name: '下发失败' }
  ],
  alarmTypes: [
    { code: '', name: '全部' },
    { code: '1', name: '区域入侵' },
    { code: '2', name: '人脸' }
  ],
  onLineStatus: [
    { code: '', name: '全部' },
    { code: '1', name: '在线' },
    { code: '0', name: '离线' }
  ],
  classBehaviorTypes: [
    { code: '', name: '全部' },
    { code: '1', name: '学生-自习' },
    { code: '2', name: '学生-听讲' },
    { code: '3', name: '学生-多人起立' },
    { code: '4', name: '学生-展示' },
    { code: '5', name: '学生-单人起立' },
    { code: '6', name: '学生-发言' },
    { code: '7', name: '学生-讲话' },
    { code: '8', name: '教师-授课' },
    { code: '9', name: '教师-讲授' },
    { code: '10', name: '教师-巡视' },
    { code: '11', name: '教师-板书' },
    { code: '12', name: '教师-多媒体' }
  ],
  faceStatus: [
    { code: '', name: '全部' },
    { code: '0', name: '待分析' },
    { code: '1', name: '成功' },
    { code: '-1', name: '失败' }
  ]
};
const Id =
  '' |
  'taskStatus' | //任务状态
  'uploadStatus' | //上传状态
  'aiTypes' | //AI计算类型
  'aiStatus' | //A分析状态
  'executeStatus' | //执行状态
  'alarmTypes' | //报警类型
  'classBehaviorTypes' | //课堂行为分析类型
  'faceStatus' | //人脸状态
  'onLineStatus'; //在线状态
//根据ID查询枚举字典
export function getEumnsById(id = '') {
  return Promise.resolve({
    code: 200,
    data: { [id.trim()]: enmus[id.trim()] },
    msg: null,
    success: true
  });
}

//批量字典查询方法
export function cacheAllPromise(promiseList = []) {
  let dic = Promise.allSettled(promiseList).then((results) => {
    let collectRes = {};
    results.forEach((res) => {
      collectRes = {
        ...collectRes,
        ...res.value.data
      };
    });
    return collectRes;
  });
  return dic;
}
