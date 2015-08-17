var demoData = [
  {id: '1', categoryId: '1', money: 12345, date: '2015-07-21', description: '个人月收入'},
  {id: '2', categoryId: '2', money: 1235, date: '2015-07-21', description: '出差车费'},
  {id: '3', categoryId: '3', money: 1345, date: '2015-07-22', description: '淘宝购物'},
  {id: '4', categoryId: '4', money: 2345, date: '2015-07-22', description: '酒店套房'},
];

$().ready(function() {
  
  pocketController = new DataController(JSON.parse(localStorage.getItem('pocketData')),"pocketData");
  
});
