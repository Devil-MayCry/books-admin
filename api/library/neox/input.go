package neox

import (
	"fmt"
	"strconv"

	"github.com/ivpusic/neo"
	"net/url"
)

type I struct {
	UrlParam url.Values

	ctx string
}

func Input(c *neo.Ctx) *I {
	return &I{UrlParam: c.Req.URL.Query()}
}

func (i *I) Get(key string) *I {
	i.ctx = i.UrlParam.Get(key)
	return i
}

func (i *I) Default(v interface{}) *I {
	if len(i.ctx) == 0 {
		i.ctx = fmt.Sprint(v)
	}
	return i
}

func (i *I) String() string {
	return i.ctx
}

func (i *I) Integer() int {
	v, _ := strconv.Atoi(i.ctx)
	return v
}
