const _this = this;
var app = new Vue({
  el: "#app",
  data: {
    inputAdd: "",
    todos: [],
    isShowModal: false,
  },
  created: function() {
    var jsonObj = localStorage.getItem("todosKey");
    var jsObj = JSON.parse(jsonObj);
    for (var i = 0; i < jsObj.length; i++) {
      var todo = {
        item: jsObj[i].item,
        isCheck: jsObj[i].isCheck,
      };
      this.todos.push(todo);
    }
  },
  methods: {
    //データを追加
    addItem() {
      if (this.inputAdd == "") {
        return;
      }
      this.optionHowTo(this.inputAdd);

      var todo = {
        item: this.inputAdd,
        isCheck: false,
      };
      this.todos.push(todo);
      this.inputLocalStrage();
      this.inputAdd = "";
    },
    //データを削除
    deleteItem(index) {
      this.todos.splice(index, 1);
      this.inputLocalStrage();
    },
    //チェック状態の管理
    saveCheckState(index) {
      if (this.todos[index].isCheck) {
        this.todos[index].isCheck = false;
      } else {
        this.todos[index].isCheck = true;
      }
      this.inputLocalStrage();
    },
    //データをセッションストレージに格納
    inputLocalStrage() {
      var obj = JSON.stringify(this.todos);
      localStorage.setItem("todosKey", obj);
    },
    //オプション機能：ソースコード公開モーダル
    optionHowTo(inputAdd) {
      if (inputAdd === "HowToMake" || inputAdd === "はうつーめいく") {
        this.isShowModal = true;
      }
    },
  },
});
