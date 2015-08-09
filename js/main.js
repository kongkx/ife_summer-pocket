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

// getScript function
;
(function ($) {
  $.getScript = function (src, func) {
    var script = document.createElement('script');
    script.async = "async";
    script.src = src;
    if (func) {
      script.onload = func;
    }
    document.getElementsByTagName("head")[0].appendChild(script);
  }
})($)



$().ready(function () {
  // data controller init;
  pocketData = new DataController();
  pocketData.storage = "pocketData";
  if (localStorage.getItem('pocketData') != null) {
    var dataArray = JSON.parse(localStorage.getItem('pocketData'));
    pocketData.dataCollection('item', new DataCollection(dataArray['item']));
    pocketData.dataCollection('category', new DataCollection(dataArray['category']));

  } else {
    pocketData.dataCollection('item', new DataCollection({
      data: demoData,
      accumulator: demoData.length
    }));
    pocketData.dataCollection('category', new DataCollection({
      data: categories,
      accumulator: categories.length
    }));
  }
  pocketData.addJoin("item.categoryId", "category");

  // router init;
  myrouter = new MyRouter('.main-container');

  // define actions
  myrouter.addAction('item', 'edit', {
    templateURL: 'partials/edit.html',
    controller: 'editItem'
  });
  myrouter.addAction('item', 'delete', {
    controller: 'deleteItem'
  });
  myrouter.addAction('item', 'save', {
    controller: 'saveItem'
  });
  myrouter.addAction('view', 'default', {
    controller: 'listViewController'
  });
  myrouter.addAction('view', 'itemList', {
    controller: 'listViewController'
  });
  myrouter.addAction('view', 'statistics', {
    templateURL: 'partials/statistics.html',
    controller: 'statisticsView'
  });

  // define controller
  myrouter.controller('testController', function (paraObject) {
    console.log(paraObject);
  });

  // edit page controller 
  myrouter.controller('editItem', function (paraObject) {
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
      listHTML += '<div class="option category-' + incomeOptions[i].id + '" data-category-id="' + incomeOptions[i].id + '">';
      listHTML += '<i class="category-icon iconfont icon-' + incomeOptions[i].icon + '"></i>' + incomeOptions[i].categoryTitle;
      listHTML += '</div>';
    }
    listHTML += '</div><div class="option-group payment">';
    for (var i in paymentOptions) {
      listHTML += '<div class="option category-' + paymentOptions[i].id + '" data-category-id="' + paymentOptions[i].id + '">';
      listHTML += '<i class="category-icon iconfont icon-' + paymentOptions[i].icon + '"></i>' + paymentOptions[i].categoryTitle;
      listHTML += '</div>';
    }
    listHTML += '</div>';
    categoryList.html(listHTML).appendTo('.edit-form');

    $('.categories').on('click', '.option', function (e) {
      var option = $(this);
      editForm.elements['category'].value = $(this).data('categoryId');
      editForm.elements['description'].placeholder = option.text().trim();
      var display = $(option.parents('.select-list').data('display'));
      display[0].className = display[0].className.replace(/category-\d/,"");
      display.addClass('category-'+$(this).data('categoryId'));
      display.html(option.find("i").clone());
    });

    $('.categories').find('.category-' + selectedCateogry).trigger('click');

    // may change to global singleton;
    $('#redirect').on('click', function (e) {
      $(this).addClass('fade');
    });

  });

  myrouter.controller('saveItem', function (paraObject) {

    $('#edit-form').submit(function (e) {
      console.log("preprocess");
      e.preventDefault();
      var form = this;
      var elements = form.elements;
      var preprocess = {};
      var operaCode = "create";
      if (elements.id.value != "") {
        preprocess.id = elements.id.value;
        operaCode = "update";
      }
      preprocess.categoryId = elements.category.value;
      preprocess.description = elements.description.value;
      preprocess.money = elements.money.value;

      console.log(preprocess);

      switch (operaCode) {
      case "create":
        var itemId = pocketData.addItem('item', preprocess);
        break;
      case "update":
        console.log(preprocess.id);
        var itemId = pocketData.updateItem('item', preprocess.id, preprocess);
        break;
      default:
        ;
      }

      if (itemId != undefined) {
        pocketData.record();
      }
    });

    $('#edit-form').trigger('submit');
  });

  myrouter.controller('deleteItem', function (paraObject) {
    if (paraObject != undefined && paraObject.id != undefined) {
      var deleted = pocketData.deleteItem('item', paraObject.id);
    }
    if (deleted != undefined) {
      var message = "账目："
      message += deleted[0].description ? deleted[0].description : pocketData.data.category.getValueById(deleted[0].categoryId, 'categoryTitle');

      message += deleted[0].money + '元， 已删除';
      alert(message);
      this.load("#/view:default");
      setTimeout(pocketData.record(), 3000);
    }
  });

  myrouter.controller('listViewController', function (paraObject) {
    $('.main-container').empty();
    if (paraObject != undefined);
    var data = pocketData.query({
      name: 'item',
      order: {
        key: "id",
        type: "desc"
      }
    });
    
    var list = $('<div />', {class:'list'});
    
    htmlCode = [];
    for (var i in data) {
      itemdata = data[i];
      var item = '<div class="list-item">';
      item += '<div class="item">';
      item += '<span class="item-category category-'+ itemdata.categoryId  +'"><i class="category-icon iconfont icon-'+itemdata.icon+'"></i>' + itemdata.categoryTitle + '</span>';
      item += '<span class="item-money '+ itemdata.type +'">' + itemdata.money + '</span>';
      console.log(itemdata.date);
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
          'click': function(e) {
            $item = $(this);
            if ($item.parent('.list').hasClass('slide-out')) {
              $item.removeClass('slide-out').siblings().removeClass('slide-out');
              $item.parent(".list").removeClass('slide-out');
            }
          },
        }, '.list-item')
        .appendTo('.main-container');
    
  });

  myrouter.controller('statisticsView', function (paraObject) {
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
      totalIncome += incomeItems[i].money;
    }
    for (var i in paymentItems) {
      totalPayment += paymentItems[i].money;
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
        count += items[i].money;
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
          incomeCount += tmp[j].money;
        } else if (tmp[j].type == 'payment') {
          paymentCount += tmp[j].money;
        }
      }
      incomeData.push(incomeCount);
      paymentData.push(paymentCount);
    }

    // import Echarts.js
    //    $.getScript("http://echarts.baidu.com/build/dist/echarts.js");

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

      });

  });
});