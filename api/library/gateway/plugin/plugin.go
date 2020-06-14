/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package plugin

type Plugin interface {
	Name() string
	Type() string
	Config() interface{}
}
