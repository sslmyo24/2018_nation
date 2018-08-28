const model = new class {
	init () {
		this.db = openDatabase("YeosuStreaming","1.0","Jeonnam3",2*1024*1024)
	}

	query (sql,arr = [],await = true) {
		return new Promise (resolve => {
			this.db.transaction(tx => {tx.executeSql(sql,arr,(tx,res) => {resolve(res)},(tx,error) => {console.log(error)})})
		})
	}
}

function loadOn () {

}

model.init()
model.query(`CREATE TABLE IF NOT EXISTS`)

$(loadOn)