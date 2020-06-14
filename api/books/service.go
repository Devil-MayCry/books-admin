package books

import (
	"encoding/json"
	"fmt"
	"github.com/syndtr/goleveldb/leveldb"
	"strconv"
	"taskcenter-admin/api/db"
)

func getAllBooksFromDB() ([]*Books, error) {
	res := make([]*Books, 0)
	iter := db.LevelDB.NewIterator(nil, nil)
	for iter.Next() {
		b := &Books{}
		err := json.Unmarshal(iter.Value(), b)
		if err != nil {
			continue
		}
		res = append(res, b)
	}
	iter.Release()
	err := iter.Error()
	if err != nil {
		fmt.Println(err)
	}
	return res, err
}

func insertDataToDB(b *Books) error {
	// 获取上一个编号
	id_incr, err := db.LevelDB.Get([]byte("id_incr"), nil)
	if err != nil {
		if err != leveldb.ErrNotFound {
			fmt.Println(err)
			return err
		} else {
			id_incr = []byte("0")
		}
	}
	t, err := strconv.ParseInt(string(id_incr), 10, 64)
	b.ID = t + 1
	b.Status = 1
	value, err := json.Marshal(b)
	if err != nil {
		fmt.Println(err)
		return err
	}
	err = db.LevelDB.Put([]byte(strconv.FormatInt(b.ID, 10)), value, nil)
	if err != nil {
		fmt.Println(err)
		return err
	}
	err = db.LevelDB.Put([]byte("id_incr"), []byte(strconv.FormatInt(t+1, 10)), nil)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func updateDataInDB(b *Books) error {
	value, err := json.Marshal(b)
	if err != nil {
		fmt.Println(err)
		return err
	}
	err = db.LevelDB.Put([]byte(strconv.FormatInt(b.ID, 10)), value, nil)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func delDataInDB(ID int64) error {
	return db.LevelDB.Delete([]byte(strconv.FormatInt(ID, 10)), nil)
}
