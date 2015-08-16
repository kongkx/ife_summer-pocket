var categories = [
  {
    id: '1',
    categoryTitle: '收入',
    type: 'income',
    icon: 'yiban',
    color: '#93dcb8'
  },
  {
    id: '2',
    categoryTitle: '衣服',
    type: 'payment',
    icon: 'fushi',
    color: '#f39f61'
  },
  {
    id: '3',
    categoryTitle: '饮食',
    type: 'payment',
    icon: 'canyin',
    color: '#fe8988'
  },
  {
    id: '4',
    categoryTitle: '住宿',
    type: 'payment',
    icon: 'zhufang',
    color: '#c6b29c'
  },
  {
    id: '5',
    categoryTitle: '交通',
    type: 'payment',
    icon: 'jiaotong',
    color: '#6fb2de'
  },
  {
    id: '6',
    categoryTitle: '购物',
    type: 'payment',
    icon: 'gouwu',
    color: '#da5a4c'
  },
  {
    id: '7',
    categoryTitle: '其他',
    type: 'payment',
    icon: 'qitashouru',
    color: '#fdc403'
  },
];

/**
 * 自定义时间字符处输出
 * @param {date} obj
 * @param {str} format
 * @return {str} dateStr
 */
function _customDateString(obj, format) {
  // to-be-done: some regexp need to match the format
  var tmpStr = obj.toLocaleString();
  return obj.toLocaleDateString();
}


$().ready(function () {
  pocketData = new DataController();
  myrouter = new MyRouter('.main-container');
  myBar = new MenuBar('.menu-bar');
  
  /* pocketData config */
  pocketData.storage = "pocketData";
  if (localStorage.getItem('pocketData') != null) {
    var dataArray = JSON.parse(localStorage.getItem('pocketData'));
    pocketData.dataCollection('item', new DataCollection(dataArray['item']));
    pocketData.dataCollection('category', new DataCollection(dataArray['category']));

  } else {
    pocketData.dataCollection('item', new DataCollection());
    pocketData.dataCollection('category', new DataCollection({
      data: categories,
      accumulator: categories.length
    }));
  }
  pocketData.addJoin("item.categoryId", "category");
  /* end of pocketData config */
  
  /* myBar config */
  myBar.status.default = {
    class: 'menu-bar default',
    compos: {
      left: {
        content: '<a href="#" class="sub-toggle" data-target=".secondary"><i class="iconfont icon-list"></i></a>',
        callback: function() {
          $('.sub-toggle').on('tap', function() {
            $($(this).data('target')).toggleClass('collapsed');
          })
          $($('.sub-toggle').data('target')).addClass('collapsed');
        },
      },
      right: {
        content: '<a href="#/item:edit?new"><i class="iconfont icon-bianji" style="font-size:20px;"></i></a>'
      },
      secondary: {
        content:'<a class="active" href="#/view:itemList">账目列表</a><a href="#/view:statistics">账目统计</a><a href="#/view:graph">账目图表</a>',
      }
    },
  };

  myBar.status.edit = {
    class: 'menu-bar inverse',
    compos: {
      left: {
        content: '<a href="#/view:prev" class="sub-toggle" data-target="#navigation"><i class="iconfont icon-icon11"></i></a>',
      },
      right: {
        content: '<a href="#" class="btn btn-primary" id="save" target-form="edit-form">保存</a>',  
      }
    }
  }
  /* end of myBar config */
  
  /* myrouter config */
  // define actions
  myrouter.addAction('item', 'edit', {
    templateURL: 'partials/edit.html',
    controller: 'editItem'
  });
  myrouter.addAction('item', 'delete', {
    controller: 'deleteItem'
  });
  myrouter.addAction('view', 'itemList', {
    controller: 'listView'
  });
  myrouter.addAction('view', 'statistics', {
    templateURL: 'partials/statistics.html',
    controller: 'statisticsView'
  });
  myrouter.addAction('view', 'default', {
    controller: 'defaultView'
  });
  myrouter.addAction('view', 'prev', {
    controller: 'preView'
  });
  myrouter.addAction('global', 'reset', {
    Controller: 'globalReset'
  });

  // define controllers
  myrouter.controller('testController', function (paraObject) {
    console.log(paraObject);
  });

  myrouter.controller('editItem', function (paraObject) {
    if(myBar.now != 'edit') {
      myBar.loadStatus('edit');  
    }
    
    var editForm = document.forms['edit-form'];
    var selectedCategory = 1;

    if (paraObject != undefined && paraObject.id != undefined) {
      var editForm = document.forms['edit-form'];
      var item = pocketData.getItemById('item', paraObject.id)[0];
      editForm.elements['id'].value = item.id;
      editForm.elements['money'].value = item.money;
      editForm.elements['description'].value = item.description;
      selectedCategory = item.categoryId;
    }

    // generate categoriy list 
    var categoryList = $('<div></div>').addClass('select-list categories').data('display', "#edit-form .item-category");
    var paymentOptions = pocketData.query({
      name: 'category',
      filter: {
        type: 'payment'
      }
    });
    var incomeOptions = pocketData.query({
      name: 'category',
      filter: {
        type: 'income'
      }
    });
    var listHTML = '<div class="option-group income">';
    for (var i in incomeOptions) {
      listHTML += '<div class="option category-' + incomeOptions[i].id + '" data-category-id="' + incomeOptions[i].id + '" data-category-title="'+ incomeOptions[i].categoryTitle +'">';
      listHTML += '<i class="category-icon iconfont icon-' + incomeOptions[i].icon + '"></i>'
      listHTML += '</div>';
    }
    listHTML += '</div><div class="option-group payment">';
    for (var i in paymentOptions) {
      listHTML += '<div class="option category-' + paymentOptions[i].id + '" data-category-id="' + paymentOptions[i].id + '" data-category-title="'+ paymentOptions[i].categoryTitle +'">';
      listHTML += '<i class="category-icon iconfont icon-' + paymentOptions[i].icon +'"></i>';
      listHTML += '</div>';
    }
    listHTML += '</div>';
    categoryList.html(listHTML).appendTo('.main-container');

    $('.categories').on('tap', '.option', function (e) {
      var option = $(this);
      editForm.elements['category'].value = $(this).data('categoryId');
      editForm.elements['description'].placeholder = $(this).data('categoryTitle');
      var display = $(option.parents('.select-list').data('display'));
      display[0].className = display[0].className.replace(/category-\d/,"");
      display.addClass('category-'+$(this).data('categoryId'));
      display.html(option.find("i").clone());
    });

    $('.categories').find('.category-' + selectedCategory).trigger('tap');
    
    // 初始化计算器
    var calculator = $('.calculator_wrap').calculator({display: '.item-money input'});
    
    $('input', '.item-money').on('tap', function(e) {
      e.stopPropagation();
      calculator.removeClass('collapsed');
    });
    
    $('#edit-form').submit(function (e) {
      e.preventDefault();
      var form = this;
      var elements = form.elements;
      if (elements.money.value == "") {
        return false;  
      }
      var preprocess = {};
      var operaCode = "create";
      if (elements.id.value != "") {
        preprocess.id = elements.id.value;
        operaCode = "update";
      }
      preprocess.categoryId = elements.category.value;
      preprocess.description = elements.description.value;
      preprocess.money = elements.money.value;

      switch (operaCode) {
      case "create":
        var itemId = pocketData.addItem('item', preprocess);
        break;
      case "update":
        var itemId = pocketData.updateItem('item', preprocess.id, preprocess);
        break;
      default:
        ;
      }

      if (itemId != undefined) {
        elements.id.value = itemId;
        pocketData.record();
        var lastItem = pocketData.output('item', itemId)[0];
        if (lastItem.description == "") {
          lastItem.description = lastItem.categoryTitle;  
        }
        
        var modalContent = '<div class="item category-'+ lastItem.categoryId +'">';
        modalContent += '<i class="category-icon icon-font icon-'+ lastItem.icon +'"></i>'
        modalContent += '<span class="item-description">' + lastItem.description + '</span>'
        modalContent += '<span class="item-money">'+ lastItem.money +'</span>';
        modalContent += '</div>';
        var modal = createModal();
        modal.context = modalContent;
        modal.header = "项目已保存";
        modal.footer = '<a href="#/view:itemList" class="btn btn-default">返回列表</a><a href="#/item:edit" class="btn btn-primary">再记一笔</a>'
        modal.show();
        // trigger model display;
      }
    });
    
    $('#save').on('tap', function(e) {
      e.preventDefault();
      // check calculator status and update input;
      $('#edit-form').trigger('submit');
    });
  });

  myrouter.controller('deleteItem', function (paraObject) {
    var confirmed = confirm("项目删除后不可恢复");
    if (confirmed) {
      if (paraObject != undefined && paraObject.id != undefined) {
        var deleted = pocketData.deleteItem('item', paraObject.id);
      }
      if (deleted != undefined) {
        var message = "账目："
        message += deleted[0].description ? deleted[0].description : pocketData.data.category.getValueById(deleted[0].categoryId, 'categoryTitle');

        message += deleted[0].money + '元， 已删除';
        alert(message);
        this.load("#/view:itemList");
        setTimeout(pocketData.record(), 3000);
      }
    }
  });
  
  myrouter.controller('defaultView', function() {
    myBar.loadStatus('default');
    var defaultContent = '<div class="jumbotron ">';
      defaultContent += '<p>亲，你的账本还没有账目哦。<p></p>新建一个账目试试吧</p>';
      defaultContent += '<a href="#/item:edit" class="btn btn-primary btn-lg" data-action="edit" data-id="new">新建账目</a>';
      defaultContent += '</div>';
    $('.main-container').html(defaultContent);
  });

  myrouter.controller('listView', function (paraObject) {
    myBar.loadStatus('default');  
    
    $('.main-container').empty();
    
    var data = pocketData.query({
      name: 'item',
      order: {
        key: "date",
        type: "desc"
      }
    });
    if (data.length == 0) {
      this.load("#/view:default");
    } else {
      var list = $('<div />', {class:'list'});

      htmlCode = [];
      for (var i in data) {
        itemdata = data[i];
        if (itemdata.description == "") {
          itemdata.description = itemdata.categoryTitle;  
        }
        var item = '<div class="list-item">';
        item += '<div class="item">';
        item += '<span class="item-category category-'+ itemdata.categoryId  +'"><i class="category-icon iconfont icon-'+itemdata.icon+'"></i>' + itemdata.description + '</span>';
        item += '<span class="item-money '+ itemdata.type +'">' + itemdata.money + '</span>';
        item += '<span class="item-date">' + _customDateString(new Date(parseInt(itemdata.date))) + '</span>';
        item += '</div>';
        item += '<div class="item-controls">';
        item += '<a href="#/item:edit?id=' + itemdata.id + '" class="item-edit" data-id="'+ itemdata.id +'"><i class="iconfont icon-bianji"></i></a>';
        item += '<a href="#/item:delete?id='+ itemdata.id +'" class="item-delete" data-id="' + itemdata.id + '"><i class="iconfont icon-jian"></i></a>';
        item += '</div>';
        item += '</div>';
        htmlCode.push(item);
      }

      list.html(htmlCode.join(" "))
          .on({
            'swipeLeft': function(e) {
              $item = $(this);
              $item.addClass('slide-out').siblings().removeClass('slide-out');
              $item.parent('.list').addClass('slide-out');
            }, 
            'swipeRight': function(e) {
              $item = $(this);
              if ($item.hasClass('slide-out')) {
                $item.removeClass('slide-out');
                $item.parent('.list').removeClass('slide-out');
              }
            },
            'tap': function(e) {
              console.log(e);
              $item = $(this);
              if ($item.parent('.list').hasClass('slide-out')) {
                $item.removeClass('slide-out').siblings().removeClass('slide-out');
                $item.parent(".list").removeClass('slide-out');
              }
            },
          }, '.list-item')
          .appendTo('.main-container');
    }
  });

  myrouter.controller('statisticsView', function (paraObject) {
    myBar.loadStatus('default');  
    
    var incomeItems = pocketData.query({
      name: 'item',
      filter: {
        type: 'income'
      }
    });
    var paymentItems = pocketData.query({
      name: 'item',
      filter: {
        type: 'payment'
      }
    });
    var totalIncome = 0,
      totalPayment = 0;
    for (var i in incomeItems) {
      totalIncome += Number(incomeItems[i].money);
    }
    for (var i in paymentItems) {
      totalPayment += Number(paymentItems[i].money);
    }
    var totaSurplus = totalIncome - totalPayment;
    $('.total-income').text(totalIncome);
    $('.total-payment').text(totalPayment);
    $('.total-surplus').text(totaSurplus);

    // 支出统计 数据处理
    var category = pocketData.query({
      name: 'category',
      filter: {
        type: 'payment',
      },
      order: {
        key: "id",
        type: "asc"
      }
    });
    var categoryTitle = [];
    var categoryStat = [];
    for (var key in category) {
      var items = pocketData.query({
        name: 'item',
        filter: {
          categoryId: category[key].id
        }
      });
      var count = 0;
      for (var i in items) {
        count += Number(items[i].money);
      }
      categoryTitle.push(category[key].categoryTitle);
      categoryStat.push({
        name: category[key].categoryTitle,
        value: count,
        itemStyle: {
          normal: {
            color: category[key].color
          }
        },
      });
    }

    // 收入、支出统计；
    var today = new Date();
    var thisYear = today.getFullYear();
    var thisMonth = today.getMonth();
    var monthArr = [];
    for (var i = 0; i < 5; i++) {
      var m = (thisMonth - i + 12) % 12;
      if (m > thisMonth) {
        y = thisYear - 1;
      } else {
        y = thisYear;
      }
      monthArr.push(y + '-' + (m + 1));
    }
    monthArr.reverse();

    var incomeData = [];
    var paymentData = [];
    for (var i in monthArr) {
      var tmp = pocketData.getByMonth('item', monthArr[i]);
      var incomeCount = 0;
      var paymentCount = 0;
      for (var j in tmp) {
        if (tmp[j].type == 'income') {
          incomeCount += Number(tmp[j].money);
        } else if (tmp[j].type == 'payment') {
          paymentCount += Number(tmp[j].money);
        }
      }
      incomeData.push(incomeCount);
      paymentData.push(paymentCount);
    }

    // 路径配置
    require.config({
      paths: {
        echarts: 'http://echarts.baidu.com/build/dist'
      }
    });

    require(
      [
        'echarts',
        'echarts/chart/pie', // 使用柱状图就加载bar模块，按需加载
        'echarts/chart/line'
      ],
      function (ec) {
        var paymentPercentage = ec.init(document.getElementById('payment_percentage'));
        var ppOption = {
          title: {
            text: "支出占比饼图",
            x: '20',
            y: '0',
            textStyle: {
              fontWeight: 'normal',
              color: '#444',
              fontSize: '16px',
            }
          },
          tooltip: {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: '5%',
            y: '30px',
            data: categoryTitle
          },
          series: [{
            name: '支出统计',
            type: 'pie',
            clockWise: true,
            radius: ['50', '100'],
            center: ['60%', '100'],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
              emphasis: {
                label: {
                  show: true,
                  position: 'center',
                  formatter: "{b}",
                  textStyle: {
                    fontSize: '30',
                    fontFamily: '微软雅黑',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: categoryStat,
            markPoint: {
              tooltip: {
                show: false,
              },
              symbol: 'circle',
              data: [{
                name: '测试',
                value: '456',
                x: '60%',
                y: '100'
              }],
              itemStyle: {
                normal: {
                  color: 'transparent',
                  label: {
                    show: true,
                    formatter: '{a}',
                    textStyle: {
                      fontSize: '20',
                      color: '#bbb',
                    }
                  }
                }

              },
            },
           }],
        };
        paymentPercentage.setOption(ppOption);

        var ipLine = ec.init(document.getElementById('ip_line'));
        var ipOption = {
          title: {
            text: '月收入/支出 折线图',
            x: '20',
            y: '0',
            textStyle: {
              fontWeight: 'normal',
              color: '#444',
              fontSize: '16px',
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['收入', '支出'],
            x: 'right',
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: monthArr,
        }
    ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
        }
    ],
          series: [
            {
              name: '收入',
              type: 'line',
              data: incomeData,
              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              markLine: {
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ]
              }
        },
            {
              name: '支出',
              type: 'line',
              data: paymentData,
              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: '最大值',
                  }
                ]
              },
              markLine: {
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ]
              }
        }
    ]
        };
        ipLine.setOption(ipOption);
      }
    );
  });
  
  myrouter.controller('preView', function(paraObject) {
//    var lastHash = tracker.splice(tracker.length-1)[0];
//    this.load(lastHash);
    this.load("#/view:itemList");
  });
  
  myrouter.controller('globalReset', function() {
    pocketData.reset();
    myrouter.load('#/view:defaultView');
  });
  
  // init view
  myrouter.load('#/view:itemList');
});