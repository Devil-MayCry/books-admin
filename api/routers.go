package api

import (
	"time"

	"taskcenter-admin/api/books"
	"taskcenter-admin/api/ctrl"
	"taskcenter-admin/api/library/logger"

	"github.com/ivpusic/neo"
)

func Register(app *neo.Application) {
	setupMiddleWares(app)
	setupPublicRegion(app)
	setupProtectedRegion(app)
}

func loginMiddleWares(ctx *neo.Ctx, next neo.Next) {
	next()
}

func setupMiddleWares(app *neo.Application) {
	//Logger
	app.Use(func(ctx *neo.Ctx, next neo.Next) {
		start := time.Now()
		next()

		elapsed := time.Now().Sub(start) / time.Millisecond

		logger.HTTPAccess(ctx.Req.Request, ctx.Res.Status, -1, elapsed, time.Duration(-1))
	})
}

func setupPublicRegion(app *neo.Application) {
	regionPublic := app.Region()
	routerLogin := regionPublic.Prefix("/p/user")
	{
		user := new(ctrl.User)
		routerLogin.Post("/login", user.Login)
		routerLogin.Post("/logout", user.Logout)
	}
}

func setupProtectedRegion(app *neo.Application) {
	//权限设置
	regionProtected := app.Region()
	regionProtected.Use(loginMiddleWares)

	//路由设置
	workerAPI := regionProtected.Prefix("/api/books")
	{
		workerAPI.Get("/list", books.GetList)
		workerAPI.Put("/delete", books.DeleteBook)
		workerAPI.Put("/update", books.UpdateBook)
		workerAPI.Post("/create", books.CreateBook)
	}
}
