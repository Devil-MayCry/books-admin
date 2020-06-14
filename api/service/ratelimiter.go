/*
 * Copyright (c) 2017. by YanBo<yanbo@luojilab.com>
 */

package service

import (
	"strings"

	"taskcenter-admin/api/library/gateway/pipeline"
	"taskcenter-admin/api/library/gateway/plugin"
)

type rateLimiter struct {
	plugin   *plugin.Cli
	pipeline *pipeline.PpCli

	Config *plugin.ThroughputRateLimiterConfig
}

func NewRateLimiter(addr string) *rateLimiter {
	return &rateLimiter{plugin: plugin.NewCli(addr), pipeline: pipeline.NewPipelineCli(addr)}
}

func (rl *rateLimiter) Create(name string, tps string, timeout int64) error {
	rateLimiter := plugin.NewThroughputRateLimiter(name, tps, timeout)
	rl.Config = rateLimiter.Config
	err := rl.plugin.Create(rateLimiter.Type(), rl.Config)
	if err != nil {
		return err
	}

	return nil
}

func (rl *rateLimiter) Update(name string, tps string, timeout int64) error {
	rateLimiter := plugin.NewThroughputRateLimiter(name, tps, timeout)
	rl.Config = rateLimiter.Config
	err := rl.plugin.Update(rateLimiter.Type(), rl.Config)
	if err != nil {
		return err
	}

	return nil
}

func (rl *rateLimiter) Delete(name string) error {
	err := rl.plugin.Delete(plugin.PrefixRateLimiter + name)
	if err != nil {
		return err
	}

	return nil
}

func (rl *rateLimiter) Bind(pipelineConfig *pipeline.Pipeline, pluginNames ...string) error {
	//insert the plugin RateLimiter behind the plugin HTTPInput and HTTPRedirect
	var insertIndex int
	for index, pluginName := range pipelineConfig.PluginNames {
		if strings.HasPrefix(pluginName, plugin.PrefixHttpInput) {
			insertIndex = index
		}

		if strings.HasPrefix(pluginName, plugin.PrefixHttpRedirect) {
			insertIndex = index
			continue
		}
	}

	newNames := make([]string, 4)
	length := copy(newNames, pipelineConfig.PluginNames[:insertIndex+1])
	newNames = append(newNames[:length], pluginNames...)
	pipelineConfig.PluginNames = append(newNames, pipelineConfig.PluginNames[insertIndex+1:]...)
	err := rl.pipeline.Update(pipeline.TypeLinearPipeline, pipelineConfig)
	if err != nil {
		return err
	}

	return nil
}

func (rl *rateLimiter) Unbind(pipelineConfig *pipeline.Pipeline) error {
	//remove plugin SimpleCommonMock and RateLimiter from pipeline.
	var mockIndex, limiterIndex int
	for index, pluginName := range pipelineConfig.PluginNames {
		if strings.HasPrefix(pluginName, plugin.PrefixSimpleCommonMock) {
			mockIndex = index
			continue
		}

		if strings.HasPrefix(pluginName, plugin.PrefixRateLimiter) {
			limiterIndex = index
			continue
		}
	}

	headIndex := mockIndex
	if headIndex == 0 {
		headIndex = limiterIndex
	}
	newNames := make([]string, headIndex)
	copy(newNames, pipelineConfig.PluginNames[:headIndex])
	pipelineConfig.PluginNames = append(newNames, pipelineConfig.PluginNames[limiterIndex+1:]...)
	err := rl.pipeline.Update(pipeline.TypeLinearPipeline, pipelineConfig)
	if err != nil {
		return err
	}

	return nil
}
