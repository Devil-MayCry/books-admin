package plugin

type UpstreamOutputConfig struct {
	Name                string   `json:"plugin_name"`
	TargetPipelineNames []string `json:"target_pipelines"`
	RoutePolicy         string   `json:"route_policy"`
	TimeoutSec          uint16   `json:"timeout_sec"` // up to 65535, zero means no timeout

	RequestDataKeys []string `json:"request_data_keys"`
	// for weighted_round_robin and weighted_random policies
	TargetPipelineWeights []uint16 `json:"target_weights"` // weight up to 65535, 0 based
	// for hash policy
	ValueHashedKeys []string `json:"value_hashed_keys"`
	// for filter policy
	// each map in the list as the condition set for the target pipeline according to the index
	// map key is the key of value in the task, map value is the match condition, support regex
	FilterConditions []map[string]string `json:"filter_conditions"`
	// for fanout policy
	TargetPipelineResponseFlags []bool `json:"target_response_flags"`
}

type UpstreamOutput struct {
	Type   string
	Config *UpstreamOutputConfig
}

const PrefixUpstreamOutput = "pl_upstream_"
const TypeUpstreamOutput = "UpstreamOutput"

func NewUpstreamOutput(name string, targetPipelineNames ...string) *UpstreamOutput {
	u := new(UpstreamOutputConfig)
	u.Name = PrefixUpstreamOutput + name
	u.TargetPipelineNames = targetPipelineNames
	u.RequestDataKeys = []string{
		"SERVER_NAME",
		"REQUEST_METHOD",
		"PATH_INFO",
		"QUERY_STRING",
		"CONTENT_TYPE",
		"HTTP_REQUEST_HEADER",
		"HTTP_REQUEST_BODY_IO",
	}
	u.RoutePolicy = "round_robin"
	return &UpstreamOutput{Type: TypeUpstreamOutput, Config: u}
}

func (uo *UpstreamOutput) Resolve(plugin interface{}) {
	uo.Config = plugin.(*UpstreamOutputConfig)
}

func (uo *UpstreamOutput) Name() string {
	return uo.Config.Name
}