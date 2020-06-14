package output

import "github.com/ivpusic/neo"

func ParamInvalid(c *neo.Ctx, err error) (int, error) {
	return 400, c.Res.Json(O{
		StatusCode: ErrorParamInvalid,
		StatusMsg:  err.Error(),
	})
}

func NotFound(c *neo.Ctx, body interface{}) (int, error) {
	return 404, c.Res.Json(O{
		StatusCode: ErrorSuccess,
		StatusMsg:  GetMessage(ErrorSuccess),
		Data:       body,
	})
}
