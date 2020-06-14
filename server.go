package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os/exec"
	"runtime"

	"github.com/ivpusic/neo"

	"taskcenter-admin/api"
	"taskcenter-admin/api/library/conf"
)

var commands = map[string]string{
	"windows": "cmd /c start",
	"darwin":  "open",
	"linux":   "xdg-open",
}

const ENV = "debug"

func main() {
	app := neo.App()
	app.Conf.Parse("conf/local.toml")
	api.Register(app)

	app.Get("/ping", func(ctx *neo.Ctx) (int, error) {
		return 200, ctx.Res.Text("running")
	})

	indexTpl := "index.html"
	if conf.Tree.GetEnv() == ENV {
		app.Get("/static/*", func(ctx *neo.Ctx) (int, error) {
			resp, err := http.Get("http://localhost:8080" + ctx.Req.URL.String())
			if err != nil {
				log.Println(err.Error())
			}
			respBody, err := ioutil.ReadAll(resp.Body)
			ctx.Res.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
			return resp.StatusCode, ctx.Res.Raw(respBody)
		})
	} else {
		indexTpl = "index_prod.html"
		app.Serve("/static", "./assets/dist/static")
	}

	app.Templates("./assets/dist/*")
	app.Region().Get("*", func(ctx *neo.Ctx) (int, error) {
		return 200, ctx.Res.Tpl(indexTpl, nil)
	})
	go func() {
		Open("http://127.0.0.1:1814")
	}()
	app.Start()
}

// Open calls the OS default program for uri
func Open(uri string) error {
	run, ok := commands[runtime.GOOS]
	fmt.Println(ok)
	if !ok {
		return fmt.Errorf("don't know how to open things on %s platform", runtime.GOOS)
	}

	cmd := exec.Command(run, uri)
	return cmd.Start()
}
