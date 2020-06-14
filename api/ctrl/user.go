package ctrl

import (
	"github.com/ivpusic/neo"

	"taskcenter-admin/api/library/output"
	"taskcenter-admin/api/param"
)

type User struct {
}

func (s *User) Login(c *neo.Ctx) (int, error) {
	p := new(param.UserLoginRequest)
	if err := c.Req.JsonBody(&p); err != nil {
		return output.ParamInvalid(c, err)
	}
	return output.Ok(c)
}

func (s *User) Logout(c *neo.Ctx) (int, error) {
	//清理session
	return output.Ok(c)
}
