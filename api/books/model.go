package books

type (
	Books struct {
		ID          int64  `json:"id"`
		Name        string `json:"name"`
		Author      string `json:"author"`
		Publish     string `json:"publish"`
		Isbn        string `json:"isbn"`         // 书籍识别码
		Year        string `json:"year"`         // 出版年份
		Status      int    `json:"status"`       // 未借出 1 借出 2
		Borrower    string `json:"borrow"`       // 借书人
		BorrowTime  string `json:"borrow_time"`  // 借出时间
		StorageTime string `json:"storage_time"` // 存储时间
		Comment     string `json:"comment"`      // 备注
	}

	BooksListReturn struct {
		TaskList []*Books `json:"list"`
		Total    int      `json:"total"`
	}
	CommonRequestID struct {
		ID int64 `json:"id"`
	}
)
