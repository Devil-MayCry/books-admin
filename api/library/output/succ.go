package output

import "github.com/ivpusic/neo"

type O struct {
	StatusCode int         `json:"code"`
	StatusMsg  string      `json:"message"`
	Data       interface{} `json:"data,omitempty"`
}

func Data(c *neo.Ctx, body interface{}) (int, error) {
	return 200, c.Res.Json(O{
		StatusCode: ErrorSuccess,
		StatusMsg:  GetMessage(ErrorSuccess),
		Data:       body,
	})
}

func Error(c *neo.Ctx, code int) (int, error) {
	return 200, c.Res.Json(O{
		StatusCode: code,
		StatusMsg:  GetMessage(code),
	})
}

func Ok(c *neo.Ctx) (int, error) {
	return 200, c.Res.Json(O{
		StatusCode: ErrorSuccess,
		StatusMsg:  GetMessage(ErrorSuccess),
	})
}
