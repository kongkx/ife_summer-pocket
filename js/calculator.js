function Controller(el) {
  var self = this;
  element.html(numdisplay + template);

  down = $(".numdisplay .down");
  up = $(".numdisplay .up");
  inputRecord = $(".numdisplay");

  // 显示计算过程的数组
  progress = [];

  if (theme) {
    this.element.addClass(theme); //添加键盘样式
  }

  var countSize;

  $("span", this.element).on('click', function () { //如何在电脑上用click，手机上用tap
    var code = $(this).text().trim(); //键盘按键获取
    if (isNaN(code)) {
      switch (code) {
      case '.':
        //判断初始值为0的时候，只有输入小数点才追加，否则覆盖
        if (down.text() == "0") {
          down.append(code);
        }
        if (down.text().indexOf(".") > 0) {
          //使输入框里只能有一个小数点
          return false;
        } else if (down.text() == "") {
          //输入框为空且按钮为小数点时输入0.
          down.text("0").append(code);
        } else {
          down.append(code);
        }
        break;
      case 'C':
        //重置按钮
        up.text("");
        down.text("0");
        el.val(0);
        //新操作
        progress = [];
        testdisplay.text(progress.join('')); //按下按钮实时显示
        break;
      case '<':
        //退格
        if (down.text().length == 1) {
          down.text(0);
        } else {
          if (down.text().charAt(down.text().length - 2) == '.') { //如果前一位还有小数点，多删一格
            down.text(down.text().substr(0, down.text().length - 1))
          }
          down.text(down.text().substr(0, down.text().length - 1));
        }
        break;
      case '+':
      case '-':
        var upNum = $("#numdisplay #up .upNum").text();
        var symbol = $("#numdisplay #up .symbol").text();
        var downNum = down.text();
        if (upNum && symbol && downNum) { //如果式子已经写好再按操作符，立即获得结果且加上符号
          //如果有空值，则跳出
          if (upNum == "" || downNum == "0") {
            return false;
          }

          var resultNum = count[symbol](upNum, downNum); //计算值
          el.val(resultNum);
          up.text(resultNum).wrapInner('<span class="upNum" /></span>')
            .append('<span class="symbol">' + code + '</span>');
          down.text("");

          //新操作
          progress.push(downNum);
          progress.push(code);
          testdisplay.text(progress.join('')); //按下按钮实时显示


        } else if (downNum) { //正在输入的地方有数字
          el.val(downNum);
          up.text(downNum).wrapInner('<span class="upNum" /></span>')
            .append('<span class="symbol">' + code + '</span>');
          down.text("");

          //新操作
          progress.push(downNum);
          progress.push(code);
          testdisplay.text(progress.join('')); //按下按钮实时显示

        }

        break;
      case '=':
        var upNum = $("#numdisplay #up .upNum").text();
        var symbol = $("#numdisplay #up .symbol").text();
        var downNum = down.text();

        //如果有空值，则跳出
        if (upNum == "" || downNum == "0") {
          return false;
        }

        var resultNum = count[symbol](upNum, downNum); //计算值
        down.text(resultNum);
        up.text("");

        el.val(resultNum);

        //新操作
        progress.push(downNum);
        testdisplay.text(progress.join('')); //按下按钮实时显示

        //新操作 测试
        $.each(progress, function (index, item) {
          console.log('item %d is: %s', index, item)
        })

        break;
      default:
        break;;
      }

    } else {
      testdisplay.text(progress.join('')); //按下按钮实时显示
      //正常输入数字
      if (down.text() != '0') {
        down.append(code);

      } else {
        down.text(code);
      }
    }


  });
}