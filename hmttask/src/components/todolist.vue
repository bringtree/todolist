<template>
  <div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="commitContent">
    </el-input>
    <div>
      <el-button type="success" class='send' @click='commit'>{{$store.state.name.name}}回复(可按Enter)
      </el-button>
      <el-radio class="radio" v-model="sortMode" label="1">按赞排序</el-radio>
      <el-radio class="radio" v-model="sortMode" label="2">按时间排序</el-radio>
    </div>
    <div>

      <template v-for='item in tableData'>
        <ul class="comment-section">
          <li class="comment user-comment">
            <div class="info">
              <a>{{item.username}}</a>
              <span>{{item.saytime|capitalize}} </span>
            </div>
            <p>{{item.saywords}}
              <a class='zang'> <i class='el-icon-caret-top' @click='addZang(item)'>{{item.zang}}</i></a>
            </p>
          </li>
        </ul>
      </template>


    </div>
  </div>


</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'


  export default {
    data(){
      return {
        // username:'',
        commitContent: '',
        sortMode: '1',
        tableData: []
      }
    },
    watch: {
      sortMode: function (val) {

        function sortby(key) {
          return function (a, b) {
            return ~~(a[key] < b[key]);
          }
        }

        if (val == '1') {
          this.tableData.sort(sortby('zang'))
        }
        else {
          this.tableData.sort(sortby('saytime'))

        }
        return val;
      }
    },
    mounted() {
      this.$http.get('/api/list')
        .then((res) => {
          if (res.status == 200) {
            this.tableData = res.data; //
          } else {
            this.$message.error('获取列表失败！')
          }
        }, (err) => {
          this.$message.error('获取列表失败！');
          console.log(err)
        });
      this.username = '';//

    }
    ,
    methods: {
      getTodolist: function () {
        this.$http.get('/api/list')
          .then((res) => {
            if (res.status == 200) {
              this.tableData = res.data; //
            } else {
              this.$message.error('获取列表失败！')
            }
          }, (err) => {
            this.$message.error('获取列表失败！');
            console.log(err)
          })
      }
      ,
      commit: function () {
        console.log(this.username.name);
        const myDate = new Date();
        var month = (myDate.getMonth()+1) > 9 ? (myDate.getMonth()+1) : '0' + (myDate.getMonth()+1);
        var day = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate();
        var hours = myDate.getHours() > 9 ? myDate.getHours() : '0' + myDate.getHours();
        var min = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + myDate.getMinutes();
        var s = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds();
        this.tableData.push({
          saytime: myDate.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + min + ':' + s + '.988Z',
          username: this.username, //cw
          saywords: this.commitContent,
          zang: 1
        });
        var sayingWords = {
          saytime: myDate.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + min + ':' + s + '.988Z',
          username: this.username,
          saywords: this.commitContent,
          zang: 1
        };
        this.$http.post('/auth/api/sayingWords', sayingWords)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: '发送成功！'
              });
            } else {
              this.$message.error(res.data.info);
            }
          })
      },

      addZang: function (n) {
        var keyword = {
          username: n.username,
          saywords: n.saywords
        };
        this.$http.post('/auth/api/zang', keyword)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: '赞成功！'
              });
            } else {
              this.$message.error(res.data.info);
            }
          });
        n.zang++;
      }
    },

    filters: {
      capitalize: function (value) {
        value = value.toString();
        value = value.match(/^\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}/g)
        return value[0].replace('T', ' ')
      }
    },
    computed:{
      username(){
        return this.$store.state.name.name
      }
    }
    // created(){
      // console.log(this.$data.username)
      // $vm.$data.username=this.$store.state.name.name
      // console.log(this.$data.username)
    // }


  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font: normal 13px sans-serif;
  }

  .comment-section {
    list-style: none;
    max-width: 800px;
    width: 100%;
    margin: 5px auto;
    padding: 10px;
  }

  .comment {
    display: flex;
    border-radius: 3px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .comment.user-comment {
    color: #808080;
  }

  .comment .info {
    width: 17%;
  }

  .comment.user-comment .info {
    text-align: right;
    margin-right: 2%;
  }

  .comment .info a {
    display: block;
    text-decoration: none;
    color: #656c71;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px 0 3px 0;
  }

  .comment .info span {
    font-size: 11px;
    color: #9ca7af;
  }

  .comment p {
    line-height: 1.5;
    padding: 18px 22px;
    width: 50%;
    position: relative;
    word-wrap: break-word;
  }

  .comment.user-comment p {
    background-color: #f3f3f3;
  }

  .send, .zang {
    float: right;
  }


</style>
