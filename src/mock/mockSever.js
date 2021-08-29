// 使用mockjs提供mock数据接口
import Mock from 'mockjs'
import data from './data.json'
// 返回 goods的接口
Mock.mock('/goods',{code:0,data:data.goods})
// 返回ratings的接口
Mock.mock('/rating',{code:0,data:data.ratings})
// 返回Info的接口
Mock.mock('/info',{code:0,data:data.info})
// export default ???不需要向外暴露任何数据，只需要保存执行就可以了