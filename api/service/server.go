package service

import (
	"taskcenter-admin/api/library/gateway/plugin"
	"taskcenter-admin/api/model"
)

type Server struct {
	model.Service
	plugin *plugin.Cli

	nodes []string
}

func NewServer(addr string) *Server {
	return &Server{plugin: plugin.NewCli(addr)}
}

func (s *Server) Init(port uint16) error {
	server := plugin.NewHTTPServer(port)
	return s.plugin.Create(server.Type, server.Config)
}

//func (s *Server) SetupUpstream(upstream *plugin.UpstreamOutputConfig) *Server {
//	s.Upstream = upstream
//	return s
//}

func (s *Server) NodeAppend(pipelineName string) {
	if len(s.nodes) == 0 {
		s.nodes = s.Upstream.TargetPipelineNames
	}

	s.nodes = append(s.nodes, pipelineName)
}

func (s *Server) NodeRemove(pipelineName string) {
	s.nodes = []string{}
	for _, node := range s.Upstream.TargetPipelineNames {
		if node == pipelineName {
			continue
		}

		s.nodes = append(s.nodes, node)
	}
}

//func (s *Server) Apply() error {
//	if len(s.Upstream.TargetPipelineNames) == 0 {
//		s.Upstream.TargetPipelineNames = s.nodes
//		err := s.plugin.Create(plugin.TypeUpstreamOutput, s.Upstream)
//		if err != nil {
//			return err
//		}
//	} else if len(s.nodes) > 0 {
//		s.Upstream.TargetPipelineNames = s.nodes
//		err := s.plugin.Update(plugin.TypeUpstreamOutput, s.Upstream)
//		if err != nil {
//			return err
//		}
//	} else {
//		s.Upstream.TargetPipelineNames = s.nodes
//		err := s.plugin.Delete(s.Upstream.Name)
//		if err != nil {
//			return err
//		}
//	}
//
//	return nil
//}
