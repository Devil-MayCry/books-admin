package output

import "github.com/ivpusic/neo"

func SystemException(c *neo.Ctx, err error) (int, error) {
	return 500, c.Res.Json(O{
		StatusCode: ErrorSystemFail,
		StatusMsg:  GetMessage(ErrorSystemFail),
		Data:       err.Error(),
	})
}
