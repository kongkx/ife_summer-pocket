var demoData = [
  {id: '1', categoryId: '1', money: 12345, date: '2015-07-21', description: '个人月收入'},
  {id: '2', categoryId: '2', money: 1235, date: '2015-07-21', description: '出差车费'},
  {id: '3', categoryId: '3', money: 1345, date: '2015-07-22', description: '淘宝购物'},
  {id: '4', categoryId: '4', money: 2345, date: '2015-07-22', description: '酒店套房'},
];

var categories = [
  {id: '1', categoryName: 'income', categoryTitle: '收入', type: 'income'},  // custom hexcode and icon maybe.
  {id: '2', categoryName: 'clothes', categoryTitle: '衣服', type: 'payment'},
  {id: '3', categoryName: 'eating', categoryTitle: '饮食', type: 'payment'},
  {id: '4', categoryName: 'house', categoryTitle: '住宿', type: 'payment'},
  {id: '5', categoryName: 'transport', categoryTitle: '交通', type: 'payment'},
  {id: '6', categoryName: 'shopping', categoryTitle: '购物', type: 'payment'},
  {id: '7', categoryName: 'others', categoryTitle: '其他', type: 'payment'},
];

$().ready(function() {
  // data controller init;
  pocketData = new DataController();
  if (localStorage.getItem('pocketData') != null ) {
    var dataArray = JSON.parse(localStorage.getItem('pocketData'));
    pocketData.dataCollection('item', new DataCollection(dataArray['item']));
    pocketData.dataCollection('category', new DataCollection(dataArray['category']));
    
  } else {
    pocketData.dataCollection('item', new DataCollection({data: demoData, accumulator: demoData.length}));
    pocketData.dataCollection('category', new DataCollection({data: categories, accumulator: categories.length}));
  }
  
});
