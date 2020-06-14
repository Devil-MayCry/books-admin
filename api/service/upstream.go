package service

import (
	"fmt"

	"taskcenter-admin/api/library/gateway/plugin"
	"taskcenter-admin/api/model"
)

type Upstream struct {
	plugin *plugin.Cli

	upstream *plugin.UpstreamOutputConfig
	nodes    []string
}

func NewUpstream(env string) *Upstream {
	return &Upstream{plugin: plugin.NewCli(env)}
}

func (s *Upstream) SetupCfg(upstreamCfg *plugin.UpstreamOutputConfig) {
	s.upstream = upstreamCfg
}

func (s *Upstream) NodeLoad(nodes []model.ServiceNode) {
	s.nodes = make([]string, 0)
	for _, node := range nodes {
		s.nodes = append(s.nodes, node.Pipeline.Name)
	}
}

func (s *Upstream) NodeAppend(name string) {
	s.nodes = append(s.nodes, name)
}

func (s *Upstream) NodeRemove(name string) {
	nodes := make([]string, 0)
	for _, node := range s.nodes {
		if node == name {
			continue
		}

		nodes = append(nodes, node)
	}
	s.nodes = nodes
	fmt.Println(s.nodes)
}

func (s *Upstream) Apply() error {
	s.upstream.TargetPipelineNames = s.nodes
	if len(s.nodes) == 0 {
		err := s.plugin.Delete(s.upstream.Name)
		if err != nil {
			return err
		}
	} else if _, err := s.plugin.Get(s.upstream.Name); err != nil {
		err := s.plugin.Create(plugin.TypeUpstreamOutput, s.upstream)
		if err != nil {
			return err
		}
	} else {
		err := s.plugin.Update(plugin.TypeUpstreamOutput, s.upstream)
		if err != nil {
			return err
		}
	}

	return nil
}
