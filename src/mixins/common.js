export default function () {
  return {
    data () {
      return {}
    },
    methods: {
      sizeChange (val) {
        this.page.currentPage = 1
        this.page.pageSize = val
        this.getList()
      },
      currentChange (val) {
        this.page.currentPage = val
        this.getList()
      },
      refreshChange () {
        this.getList()
      },
      searchChange(params){
        console.log(params,'xxx');
        this.searchParams = params;
        this.getList();
      },
      rowDel (from, index) {
        if (from.id) {
          this.$confirm('此操作为永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            callback: async action => {
              if (action == 'confirm') {
                const res = await this._delObj(from)
                if (res.data.code == 0) {
                  this.records.every((item, index) => {
                    if (item.id == from.id) {
                      this.records.splice(index, 1)
                      this.page.total--
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      })
                      return false
                    } else {
                      return true
                    }
                  })
                }
              } else {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              }
            }
          })
        }
      }
    }
  }
}
