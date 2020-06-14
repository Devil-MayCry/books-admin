package db

import (
	"github.com/syndtr/goleveldb/leveldb"
)

var LevelDB *leveldb.DB

func init() {
	d, err := leveldb.OpenFile("data/level_db/", nil)
	if err != nil {
		panic(err)
	}
	LevelDB = d
}

func Close() {
	LevelDB.Close()
}
