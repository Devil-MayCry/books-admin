package pipeline

import (
	"errors"
	"log"
	"net/http"

	admin "github.com/hexdecteam/easegateway-go-client/rest/1.0/cluster/admin/v1"
	"github.com/hexdecteam/easegateway-go-client/rest/1.0/cluster/admin/v1/pdu"
	"github.com/hexdecteam/easegateway-go-client/rest/1.0/common/v1"
)

const Group = "default"

func NewPipelineCli(addr string) *PpCli {
	if len(addr) == 0 {
		log.Panic("The env not be none")
	}

	return &PpCli{admin: admin.NewClusterAdminApi(addr)}
}

type PpCli struct {
	admin *admin.ClusterAdminApi
}

func (pp *PpCli) GetOperationSeq() (uint64, *v1.APIResponse, error) {
	seq, resp, err := pp.admin.GetMaxOperationSequence(Group, &pdu.ClusterOperationSeqRetrieveRequest{})
	if err != nil {
		return 0, resp, err
	}

	return seq.OperationSeq + 1, resp, nil
}

func (pp *PpCli) Getlist(name string) (*pdu.PipelinesRetrieveClusterResponse, error) {
	spec, resp, err := pp.admin.GetPipelines(Group, &pdu.PipelinesRetrieveClusterRequest{NamePattern: name})
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New(resp.Error.Error)
	}

	return spec, nil
}

// Pipeline Create
func (pp *PpCli) Create(Type string, Config interface{}) error {
	seq, _, err := pp.GetOperationSeq()
	if err != nil {
		return err
	}

	resp, err := pp.admin.CreatePipeline(Group, &pdu.PipelineCreationClusterRequest{
		ClusterOperationRequest: pdu.ClusterOperationRequest{OperationSeq: seq}, Type: Type, Config: Config})
	if err != nil {
		return err
	}

	if resp.StatusCode != http.StatusOK {
		return errors.New(resp.Error.Error)
	}

	return nil
}

// Pipeline Update
func (pp *PpCli) Update(Type string, Config interface{}) error {
	seq, _, err := pp.GetOperationSeq()
	if err != nil {
		return err
	}

	resp, err := pp.admin.UpdatePipeline(Group, &pdu.PipelineUpdateClusterRequest{
		ClusterOperationRequest: pdu.ClusterOperationRequest{OperationSeq: seq}, Type: Type, Config: Config})
	if err != nil {
		return err
	}

	if resp.StatusCode != http.StatusOK {
		return errors.New(resp.Error.Error)
	}

	return nil
}

// Pipeline Delete
func (pp *PpCli) Delete(pipelineName string) error {
	seq, _, err := pp.GetOperationSeq()
	if err != nil {
		return err
	}

	resp, err := pp.admin.DeletePipelineByName(Group, pipelineName, &pdu.ClusterOperationRequest{OperationSeq: seq})
	if err != nil {
		return err
	}

	if resp.StatusCode != http.StatusOK {
		return errors.New(resp.Error.Error)
	}

	return nil
}
