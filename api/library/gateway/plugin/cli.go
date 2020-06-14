package plugin

import (
	"errors"
	"log"
	"net/http"

	admin "github.com/hexdecteam/easegateway-go-client/rest/1.0/cluster/admin/v1"
	"github.com/hexdecteam/easegateway-go-client/rest/1.0/cluster/admin/v1/pdu"
	"github.com/hexdecteam/easegateway-go-client/rest/1.0/common/v1"
)

const Group = "default"

func NewCli(addr string) *Cli {
	if len(addr) == 0 {
		log.Panic("The env not be none")
	}

	return &Cli{admin: admin.NewClusterAdminApi(addr)}
}

type Cli struct {
	admin *admin.ClusterAdminApi
}

func (p *Cli) GetOperationSeq() (uint64, *v1.APIResponse, error) {
	seq, resp, err := p.admin.GetMaxOperationSequence(Group, &pdu.ClusterOperationSeqRetrieveRequest{})
	if err != nil {
		return 0, resp, err
	}

	return seq.OperationSeq + 1, resp, nil
}

func (p *Cli) Get(name string) (*pdu.PluginSpec, error) {
	spec, resp, err := p.admin.GetPluginByName(Group, name, &pdu.ClusterRetrieveRequest{})
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New(resp.Error.Error)
	}

	return spec, nil
}

func (p *Cli) Getlist(namePattern string) (*pdu.PluginsRetrieveClusterResponse, error) {
	spec, resp, err := p.admin.GetPlugins(Group, &pdu.PluginsRetrieveClusterRequest{NamePattern: namePattern})
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New(resp.Error.Error)
	}

	return spec, nil
}

func (p *Cli) Create(Type string, Config interface{}) error {
	seq, _, err := p.GetOperationSeq()
	if err != nil {
		return err
	}

	return p.exec(func(params interface{}) (*v1.APIResponse, error) {
		return p.admin.CreatePlugin(Group, params.(*pdu.PluginCreationClusterRequest))
	}, &pdu.PluginCreationClusterRequest{
		ClusterOperationRequest: pdu.ClusterOperationRequest{OperationSeq: seq}, Type: Type, Config: Config,
	})
}

func (p *Cli) Update(Type string, Config interface{}) error {
	seq, _, err := p.GetOperationSeq()
	if err != nil {
		return err
	}

	return p.exec(func(params interface{}) (*v1.APIResponse, error) {
		return p.admin.UpdatePlugin(Group, params.(*pdu.PluginUpdateClusterRequest))
	}, &pdu.PluginUpdateClusterRequest{
		ClusterOperationRequest: pdu.ClusterOperationRequest{OperationSeq: seq}, Type: Type, Config: Config,
	})
}

func (p *Cli) Delete(name string) error {
	return p.exec(func(params interface{}) (*v1.APIResponse, error) {
		seq, resp, err := p.GetOperationSeq()
		if err != nil {
			return resp, err
		}

		return p.admin.DeletePluginByName(Group, params.(string), &pdu.ClusterOperationRequest{OperationSeq: seq})
	}, name)
}

func (p *Cli) exec(callback func(Config interface{}) (*v1.APIResponse, error), params interface{}) error {
	resp, err := callback(params)
	if err != nil {
		return err
	}

	if resp.StatusCode != http.StatusOK {
		return errors.New(resp.Error.Error)
	}

	return nil
}
