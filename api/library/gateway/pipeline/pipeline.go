/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package pipeline

const TypeLinearPipeline = "LinearPipeline"

type Pipeline struct {
	Name                        string   `json:"pipeline_name"`
	Parallelism                 uint     `json:"parallelism"`
	WaitPluginClose             bool     `json:"wait_plugin_close"`
	CrossPipelineRequestBacklog uint     `json:"cross_pipeline_request_backlog"`
	PluginNames                 []string `json:"plugin_names"`
}

const PrefixAPIPipeline = "pp_"

func NewPipeline(name string, plugin ...string) *Pipeline {
	return &Pipeline{Name: PrefixAPIPipeline + name, Parallelism: 0, CrossPipelineRequestBacklog: 5000, WaitPluginClose: true, PluginNames: plugin}
}
