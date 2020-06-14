package books

import (
	"taskcenter-admin/api/library/neox"
	"taskcenter-admin/api/resp"

	"github.com/ivpusic/neo"
)

func GetList(c *neo.Ctx) (int, error) {
	pageNo := neox.Input(c).Get("page_no").Integer()
	pageSize := neox.Input(c).Get("page_size").Integer()
	if pageSize <= 0 || pageSize <= 0 {
		return resp.Error(c, 0)
	}
	list, err := getAllBooksFromDB()

	if err != nil {
		return resp.Error(c, 0)
	}
	res := &BooksListReturn{}
	res.Total = len(list)
	if (pageNo-1)*pageSize > len(list) {
		return resp.Error(c, 0)
	}
	end := 0
	if pageNo*pageSize > len(list) {
		end = len(list)
	} else {
		end = pageNo * pageSize
	}
	res.TaskList = list[(pageNo-1)*pageSize : end]
	return resp.Success(c, res)
}

func DeleteBook(c *neo.Ctx) (int, error) {
	p := CommonRequestID{}
	if err := c.Req.JsonBody(&p); err != nil {
		return resp.Error(c, 0)
	}
	delDataInDB(p.ID)
	return resp.Success(c, nil)
}

func CreateBook(c *neo.Ctx) (int, error) {
	p := Books{}
	if err := c.Req.JsonBody(&p); err != nil {
		return resp.Error(c, 0)
	}
	if err := insertDataToDB(&p); err != nil {
		return resp.Error(c, 0)
	}
	return resp.Success(c, nil)
}

func UpdateBook(c *neo.Ctx) (int, error) {
	p := Books{}
	if err := c.Req.JsonBody(&p); err != nil {
		return resp.Error(c, 0)
	}
	if err := updateDataInDB(&p); err != nil {
		return resp.Error(c, 0)
	}
	return resp.Success(c, nil)
}

func DelBook(c *neo.Ctx) (int, error) {
	p := CommonRequestID{}
	if err := c.Req.JsonBody(&p); err != nil {
		return resp.Error(c, 0)
	}
	if err := delDataInDB(p.ID); err != nil {
		return resp.Error(c, 0)
	}
	return resp.Success(c, nil)
}
