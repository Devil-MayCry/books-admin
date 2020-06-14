package service

import (
	"taskcenter-admin/api/library/gateway/pipeline"
	"taskcenter-admin/api/library/gateway/plugin"
	"taskcenter-admin/api/model"
)

func NewNode(env string) *Node {
	return &Node{plugin: plugin.NewCli(env), pipeline: pipeline.NewPipelineCli(env)}
}

type Node struct {
	model.ServiceNode

	plugin   *plugin.Cli
	pipeline *pipeline.PpCli
}

func (n *Node) SetupPluginDownStream(downstream *plugin.DownstreamInputConfig) {
	n.Downstream = downstream
}

func (n *Node) SetupPluginHTTPOutput(httpOutput *plugin.HTTPOutputConfig) {
	n.HTTPOutput = httpOutput
}

func (n *Node) SetupPipeline(pp *pipeline.Pipeline) {
	n.Pipeline = pp
}

func (n *Node) Create() error {
	err := n.plugin.Create(plugin.TypeDownstreamInput, n.Downstream)
	if err != nil {
		return err
	}

	err = n.plugin.Create(plugin.TypeHTTPOutput, n.HTTPOutput)
	if err != nil {
		return err
	}

	err = n.pipeline.Create(pipeline.TypeLinearPipeline, n.Pipeline)
	if err != nil {
		return err
	}

	return nil
}

func (n *Node) Reset() error {
	err := n.plugin.Update(plugin.TypeDownstreamInput, n.Downstream)
	if err != nil {
		return err
	}

	err = n.plugin.Update(plugin.TypeHTTPOutput, n.HTTPOutput)
	if err != nil {
		return err
	}

	err = n.pipeline.Update(pipeline.TypeLinearPipeline, n.Pipeline)
	if err != nil {
		return err
	}

	return nil
}

func (n *Node) Remove() error {
	err := n.pipeline.Delete(n.Pipeline.Name)
	if err != nil {
		return err
	}
	err = n.plugin.Delete(n.Downstream.Name)
	if err != nil {
		return err
	}

	err = n.plugin.Delete(n.HTTPOutput.Name)
	if err != nil {
		return err
	}

	return nil
}
