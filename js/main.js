var categories = [
  {id: '1', categoryTitle: '收入', type: 'income',  icon: 'yiban', color: '#93dcb8'}, 
  {id: '2', categoryTitle: '衣服', type: 'payment', icon: 'fushi', color: '#f39f61'},
  {id: '3', categoryTitle: '饮食', type: 'payment', icon: 'canyin', color: '#fe8988'},
  {id: '4', categoryTitle: '住宿', type: 'payment', icon: 'zhufang', color: '#c6b29c'},
  {id: '5', categoryTitle: '交通', type: 'payment', icon: 'jiaotong', color: '#6fb2de'},
  {id: '6', categoryTitle: '购物', type: 'payment', icon: 'gouwu', color: '#da5a4c'},
  {id: '7', categoryTitle: '其他', type: 'payment', icon: 'qitashouru', color: '#fdc403'},
];

$().ready(function() {
  // data controller init;
  pocketData = new DataController();
  pocketData.storage = "pocketData";
  if (localStorage.getItem('pocketData') != null ) {
    var dataArray = JSON.parse(localStorage.getItem('pocketData'));
    pocketData.dataCollection('item', new DataCollection(dataArray['item']));
    pocketData.dataCollection('category', new DataCollection(dataArray['category']));
    
  } else {
    pocketData.dataCollection('item', new DataCollection({data: demoData, accumulator: demoData.length}));
    pocketData.dataCollection('category', new DataCollection({data: categories, accumulator: categories.length}));
  }
  pocketData.addJoin("item.categoryId", "category");
  
  // view controller init;
  pocketView = new View('.main-container', 'list');
  
  // router init;
  myrouter = new MyRouter('.main-container');
    
  // define actions
  myrouter.addAction('item', 'edit', {templateURL: 'partials/edit.html', controller: 'editItem'});
  myrouter.addAction('item', 'delete', {controller: 'deleteItem'});
  myrouter.addAction('item', 'save', {controller: 'saveItem'});
  myrouter.addAction('view', 'default', {controller: 'listViewController'});
  myrouter.addAction('view', 'itemList', {controller: 'listViewController'});
  myrouter.addAction('view', 'statistics', {templateURL: 'partials/statistics.html', controller: 'statisticsView'});
    
  // define controller
  myrouter.controller('testController', function(paraObject) {
    console.log(paraObject);
  });

  // edit page controller 
  myrouter.controller('editItem', function(paraObject) {
    var editForm = document.forms['edit-form'];
    var selectedCateogry = 1;

    if (paraObject != undefined && paraObject.id != undefined) {
      var editForm = document.forms['edit-form'];
      var item = pocketData.getItemById('item', paraObject.id)[0];
      editForm.elements['id'].value = item.id;
      editForm.elements['money'].value = item.money;
      editForm.elements['description'].value = item.description;

      selectedCategory = item.categoryId;
    }
    
    // generate categoriy list , maybe import a light-weight template engine;
    var categoryList = $('<div></div>').addClass('select-list categories').data('display', "#edit-form .item-category");
    var paymentOptions = pocketData.query({name:'category', filter:{type:'payment'}});
    var incomeOptions = pocketData.query({name:'category', filter:{type:'income'}});
    var listHTML = '<div class="option-group income">';
    for (var i in incomeOptions) {
      listHTML += '<div class="option category-'+ incomeOptions[i].id +'" data-category-id="'+ incomeOptions[i].id +'">';
      listHTML += '<i class="category-icon iconfont icon-'+ incomeOptions[i].icon +'"></i>' + incomeOptions[i].categoryTitle;
      listHTML += '</div>';
    }
    listHTML += '</div><div class="option-group payment">';
    for (var i in paymentOptions) {
      listHTML += '<div class="option category-'+ paymentOptions[i].id +'" data-category-id="'+ paymentOptions[i].id +'">';
      listHTML += '<i class="category-icon iconfont icon-'+ paymentOptions[i].icon +'"></i>' + paymentOptions[i].categoryTitle;
      listHTML += '</div>';
    }
    listHTML += '</div>';
    categoryList.html(listHTML).appendTo('.edit-form');
    
    $('.categories').on('click', '.option', function(e) {
      var option = $(this);
      editForm.elements['category'].value = $(this).data('categoryId');
      editForm.elements['description'].placeholder = option.text().trim();
      $(option.parents('.select-list').data('display')).html(option.find("i").clone());
    });

    $('.categories').find('.category-'+selectedCateogry).trigger('click');

    // may change to global singleton;
    $('#redirect').on('click', function(e) {
      $(this).addClass('fade');
    });

  });

  myrouter.controller('saveItem', function(paraObject) {

    $('#edit-form').submit(function(e) {
      console.log("preprocess");
      e.preventDefault();
      var form = this;
      var elements = form.elements;
      var preprocess = {};
      var operaCode = "create";
      if ( elements.id.value != "" ) {
        preprocess.id = elements.id.value;
        operaCode = "update";
      }
      preprocess.categoryId = elements.category.value;
      preprocess.description = elements.description.value;
      preprocess.money = elements.money.value;

      console.log(preprocess);  

      switch(operaCode) {
        case "create": 
          var itemId = pocketData.addItem('item',preprocess);
          break;
        case "update":
          console.log(preprocess.id);
          var itemId = pocketData.updateItem('item', preprocess.id, preprocess);
          break;
        default:;
      }

      if (itemId != undefined) {
         pocketData.record();
      }
    });

    $('#edit-form').trigger('submit');
  });

  myrouter.controller('deleteItem', function(paraObject) {
    if (paraObject != undefined && paraObject.id != undefined) {
      var deleted = pocketData.deleteItem('item', paraObject.id);
    }
    if (deleted != undefined) {
      var message = "账目："
      message += deleted[0].description ? deleted[0].description : pocketData.data.category.getValueById(deleted[0].categoryId, 'categoryTitle');
      
      message += deleted[0].money + '元， 已删除';
      alert(message);
      
      setTimeout(pocketData.record(), 3000); 
    }
  });

  myrouter.controller('listViewController', function(paraObject) {
    if (paraObject != undefined) ;
    var datas = pocketData.query({name:'item', order:{key:"id", type: "desc"}});
    var listContent = pocketView.generateListContent(datas);
    pocketView.update(listContent);
    
    //pocketView.empty().list(datas);
  });
  
  myrouter.controller('statisticsView', function(paraObject) {
    var incomeItems = pocketData.query({name: 'item', filter:{type: 'income'}});
    var paymentItems = pocketData.query({name: 'item', filter:{type: 'payment'}}); 
    var totalIncome = 0 , totalPayment =0;
    for (var i in incomeItems) {
      totalIncome += incomeItems[i].money;  
    }
    for (var i in paymentItems) {
      totalPayment += paymentItems[i].money; 
    }
    var totaSurplus = totalIncome - totalPayment;
    $('.total-income').text(totalIncome);
    $('.total-payment').text(totalPayment);
    $('.total-surplus').text(totaSurplus);
    
    var category = pocketData.query({name: 'category', order:{key:"id", type: "asc"}});
    var categoryStat = {};
    for (var key in category) {
      var items = pocketData.query({name: 'item', filter:{categoryId: category[key].id}});
      var count = 0;
      for (var i in items) {
        count += items[i].money;
      }
      categoryStat[category[key].id] = {id: category[key].id, count: count, title: category[key].categoryTitle};
    }
    
    console.log(categoryStat);
  });
});
